
import Navbar from './Navbar'
import Hero from './Hero'
import Products from './Products'
import FilterByName from './FilterByName'
import { useProductContext, } from '../context/productContext'
const Home = () => {
  const {isOpen,setIsOpen}=useProductContext()
const handleClose=()=>{
  isOpen?setIsOpen(false):""
}

  return (
    <div onClick={()=>handleClose()}  className={`${isOpen?'cursor-pointer':""}`}>
      <Navbar/>
      <Hero/>
      <FilterByName/>
      <Products/>
     
    </div>
  )
}

export default Home