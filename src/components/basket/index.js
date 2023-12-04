import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import BasketItem from "./basketItems";

function Basket({ basket, onDeleteItemFromBasket }) {

    return (
        <div className='Basket'>{
            basket.map(item =>
                <div key={item.code} className='Basket-item'>
                    <BasketItem item={item} onDeleteItemFromBasket={onDeleteItemFromBasket} />
                </div>
            )}
        </div>
    )
}

Basket.propTypes = {
    basket: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number
    })).isRequired,
    onDeleteItemFromBasket: PropTypes.func
};

Basket.defaultProps = {
    onDeleteItemFromBasket: () => {
    }
}

export default React.memo(Basket);