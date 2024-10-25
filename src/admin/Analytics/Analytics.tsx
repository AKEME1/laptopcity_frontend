
import ProductCount from './ProductCount'
import ProductSalesPieChart from './ProductSalse'
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