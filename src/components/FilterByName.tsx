import { filter } from "../Data/dataFilter";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { filterByBrand } from "../requestResponsehandler/filterProduct";
import { useProductContext } from "../context/productContext";

const FilterByName = () => {
  
const [brand,setBrand] = useState('');
const { setProductData,isOpen}=useProductContext()

const { data } = useQuery({
    queryKey: ['filterByBrand', brand],
    queryFn: () => filterByBrand(brand),
     enabled: !!brand,
    onSuccess: (data) => {
      setProductData(data);  // Update the product data when the query succeeds
    }
  });
  
return (
  <section className="text-unde">
    <div className={`max-w-[400px] flex cursor-pointer ml-4 ${isOpen?'blur-sm':""}`}>
      {filter.map((item) => (
        <div onClick={() =>setBrand(item.name) } className="flex flex-col justify-center items-center ml-6 mt-4 mb-2" key={item.name}>
          <img className="size-3" src={item.image} alt={item.name} />
          <p className="font-space-grotesk text-xs font-bold">{item.name}</p>
        </div>
      ))}
    </div>
    </section>
  );
};

export default FilterByName;