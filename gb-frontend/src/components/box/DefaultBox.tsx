import React from "react";

//Aca definimos las props que va a recibir el componente default
interface DefaultBoxProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const DefaultBox = ({ title, value, icon }: DefaultBoxProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {icon && (
          <div className="bg-blue-100 rounded-full p-3 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};