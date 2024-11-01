import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { filterById } from '../requestResponsehandler/filterProduct';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { useProductContext } from '../context/productContext';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Spin } from "antd";



import { notification } from 'antd';



const ProductDetail: React.FC<{ id: number }> = ({ id }) => {

const [isDesable,setIsDesable]=useState(false)
const { setIsOpen,isOpen } = useProductContext();
const navigate=useNavigate()
const token = localStorage.getItem('jwt');

  const handleCheckOut = async (productId: number) => {
  
    try {
      setIsDesable(true)
      const response = await axios.get(
        `http://localhost:8080/api/v1/bookings/checkout-session/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
     
      const URL = response.data.session.url;
      URL
        ? (window.location.href = URL)
        : console.error('Redirect URL not found in response:', response.data);
        setIsDesable(false)
    } catch (error:any) {
if(error.response.data.message==="jwt malformed"){

   notification.info({
    message: 'Sign Up Required',
    description: 'Before you can make a purchase, please sign up first.',
    placement: 'topRight',
    duration: 10, // Duration in seconds
  });
  setIsOpen(false)
navigate('/Signup')
}else{
   notification.error({
    message: 'Network Error',
    description: 'There was a problem connecting to the network. Please check your internet connection and try again.',
    duration: 5, // Notification will disappear after 5 seconds
        });
}
      
    }
  };

  const { data, isLoading, status, isError } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => filterById(id),
    enabled: !!id,
  });

  if (isLoading) return <div><Skeleton /></div>;
  if (isError) return <div>Error occurred while fetching product details.</div>;

  return (
   

   
    <div  className="fixed top-0 right-0 h-screen w-[900px] bg-white shadow-lg rounded-lg p-4 transition-transform duration-500 ease-in-out transform overflow-x-auto">
      {/* Close Icon */}
      <CloseOutlined
        onClick={() => setIsOpen(false)}
        className="absolute top-4 left-4 text-lg text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200 ease-in-out"
      />

      {status === 'success' && data && (
        < >
          <h1 className="text-[27px] font-space-grotesk text-center font-bold mb-3">
         {data.brand}
          </h1>
          <div className="flex flex-col">
            {/* Images */}
            <a
              className="text-xs mb-1 ml-3 font-Roboto font-extrabold text-blue-500"
              href="https://www.hp.com/us-en/shop/cat/laptops"
            >
              Link
            </a>
            <div className="flex">
              <div className="flex flex-col ml-1">
                <div className="w-[348px] h-[196px] border rounded-tl-[20px] ">
                  <img
                    src={data.images[0]}
                    alt={data.brand}
                    className="w-full h-full object-cover border rounded-tl-[20px]"
                  />
                </div>
                <div className="w-[348px] h-[196px] border rounded-bl-[20px] mb-1">
                  <img
                    src={data.images[1]}
                    alt={data.brand}
                    className="w-full h-full object-cover border rounded-bl-[20px]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-[348px] h-[196px] border rounded-tr-[20px] ">
                  <img
                    src={data.images[2]}
                    alt={data.brand}
                    className="w-full h-full object-cover border rounded-tr-[20px]"
                  />
                </div>
                <div className="w-[348px] h-[196px] border rounded-br-[20px] mb-1">
                  <img
                    src={data.images[3]}
                    alt={data.brand}
                    className="w-full h-full object-cover border rounded-br-[20px]"
                  />
                </div>
              </div>
            </div>
            {/* Specifications */}
            <div className="mt-2">
              <h2 className="text-[24px] ">Specification</h2>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    Brand
                    <span className="text-custom-gray font-medium">: {data.brand}</span>
                  </p>
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    Model <span className="text-custom-gray font-medium">: {data.model}</span>
                  </p>
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    Processor{' '}
                    <span className="text-custom-gray font-medium">: {data.specifications.processor}</span>
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    RAM <span className="text-custom-gray font-medium">: {data.specifications.ram}</span>
                  </p>
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    Storage <span className="text-custom-gray font-medium">: {data.specifications.storage}</span>
                  </p>
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    GPU <span className="text-custom-gray font-medium">: {data.specifications.gpu}</span>
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    Battery Life{' '}
                    <span className="text-custom-gray font-medium">: {data.specifications.batteryLife}</span>
                  </p>
                  <p className="text-sm font-Roboto text-custom-black font-bold mb-1">
                    Warranty{' '}
                    <span className="text-custom-gray font-medium">: {data.specifications.warranty}</span>
                  </p>
                  <p className="text-sm font-Roboto text-custom-black font-bold max-w-56 mb-1">
                    Ports{' '}
                    {data.specifications.ports.map((port: string, idx: number) => (
                      <span key={idx} className="text-custom-gray font-medium">
                        : {port}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="text-center text-2xl text-custom-black font-bold mt-3">
                Price: ${data.price}
              </div>
              <button
              disabled={isDesable}
              
                onClick={() => handleCheckOut(id)}
                className={`flex items-center cursor-pointer justify-center w-full py-2 mt-6 font-semibold text-white ${isDesable?'bg-gray-300 cursor-not-allowed':"bg-blue-600"}  rounded-md ${isDesable?'':'hover:bg-blue-500'}  focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDesable?'':'focus:ring-blue-500'} `}
              >
                <span className="mr-2">BUY</span>
              </button>
            </div>
          </div>
        </>
      )}
      
    </div>
   
  );

};

export default ProductDetail;
