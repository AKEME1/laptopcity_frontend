import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../productTypes/productType'; // Adjust the path as necessary
import { UserType } from '../productTypes/productType';

// Define the context type
interface ProductCtxType {
  productData: Product[]; // Array of products
  setProductData: React.Dispatch<React.SetStateAction<Product[]>>; // Function to update product data
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserType; // Object for user data, initialized with default values
  setUserData: React.Dispatch<React.SetStateAction<UserType>>; // Function to update user data
}

// Create the context
const ProductContext = createContext<ProductCtxType | undefined>(undefined);

// Create a provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize userData with default values
  const initialUserData: UserType = {
    name: '',
    email: '',
    role: 'user', // default role
    photo: '',
    active: false,
    _id: '',
  };

  const [productData, setProductData] = useState<Product[]>([]); // Initialize with an empty array
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType>(initialUserData); // Initialize userData with default values

  return (
    <ProductContext.Provider value={{ productData, setProductData, isOpen, setIsOpen, userData, setUserData }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProductContext = (): ProductCtxType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
