import React from 'react';

const GpsIcon = ({ color = 'currentColor', className = '', width = 24, height = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class={`icon icon-tabler icons-tabler-outline icon-tabler-gps ${className}`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l-1 -4l-4 -1l9 -4z" /></svg>

);

export default GpsIcon;
