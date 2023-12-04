import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  //Добавление предмета в корзину
  addItemToBasket(item) {
    let arr = [...this.state.basket];
    let index = arr.findIndex(el => el.code === item.code);

    if (index < 0) {
      const newItem = { ...item, quantity: 1 };

      this.setState({
        ...this.state,
        basket: [...this.state.basket, newItem],
      });
    } else {
      const newItem = { ...arr[index], quantity: arr[index].quantity + 1 };
      arr[index] = newItem;

      console.log('Block else is executed!');

      this.setState({
        ...this.state,
        basket: arr,
      });
    }
  };

  //Удаление предмета из корзины
  deleteItemFromBasket(code) {

    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    })
  }
}

export default Store;
