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

  const [buttonMainVisible, setButtonMainVisible] = useState(styles.showing + ' ' + styles.buttonMain);
  const [makeOrderMainVisible, setMakeOrderMainVisible] = useState(styles.hidden + ' ' + styles.makeOrderMain);
  const [seeOrdersMainVisible, setSeeOrdersMainVisible] = useState(styles.hidden + ' ' + styles.seeOrdersMain);
  const [customOrderDivVisible, setCustomOrderDivVisible] = useState(styles.hidden + ' ' + styles.customOrderDiv);
  const [makingOrderDivVisible, setMakingOrderDivVisible] = useState(styles.hidden + ' ' + styles.makingOrderDiv);

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
      alert('selecione um pastel')
      return
    } else {
      setOrderPastry([...orderPastry, pastrysList.getPastry(pastry)])
      setOrderPrice(Number(orderPrice + pastrysList.getPastry(pastry).price))
    }
  }

  function addDrinkToOrder() {
    if (drink == '') {
      alert('selecione uma bebida')
      return
    } else {
      setOrderPastry([...orderPastry, drinksList.getDrink(drink)])
      setOrderPrice(Number(orderPrice + drinksList.getDrink(drink).price))
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
        }
      })
      pastry.renderPrice()
    })
  }

  function drecreasequant(event) {
    orderPastry.forEach(pastry => {
      pastry.ingredients.forEach(ingredient => {
        if (ingredient.id == event.target.value) {
          ingredient.decreaseQuant()
          setOrderPrice(Number(orderPrice - ingredient.price))
        }
      })
      pastry.renderPrice()
    })
  }

  function endOrder() {
    setEndedOrders([...endedOrders, orderPastry])
    setPastry('');
    setDrink('');
    setOrderPastry([]);
    setOrderPrice(0);

    setButtonMainVisible(styles.showing + ' ' + styles.buttonMain);
    setMakeOrderMainVisible(styles.hidden + ' ' + styles.makeOrderMain);
  }

  function returnMainButton() {
    setButtonMainVisible(styles.showing + ' ' + styles.buttonMain);
    setSeeOrdersMainVisible(styles.hidden + ' ' + styles.seeOrdersMain);
    setMakeOrderMainVisible(styles.hidden + ' ' + styles.makeOrderMain);
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

  return (
    <>
      <main className={buttonMainVisible}>
        <section className={styles.doubleButton} onClick={changeScreen1}>
          <h1>tela de fazer pedidos</h1>
        </section>
        <section className={styles.doubleButton} onClick={changeScreen2}>
          <h1>tela de ver pedidos</h1>
        </section>
      </main>

      <main className={makeOrderMainVisible}>
        <button onClick={returnMainButton}>retornar para principal</button>
        <h1>teste2</h1>
        <div className={makingOrderDivVisible}>
          <div>
            <select value={pastry} onChange={changePastry}>
              <option value=''>selecione um pastel</option>
              {
                pastrysList.pastrys.map(pastry => {
                  return (
                    <option value={pastry.name} key={pastry.id}>{pastry.name} - R${pastry.price},00</option>
                  )
                })
              }
            </select>
            <select value={drink} onChange={changeDrink}>
              <option value=''>selecione uma bebida</option>
              {
                drinksList.drinks.map(drink => {
                  return (
                    <option value={drink.id} key={drink.id+'a'}>{drink.name} - R${drink.price},00</option>
                  )
                })
              }
            </select>
          </div>
          <div>
            {
              orderPrice > 0 ? `preço total: R$ ${orderPrice},00` : 'preço total: R$ 0,00'
            }
            {
              orderPastry.length > 0 ? `quantidade de itens: ${orderPastry.length}` : 'quantidade de itens: 0'
            }
            <button onClick={addPastelToOrder}>adicionar pastel</button>
            <button onClick={addDrinkToOrder}>adicionar bebida</button>
            <button onClick={customOrderScreen}>customizar e finalizar compra</button>
          </div>
        </div>

        <div className={customOrderDivVisible}>
          <button onClick={returnMakingOrder}>
            voltar para fazer pedidos
          </button>
          {
            orderPastry.map(pastry => {
              if(pastry.ingredients.length > 0) {
                return (
                  <div key={pastry.id} className={styles.pastelCard}>
                    <h1>{pastry.name}</h1>
                    <ul>
                      {
                        pastry.ingredients.map(ingredient => {
                            return (
                              <li key={ingredient.id}>{ingredient.name} - R${ingredient.price},00 - <button onClick={drecreasequant} value={ingredient.id}>-</button>{ingredient.quant}<button onClick={addquant} value={ingredient.id}>+</button></li>
                            )
                        })
                      }
                    </ul>
                    <h2>preço: R${pastry.price},00</h2>
                    <button onClick={removeItem} value={pastry.id}>Remover Item</button>
                  </div>
                )
              } else {
                return (
                  <div key={pastry.id} className={styles.drinkCard}>
                    <h1>{pastry.name}</h1>
                    <h2>preço: R${pastry.price},00</h2>
                    <button onClick={removeItem} value={pastry.id}>Remover Item</button>
                  </div>
                )
              }
            })
          }
          <button onClick={endOrder}>Finalizar compra</button>
        </div>
      </main>

      <main className={seeOrdersMainVisible}>
        <button onClick={returnMainButton}>retornar para principal</button>
        {
          endedOrders.map(order => {
            return (
              <div key={order.id} className={styles.orderCard}>
                <h1>pedido</h1>
                {
                  order.map(pastry => {
                    if(pastry.ingredients.length > 0) {
                      return (
                        <div key={pastry.id} className={styles.orderItem}>
                          <h1>{pastry.name}</h1>
                          <h2>preço: R${pastry.price},00</h2>
                        </div>
                      )
                    } else {
                      return (
                        <div key={pastry.id} className={styles.orderItem}>
                          <h1>{pastry.name}</h1>
                          <h2>preço: R${pastry.price},00</h2>
                        </div>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }
      </main>
    </>
  )
}
