import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuth = ()=> {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be within an AuthProvider")
    }
    return context
};

export const AuthProvider=({children})=>{
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(true);
const [isAuthenticated,setisAuthenticated]=useState(false);

useEffect(()=>{
checkAuthStatus();
},[]);
    
const checkAuthStatus=async()=>{
try{
const token=localStorage.getItem("token");
const user=localStorage.getItem("user");
if(token && user){
    const userData=JSON.parse(user)
    setUser(userData);
    setisAuthenticated(true);
}
}


catch(err){
    console.log(err,"Auth check error");
}

finally {
    setLoading(false);
}
}

const login=(userData,token)=>{
localStorage.setItem("token",token);
localStorage.setItem("user",JSON.stringify(userData));
setUser(userData);
setisAuthenticated(true);
}

const logout=()=>{
localStorage.removeItem("token");
localStorage.removeItem("user");
setUser(null);
setisAuthenticated(false);
window.location.href="/";
}

const value={
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    // updateUser,
    checkAuthStatus
}

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}