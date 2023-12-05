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

  // Селектор для получения корзины
  getBasket() {
    return this.state.basket || [];
  }

  // Селектор для подсчета уникальных товаров
  getUniqueItemCount() {
    const basket = this.getBasket();
    const uniqueItemCodes = new Set();

    return basket.reduce((total, item) => {
      if (!uniqueItemCodes.has(item.code)) {
        uniqueItemCodes.add(item.code);
        return total + 1; // Увеличиваем счетчик только для уникальных товаров
      }
      return total;
    }, 0);
  }

  // Селектор для подсчета общей стоимости
  getTotalPrice() {
    const basket = this.getBasket();

    return basket
      .map(item => item.price * item.quantity)
      .reduce((total, item) => total + item, 0);
  }
}

export default Store;
