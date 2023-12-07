import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { Link, useNavigate, useLocation, useMatch } from "react-router-dom";


function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const navigate = useNavigate();
  const isHomeLink = useMatch("/");
  const location = useLocation();

  const onClickHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="basket-container">
      <Link to={{ pathname: "/" }} className='basket-container_link' onClick={onClickHome}>
        Главная
      </Link>
      <div className={cn()}>

        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
            : 'пусто'
          }
        </span>

        <Link
          to={{
            pathname: isHomeLink ? '/' : `/:id`,
            state: { background: location },
          }}
          className={cn('button')}
          onClick={onOpen}
        >
          Перейти
        </Link>

      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);