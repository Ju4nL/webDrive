import React from 'react';
import CardDestinations from './CardDestinations';

import CardContainer from './../../components/cardContainer/CardContainer';

import GpsIcon from '../../components/icons/Gps';

const RaceDetails = ({ ride, onClose }) => {
    return (
        <CardContainer Icon={GpsIcon} title="Destinos" subtitle="Carrera: Jhon">
            <div className='mt-4 grid gap-2.5'>
                <CardDestinations />
                <CardDestinations />
                <CardDestinations />
            </div>

        </CardContainer>
    );
};

export default RaceDetails;
