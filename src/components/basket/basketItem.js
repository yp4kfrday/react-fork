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
        <div className={'Basket-item'}>
            <div className='Basket-item__code'>{item.code}</div>
            <div className='Basket-item__title'>
                {item.title}
            </div>
            <div className='Basket-item__details'>
                <p className="Basket-item__price">{item.price.toLocaleString('ru-RU')} ₽</p>
                <p className="Basket-item__quantity">{item.quantity.toLocaleString('ru-RU')} шт</p>
            </div>
            <div className='Basket-item__actions'>
                <button onClick={callbacks.onDeleteItemFromBasket}>Удалить</button>
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