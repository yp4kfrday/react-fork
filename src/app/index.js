import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import Item from '../components/item/index'
import PageLayout from "../components/page-layout";
import Head from "../components/head";
import BasketTool from "../components/basket-tool";
import List from "../components/list";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import Pagination from '../components/pagination';
import { useMatch, Outlet } from "react-router-dom";
import ProductInfo from '../screens/index'

function Main() {

  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const homeLink = useMatch("/");
  const itemLink = useMatch("/:id");

  useEffect(() => {
    store.actions.catalog.loadPages();
  }, [store]);

  const handleChange = useCallback(
    (newPage) => {
      setCurrentPage(newPage);
      store.actions.catalog.loadPages(newPage);
    },
    [store]
  );

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.catalog.limit,
    listNext: state.catalog.listNext,
    pages: state.catalog.pages,
    itemInfo: state.item.itemInfo,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    getItemInfo: useCallback((_id) => store.actions.item.getItemInfo(_id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} getItemInfo={callbacks.getItemInfo} />
    }, [callbacks.addToBasket, callbacks.getItemInfo]),
  };

  return (
    <PageLayout>
      <Head title={homeLink ? 'Магазин' : 'Название товара'} />
      {(homeLink || itemLink) && <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />}
      {homeLink &&
        (<>
          <List list={select.list} renderItem={renders.item} />
          <Pagination
            totalPages={select.limit}
            currentPage={currentPage}
            limit={10}
            onPageChange={handleChange}
          />
        </>)}
      {itemLink && (select.itemInfo !== undefined) && (
        <ProductInfo renderItem={renders.item(select.itemInfo)} item={select.itemInfo} />
      )}
      <Outlet />
    </PageLayout>

  );
}

export default memo(Main);