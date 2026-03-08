import React from 'react'
import {useState,useEffect} from "react";
import {Album} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuth} from "../context/authContext";
import ProfileDropdown from './ProfileDropdown';

const DashboardLayout = ({children}) => {
  const {user,logout}=useAuth();
 
  const [profileDropdownOpen,setProfileDropdownOpen]=useState(false);

  const handleProfileDropdownToggle=()=>{
    setProfileDropdownOpen(!profileDropdownOpen);
  }
   
  useEffect(()=>{
    const handleClickOutside=()=>{
    if(profileDropdownOpen){
      setProfileDropdownOpen(false);
    }
    }
    document.addEventListener('click',handleClickOutside);
    return()=>document.removeEventListener('click',handleClickOutside);
  },[profileDropdownOpen]);

  return (
    <div className="flex-h-screen bg-slate-50">
   <div className='flex-1 flex flex-col'>
    <header className='bg-white/80 backdrop-blur-sm border-b border-gray-200 h-16 flex flex-row justify-between px-8'>
      <div className='flex items-center justify-between space-x-4'>
        <Link className='flex items-center space-x-3' to='/dashboard'>
        <div className='h-8 w-8 bg-gradient-to-br from-violet-400 to violet-500 rounded-lg flex items-center justify-center'>
        <Album className='h-5 w-5 text-white'/>
      </div>
      <span className='text-black font-bold text-xl'>AI ebook creator</span>
      </Link>
      </div>
      <div className='flex items-center space-x-3'>
       <ProfileDropdown isOpen={profileDropdownOpen} onToggle={()=>{
        setProfileDropdownOpen(!profileDropdownOpen);}}
        avatar={user?.avatar||""}
        companyName={user?.user?.name||""}
        email={user?.user?.email||""}
        onlogout={logout}/>
      </div>
    </header>
    <main className='flex-1 overflow-auto'>{children}</main>
   </div>
    </div>
  )
}

export default DashboardLayout