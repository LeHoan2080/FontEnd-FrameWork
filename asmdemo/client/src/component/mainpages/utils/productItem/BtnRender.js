import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function BtnRender({product}) {
  const state = useContext(GlobalState)
  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart
  return (
    <div className='row_btn'>
        { isAdmin ?
        <>
            <Link id="btn_buy" to="#!">
        <button>
              Delete
        </button>
            </Link>
            <Link id="btn_view" to={`/delete_product/${product._id}`}>
        <button>
              Edit
        </button>
            </Link>
        </> : <>
            <Link id="btn_buy" to="/" onClick={() => addCart(product)}>
            <button>
              Buy
              </button>
            </Link>
        </>
        }
    </div>
  )
}

export default BtnRender