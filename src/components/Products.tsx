import { useQuery } from "react-query"
 import {getAllProduct} from "../requestResponsehandler/product"
import { Product } from "../productTypes/productType";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useProductContext } from "../context/productContext";
import ProductDetail from "./ProductDetail";
import { useState } from "react";

const Products = () => {

const { setProductData,productData,isOpen,setIsOpen } = useProductContext();  
const [selectedProductID,setSelectedProductID]=useState(0)
const [page,setPage]=useState(1)




//handler function
const handleProductClick=(id:number)=>{
  setSelectedProductID(id)
  setIsOpen(true)

}



//queary function
const { data, isLoading,isError,status } = useQuery({
  queryKey: ['products'],
  queryFn: getAllProduct,  // No need for parentheses here; it's a function reference
  onSuccess: (data) => {
    setProductData(data);  // Update the product data when the query succeeds
  }
});
console.log(productData)

  if (isLoading) return <div><Skeleton count={10} /></div>;
  if (isError) return <div>Error occurred while fetching products.</div>;

  return (
    <>
    <div  className={`max-w-[1200px] mx-auto cursor-pointer ${isOpen?'blur-sm':""}`}>

      {status === 'success' && productData && (
        <div className="grid  grid-cols-5">
       {productData?.map((product: Product) => (
            <div  key={product._id } className="mb-2" onClick={()=>handleProductClick(product._id)}>
              
                <div className="w-[200px] h-[150px] border rounded-md ">
             <img className="rounded-md h-full" src={product.images[0]} alt={product.model} />
                 </div>
                <p className="text-sm font-Roboto text-custom-black  font-bold">
                  Brand
                    <span className="text-custom-gray font-medium">:{product.brand}</span>
                    </p>
              <p className="text-sm font-Roboto  text-custom-black font-bold">
                Model
                    <span className="text-custom-gray font-medium">:{product.model}</span>
                    </p>
                    <p className="text-sm font-Roboto  text-custom-black font-bold max-w-56">
                      Description
                    <span className="text-custom-gray font-medium">:{product.description}</span>
                    </p>
                    <p className="text-sm font-Roboto mt-1  text-custom-black font-bold max-w-60">
                      Price
                    <span className="text-custom-black font-bold">:${product.price}</span>
                    </p>
      

            </div>
          ))}
        </div>
      
      )}
      <div className="flex justify-center mt-">
        <div>Paginatio</div>
      </div>
    </div>
    { isOpen&&  <ProductDetail id={selectedProductID}/>}
    </>
  );
};
export default Products