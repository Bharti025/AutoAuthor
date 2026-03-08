import React from 'react'
import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import ProtectedRoute from './components/auth/ProtectedRoute'
import LandingPage from "./pages/LandingPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignUpPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import EditorPage from "./pages/EditorPage.jsx"
import ViewBookPage from "./pages/ViewBookPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
      <Router>
        <Toaster position="top-right" />
     <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
      <Route path="/editor/:bookId" element={<ProtectedRoute><EditorPage/></ProtectedRoute>}/>
       <Route path="/viewbook/:bookId" element={<ProtectedRoute><ViewBookPage/></ProtectedRoute>}/>
       <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>

     </Routes>
     </Router>
  )
}

export default App
