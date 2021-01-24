import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
    listItem: {
        width: "50%"
    }
});

class ProductListItem extends Component {
    render() {
        const { classes, product, handleDeleteItem } = this.props;
        return (
            <ListItem button key={`item-${product._id}-${product.format}`}>
                <ListItemAvatar>
                    <Avatar alt={product.name} src={product.imageUrl} />
                </ListItemAvatar>
                <ListItemText className={classes.listItem} primary={product.name} secondary={`${product.quantity} uds x ${product.format}`} />
                <ListItemText className={classes.listItem} primary={`${product.unitPriceEuros} €`} />
                {handleDeleteItem ?
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(product)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                    : null
                }
            </ListItem>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(ProductListItem));
