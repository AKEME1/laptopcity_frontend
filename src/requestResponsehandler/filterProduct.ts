import axios from "axios";
import { CreatingProduct } from "../productTypes/productType";
 


export const createProduct = async (formData: FormData) => {
  const token=localStorage.getItem('jwt')
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
         'Authorization':`Bearer ${token}`
      },
    });
    return response.data.createdProd.product; // Return the actual data from the response
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // You can handle the error as needed
  }
};





export const filterByBrand = async (brand: string) => {
   
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/products?brand=${brand}`, {
      headers: {
        'Content-Type': 'application/json' // Specify the Content-Type header
      }
    });
    return response.data.data.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error; // You can handle the error as needed
  }
}

export const filterByModel = async (model: string) => {
   
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/products?model=${model}`, {
      headers: {
        'Content-Type': 'application/json' // Specify the Content-Type header
      }
    });
    return response.data.data.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error; // You can handle the error as needed
  }
}

export const filterById = async (id:number) => {
   
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`, {
      headers: {
        'Content-Type': 'application/json' // Specify the Content-Type header
      }
    });
    return response.data.data.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error; // You can handle the error as needed
  }
}