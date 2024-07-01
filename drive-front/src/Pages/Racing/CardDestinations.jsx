import React, { useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaPen, FaSave } from 'react-icons/fa';
import ArrowRightIcon from '../../components/icons/ArrowRight';
import CalendarDaysIcon from '../../components/icons/Calendar';
import RulerIcon from '../../components/icons/Ruler';
import SearchMap from '../../components/SearchMap';
import { makeRequest } from '../../axios';

const CardDestinations = ({ rideId, id, startLocation, endLocation, arrivalTime, departureTime, finishTime, orderNum }) => {
    const [selectedButton, setSelectedButton] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [tempDestination, setTempDestination] = useState(endLocation);

    useEffect(() => {
        const savedState = localStorage.getItem(`selectedButton_${id}`);
        if (savedState) {
            setSelectedButton(savedState);
        }
    }, [id]);

    const handleClick = async (buttonName) => {
        setSelectedButton(buttonName);
        localStorage.setItem(`selectedButton_${id}`, buttonName);

        const timestamp = new Date().toISOString();

        try {
            if (buttonName === 'espera') {
                const waitTimeData = {
                    rideId: rideId,
                    destinationId: id,
                    startTime: timestamp
                };
                await makeRequest.post('/wait-times', waitTimeData);
            }

            const updateData = {
                id: id,
                status: buttonName
            };
            await makeRequest.put(`/destinations/${id}/status`, updateData);

            if (buttonName === 'fin') {
                setIsEditing(false); // Disable editing when finalizing
            }

            console.log('Time updated successfully');
        } catch (error) {
            console.error('Error updating time:', error);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        setTempDestination(endLocation);
        setIsEditing(true);
    };

    const getButtonClasses = (buttonName) => {
        const baseClasses = 'w-full py-2.5 px-4 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 shadow-lg';
        const activeClasses = 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-600 dark:focus:ring-green-900';
        const inactiveClasses = 'text-gray-700 bg-gray-300 hover:bg-gray-400 focus:ring-gray-300 dark:focus:ring-gray-500';
        const disabledClasses = 'text-gray-400 bg-gray-200 cursor-not-allowed';
        const finalizedClasses = 'text-gray-300 bg-green-600 dark:bg-green-600 dark:text-gray-300 cursor-not-allowed';

        if (buttonName === selectedButton) {
            return `${baseClasses} ${finalizedClasses}`;
        }
        if (isButtonDisabled(buttonName)) {
            return `${baseClasses} ${disabledClasses}`;
        }

        return `${baseClasses} ${inactiveClasses}`;
    };

    const isButtonDisabled = (buttonName) => {
        if (buttonName === 'espera' && arrivalTime) return true;
        if (buttonName === 'iniciando' && !arrivalTime) return true;
        if (buttonName === 'iniciando' && departureTime) return true;
        if (buttonName === 'fin' && !departureTime) return true;
        if (buttonName === 'fin' && finishTime) return true;
        return false;
    };

    const getButtonText = (buttonName) => {
        if (buttonName === 'espera' && arrivalTime) return 'Esperando';
        if (buttonName === 'iniciando' && departureTime) return 'Iniciando';
        if (buttonName === 'fin' && finishTime) return 'Finalizado';
        return buttonName.charAt(0).toUpperCase() + buttonName.slice(1);
    };

    return (
        <div>
            <div className="flex justify-between md:items-center space-x-4 p-5 rounded-[25px] bg-gray-100 flex-col md:flex-row dark:bg-gray-800">
                <div>
                    <div className='flex items-center flex-col md:flex-row gap-2 text-gray-500 dark:text-gray-400 text-sm'>
                        <FaMapMarkedAlt className="text-green-500" />
                        <div className='flex items-center gap-2'>
                            <span>{startLocation}</span>
                            <ArrowRightIcon className="w-4 h-4" />
                            {isEditing ? (
                                <SearchMap
                                    value={tempDestination}
                                    onChange={setTempDestination}
                                    onSelect={setTempDestination}
                                />
                            ) : (
                                <span>{endLocation}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2 text-gray-500 dark:text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{new Date(arrivalTime).toLocaleString()}</span>
                        <RulerIcon className="w-4 h-4" />
                        <span>{orderNum}</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex gap-4 mt-4 md:mt-0'>
                        <button
                            type="button"
                            className={getButtonClasses('espera')}
                            onClick={() => handleClick('espera')}
                            disabled={isButtonDisabled('espera')}
                        >
                            {getButtonText('espera')}
                        </button>
                        <button
                            type="button"
                            className={getButtonClasses('iniciando')}
                            onClick={() => handleClick('iniciando')}
                            disabled={isButtonDisabled('iniciando')}
                        >
                            {getButtonText('iniciando')}
                        </button>
                        <button
                            type="button"
                            className={getButtonClasses('fin')}
                            onClick={() => handleClick('fin')}
                            disabled={isButtonDisabled('fin')}
                        >
                            {getButtonText('fin')}
                        </button>
                    </div>
                    <div className='flex gap-4 mt-4 md:mt-0'>
                        {isEditing ? (
                            <button
                                type="button"
                                className="py-2.5 px-4 text-sm font-medium text-green-500 rounded-lg hover:text-green-700 focus:outline-none focus:ring-0"
                                onClick={handleSave}
                            >
                                <FaSave />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="py-2.5 px-4 text-sm font-medium text-green-500 rounded-lg hover:text-green-700 focus:outline-none focus:ring-0"
                                onClick={handleEdit}
                            >
                                <FaPen />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDestinations;
