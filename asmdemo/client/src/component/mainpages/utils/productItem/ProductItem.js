import React from 'react'
import {Link} from 'react-router-dom'
import BtnRender from './BtnRender'

function ProductItem({product, isAdmin}) {
  return (
    <div className='product_card'>

        {
            isAdmin && <input type="checkbox" checked={product.checked}/>
        }
        <Link to={`/detail/${product._id}`}>
        <img src={product.images.url} alt="" />
        </Link>

        <div className='product_box'>
            <h3 title={product.title}>{product.title}</h3>
            <span>giá: {product.price}đ</span>
        </div>
        
        
        <BtnRender product={product}/>
    </div>
  )
}

export default ProductItem