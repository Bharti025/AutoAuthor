import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Backend_Url } from '@/utils/apiPath'
import {Edit,Trash2} from "lucide-react";
const BookCard = ({book,onDelete}) => {
  const navigate=useNavigate();
  const coverImageUrl = book.coverImage
  ? `${Backend_Url}/${book.coverImage.replace(/\\/g, "/").replace(/^\/+/, "")}`
  : "/";
  return (
    <div className='cursor-pointer' onClick={()=>navigate(`/viewbook/${book._id}`)}>
      <div className='relative bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden'>
        <img src={coverImageUrl} alt={book.title} className='w-full aspect-[16/25] object-cover'/>
        <div className='absolute top-3 right-3  flex gap-2 group-hover:opacity-100 transition-opacity 
        duration-200'>
       <button className='w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg
       hover:bg-white transition-colors' 
       onClick={(e)=>{e.stopPropagation(); navigate(`/editor/${book._id}`);}}>
        <Edit className='h-4 w-4 text-black-700'/>
       </button>
       <button className='w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg
       hover:bg-white transition-colors' 
       onClick={(e)=>{e.stopPropagation(); onDelete(book._id); console.log("delete book")}}>
        <Trash2 className='h-4 w-4 text-red-700'/>
       </button>
        </div>
        <div className='p-4 absolute bottom-10 left-10 right-0 p-5 text-white'>
          <h3 className='font-semibold text-white-900 truncate'>{book.title}</h3>
          <p className='text-sm text-white-600 truncate '>{book.author}</p>
        </div>
      </div>
    </div>
  )
}

export default BookCard
