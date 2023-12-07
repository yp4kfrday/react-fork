import StoreModule from "../module";

class ItemInfo extends StoreModule {

    initState() {
        return {
            itemInfo: {}
        }
    }

    async getItemInfo(_id) {
        const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            ...this.getState(),
            itemInfo: json.result
        }, 'Товар');
    }
}

export default ItemInfo;