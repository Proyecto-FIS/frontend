import store from "../redux/store";
import updateCart from "../redux/actions/Cart/updateCart"

export class CartService {
  updateCart = (productList) => {
      store.dispatch(updateCart(productList))
  }  
}

export default CartService;
