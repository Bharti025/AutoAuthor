import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import {Plus,Book} from "lucide-react"
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Backend_Url } from "@/utils/apiPath"
import { API_PATHS } from "@/utils/apiPath"
import { useAuth } from "@/components/context/authContext"
import { Button } from '@/components/ui/Button'
import BookCard from '@/components/cards/BookCard';
import CreateBookModal from '../components/modals/CreateBookModal.jsx';
const DashboardPage = () => {
  const [books,setBooks]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [iscreateModalOpen,setIsCreateModalOpen]=useState(false);
  const [bookToDelete,setBookToDelete]=useState(null);
  const {user}=useAuth();
  const navigate=useNavigate();

useEffect(()=>{
  const fetchBooks=async()=>{
    try{
      const token=localStorage.getItem("token");
    const response=await axios.get(`${Backend_Url}${API_PATHS.BOOKS.GET_BOOKS}`,{
       headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    console.log("response books",response);
    setBooks(response.data);
    
    setIsLoading(false);
    }
    catch(err){
      console.log(err);
     toast.error("Failed to fetch your eBooks.");
    }
    finally{
      setIsLoading(false);
    }
  }
  fetchBooks();
},[]);

const handleDeleteBook=async()=>{
if(!bookToDelete){
  return;
}
try{
  const token=localStorage.getItem("token");
await axios.delete(`${Backend_Url}${API_PATHS.BOOKS.DELETE_BOOK}${bookToDelete}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
setBooks(books.filter((book)=>book._id!==bookToDelete));
toast.success("Book deleted succesfully");
}
catch(err){
  console.log("Delete book",err);
toast.error("Failed to delete the book.");
}
finally{
  setBookToDelete(null);
}
}

const handleCreateBookClick=()=>{
setIsCreateModalOpen(true);
}

const handleBookCreated=(bookId)=>{
 setIsCreateModalOpen(false);
 navigate(`/editor/${bookId}`);
}

const ConfirmationModal=({isOpen,onClose,onConfirm,title,message})=>{
  if(!isOpen){
    return null;
  }

  return(
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen px-4 text-center'>
       <div className='fixed inset-0 bg-black/50 opacity-25 transition-opacity' onClick={onClose}>
        
       </div>
       <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative'>
         <h3 className='text-lg font-semiboldtext-slate-900 mb-4'>{title}</h3>
         <p className='text-slate-600 mb-6'>{message}</p>
         <div className='flex justify-end space-x-3'>
        <Button variant="secondary"onClick={onClose}>Cancel</Button>
        <Button className="bg-red-600 text-white hover:bg-red-700" onClick={onConfirm}>Confirm</Button>
         </div>
       </div>
      </div>
    </div>
  )
}

const BookCardSkeleton=()=>{
<div className="animate-pulse  bg-white border border-slate-200 rounded-lg shadow-sm">
<div className='w-full aspect-[16/25] bg-slate-200 rounded-t-lg'></div>
<div className='p-4'>
  <div className='h-6 bg-slate-200 rounded w-3/4 mb-2'></div>
<div className='h-4 bg-slate-200 rounded w-1/2'></div>
</div>
</div>
}

  return (
    <DashboardLayout>
    <div className='container mx-auto p-6'>
      <div className='flex items-center justify-between mb-6'>
      <div>
        <h1 className='text-lg font-bold text-slate-900'>All ebooks</h1>
        <p className='text-sm text-slate-600  mt-1'>Create, Edit and manage all your AI-generated e books</p>
      </div>
      <Button className='whitespace-nowrap bg-violet-600 hover:bg-violet-700' onClick={handleCreateBookClick} icon={<Plus/>}>Create New Book</Button>
      </div>
     {isLoading? (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {Array.from({length:4}).map((_,i)=>(<BookCardSkeleton key={i}/>))}</div>):books.length===0 ? (
        <div className='flex flex-col items-center justify-center py-12 gap-4text-center border-2 border-dashed border-slate-300'>
          <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
            <Book className=''/>
          </div>
          <h3 className='text-lg font-medium text-slate-900'>No ebooks found</h3>
          <p className='text-sm text-slate-600'>Create your first ebook to get started</p>
          <Button className='mt-4 bg-violet-600 hover:bg-violet-700'onClick={handleCreateBookClick} icon={<Plus/>}>Create New Book</Button>
          </div>
      ):(<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {books.map((book)=>
       {
        return(
        <BookCard key={book._id} book={book}
        onDelete={()=>setBookToDelete(book._id)}/>

        )
       })}
        </div>)}
        <ConfirmationModal isOpen={!!bookToDelete} onClose={()=>setBookToDelete(null)} onConfirm={handleDeleteBook}
         title="Delete Book" message="Are you sure you want to delete this book?"/>
    </div>
    <CreateBookModal isOpen={iscreateModalOpen} onClose={()=>setIsCreateModalOpen(false)} onBookCreated={handleBookCreated}/>
    </DashboardLayout>
  )
}

export default DashboardPage
