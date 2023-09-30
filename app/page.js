'use client'

import React from 'react'
import { useState } from 'react'

import pastryIngredients from '@/data/pastryIngredients'
import pastrys from '@/data/pastryFull'
import drinks from '@/data/drinks'

import PastryIngredients from '@/models/pastryIngredients'
import PastrysList from '@/models/pastrysList'
import PastryIngredient from '@/models/pastryIngredient'
import Pastry from '@/models/pastry'
import { Header } from './components/header/Header'

const pastryIngredientsList = new PastryIngredients();
const pastrysList = new PastrysList();

pastryIngredients.forEach(ingredient => {
  pastryIngredientsList.add(new PastryIngredient(ingredient.name, ingredient.price))
})

pastrys.forEach(pastry => {
  const newPastry = new Pastry(pastry.name);
  pastryIngredientsList.pastryIngredients.forEach(ingredient => {
    newPastry.addIngredient(ingredient)
  })
})

export default function Home() {

  console.log(pastrysList)

  return (
    <Header></Header>
    
  )
}
