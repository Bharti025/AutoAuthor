import React,{useState} from "react"
import { Input } from "@/components/ui/input"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import axios from "axios";
import { Backend_Url } from "@/utils/apiPath"
import { API_PATHS } from "@/utils/apiPath"
import { useAuth } from "@/components/context/authContext"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { showError, showSuccess } from "@/components/ui/ToastFunctions";
import { useNavigate } from "react-router-dom"
const SignUpPage = () => {
  const [loading,setLoading]=useState(false);
  const [formData,setformData]=useState({
    name:"",
    email:"",
    password:""
  })
const {login}=useAuth();
const navigate=useNavigate();
  const handleChange=(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
   e.preventDefault();
   setLoading(true);
   try{
    const response= await axios.post(`${Backend_Url}${API_PATHS.AUTH.REGISTER}`,formData);
        
         const { token } = response.data;
          const profileResponse = await axios.get(`${Backend_Url}${API_PATHS.AUTH.GET_PROFILE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      login(profileResponse.data, token);
      showSuccess("Registration Successful");
      navigate("/dashboard");
   }
   catch(err){
   console.error(err);
   localStorage.clear();
      showError(err.response?.data?.message || "Signup Failed. Please try again");
   }
   finally{
    setLoading(false);
   }

  }

  return (
    <div className="min-h-screen flex-col flex items-center justify-center
     bg-gradient-to-br from-violet-100 via-purple-100 to-violet-200 px-4 space-y-4">
          <div className="flex flex-col justify-center items-center space-y-2">
          <div className="h-14 w-14 flex items-center justify-center bg-violet-500 rounded-full shadow-md space-y-1">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col items-center justify-center" >
            <h1 className="text-2xl font-bold text-gray-900">
        Create an Account
          </h1>
          <p className="text-sm text-gray-500">
           Start your journey of creating amazing eBooks today.
          </p>
          </div>
        <div>
          
          </div>
          </div>     
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Form */}
        <form onSubmit={handleSubmit}>
        <FieldGroup className="px-2">
        <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input
              id="fieldgroup-name"
              type="text"
              placeholder="Enter your name" 
             name="name"
             value={formData.name}
             onChange={handleChange}
            />
           
          </Field>

          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
                name="email"
             value={formData.email}
             onChange={handleChange}
            />
           
          </Field>
              <Field>
            <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
            <Input
              id="fieldgroup-password"
              type="password"
              placeholder="••••••••"
                name="password"
             value={formData.password}
             onChange={handleChange}
            />
          </Field>

          <Field orientation="horizontal" className="items-center">
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
          Create an account
            </Button>
          </Field>
        </FieldGroup>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">Already have an account ? <span><Link to="/login" 
        className="text-violet-600 hover:underline">Login</Link></span></p>
</div>
      </div>
    
  )
}

export default SignUpPage
