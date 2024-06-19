import React, { useState } from 'react';
import CardDestinations from './CardDestinations';
import CardContainer from '../../components/CardContainer';
import GpsIcon from '../../components/icons/Gps';
import ListboxSelect from '../../components/select/ListboxSelect';
import { FaTaxi } from 'react-icons/fa';
import Avatar from '../../components/Avatar';

// Lista de conductores con id, img y nombre aleatorio
const drivers = [
    { id: null, name: 'Seleccione un conductor', img: '' }, // Opción inicial
    { id: 1, name: 'Carlos García', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Laura Méndez', img: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Miguel Fernández', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const RaceDetails = () => {
    const [selectedDriver, setSelectedDriver] = useState(drivers[0]);
    const [destinations, setDestinations] = useState([
        { id: 1, name: 'Destino 1' }, 
    ]);
    const [newDestination, setNewDestination] = useState('');

    const handleAssignDriver = () => {
        console.log(`Asignar conductor ${selectedDriver.name} (ID: ${selectedDriver.id})`);
        // Aquí puedes agregar la lógica para asignar el conductor a la carrera
    };

    const handleAddDestination = () => {
        if (newDestination.trim()) {
            const newId = destinations.length ? destinations[destinations.length - 1].id + 1 : 1;
            setDestinations([...destinations, { id: newId, name: newDestination }]);
            setNewDestination('');
        }
    };

    const renderDriverOption = (driver) => (
        <span className="flex items-center gap-2">
            {driver.img && <Avatar src={driver.img} alt={driver.name} />}
            {driver.name}
        </span>
    );

    return (
        <CardContainer Icon={GpsIcon} title="Destinos" subtitle="Carrera: Jhon"  showBackButton={true}>
            <div className='flex items-center flex-col  md:flex-row justify-center w-full mt-4 gap-4'>
                <ListboxSelect
                    label="Seleccionar conductor"
                    options={drivers}
                    selected={selectedDriver}
                    setSelected={setSelectedDriver}
                    renderOption={renderDriverOption}
                />
                <button
                    onClick={handleAssignDriver}
                    className={`md:mt-5 w-full py-2.5 px-4 text-sm font-medium rounded-lg  ${selectedDriver.id ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                    disabled={!selectedDriver.id}
                >
                    Asignar Conductor
                </button>
            </div>

            <div className='mt-4 grid gap-2.5'>
                {destinations.map(destination => (
                    <CardDestinations key={destination.id} name={destination.name} />
                ))}
            </div>

            <div className='mt-4 flex flex-col md:flex-row items-center gap-4'>
                <input
                    type="text"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full py-2 px-4 text-sm font-medium rounded-lg border border-gray-300 "
                    placeholder="Nuevo destino"
                />
                <button
                    onClick={handleAddDestination}
                    className="w-full md:w-44 py-2 px-4 text-sm font-medium bg-green-600 text-white rounded-lg"
                >
                    Agregar Destino
                </button>
            </div>
        </CardContainer>
    );
};

export default RaceDetails;
