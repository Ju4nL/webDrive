import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CardContainer = ({ Icon, title, subtitle, children, showBackButton = false, showNewbutton = false }) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-3xl md:mx-auto mt-14 mx-4">
            <div aria-label="card" className="p-2 md:p-8 rounded-3xl shadow-lg w-full dark:bg-gray-900">
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
                    {showBackButton && (
                        <button
                            className="hover:text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <IoMdArrowRoundBack className="size-6" />
                        </button>
                    )}
                    {showNewbutton && (
                        <button className="w-full md:w-44 py-2 px-4 text-sm font-medium bg-green-600 text-white rounded-lg" >  Nuevo  </button>
                    )  }

                </div>
                {children}
            </div>
        </div>
    );
};

export default CardContainer;
