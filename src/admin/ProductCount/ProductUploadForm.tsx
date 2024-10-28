import { brandData } from "../../Data/dataFilter"; // Assuming you only need brandData
import axios from "axios";
import { useMutation } from "react-query";
import { osData } from "../../Data/dataFilter"; // Importing OS data if needed in the future
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from "react";
import { specificationDatas } from "../../Data/dataFilter";
import { CreatingProduct } from "../../productTypes/productType";
import { createProduct } from "../../requestResponsehandler/filterProduct";


const ProductUploadForm = () => {
  const [formData, setFormData] = useState<CreatingProduct>({
    brand: '',
    images: [],
    model: '',
    price: 0,
    description: '',
    link: '',
    specifications: {
      batteryLife: '',
      display: '',
      gpu: '',
      os: '',
      ports: [], 
      processor: '',
      ram: '',
      storage: '',
      warranty: '',
      weight: 0,
    },
    stock: 0,
  });

  console.log(formData);
  

const { mutate, isLoading,isSuccess } = useMutation(createProduct, {
  onSuccess: (createdProduct) => {
    console.log('Product created:', createdProduct);
    // Optionally, reset form data or redirect after success
  },
  onError: (error) => {
    console.error('Error creating product:', error);
    // Optionally, show an error message
  },
});



  const handleOnChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handle file uploads for the images field
      setFormData((prevState) => ({
        ...prevState,
        [name]: Array.from(files), // Convert FileList to Array
      }));
    } else if (name === "ports") {
      // Handle ports as a comma-separated list and split it into an array
      setFormData((prevState) => ({
        ...prevState,
        specifications: {
          ...prevState.specifications,
          ports: value.split(",") // Split and trim whitespace
        },
      }));
    } else if (specificationDatas.includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        specifications: {
          ...prevState.specifications,
          [name]: value,
        },
      }));
    } else { 
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();

    // Append form fields to FormData
    data.append("brand", formData.brand);
    data.append("model", formData.model);
    data.append("price", formData.price.toString());
    data.append("description", formData.description);
    data.append("link", formData.link);
    data.append("stock", formData.stock.toString());
    data.append("specifications[processor]", formData.specifications.processor);
    data.append("specifications[ram]", formData.specifications.ram);
    data.append("specifications[storage]", formData.specifications.storage);
    data.append("specifications[gpu]", formData.specifications.gpu);
    data.append("specifications[batteryLife]", formData.specifications.batteryLife);
    data.append("specifications[display]", formData.specifications.display);
    data.append("specifications[ports]", formData.specifications.ports.join(",")); // Ports array as a comma-separated string
    data.append("specifications[warranty]", formData.specifications.warranty);
    
    // Append images to FormData
    formData.images.forEach((image) => {
      data.append('images', image); // Append each image to the FormData
    });

mutate(data)
  };

  
///////////////////////////Component//////////////////////////////////////////////////////


  if (isLoading) return <div><Skeleton count={30} /></div>;
  
  return (
    <form onSubmit={handleForm}>
      <div className='mb-2'>
        <h1 className='text-[27px] font-space-grotesk font-bold text-center'>
          Upload New Product
        </h1>
      </div>

      {/* Main container */}
      <div className='flex flex-col items-center '>
        {/* Subcontainer */}
        <div className='border w-[900px] p-4 shadow-boxShadow h-auto shadow-card'>
          <div className='flex justify-between mb-1'>
            {/* Brand */}
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block">
                Brand
              </label>
              <select
                name="brand"
                value={formData.brand} // This binds the selected value to your form state
                onChange={handleOnChange}
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              >
                <option className="p-2 font-Roboto" value="">Select Brand</option>
                {brandData.map((brand) => (
                  <option className="p-2 font-Roboto" key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="model">
                Model
              </label>
              <input
                placeholder="Model"
                type="text"
                name="model"
                value={formData.model}
                onChange={handleOnChange}
                id="model"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
            
            {/* Price */}
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="price">
                Price
              </label>
              <input
                placeholder="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleOnChange}
                id="price"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
          </div>

          <div className='flex justify-between mb-1'>
            {/* Link */}
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="link">
                Link
              </label>
              <input
                placeholder="Link"
                type="text"
                name="link"
                value={formData.link}
                onChange={handleOnChange}
                id="link"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="stock">
                Stock
              </label>
              <input
                placeholder="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleOnChange}
                id="stock"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            {/* Warranty */}
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="warranty">
                Warranty
              </label>
              <input
                placeholder="Warranty"
                type="number"
                name="warranty"
                value={formData.specifications.warranty}
                onChange={handleOnChange}
                id="warranty"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
          </div>

          <div>
            <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              id="description"
              className="w-full h-[32px] border rounded-lg border-gray-300 px-[5px] p-4 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
            />
          </div>

          <div className="border border-t-custom-gray mt-1" />
          <div className="mt-2 mb-1 ">
            <h2 className="font-medium font-space-grotesk text-lg">Specifications</h2>
          </div>
          <div className="flex justify-between mb-1">
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="processor">
                Processor
              </label>
              <input
                placeholder="Processor"
                type="text"
                name="processor"
                value={formData.specifications.processor}
                onChange={handleOnChange}
                id="processor"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
 <div> 
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="ram">
                RAM
              </label>
              <input
                placeholder="RAM"
                type="text"
                name="ram"
                value={formData.specifications.ram}
                onChange={handleOnChange}
                id="ram"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
            <div> 
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="storage">
                Storage
              </label>
              <input
                placeholder="Storage"
                type="text"
                name="storage"
                value={formData.specifications.storage}
                onChange={handleOnChange}
                id="storage"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
          </div>

          <div className='flex justify-between mb-1'>
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="GPU">
                GPU
              </label>
              <input
                placeholder="GPU"
                type="text"
                name="gpu"
                value={formData.specifications.gpu}
                onChange={handleOnChange}
                id="GPU"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="batteryLife">
                Battery Life
              </label>
              <input
                placeholder="Battery Life"
                type="text"
                name="batteryLife"
                value={formData.specifications.batteryLife}
                onChange={handleOnChange}
                id="batteryLife"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="display">
                Display
              </label>
              <input
                placeholder="Display"
                type="text"
                name="display"
                value={formData.specifications.display}
                onChange={handleOnChange}
                id="display"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
          </div>

          <div className='flex justify-between mb-1'>
            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="ports">
                Ports
              </label>
              <input
                placeholder="Enter ports separated by commas"
                type="text"
                name="ports" // This field captures ports as a string, then splits it into an array
                value={formData.specifications.ports} // Join to display as a string in the input
                onChange={handleOnChange}
                id="ports"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="OS">
                OS 
              </label>
              <select
                name="os"
                value={formData.specifications.os}
                onChange={handleOnChange}
                id="OS"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              >
                <option className="p-2 font-Roboto" value="">Select OS</option>
                {osData.map((os) => (
                  <option className="p-2 font-Roboto" key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="weight">
                Weight
              </label>
              <input
                placeholder="Weight"
                type="text"
                name="weight"
                value={formData.specifications.weight}
                onChange={handleOnChange}
                id="weight"
                className="w-[250px] h-[32px] border rounded-lg border-gray-300 px-[5px] py-2 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="images">
              Images
            </label>
            <input
              type="file"
              name="images" // This field will handle multiple file uploads
              multiple
              onChange={handleOnChange}
              id="images"
              className="w-full h-[32px] border rounded-lg border-gray-300 px-[5px] py-4 focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-3">
             <button
              type="submit"
              className="flex items-center cursor-pointer justify-center w-full py-1 mt-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="mr-2">Create</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductUploadForm;
