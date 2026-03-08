import React from 'react'
import {X} from "lucide-react";

const Modal = ({isOpen,onClose,title,children}) => {
  if(!isOpen)
    return null;

  
  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen px-4 text-center'>
        <div className='fixed inset-0 bg-black/10 bg-opacity-25 transition-opacity' onClick={onClose}></div>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative text-left'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700 p-1 rounded-full'>
            <X className='h-5 w-5'/>
          </button>
        </div>
        <div className='mt-4'>
          {children}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
