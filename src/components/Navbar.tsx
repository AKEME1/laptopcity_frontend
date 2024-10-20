import { useProductContext } from '../context/productContext'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
const Navbar = () => {
  const {isOpen,userData,setUserData}=useProductContext()

  
  return (
    <div className={`bg-gradient-to-r from-custom-green to-custom-blue ${isOpen?'blur-sm':""}`}>
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-2">
        
        {/* Logo Section */}
        <div>
          <Link to={'/'} className="font-space-grotesk cursor-pointer font-extrabold text-[27px]">Laptopcity</Link>
        </div>
        
        {/* Icon Section */}
        <div>
          ICON
        </div>
        
        {/* Navigation Links */}
        <div className="flex">
          <div className="ml-1 cursor-pointer">
            <Link to='/Signup' className="font-space-grotesk font-medium hover:font-bold text-[18px] ">
          {
         userData.name?userData.name.split("")[0]:'Signup'
          }
            </Link>
          </div>
          <div className="ml-1 cursor-pointer">
            <Link to='/Login' className="font-space-grotesk font-medium hover:font-bold text-[18px]">Login</Link>
          </div>
          
          {/* Cart Icon or Profile Icon */}
          <div className="ml-1 w-[24px] h-[24px] border rounded-[12px]">
            {/* Add icon or image inside this div if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
