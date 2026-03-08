import React from 'react'
import { useAuth } from "../../context/AuthContext"
import { ArrowRight,Sparkles,BookOpen,Zap} from 'lucide-react'
import {Link} from "react-router-dom"
import HERO_IMG from "../../../assets/herobg.png"

const Hero = () => {
     const { isAuthenticated } = useAuth()
  return (
    <div className='relative 
    bg-gradient-to-br from-violet-50 via-white to purple-50
    overflow'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32
        relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16
         items-center'>

            {/* left */}
            <div className='max-w-xl space-y-8'>
                
           <div className='inline-flex items-center space-x-2
           bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border
        border-violet-100
           '>
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className='text-sm font-medium text-violet-900'>AI powered Publishing</span>
           </div>
          
       <h1 className='text-5xl sm:text-6xl lg:text-6xl font-bold
       text-gray-900 leading-tight'>
        Create Stunning 
        <span className='block mt-2 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent'>Ebooks in Minutes</span>
       </h1>
     <p className='text-lg text-gray-600 leading-relaxed'>From idea to published ebook, our AI-powered platform helps you to write, design, and export professional-quality books effortlessly</p>
     <div className='flex flex-col sm:flex-row row-items-start sm:items-center
     gap-4'>
        <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="group inline-flex items-center space-x-2 
              bg-linear-to-r from-violet-600  via-purple-600 
              to-violet-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              <span>Start Creating for Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-tranform" />
            </Link>
             <a
              href="#demo"
              className="inline-flex items-center space-x-2 text-gray-700 font-medium hover:text-violet-400 transition-colors duration-200"
            >
              <span>Watch Demo</span>
              <span className="text-violet-500"> <ArrowRight className="w-5 h-5"/></span>
            </a>
     </div>
     <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm trext-gray-600">Books Created</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">10min</div>
              <div className="text-sm text-gray-600">Avg. Creation</div>
            </div>
          </div>

      </div>

      <div className='relative lg:pl-8'>
        <div className='relative'>
        <div className='absolute -inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-20 blur-2xl'></div>
            <div className='relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100'>
            <img src={HERO_IMG} alt="AI Ebook creator Image"
            className='w-full h-auto'/>

           
        </div>
        </div>
      </div>
       
               
            </div>
  <div className="absolute -top-8 -left-8 w-20 h-20 bg-violet-400/20 rounded-2xl rotate-12"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-violet-400/20 rounded-full"></div>
    </div>
    </div>
  )
}

export default Hero
