import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      limit: 0,
    }
  }

  // async load() {
  //   const response = await fetch('/api/v1/articles?limit=10');
  //   const json = await response.json();
  //   this.setState({
  //     ...this.getState(),
  //     list: json.result.items,
  //   }, 'Загружены товары из АПИ');
  // }


  async loadPages(page) {
    try {
      const response = await fetch(`/api/v1/articles?limit=10&skip=${page * 10}&fields=items(_id, title, price),count`);

      if (!response.ok) {
        throw new Error(`Ошибка при запросе: ${response.status}`);
      }

      const text = await response.text();
      console.log('Ответ сервера:', text);

      const json = JSON.parse(text);
      this.setState({
        ...this.getState(),
        list: json.result.items,
        limit: json.result.count,
        // pages: (Math.ceil(json.result.count / 10))
      }, 'Новый список товаров');

    } catch (error) {
      console.error('Произошла ошибка при получении данных:', error.message);
      // Дополнительные действия в случае ошибки, если необходимо
    }
  }
}

export default Catalog;