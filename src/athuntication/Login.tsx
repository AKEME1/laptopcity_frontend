import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  // Initial states for email and password
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
console.log(email,password)

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
setIsLoading(true)
    // Body object should reflect current state values
    const body = {
      email: email,
      password: password,
    };

    try {
      const loginResponse = await axios.post('http://localhost:8080/api/v1/users/login', body, {
        headers: {
          'Content-Type': 'application/json', // Correct content type
        },
      });
  
      if (loginResponse.data.userData) {
        const token=loginResponse.data.token
        const User=loginResponse.data.userData.user
        localStorage.setItem('jwt', token);
        localStorage.setItem('userData', JSON.stringify(User))
        setIsLoading(false)
        navigate('/'); // Navigate to the home page on successful login
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#44AA99] to-[#A3C1DA] p-4 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-[360px] p-4 shadow-card flex-col bg-white">
          <div className="mb-3">
            <h2 className="text-[27px] font-bold font-space-grotesk text-center">Login</h2>
          </div>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="w-full mb-2">
              <label className="font-Roboto font-bold text-custom-gray text-[12px] mb-[2px] block" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={email} // Controlled input with value and onChange
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-[296px] h-[32px] border border-gray-300 rounded-lg px-[5px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
                required // Optional: Makes input required
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
                value={password} // Controlled input with value and onChange
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="w-[296px] h-[32px] border border-gray-300 rounded-lg px-[5px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#A3C1DA] focus:border-[#A3C1DA]"
                required // Optional: Makes input required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`flex items-center cursor-pointer justify-center w-full py-1 mt-3 font-semibold text-white rounded-md ${isLoading? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600'}  focus:outline-none focus:ring-2 ${isLoading?'':'hover:bg-blue-500'} focus:ring-offset-2 ${isLoading?'focus:ring-gray-400':'focus:ring-blue-500'} `}
            >
              <span className="mr-2">Login</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
