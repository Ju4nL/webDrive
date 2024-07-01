import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchMap = ({ value, onChange, onSelect }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`https://api.tomtom.com/search/2/search/${value}.json`, {
                params: {
                    key: 'gFSyghGHYiCIReiSuxhrDaUieooACNuG',
                    countrySet: 'PE',
                    limit: 10,
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
        onSelect(selectedOption ? selectedOption.value : '');
        setSearchResults([]);
    };

    return (
        <div className="relative w-full md:w-auto ">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-2 px-4 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-800 dark:bg-gray-900"
                placeholder="Buscar destino"
            />
            <button
                type="button"
                onClick={handleSearch}
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
            >
                <FaSearch />
            </button>
            {loading && <p>Cargando...</p>}
            {!loading && searchResults.length > 0 && (
                <div className='absolute z-10 bg-white border rounded-lg shadow-lg mt-1 w-full dark:bg-gray-800 dark:border-gray-800'>
                    {searchResults.map((result, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectChange(result)}
                            className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {result.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchMap;
