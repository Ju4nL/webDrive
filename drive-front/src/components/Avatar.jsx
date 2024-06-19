import React from 'react';

function Avatar({ src, alt = "avatar" }) {
  return (
    <img src={src} alt={alt} className="w-6 h-6 rounded-full object-cover" />
  );
}

export default Avatar;
