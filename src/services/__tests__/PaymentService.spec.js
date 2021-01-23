import PaymentService from "../PaymentService";
import axios from "axios";
import AxiosMock from 'axios-mock-adapter';
import store from "../../redux/store";
import { doLogin, doLogout } from "../../setupTests";

const assertAuthError = () => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("No se encuentra autenticado ahora mismo");
};

beforeEach(() => {
    localStorage.clear();
    doLogout(store);
});

it("No token found", () => {
    const stripe = { confirmCardPayment: jest.fn() };
    return PaymentService.postPayment({ email: "email" }, "products", stripe, "cardElement")
        .catch(() => {
            assertAuthError();
        });
});

it("Payment working", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/payment").reply(200, { client_secret: "clientSecret" });

    doLogin(store);

    const stripe = {
        confirmCardPayment: jest.fn().mockImplementation((clientSecret, payment) => {
            expect(clientSecret).toBe("clientSecret");
            expect(payment.payment_method.card).toBe("cardElement");
            expect(payment.payment_method.billing_details.email).toBe("email");

            return {
                paymentIntent: { status: "succeeded" }
            };
        })
    };

    return PaymentService.postPayment({ email: "email" }, "products", stripe, "cardElement")
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Pago realizado satisfactoriamente");
        });
});

it("Error in /payment", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/payment").reply(500);

    doLogin(store);

    const stripe = { confirmCardPayment: jest.fn() };

    return PaymentService.postPayment({ email: "email" }, "products", stripe, "cardElement")
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("¡Ha habido un error! Error: Request failed with status code 500");
        });
});

it("Error in payment", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/payment").reply(200, { client_secret: "clientSecret" });

    doLogin(store);

    const stripe = {
        confirmCardPayment: jest.fn().mockImplementation((clientSecret, payment) => {
            expect(clientSecret).toBe("clientSecret");
            expect(payment.payment_method.card).toBe("cardElement");
            expect(payment.payment_method.billing_details.email).toBe("email");

            return {
                paymentIntent: { status: "error" },
                error: { message: "error message" }
            };
        })
    };

    return PaymentService.postPayment({ email: "email" }, "products", stripe, "cardElement")
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("¡Ha habido un error! error message");
        });
});

it("Exception in payment", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/payment").reply(200, { client_secret: "clientSecret" });

    doLogin(store);

    const stripe = {
        confirmCardPayment: jest.fn().mockImplementation((clientSecret, payment) => {
            return new Promise((resolve, reject) => {
                expect(clientSecret).toBe("clientSecret");
                expect(payment.payment_method.card).toBe("cardElement");
                expect(payment.payment_method.billing_details.email).toBe("email");

                reject("error message");
            });
        })
    };

    return PaymentService.postPayment({ email: "email" }, "products", stripe, "cardElement")
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("¡Ha habido un error! error message");
        });
});
