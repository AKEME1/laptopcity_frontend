import React from 'react'; 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CustomSkeletonProps {
  count: number; // Define count as a number
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({ count }) => {
  return (
    <div className="flex flex-col space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
          {/* Adjusting Skeleton with responsive heights and widths */}
          <Skeleton height={200} width="100%" containerClassName="rounded-lg" />

          <div className="mt-4">
            {/* Added `baseColor` and `highlightColor` for better customization */}
            <Skeleton 
              height={30} 
              width="80%" 
              baseColor="#E0E0E0" 
              highlightColor="#F0F0F0" 
              containerClassName="rounded-md" 
            />
            <Skeleton 
              height={20} 
              width="60%" 
              baseColor="#E0E0E0" 
              highlightColor="#F0F0F0" 
              containerClassName="rounded-md mt-2" 
            />
            <Skeleton 
              height={30} 
              width="50%" 
              baseColor="#E0E0E0" 
              highlightColor="#F0F0F0" 
              containerClassName="rounded-md mt-4" 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomSkeleton;
