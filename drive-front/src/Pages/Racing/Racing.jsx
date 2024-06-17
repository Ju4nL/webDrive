import React, { useState } from 'react';
import { FaCheckCircle, FaHourglassHalf, FaClock, FaSpinner } from 'react-icons/fa';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import RaceDetails from './RaceDetails';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';


import CardRacing from './CardRacing'
import CardContainer from './../../components/cardContainer/CardContainer';
import SearchBar from '../../components/search/SearchBar';
import ListboxSelect from '../../components/select/ListboxSelect';

import RoadIcon from '../../components/icons/Road';


const ridesData = [
    {
        rideId: 1,
        clientName: 'John Doe',
        status: 'pendiente',
        totalDistance: 5.2,
        totalFare: 15.00,
        createTime: '2023-06-15 08:00',
        startTime: '2023-06-15 08:00',
        endTime: null
    },
    {
        rideId: 2,
        clientName: 'Jane Smith',
        status: 'en progreso',
        totalDistance: 10.5,
        totalFare: 25.00,
        createTime: '2023-06-15 08:00',
        startTime: '2023-06-15 09:30',
        endTime: null
    },
    {
        rideId: 3,
        clientName: 'Alice Johnson',
        status: 'en espera',
        totalDistance: 3.8,
        totalFare: 12.00,
        createTime: '2023-06-15 08:00',
        startTime: '2023-06-15 10:15',
        endTime: null
    },
    {
        rideId: 4,
        clientName: 'Bob Brown',
        status: 'completada',
        totalDistance: 7.0,
        totalFare: 20.00,
        createTime: '2023-06-15 08:00',
        startTime: '2023-06-15 07:00',
        endTime: '2023-06-15 07:30'
    },
    {
        rideId: 4,
        clientName: 'Bob Brown',
        status: 'completada',
        totalDistance: 7.0,
        totalFare: 20.00,
        createTime: '2023-06-15 08:00',
        startTime: '2023-06-15 07:00',
        endTime: '2023-06-15 07:30'
    }
];

const statusOptions = [
    { value: 'all', label: 'Todos', icon: <FaCheckCircle /> },
    { value: 'pendiente', label: 'Pendiente', icon: <FaHourglassHalf className="text-yellow-500" /> },
    { value: 'en progreso', label: 'En Progreso', icon: <FaSpinner className="text-blue-500 animate-spin" /> },
    { value: 'en espera', label: 'En Espera', icon: <FaClock className="text-orange-500" /> },
    { value: 'completada', label: 'Completada', icon: <FaCheckCircle className="text-green-500" /> },
  ];
  

const drivers = ['Carlos García', 'Laura Méndez', 'Miguel Fernández'];

const RaceList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState(statusOptions[0]);
    const [assignedDrivers, setAssignedDrivers] = useState({});
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const navigate = useNavigate();
  
    const handleDetailsClick = (ride) => {
      navigate(`/races/${ride.rideId}`);
    };
  
    const handleAssignDriver = (rideId, driver) => {
      console.log(`Asignar ${driver} a la carrera ${rideId}`);
      const updatedAssignedDrivers = { ...assignedDrivers, [rideId]: driver };
      setAssignedDrivers(updatedAssignedDrivers);
    };
  
    const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
    };
  
    const filteredRides = ridesData.filter((ride) => {
      const titleMatches = ride.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      if (filter.value === 'all') {
        return titleMatches;
      } else {
        return titleMatches && ride.status === filter.value;
      }
    });
  
    const renderFilterOption = (option) => (
      <span className="flex items-center">
        {option.icon}
        <span className="ml-2">{option.label}</span>
      </span>
    );

      

    return (
        <CardContainer Icon={RoadIcon} title="Carreras" subtitle="Marzo 2024">
                <div className='flex items-center flex-col  md:flex-row justify-center w-full mt-4 gap-4'>
                    <SearchBar
                        searchTerm={searchTerm}
                        handleSearchChange={handleSearchChange}
                        placeholder="Buscar carrera..." 
                    />
      
                     <ListboxSelect
                        label=""
                        options={statusOptions}
                        selected={filter}
                        setSelected={handleFilterChange}
                        renderOption={renderFilterOption}
                    />
                </div>


                <ul className='mt-4 grid gap-2.5'>
                    {filteredRides.map((ride) => (
                        <li>
                            <CardRacing to={`/races/${ride.rideId}`}   
                                status={ride.status}
                                title={ride.clientName}
                                createTime={ride.createTime}
                                km={ride.totalDistance} />
                        </li>
                    ))}
                </ul>
        </CardContainer>
    );
};

export default RaceList;
