import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import { useNavigate, Link, useMatch } from "react-router-dom";

function Item(props) {
  const navigate = useNavigate();
  const cn = bem('Item');
  const homeLink = useMatch("/");
  const itemLink = useMatch("/:id");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  }

  const onClickLink = (e) => {
    e.preventDefault();
    navigate(`/${props.item._id}`, { replace: true });
    props.getItemInfo(props.item._id);
  };

  return (
    <div className={cn()}>
      {homeLink && <>
        <Link className={cn('title')} to={`/${props.item._id}`} onClick={onClickLink}>
          {props.item.title}
        </Link>
        <div className={cn('actions')}>
          <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
      </>}
      {!!itemLink && props.item &&
        <div className='Item-info'>
          <div>{props.item.description}</div>
          <div className="Item-info__title">Страна производитель: <span className="Item-info__title_bold">{props.item.madeIn?.title} ({props.item.madeIn?.code})</span></div>
          <div className="Item-info__title">Категория: <span className="Item-info__title_bold">{props.item.category?.title}</span></div>
          <div className="Item-info__title">Год выпуска: <span className="Item-info__title_bold">{props.item.edition}</span></div>
          <div className="Item-info__title Item-info__title_size Item-info__title_bold">Цена: {props.item.price} ₽</div>
          <div className="Item-info__button"><button onClick={callbacks.onAdd}>Добавить</button></div>
        </div>}

    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => { },
}

export default memo(Item);