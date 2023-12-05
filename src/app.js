import React, { useState, useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Headline from './components/headline';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [activeModal, setActiveModal] = useState(false)

  const list = store.getState().list;
  const basket = store.getState().basket
  const totalQuantity = store.getUniqueItemCount();
  const totalPrice = store.getTotalPrice();

  const callbacks = {

    onAddItemToBasket: useCallback(item => {
      store.addItemToBasket(item);
    }, [store]),

    onDeleteItemFromBasket: useCallback(code => {
      store.deleteItemFromBasket(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />

      <Headline totalQuantity={totalQuantity} totalPrice={totalPrice} setActiveModal={setActiveModal} />

      <List list={list}
        onAddItemToBasket={callbacks.onAddItemToBasket} />

      <Modal basket={basket}
        onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}
        totalPrice={totalPrice}
        activeModal={activeModal}
        setActiveModal={setActiveModal} />

    </PageLayout>
  );
}

export default App;
