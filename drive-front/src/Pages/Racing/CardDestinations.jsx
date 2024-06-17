import React, { useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

const Destinations = () => {
    return (
        <div className="flex  md:items-center  space-x-4 p-3.5 rounded-[25px]  bg-gray-100 flex-col md:flex-row">
            <div>
                <div className='flex items-center gap-2'>
                    <FaMapMarkedAlt className="text-green-500" />
                    <h3 className="text-md font-medium">Destino1</h3>
                </div>
                <div>
                    <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">Destino Inico</span>
                    <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">Destino Fin</span>
                </div>
            </div>

            <div className='flex gap-4'>
                <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 dark:focus:ring-yellow-500"
                >
                    Espera
                </button>
                <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
                >
                    Iniciando
                </button>
                <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
                >
                    Fin
                </button>
            </div>
        </div>
    );
};

export default Destinations;
