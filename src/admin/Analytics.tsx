import React from 'react'
import ProductCount from './Analytics/ProductCount'
import ProductSalesPieChart from './Analytics/ProductSalse'
const Analytics = () => {
  return (
    <div className='flex-col '>
        <div className='flex justify-between'>
        <ProductSalesPieChart/>
         <ProductSalesPieChart/>
        </div>
        <div>
        <ProductCount/>
        </div>
    </div>
  )
}

export default Analytics