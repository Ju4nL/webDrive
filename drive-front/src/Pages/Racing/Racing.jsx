import React, { useState } from 'react';
import { FaCheckCircle, FaHourglassHalf, FaClock, FaSpinner, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

import CardRacing from './CardRacing';
import CardContainer from '../../components/CardContainer';
import SearchBar from '../../components/SearchBar';
import ListboxSelect from '../../components/ListboxSelect';
import RoadIcon from '../../components/icons/Road';

const statusOptions = [
  { value: 'all', label: 'Todos', icon: <FaCheckCircle /> },
  { value: 'pendiente', label: 'Pendiente', icon: <FaHourglassHalf className="text-yellow-500" /> },
  { value: 'en progreso', label: 'En Progreso', icon: <FaSpinner className="text-blue-500 animate-spin" /> },
  { value: 'en espera', label: 'En Espera', icon: <FaClock className="text-orange-500" /> },
  { value: 'completada', label: 'Completada', icon: <FaCheckCircle className="text-green-500" /> },
  { value: 'cancelada', label: 'Cancelada', icon: <FaTimesCircle className="text-red-500" /> },
];


const RaceList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['rides'],
    queryFn: () =>
      makeRequest.get("/rides").then(res => {
        return res.data;
      })
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(statusOptions[0]);
  const [assignedDrivers, setAssignedDrivers] = useState({});

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

 

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };



  const filteredRides = data?.filter((ride) => {
    const titleMatches = ride.clientname && ride.clientname.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter.value === 'all') {
      return titleMatches;
    } else {
      return titleMatches && ride.status === filter.value;
    }
  }) || [];

  const renderFilterOption = (option) => (
    <span className="flex items-center">
      {option.icon}
      <span className="ml-2">{option.label}</span>
    </span>
  );

  return (
    <CardContainer Icon={RoadIcon} title="Carreras" subtitle="Marzo 2024" showNewbutton={true}>
      <div>
      
      </div>
      <div className='flex items-center flex-col md:flex-row justify-center w-full mt-4 gap-4'>
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

      {isLoading ? (
        <div className="mt-4 flex justify-center"><FaSpinner className="text-blue-500 animate-spin" size={30} /></div>
      ) : error ? (
        <div className="text-center mt-4 text-red-500">Error al cargar las carreras Server 500</div>
      ) : (
        <ul className='mt-4 grid gap-2.5'>
          {filteredRides.map((ride) => (
            <CardRacing
              key={ride.rideid}
              to={`/races/${ride.rideid}`}
              status={ride.status}
              title={ride.clientname}
              createTime={ride.starttime}
              km={ride.totaldistance}
              drivername={ride.drivername ? ride.drivername : 'Sin Conductor'} 
            />
          ))}
        </ul>
      )}
    </CardContainer>
  );
};

export default RaceList;
