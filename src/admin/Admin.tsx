// src/Dashboard.tsx
import React from 'react';
import { useState } from 'react';
import ProductUploadForm from './ProductCount/ProductUploadForm';
import Analytics from './Analytics/Analytics';
import UserTable from './user/UserManage';
const Dashboard: React.FC = () => {

  const [dashboard,setDashboard]=useState("ProductUploadForm")
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 h-auto bg-[#44AA99] text-white">
   
        <nav className='fixed'>
               <h2 className="text-2xl font-bold text-center p-2">Admin Panel</h2>
          <ul>
            <li className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200">
              <a href="/">Home</a>
            </li>
            <li onClick={()=>setDashboard("ProductUploadForm")} className=" p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="">Product</a></li>
            <li onClick={()=>setDashboard("Analytics")} className="p-2 cursor-pointer hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200">Analytics</li>
            <li onClick={()=>setDashboard("UserManagement")}className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="#">User</a></li>
            
            <li className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-4 bg-white">
        <section className="mt-2">
        
          {/* Article items can be added here */}
          {"ProductUploadForm"===dashboard&&<ProductUploadForm/>}
          {'Analytics'===dashboard&&<Analytics/>}
          {"UserManagement"===dashboard&&<UserTable />}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;