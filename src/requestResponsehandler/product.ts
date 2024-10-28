import axios from "axios";

export const getAllProduct = async (page:number) => {
  const response = await axios.get(`http://localhost:8080/api/v1/products?page=${page}&limit=${10}`, {
    headers: {
      'Content-Type': 'application/json' // Specify the Content-Type header
    }
  });
  return {
    Products:response.data.data.data,
    totalProducts:response.data.totalProducts
  } // Return the data directly
}
