import * as React from "react";
const Card = (props: {children: React.ReactNode}) => {
  const { children } = props
  return (
        <div className="exclude-print w-full p-6 bg-white border mb-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {children}
        </div>

  );
};

export default Card;
