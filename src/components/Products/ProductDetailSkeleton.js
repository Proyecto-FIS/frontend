import React, { Fragment } from 'react';

import { Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductDetailSkeleton = (props) => {

    const content = (
        <Card>
            <Skeleton variant="rect" height={"70vh"}/>
        </Card>
    );

    return <Fragment>{content}</Fragment>;
};

export default ProductDetailSkeleton;
