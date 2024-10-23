import axios from "axios";
import { ProductCountData } from "../productTypes/productType";
import { SalesData } from "../productTypes/productType";


export const ProductCountByBrand = async (): Promise<ProductCountData[]> => {
    const token=localStorage.getItem('jwt')
   
  try {
    const response = await axios.get("http://localhost:8080/api/v1/products/stockCount", {
      headers: {
        'Content-Type': 'application/json', // Specify the Content-Type header
        'Authorization':`Bearer ${token}`
      }
    });
    return response.data.stockCount // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error; // You can handle the error as needed
  }
}
export const productSalse = async (): Promise<SalesData> => {
    const token=localStorage.getItem('jwt')
   
  try {
    const response = await axios.get("http://localhost:8080/api/v1/bookings/salse", {
      headers: {
        'Content-Type': 'application/json', // Specify the Content-Type header
        'Authorization':`Bearer ${token}`
      }
    });
    return response.data.salesData // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error; // You can handle the error as needed
  }
} 