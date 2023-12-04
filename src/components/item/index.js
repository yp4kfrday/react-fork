import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({ item, onAddItemToBasket }) {

  const callbacks = {
    onAddItemToBasket: () => {
      onAddItemToBasket(item);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{item.price.toLocaleString('ru-RU')} ₽</div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddItemToBasket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddItemToBasket: PropTypes.func
};

Item.defaultProps = {
  onAddItemToBasket: () => {
  }
}

export default React.memo(Item);