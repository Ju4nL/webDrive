import React from 'react';
 
const RoadIcon = ({ color = 'currentColor', className = '', width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon icon-tabler icon-tabler-road ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 19l4 -14" />
    <path d="M16 5l4 14" />
    <path d="M12 8v-2" />
    <path d="M12 13v-2" />
    <path d="M12 18v-2" />
  </svg>
);

export default RoadIcon;
