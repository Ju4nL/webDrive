import React from 'react';
// import RoadIcon from '../../components/icons/Road';

const CardContainer = ({ Icon, title, subtitle, children }) => {
    return (
        <div className="max-w-3xl md:mx-auto mt-14 mx-4">
            <div aria-label="card" className="p-2 md:p-8 rounded-3xl shadow-lg w-full">
                <div aria-label="header" className="flex items-center space-x-2">
                    {Icon && <Icon width={40} height={40} />}
                    <div className="space-y-0.5 flex-1">
                        <h3 className="font-medium text-lg tracking-tight text-gray-900 leading-tight">
                            {title}
                        </h3>
                        <p className="text-sm font-normal text-gray-400 leading-none">
                            {subtitle}
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CardContainer;
