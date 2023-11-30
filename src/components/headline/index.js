import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Headline({ totalQuantity, totalPrice, setActiveModal }) {
    return (
        <div className='Headline'>
            <div className="headline-title">
                В корзине: {' '}
                <span style={{ fontWeight: 'bold', color: 'yourColorCode' }}>
                    {totalQuantity} / {totalPrice} ₽
                </span>
            </div>
            <button onClick={() => setActiveModal(true)}>Перейти</button>
        </div>
    )
}

Headline.propTypes = {
    onAdd: PropTypes.func
};

Headline.defaultProps = {
    onAdd: () => { }
}

export default React.memo(Headline);