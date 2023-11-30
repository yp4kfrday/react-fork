import React from "react";
import PropTypes from "prop-types";
import './style.css';

function BasketItem({ item, onDeleteItemFromBasket }) {

    const callbacks = {
        onDeleteItemFromBasket: () => {
            onDeleteItemFromBasket(item.code);
        }
    }

    return (
        <div className={'BasketItem'}>
            <div className='BasketItem-code'>{item.code}</div>
            <div className='BasketItem-title'>
                {item.title}
            </div>
            <div className='BasketItem-details'>
                <p className="BasketItem-price">{item.price.toLocaleString()} ₽</p>
                <p className="BasketItem-quantity">{item.quantity.toLocaleString()} шт</p>
                <div className='BasketItem-actions'>
                    <button onClick={callbacks.onDeleteItemFromBasket}>Удалить</button>
                </div>
            </div>
        </div>
    );
}

BasketItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number
    }).isRequired,
    onDeleteItemFromBasket: PropTypes.func
};

BasketItem.defaultProps = {
    onDeleteItemFromBasket: () => {
    }
}

export default React.memo(BasketItem);