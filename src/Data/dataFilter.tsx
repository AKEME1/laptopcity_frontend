import AppleLogo from '../assets/Apple-Logo.jpg';
import DellLogo from '../assets/Dell-Logo.png';
import HP from '../assets/hp2.png';
import LenovoLogo from '../assets/Lenovo-logo.jpg';

// Define a type for the filter items
interface FilterItem {
    image: string; // Assuming the image paths are strings
    name: string;
}

// Create the filter array with the defined type
export const filter: FilterItem[] = [
    { 
        image: HP,
        name: 'HP'
    },
    {
        image: LenovoLogo, // Ensure this matches the imported variable
        name: 'Lenovo'      // Correctly spelled as 'Lenovo'
    },
    {
        image: AppleLogo,
        name: 'Apple'
    },
    {
        image: DellLogo,
        name: 'Dell'
    }
];


export const brandData =['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Razer', 'MSI', 'Samsung', 'Toshiba', 'LG', 'Huawei', 'Gigabyte', 'VAIO']
export const osData=['Windows', 'macOS', 'Linux', 'Chrome OS']
export  const specificationDatas=['batteryLife','display','gpu','os','processor','ram','storage','warranty','weight']
   
    
    
   
    

  
    
   