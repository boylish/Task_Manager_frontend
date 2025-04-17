import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex gap-1  items-center'>
     <div className={`${color} text-2xl` } >{icon}</div>
     <p className='text-sm font-bold'>{value}</p>
     <p className='text-sm opacity-70 font-medium'>{label}</p>

    </div>
  )
}

export default InfoCard