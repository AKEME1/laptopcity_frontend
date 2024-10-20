import { useState } from "react";
import { FormDataType } from "../productTypes/productType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/productContext";

const Signup: React.FC = () => {
const {userData,setUserData}=useProductContext()
// const [user,setUser]=useState()
const navigate=useNavigate()

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null,
  });

  console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    // If it's a file input, update profilePhoto with the selected file
    if (name === 'profilePhoto' && files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Set the first file selected
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();

    // Append each field to the FormData object
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    if (formData.profilePhoto) {
      data.append('profilePhoto', formData.profilePhoto); // Append file if it exists
    }

    try{
 const userResponse = await axios.post('http://localhost:8080/api/v1/users/signin', data,{
     headers: {
    'Content-Type': 'multipart/form-data', // Make sure the correct content type is sent
  },
  });
  console.log(`we are here`)
console.log(userResponse.data.token)
console.log(userResponse.data.userData.user)
if(userResponse.data.userData){
const token=userResponse.data.token
localStorage.clear()
localStorage.setItem('jwt', token);

setUserData(userResponse.data.userData.user)  
console.log("user data:",userData)
 navigate('/')

}
 }catch(error){
  console.log(error)
}
 
 };

  return (
    <section className="bg-gradient-to-r from-[#44AA99] to-[#A3C1DA] p-4 min-h-screen">
      <>
      <div className="flex justify-center w-full  ">
        <div className="w-[360px] p-4 shadow-card flex-col bg-white">
          <div className="mb-3">
            <h2 className="text-[27px] font-bold font-space-grotesk text-center">Signup</h2>
          </div>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="w-full mb-2">
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="name">
                Name
              </label>
              <input
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                className="w-[296px] h-[32px] border border-gray-300 rounded-lg px-[5px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            {/* Email Input */}
            <div className="w-full mb-2">
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                className="w-[296px] h-[32px] border border-gray-300 rounded-lg px-[5px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            {/* Password Input */}
            <div className="w-full mb-2">
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                className="w-[296px] h-[32px] border border-gray-300 rounded-lg px-[5px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="w-full mb-2">
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword" // Ensure this matches the state
                value={formData.confirmPassword}
                onChange={handleChange}
                id="confirm-password"
                className="w-[296px] h-[32px] border border-gray-300 rounded-lg px-[5px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
              />
            </div>

            {/* File Input (Photo Upload) */}
            <div className="w-full mb-2">
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="file">
                Photo
              </label>
              <input
                type="file"
                name="profilePhoto" // Keep this line only
                id="file"
                onChange={handleChange}
                className="w-[296px] h-7 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="flex items-center cursor-pointer justify-center w-full py-1 mt-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="mr-2">Sign Up</span>
            </button>
          </form>
        </div>
      </div>
      </>
    </section>
  );
};

export default Signup;