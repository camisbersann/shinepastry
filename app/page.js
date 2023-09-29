'use client'

import React from 'react'
import { useState } from 'react'
import pastrys from '@/data/pastryFull'
import Pastry from '@/models/pastry'
import PastrysList from '@/models/pastrysList'
import styles from './page.module.css'
import drinks from '@/data/drinks'

const pastryMakedList = new PastrysList()
const pastrysOrders = new PastrysList()

pastrys.map(pastry => {
  const pastryMaked = new Pastry(pastry.name, pastry.ingredients)
  pastryMakedList.add(pastryMaked)
})

export default function Home() {

  const [screenButtonStyle, setScreenButtonStyle] = useState(styles.showing)

  const [makePastryOrderStyle, setmakePastryOrderStyle] = useState(styles.hidden)

  const [pastrysOrdersStyle, setpastrysOrdersStyle] = useState(styles.hidden)

  const changeScreenButtonToMakePastryOrder = () => {
    setScreenButtonStyle(styles.hidden)
    setmakePastryOrderStyle(styles.showing)
  }

  const changeScreenButtonToPastrysOrders = () => {
    setScreenButtonStyle(styles.hidden)
    setpastrysOrdersStyle(styles.showing)
  }
  
  return (
    <>
      <main className={screenButtonStyle}>
        <section className={styles.doubleSection} onClick={changeScreenButtonToMakePastryOrder}>
          <h1>Faça um pedido</h1>
        </section>
        <section className={styles.doubleSection} onClick={changeScreenButtonToPastrysOrders}>
          <h1>Veja os pedidos ativos</h1>
        </section>
      </main>
      <main className={makePastryOrderStyle}>
      </main>
      <main className={pastrysOrdersStyle}>
        {

        }
      </main>
    </>
  )
}
