import { useProductContext } from '../context/productContext';
import { useState, useEffect } from 'react';
import { UserType } from '../productTypes/productType';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {setIsOpen, isOpen } = useProductContext();
  const [userData, setUserData] = useState<UserType | null>(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <div onClick={()=>setIsOpen(false)} className={`bg-gradient-to-r from-custom-green to-custom-blue ${isOpen ? 'blur-sm cursor-pointer' : ""}`}>
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-2">
        
        {/* Logo Section */}
        <div>
          <Link to={'/'} className="font-space-grotesk cursor-pointer font-extrabold text-[27px] text-white">Laptopcity</Link>
        </div>
        
        {/* Icon Section */}
        <div>
          ICON
        </div>
        
        {/* Navigation Links */}
        <div className='flex justify-between items-center'>
        <div className={`flex ${userData?'mr-4':'mr-2'} justify-between items-center`}>

          <div className="ml-1 cursor-pointer">
            <Link to='/Signup' className="font-space-grotesk font-medium hover:font-bold text-[18px] text-white">
              {userData?.name ? userData.name.split(" ")[0] : ''}
            </Link>
          </div>

 {/* Cart Icon or Profile Icon */}
 {
  userData&&
<div>
<img className="ml-1 w-[40px] h-[40px] border rounded-[20px]" src={userData?.photo} alt="" />
</div>
}
</div>
 <div className="ml-1 cursor-pointer mr-3">
            {
              userData ? 
              <p onClick={handleLogout} className="font-space-grotesk font-medium hover:font-bold text-[18px] text-white">Logout</p> :  
              <Link to='/Login' className="font-space-grotesk font-medium hover:font-bold text-[18px] text-white">
                Login
              </Link>
            }
          </div>
         <div className=''>
            {userData?.role === "admin" ? 
              <Link to={"/admin"} className='font-space-grotesk border rounded-md p-1 bg-pink-400 font-medium hover:font-bold text-[18px] text-white'>
                Admin
              </Link> 
              : ''}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
