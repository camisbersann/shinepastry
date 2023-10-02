'use client'

import React from 'react'
import { useState } from 'react'
import styles from './page.module.css'

import pastryIngredients from '@/data/pastryIngredients'
import pastrys from '@/data/pastryFull'
import drinks from '@/data/drinks'

import PastryIngredients from '@/models/pastryIngredients'
import PastrysList from '@/models/pastrysList'
import PastryIngredient from '@/models/pastryIngredient'
import Pastry from '@/models/pastry'
import Drink from '@/models/drink'
import Drinks from '@/models/drinksList'
import { Header } from './components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons/faCircleArrowLeft';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { SendMessage } from './components/sendMessage/SendMessage'






const drinksList = new Drinks();
const pastrysList = new PastrysList();

drinks.forEach(drink => {
  drinksList.add(new Drink(drink.name, drink.price, drink.quantMl))
})

pastrys.forEach(pastry => {
  const newPastry = new Pastry(pastry.name);
  const pastryIngredientsList = new PastryIngredients();

  pastryIngredients.forEach(ingredient => {
    pastryIngredientsList.add(new PastryIngredient(ingredient.name, ingredient.price))
  })

  pastryIngredientsList.pastryIngredients.forEach(ingredient => {
    newPastry.addIngredient(ingredient)
    pastry.ingredients.forEach(oldIngredient => {
      if (ingredient.name == oldIngredient.name) {
        ingredient.increaseQuant()
      }
    })
  })
  newPastry.renderPrice()
  pastrysList.add(newPastry)
})

export default function Home() {
  const [pastry, setPastry] = useState('');
  const [drink, setDrink] = useState('');
  const [orderPastry, setOrderPastry] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [endedOrders, setEndedOrders] = useState([]);
  const [orderID, setOrderID] = useState(0);

  const [buttonMainVisible, setButtonMainVisible] = useState(styles.showing + ' ' + styles.buttonMain);
  const [makeOrderMainVisible, setMakeOrderMainVisible] = useState(styles.hidden + ' ' + styles.makeOrderMain);
  const [seeOrdersMainVisible, setSeeOrdersMainVisible] = useState(styles.hidden + ' ' + styles.seeOrdersMain);
  const [customOrderDivVisible, setCustomOrderDivVisible] = useState(styles.hidden + ' ' + styles.customOrderDiv);
  const [makingOrderDivVisible, setMakingOrderDivVisible] = useState(styles.hidden + ' ' + styles.makingOrderDiv);

  const [typeMessage, setTypeMessage] = useState('');
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(styles.hidden);

  function changeScreen1() {
    setButtonMainVisible(styles.hidden + ' ' + styles.buttonMain);
    setMakeOrderMainVisible(styles.showing + ' ' + styles.makeOrderMain);
    setMakingOrderDivVisible(styles.showing + ' ' + styles.makingOrderDiv);
  }

  function changeScreen2() {
    setButtonMainVisible(styles.hidden + ' ' + styles.buttonMain);
    setSeeOrdersMainVisible(styles.showing + ' ' + styles.seeOrdersMain);
  }

  function changePastry(event) {
    setPastry(event.target.value)
  }

  function changeDrink(event) {
    setDrink(event.target.value)
  }

  function addPastelToOrder() {
    if (pastry == '') {
      setMessage('Selecione um pastel')
      setTypeMessage('error')
      setMessageVisible(styles.showing)
      disapearMessage()
      return
    } else {
      const pastrysList2 = new PastrysList();
      pastrys.forEach(pastry => {
        const newPastry = new Pastry(pastry.name);
        const pastryIngredientsList = new PastryIngredients();
      
        pastryIngredients.forEach(ingredient => {
          pastryIngredientsList.add(new PastryIngredient(ingredient.name, ingredient.price))
        })
      
        pastryIngredientsList.pastryIngredients.forEach(ingredient => {
          newPastry.addIngredient(ingredient)
          pastry.ingredients.forEach(oldIngredient => {
            if (ingredient.name == oldIngredient.name) {
              ingredient.increaseQuant()
            }
          })
        })
        newPastry.renderPrice()
        pastrysList2.add(newPastry)
      })

      setOrderPastry([...orderPastry, pastrysList2.getPastry(pastry)])
      setOrderPrice(Number(orderPrice + pastrysList2.getPastry(pastry).price))
      setMessage('Pastel adicionado ao pedido')
      setTypeMessage('success')
      setMessageVisible(styles.showing)
      disapearMessage()
    }
  }

  function addDrinkToOrder() {
    if (drink == '') {
      setMessage('Selecione uma bebida')
      setTypeMessage('error')
      setMessageVisible(styles.showing)
      disapearMessage()
      return
    } else {
      setOrderPastry([...orderPastry, drinksList.getDrink(drink)])
      setOrderPrice(Number(orderPrice + drinksList.getDrink(drink).price))
      setMessage('Bebida adicionada ao pedido')
      setTypeMessage('success')
      setMessageVisible(styles.showing)
      disapearMessage()
    }
  }

  function customOrderScreen() {
    setMakingOrderDivVisible(styles.hidden + ' ' + styles.makingOrderDiv);
    setCustomOrderDivVisible(styles.showing + ' ' + styles.customOrderDiv);
  }

  function returnMakingOrder() {
    setCustomOrderDivVisible(styles.hidden + ' ' + styles.customOrderDiv);
    setMakingOrderDivVisible(styles.showing + ' ' + styles.makingOrderDiv);
  }

  function addquant(event) {
    orderPastry.forEach(pastry => {
      pastry.ingredients.forEach(ingredient => {
        if (ingredient.id == event.target.value) {
          ingredient.increaseQuant()
          setOrderPrice(Number(orderPrice + ingredient.price))
          pastry.renderPrice();
        }
      })

    })
  }

  function drecreasequant(event) {
    orderPastry.forEach(pastry => {
      pastry.ingredients.forEach(ingredient => {
        if (ingredient.id == event.target.value) {
          ingredient.decreaseQuant()
          setOrderPrice(Number(orderPrice - ingredient.price))
          pastry.renderPrice();
        }
      })

    })
  }

  function endOrder() {
    if (orderPastry.length == 0) {
      setMessage('Adicione um item ao pedido')
      setTypeMessage('error')
      setMessageVisible(styles.showing)
      disapearMessage()
      return
    } else {
      setOrderPastry([...orderPastry, orderID])
      addToEndedOrders()
      setMessage('Pedido finalizado')
      setTypeMessage('success')
      setMessageVisible(styles.showing)
      disapearMessage()
    }
  }

  function disapearMessage() {
    setTimeout(() => {
      setMessageVisible(styles.hidden)
    }, 4000)
  }

  function addToEndedOrders() {
    setEndedOrders([...endedOrders, orderPastry])
    setPastry('');
    setDrink('');
    setOrderPastry([]);
    setOrderPrice(0);
    setOrderID(orderID + 1);

    setButtonMainVisible(styles.showing + ' ' + styles.buttonMain);
    setMakeOrderMainVisible(styles.hidden + ' ' + styles.makeOrderMain);
    setCustomOrderDivVisible(styles.hidden + ' ' + styles.customOrderDiv);
    setMakingOrderDivVisible(styles.showing + ' ' + styles.makingOrderDiv);
  }

  function returnMainButton() {
    setButtonMainVisible(styles.showing + ' ' + styles.buttonMain);
    setSeeOrdersMainVisible(styles.hidden + ' ' + styles.seeOrdersMain);
    setMakeOrderMainVisible(styles.hidden + ' ' + styles.makeOrderMain);
    setCustomOrderDivVisible(styles.hidden + ' ' + styles.customOrderDiv);
    setPastry('');
    setDrink('');
    setOrderPastry([]);
    setOrderPrice(0);
  }

  function removeItem(event) {
    orderPastry.forEach((pastry, index) => {
      if (pastry.id == event.target.value) {
        setOrderPrice(Number(orderPrice - pastry.price))
        orderPastry.splice(index, 1)
      }
    })
    setOrderPastry([...orderPastry])
  }

  function deleteOrder(event) {
    endedOrders.forEach((order, index) => {
      if (order[order.length - 1] == event.target.value) {
        endedOrders.splice(index, 1)
      }
    })
    setEndedOrders([...endedOrders])
  }

  return (
    <>
      <Header></Header>
      {
        <div className={messageVisible}>
          <SendMessage type={typeMessage} message={message}></SendMessage>
        </div>
      }
      <main className={buttonMainVisible}>
        <section className={styles.doubleButton} onClick={changeScreen1}>
          <h1>Fazer pedidos</h1>
        </section>
        <section className={styles.doubleButton} onClick={changeScreen2}>
          <h1>Ver pedidos</h1>
        </section>
      </main>

      <main className={makeOrderMainVisible}>
        <button onClick={returnMainButton} className={styles.icon}><FontAwesomeIcon icon={faCircleArrowLeft} style={{ color: "#de9f17", }} /></button>
        <h1>Opções</h1>
        <div className={makingOrderDivVisible}>
          <div className={styles.options}>
            <select value={pastry} onChange={changePastry}>
              <option value=''>Selecione um pastel</option>
              {
                pastrysList.pastrys.map(pastry => {
                  return (
                    <option value={pastry.name} key={pastry.id}>{pastry.name} - R${pastry.price},00</option>
                  )
                })
              }
            </select>
            <select value={drink} onChange={changeDrink}>
              <option value=''>Selecione uma bebida</option>
              {
                drinksList.drinks.map(drink => {
                  return (
                    <option value={drink.id} key={drink.id + 'a'}>{drink.name} - R${drink.price},00</option>
                  )
                })
              }
            </select>
          </div>
          <div>
            {
              orderPrice > 0 ? <p>Preço total: R$ ${orderPrice},00</p> : <p>Preço total: R$ 0,00</p>
            }
            {
              orderPastry.length > 0 ? <p>Quantidade de itens: {orderPastry.length}</p> : <p>Quantidade de itens: 0</p>
            }
            <button onClick={addPastelToOrder} className={styles.order}>Adicionar pastel</button>
            <button onClick={addDrinkToOrder} className={styles.order}>Adicionar bebida</button>
            <button onClick={customOrderScreen} className={styles.order}>Customizar e finalizar compra</button>
          </div>
        </div>

        <div className={customOrderDivVisible}>

          <button className={styles.askov} onClick={returnMakingOrder} >
            Adicionar novo pedido
          </button>
          {
            orderPastry.map(pastry => {
              if (pastry.ingredients.length > 0) {
                return (
                  <div key={pastry.id} className={styles.pastelCard}>
                    <h1>{pastry.name}</h1>
                    <ul>
                      <details>
                        {
                          pastry.ingredients.map(ingredient => {
                            return (
                              <li key={ingredient.id} className={styles.fixeddistan}><div>{ingredient.name} - R${ingredient.price},00 - </div><div><button onClick={drecreasequant} value={ingredient.id} className={styles.removeButton}><FontAwesomeIcon icon={faMinus} style={{ color: "#590903", }} /></button><strong className={styles.ingredientquant}>{ingredient.quant}</strong><button onClick={addquant} value={ingredient.id} className={styles.addButton}><FontAwesomeIcon icon={faPlus} style={{ color: "#32a800", }} /></button></div></li>
                            )
                          })
                        }
                      </details>
                    </ul>
                    <h2>Preço: R${pastry.price},00</h2>
                    <button onClick={removeItem} value={pastry.id} className={styles.iconRemove}><FontAwesomeIcon icon={faTrash} style={{ color: "#fb0909", }} /></button>
                  </div>
                )
              } else {
                return (
                  <div key={pastry.id} className={styles.drinkCard}>
                    <h1>{pastry.name}</h1>
                    <h2>Preço: R${pastry.price},00</h2>
                    <button onClick={removeItem} value={pastry.id} className={styles.iconRemove}><FontAwesomeIcon icon={faTrash} style={{ color: "#fb0909", }} /></button>
                  </div>
                )
              }
            })
          }
          <button onClick={endOrder} className={styles.finishOrder}>Finalizar pedido</button>
        </div>
      </main>

      <main className={seeOrdersMainVisible}>
      <button onClick={returnMainButton} className={styles.icon}><FontAwesomeIcon icon={faCircleArrowLeft} style={{ color: "#de9f17", }} /></button>

        {
          endedOrders.map(order => {
            return (
              <div key={order[order.length - 1]} className={styles.orderCard}>
                <h1>Pedido</h1>
                {
                  order.map(pastry => {
                    if (pastry.ingredients.length > 0) {
                      return (
                        <div key={pastry.id} className={styles.orderItem}>
                          <div className={styles.pastryThings}>
                          <h1>{pastry.name}</h1>
                          <h2>Preço: R${pastry.price},00</h2>
                          </div>
                          <div>
                          <details className={styles.detalhes}>
                            <ul>
                              {
                                pastry.ingredients.map(ingredient => {
                                  if (ingredient.quant > 0) {
                                    return (
                                      <li key={ingredient.id}>{ingredient.name} - R${ingredient.price},00 - {ingredient.quant}</li>
                                    )
                                  }

                                })
                              }
                            </ul>
                          </details>
                          </div>
                          <div>
                              
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div key={pastry.id} className={styles.orderItem}>
                          <h1>{pastry.name}</h1>
                          <h2>Preço: R${pastry.price},00</h2>
                        </div>
                      )
                    }
                  })
                }
                <div>
                <button value={order[order.length - 1]} onClick={deleteOrder} className={styles.deleteButton}>Cancelar Pedido</button>
                <button className={styles.payButton} onClick={deleteOrder} value={order[order.length - 1]}>Finalizar Pedido</button>
                </div>
              </div>
            )
          })
        }
      </main>

    </>
  )
}
