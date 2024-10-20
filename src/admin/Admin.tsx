// src/Dashboard.tsx
import React from 'react';
import { useState } from 'react';
import ProductUploadForm from './ProductUploadForm';
import Analytics from './Analytics';
const Dashboard: React.FC = () => {

  const [dashboard,setDashboard]=useState("")
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 h-auto bg-[#44AA99] text-white">
   
        <nav className='fixed'>
               <h2 className="text-2xl font-bold text-center p-2">Admin Panel</h2>
          <ul>
            <li onClick={()=>setDashboard("ProductUploadForm")} className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="#">Product</a></li>
            <li onClick={()=>setDashboard("Analytics")} className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="#">Analytics</a></li>
            <li className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="#">User</a></li>
            <li className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="#">Reports</a></li>
            <li className="p-2 hover:bg-[#A3C1DA] hover:text-gray-800 transition-colors duration-200"><a href="#">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-4 bg-white">
        <section className="mt-2">
        
          {/* Article items can be added here */}
          {"ProductUploadForm"===dashboard&&<ProductUploadForm/>}
          {'Analytics'===dashboard&&<Analytics/>}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;