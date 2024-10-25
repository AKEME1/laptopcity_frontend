import { UserAdminType } from "../productTypes/productType";
import axios from "axios";

// Fetch all users
export const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:8080/api/v1/users?fields=name,email,photo,id,active,role&sort=name");
  return data.data.data;
};

// Create a new user
export const createUser = async (user: UserAdminType) => {
  const { data } = await axios.post('http://localhost:8080/api/v1/users', user);
  return data;
};



// Update an existing user
export const updateUser = async (user: UserAdminType, _id: number) => {
  const { data } = await axios.patch(`http://localhost:8080/api/v1/users/${_id}`, user); // Correct URL
  return data;
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
  await axios.delete(`http://localhost:8080/api/v1/users/${id}`); // Correct URL
};