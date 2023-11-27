/**
 * Хранилище состояния приложения
 */
class Store {
  #codeCounter = '';

  constructor(initState = {}) {
    const lastItem = initState.list && initState.list.length > 0 ? initState.list[initState.list.length - 1] : null;
    this.#codeCounter = lastItem ? lastItem.code + 1 : 1;

    this.state = { list: initState.list || [], selectedCode: null };
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

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.#generateUniqueCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
      selectedCode: newCode, // Выделяем новую запись
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      selectedCode: code,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;

          // Инициализация счетчика кликов после первого клика
          if (item.selected && !item.clickCount) {
            item.clickCount = 1;
          } else if (item.selected) {
            // Увеличение счетчика кликов после последующих кликов
            item.clickCount += 1;
          }
        } else {
          item.selected = false;
        }

        return item;
      })
    });
  }

  /**
   * Генерация уникального кода
   * @returns {number} Уникальный код
   */
  #generateUniqueCode() {
    const newCode = this.#codeCounter;
    this.#codeCounter += 1;
    return newCode;
  }
}

export default Store;