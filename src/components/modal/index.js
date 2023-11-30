import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import './style.css';
import BasketItem from "../basket/basketItems";

function Modal({ basket, onDeleteItemFromBasket, totalPrice, activeModal, setActiveModal }) {
  const isEmptyBasket = basket.length === 0;

  const handleClickOutside = (event) => {
    // Проверяем, что клик был вне модального окна
    if (activeModal && !event.target.closest('.Modal-container')) {
      setActiveModal(false);
    }
  };

  useEffect(() => {
    // Добавляем слушатель события mousedown при открытом модальном окне
    if (activeModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Удаляем слушатель события mousedown при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeModal, setActiveModal]);

  return (
    <div className={activeModal ? 'Modal active' : 'Modal'}>
      <div className={`Modal-container ${isEmptyBasket ? 'EmptyBasket' : ''}`}>
        {!isEmptyBasket && (
          <div className="Modal-header">
            <p>Корзина</p>
            <div>
              <button onClick={() => setActiveModal(false)}>Закрыть</button>
            </div>
          </div>
        )}
        {isEmptyBasket ? (
          <p>Ваша корзина пуста</p>
        ) : (
          basket.map(item =>
            <div key={item.code} className='List-item'>
              <BasketItem item={item} onDeleteItemFromBasket={onDeleteItemFromBasket} />
            </div>
          )
        )}
        {!isEmptyBasket && (
          <div className="Modal-footer">
            <div>Итого</div>
            <div>{totalPrice} ₽</div>
          </div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  onDeleteItemFromBasket: PropTypes.func,
  totalPrice: PropTypes.number,
  activeModal: PropTypes.bool,
  setActiveModal: PropTypes.func
};

Modal.defaultProps = {
  onDeleteItemFromBasket: () => { }
};

export default React.memo(Modal);