import React from 'react';
import { BrowserRouter,  Routes, Route ,  } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ProductProvider } from './context/productContext';
import Home from './components/Home';   // Import your components
import Signup from './athuntication/Signup';
import Login from './athuntication/Login';
import Dashboard from './admin/Admin';
import ProductUploadForm from './admin/ProductUploadForm';
// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ProductProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/admin' element={<Dashboard/>}/>
          <Route path='/productUpload' element={<ProductUploadForm/>}/>
        </Routes>
        </BrowserRouter>
        
      </QueryClientProvider>
    </ProductProvider>
  );
}

export default App;
