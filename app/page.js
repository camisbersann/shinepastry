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


const pastrysList = new PastrysList();

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
  const [pastryIngredients, setPastryIngredients] = useState(pastry.ingredients);
  
  const [buttonMainVisible, setButtonMainVisible] = useState(styles.showing + ' ' + styles.buttonMain);
  const [makeOrderMainVisible, setMakeOrderMainVisible] = useState(styles.hidden + ' ' + styles.makeOrdermain);
  const [seeOrdersMainVisible, setSeeOrdersMainVisible] = useState(styles.hidden + ' ' + styles.seeOrdersMain);

  function changeScreen1() {
    setButtonMainVisible(styles.hidden + ' ' + styles.buttonMain);
    setMakeOrderMainVisible(styles.showing + ' ' + styles.makeOrdermain);
  }

  function changeScreen2() {
    setButtonMainVisible(styles.hidden + ' ' + styles.buttonMain);
    setSeeOrdersMainVisible(styles.showing + ' ' + styles.seeOrdersMain);
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
        <h1>teste2</h1>
      </main>
      <main className={seeOrdersMainVisible}>
        <h1>teste3</h1>
      </main>
    </>
  )
}
