import React, { useContext, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'

import { GlobalState } from '../../GlobalState'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  return (
    <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/detail/:id" element={<DetailProduct/>} />
        <Route path="/login" element={isLogged?<NotFound/>:<Login/>} />
        <Route path="/register" element={isLogged?<NotFound/>:<Register/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path='/history' element={<OrderHistory/>}/>
        <Route path='/history/:id' element={<OrderDetails/>}/>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default Pages