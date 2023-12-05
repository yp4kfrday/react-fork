import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Headline({ totalQuantity, totalPrice, setActiveModal }) {
    return (
        <div className='Headline'>
            <div className="headline-title">
                В корзине:
                <span style={{ fontWeight: 'bold' }}>
                    {totalQuantity
                        ? `${totalQuantity.toLocaleString()} ${plural(totalQuantity, {
                            one: 'товар',
                            few: 'товара',
                            many: 'товаров',
                        })} / ${totalPrice.toLocaleString('ru-RU')} ₽`
                        : ' пусто'}
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