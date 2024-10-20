import { useState } from "react";
import { useQuery } from "react-query";
import { filterByModel } from "../requestResponsehandler/filterProduct";
import { useProductContext } from "../context/productContext";
const Hero = () => {
  const [model,setModel]=useState('') 
  const { setProductData,productData,isOpen } = useProductContext(); 



   const { data } = useQuery({
    queryKey: ['filterBymodel',model],
    queryFn: ()=>filterByModel(model),
     enabled: !!model,
     onSuccess: (data) => {
    setProductData(data);  // Update the product data when the query succeeds
  }
   
  });
  
  return (
    <div className={`bg-gradient-to-r from-custom-green to-custom-blue border-t border-black w-full ${isOpen?'blur-sm':""}`}>
      <div className="max-w-[1200px] mx-auto h-[200px] flex justify-center items-center">
        <div className="w-full max-w-lg">
          <input 
          onChange={(e)=>setModel(e.target.value)}
            placeholder="Search By Name" 
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-base" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
