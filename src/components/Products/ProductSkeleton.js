import React, { Fragment } from 'react';

import { Card, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductSkeleton = (props) => {

    const content = Array.from({ length: 20 }).map((item, index) => (
        <Grid key={index} item xs={4}>
            <Card>
                <Skeleton variant="rect" height={"70vh"}/>
            </Card>
        </Grid>
    ));

    return <Fragment>{content}</Fragment>;
};

export default ProductSkeleton;
