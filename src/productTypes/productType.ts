interface Specification {
  batteryLife: string; 
  display: string; 
  gpu: string; 
  os: string; 
  ports: string[];
  processor: string; 
  ram: string; 
  storage: string; 
  warranty: string; 
  weight: number; 
}

export interface Product {
  brand: string; 
  createdAt: Date; 
  images: string[]; 
  model: string; 
  price: number; 
  description: string;
  specifications: Specification; 
  stock: number; 
  _id: number; 
}

interface Specification {
  batteryLife: string; 
  display: string; 
  gpu: string; 
  os: string; 
  ports: string[];
  processor: string; 
  ram: string; 
  storage: string; 
  warranty: string; 
  weight: number; 
}

export interface CreatingProduct {
  brand: string; 
  link:string;
  images: string[]; 
  model: string; 
  price: number; 
  description: string;
  specifications: Specification; 
  stock: number; 
  
}

export type Specifications = {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  batteryLife: string;
  weight: string;
  os: string;
  ports: string[];
  warranty: string;
};


export interface FormDataType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePhoto: File | null; // Can be a File object or null
}

export interface UserType {
  _id: string;          // MongoDB-generated ID
  name: string;         // Name of the user
  email: string;        // Email of the user
  role: 'user' | 'admin'; // Role can be either 'user' or 'admin' (if there's only these two roles)
  photo: string;        // URL of the user's profile photo
  active: boolean;      // Whether the user is active
}


export interface  LoginDataType{
   email: string;
  password: string;
}


export interface createProduct {
  brand: string;
  model: string;
  price: number;
  link: string;
  stock: number;
  warranty: number;
  description: string;
  processor: string;
  RAM: string;
  storage: string;
  GPU: string;
  batteryLife: string;
  display: string;
  ports: string[]; // Change from string to string[]
  OS: string;
  weight: string;
  images: string[]; // Handle multiple image uploads
}

export interface ProductModel {
  model: string;
  stock: number;
}

export interface ProductCountData {
  brand: string;
  models: ProductModel[];
}

export type SalesData = {
  _id: {
    brand: string;
    model: string;
  };
  totalBookings: number;
}[];


export interface UserAdminType {
  _id: number; 
  active:boolean
  name: string;         // Name of the user
  email: string;        // Email of the user
  role: 'user' | 'admin'; // Role can be either 'user' or 'admin' (if there's only these two roles)
  photo: string;        // URL of the user's profile photo
     // Whether the user is active
}