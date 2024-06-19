// import React, { useState, useEffect } from 'react';
// import { FaMapMarkedAlt } from 'react-icons/fa';
// import ArrowRightIcon from '../../components/icons/ArrowRight';
// import CalendarDaysIcon from '../../components/icons/Calendar';
// import RulerIcon from '../../components/icons/Ruler';

// const Destinations = () => {
//     const [selectedButton, setSelectedButton] = useState('');

//     useEffect(() => {
//         const savedState = localStorage.getItem('selectedButton');
//         if (savedState) {
//             setSelectedButton(savedState);
//         }
//     }, []);

//     const handleClick = (buttonName) => {
//         setSelectedButton(buttonName);
//         localStorage.setItem('selectedButton', buttonName);
//     };

//     const getButtonClasses = (buttonName) => {
//         return `w-full py-2.5 px-4 text-sm font-medium ${
//             selectedButton === buttonName ? 'text-white bg-green-600' : 'text-gray-700 bg-gray-300'
//         } rounded-lg hover:bg-${selectedButton === buttonName ? 'green-700' : 'gray-400'} focus:outline-none focus:ring-2 focus:ring-${selectedButton === buttonName ? 'green-600' : 'gray-300'} dark:focus:ring-${selectedButton === buttonName ? 'green-500' : 'gray-500'} shadow-lg`;
//     };

//     return (
//         <div className="flex justify-between md:items-center space-x-4 p-5 rounded-[25px] bg-gray-100 flex-col md:flex-row">
//             <div>
//                 <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm'>
//                     <FaMapMarkedAlt className="text-green-500" />
//                     <span>San Francisco, CA</span>
//                     <ArrowRightIcon className="w-4 h-4" />
//                     <span>New York, NY</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm mt-2 text-gray-500 dark:text-gray-400">
//                     <CalendarDaysIcon className="w-4 h-4" />
//                     <span>June 15, 2024</span>
//                     <RulerIcon className="w-4 h-4" />
//                     <span>1,500 km</span>
//                 </div>
//             </div>

//             <div className='flex gap-4 mt-4 md:mt-0'>
//                 <button
//                     type="button"
//                     className={getButtonClasses('espera')}
//                     onClick={() => handleClick('espera')}
//                 >
//                     Espera
//                 </button>
//                 <button
//                     type="button"
//                     className={getButtonClasses('iniciando')}
//                     onClick={() => handleClick('iniciando')}
//                 >
//                     Iniciando
//                 </button>
//                 <button
//                     type="button"
//                     className={getButtonClasses('fin')}
//                     onClick={() => handleClick('fin')}
//                 >
//                     Fin
//                 </button>
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaPen, FaSave, FaSearch } from 'react-icons/fa';
import ArrowRightIcon from '../../components/icons/ArrowRight';
import CalendarDaysIcon from '../../components/icons/Calendar';
import RulerIcon from '../../components/icons/Ruler';
import axios from 'axios';

const Destinations = () => {
    const [selectedButton, setSelectedButton] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [origin, setOrigin] = useState('San Francisco, CA');
    const [destination, setDestination] = useState('New York, NY');
    const [tempDestination, setTempDestination] = useState('New York, NY');
    const [date, setDate] = useState('June 15, 2024');
    const [distance, setDistance] = useState('1,500 km');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('selectedButton');
        if (savedState) {
            setSelectedButton(savedState);
        }
    }, []);

    const handleClick = (buttonName) => {
        setSelectedButton(buttonName);
        localStorage.setItem('selectedButton', buttonName);
    };

    const handleSave = () => {
        setDestination(tempDestination);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setTempDestination(destination);
        setIsEditing(true);
    };

    const getButtonClasses = (buttonName) => {
        return `w-full py-2.5 px-4 text-sm font-medium ${selectedButton === buttonName ? 'text-white bg-green-600' : 'text-gray-700 bg-gray-300'
            } rounded-lg hover:bg-${selectedButton === buttonName ? 'green-700' : 'gray-400'} focus:outline-none focus:ring-2 focus:ring-${selectedButton === buttonName ? 'green-600' : 'gray-300'} dark:focus:ring-${selectedButton === buttonName ? 'green-500' : 'gray-500'} shadow-lg`;
    };

    const handleDestinationChange = (inputValue) => {
        setTempDestination(inputValue);
    };

    const handleSearch = async () => {
        if (!tempDestination) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`https://api.tomtom.com/search/2/search/${tempDestination}.json`, {
                params: {
                    key: 'LEnYaEMJt643SdBqnZGkXiRurdzQdhyv',
                    countrySet: 'PE',
                    limit: 5,
                },
            });
            const results = response.data.results.map((place) => ({
                label: place.address.freeformAddress,
                value: place.address.freeformAddress,
            }));
            setSearchResults(results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (selectedOption) => {
        setTempDestination(selectedOption ? selectedOption.value : '');
        setSearchResults([]);
    };

    return (
        <div>
            <div className="flex justify-between md:items-center space-x-4 p-5 rounded-[25px] bg-gray-100 flex-col md:flex-row">
                <div>
                    
                    <div className='flex items-center flex-col md:flex-row gap-2 text-gray-500 dark:text-gray-400 text-sm'>
                        <FaMapMarkedAlt className="text-green-500" />
                        <div className='flex items-center gap-2'>
                            <span>{origin}</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                        <div className='flex items-center gap-2'>
                            {isEditing ? (
                                <div className="relative flex w-64">
                                    <input
                                        type="text"
                                        value={tempDestination}
                                        onChange={(e) => handleDestinationChange(e.target.value)}
                                        placeholder="Buscar destino..."
                                        className="py-1 px-2  rounded-l-lg w-full text-sm focus:ring-0   focus:ring-green-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        className="py-1 px-2 border rounded-r-lg bg-green-600 text-white"
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            ) : (
                                <span>{destination}</span>
                            )}
                            {loading && <div className="ml-2">Cargando...</div>}
                        </div>

                    </div>
                    <div className="relative">
                        {searchResults.length > 0 && (
                            <div className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 w-full">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelectChange(result)}
                                        className="cursor-pointer p-2 hover:bg-gray-200"
                                    >
                                        {result.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2 text-gray-500 dark:text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{date}</span>
                        <RulerIcon className="w-4 h-4" />
                        <span>{distance}</span>
                    </div>
                </div>

                <div className='flex gap-4 mt-4 md:mt-0'>
                    <button
                        type="button"
                        className={getButtonClasses('espera')}
                        onClick={() => handleClick('espera')}
                    >
                        Espera
                    </button>
                    <button
                        type="button"
                        className={getButtonClasses('iniciando')}
                        onClick={() => handleClick('iniciando')}
                    >
                        Iniciando
                    </button>
                    <button
                        type="button"
                        className={getButtonClasses('fin')}
                        onClick={() => handleClick('fin')}
                    >
                        Fin
                    </button>
                </div>

                <div className='flex gap-4 mt-4 md:mt-0 '>
                    {isEditing ? (
                        <button
                            type="button"
                            className="py-2.5 px-4 text-sm font-medium text-green-500  rounded-lg hover:text-green-700  focus:outline-none focus:ring-0    "
                            onClick={handleSave}
                        >
                            <FaSave />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="py-2.5 px-4 text-sm font-medium text-green-500 rounded-lg hover:text-green-700  focus:outline-none focus:ring-0    "
                            onClick={handleEdit}
                        >
                            <FaPen />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Destinations;
