// src/components/CustomLink.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHourglassHalf, FaSpinner, FaClock, FaCheckCircle } from 'react-icons/fa';

const statusIcons = {
  'pendiente': <FaHourglassHalf className="text-yellow-500" />,
  'en progreso': <FaSpinner className="text-blue-500 animate-spin" />,
  'en espera': <FaClock className="text-orange-500" />,
  'completada': <FaCheckCircle className="text-green-500" />
};

const CardRacing = ({ to, status, title, createTime, km }) => {
  // Seleccionar el icono basado en el estado proporcionado
  const icon = statusIcons[status] || null;

  return (
    <Link to={to}>
      <div className="flex items-center space-x-4 p-3.5 rounded-[25px]  bg-gray-100">
        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
          {icon}
        </span>
        <div className="flex flex-col flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="divide-x divide-gray-200 mt-auto flex  flex-col  md:flex-row md:items-center">
            <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">Inicio: {new Date(createTime).toLocaleString()}</span>
            <div class="flex items-center justify-center gap-1 rounded-full bg-green-500/45 py-0.5 pl-1 pr-2  w-20   mt-1 md:mt-0"> 
              <p class="text-xs leading-tight text-white">{km} km</p>
            </div> 
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 shrink-0"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </div>
    </Link>
  );
};

export default CardRacing;
