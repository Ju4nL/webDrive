import React, { useEffect, useState } from 'react';
import CardDestinations from './CardDestinations';
import CardContainer from '../../components/CardContainer';
import GpsIcon from '../../components/icons/Gps';
import ListboxSelect from '../../components/ListboxSelect';
import Avatar from '../../components/Avatar';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import SearchMap from '../../components/SearchMap';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const initialDrivers = [{ id: null, name: 'Seleccione un conductor', img: '' }];

const RaceDetails = () => {
    const { rideId } = useParams();
    const [localRideId, setLocalRideId] = useState(() => {
        return localStorage.getItem('rideId') || rideId;
    });

    useEffect(() => {
        if (rideId) {
            localStorage.setItem('rideId', rideId);
            setLocalRideId(rideId);
        }
    }, [rideId]);

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['destinations', localRideId],
        queryFn: () =>
            makeRequest.get(`/destinations/${rideId}`).then(res => res.data)
    });

    const { data: driversData, isLoading: driversLoading } = useQuery({
        queryKey: ['drivers'],
        queryFn: () =>
            makeRequest.get('/users/drivers').then(res => res.data),
    });

    const mutation = useMutation({
        mutationFn: (newDestination) =>
            makeRequest.post('/destinations', newDestination),
        onSuccess: () => {
            queryClient.invalidateQueries(['destinations', localRideId]);
        },
    });

    const assignDriverMutation = useMutation({
        mutationFn: (updateData) =>
            makeRequest.put('/rides/update-driver', updateData),
        onSuccess: () => {
            queryClient.invalidateQueries(['rides']);
        },
    });

    const [selectedDriver, setSelectedDriver] = useState(initialDrivers[0]);
    const [newDestination, setNewDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [originCoords, setOriginCoords] = useState({ latitude: null, longitude: null });


    const handleUseCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const locationString = `${latitude},${longitude}`;
                setOriginCoords({ latitude, longitude });

                // Reverse geocoding to get address from coordinates
                const response = await axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json`, {
                    params: {
                        key: 'gFSyghGHYiCIReiSuxhrDaUieooACNuG',
                    },
                });

                const address = response.data.addresses[0].address.freeformAddress;
                setOrigin(address);
            },
            (error) => {
                console.error("Error getting the user's location:", error);
            }
        );
    };

    const handleAssignDriver = () => {
        if (selectedDriver.id) {
            const updateData = {
                rideId: localRideId,
                driverId: selectedDriver.id,
            };
            assignDriverMutation.mutate(updateData);
        }
    };

    const handleAddDestination = () => {
        if (origin.trim() && newDestination.trim()) {
            const maxOrderNum = data.reduce((max, destination) => Math.max(max, destination.ordernum), 0);
            const destinationData = {
                rideid: localRideId,
                ordernum: maxOrderNum + 1,
                startlocation: origin,
                endlocation: newDestination,
            };
            mutation.mutate(destinationData);
            setNewDestination('');
        }
    };
    const renderDriverOption = (driver) => (
        <span className="flex items-center gap-2">
            <Avatar src={driver.img || 'https://cdn-icons-png.flaticon.com/256/14663/14663189.png'} alt={driver.name} />
            {driver.name}
        </span>
    );

    return (
        <CardContainer Icon={GpsIcon} title="Destinos" subtitle="Carrera: Jhon" showBackButton={true}>
            <div className='flex items-center flex-col md:flex-row justify-center w-full mt-4 gap-4'>
                {driversLoading ? (
                    <FaSpinner className="animate-spin" />
                ) : (
                    <ListboxSelect
                        label="Seleccionar conductor"
                        options={[...initialDrivers, ...driversData]}
                        selected={selectedDriver}
                        setSelected={setSelectedDriver}
                        renderOption={renderDriverOption}
                    />
                )}
                <button
                    onClick={handleAssignDriver}
                    className={`md:mt-5 w-full py-2.5 px-4 text-sm font-medium rounded-lg ${selectedDriver.id ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                    disabled={!selectedDriver.id}
                >
                    Asignar Conductor
                </button>
            </div>
            {isLoading ? (
                <div className="mt-4 flex justify-center"><FaSpinner className="text-blue-500 animate-spin" size={30} /></div>
            ) : error ? (
                <div className="text-center mt-4 text-red-500">Error al cargar las carreras Server 500</div>
            ) : (
                <div className='mt-4 grid gap-2.5'>
                    {data && data.map(destination => (
                        <CardDestinations
                            key={destination.destinationid}
                            id={destination.destinationid}
                            rideId={localRideId}  
                            startLocation={destination.startlocation}
                            endLocation={destination.endlocation}
                            arrivalTime={destination.arrivaltime}
                            departureTime={destination.departuretime}   
                            finishTime={destination.finishtime}
                            orderNum={destination.ordernum}
                        />
                    ))}
                </div>
            )}

            <div className='mt-4 flex flex-col items-center gap-4'>
                <div className='w-full flex gap-4 flex-col md:flex-row'>
                    <div className='w-full flex'>
                        <div className='w-full'>
                            <label className='block text-sm font-medium text-gray-700 dark:text-gray-400'>Origen</label>
                            <SearchMap
                                value={origin}
                                onChange={setOrigin}
                                onSelect={setOrigin}
                            />
                        </div>
                        <button
                            onClick={handleUseCurrentLocation}
                            className="mt-5 py-0 px-4 text-sm font-medium bg-green-600 text-white rounded-lg"
                        >
                            Usar actual
                        </button>
                    </div>
                    <div className='w-full'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-400'>Destino</label>
                        <SearchMap
                            value={newDestination}
                            onChange={setNewDestination}
                            onSelect={setNewDestination}
                        />
                    </div>
                </div>
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
