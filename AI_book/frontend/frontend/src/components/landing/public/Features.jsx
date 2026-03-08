import React from 'react'
import { FEATURES } from '@/utils/data'
import { Button } from '@/components/ui/Button'
const Features = () => {
  return (
    <div id="features" className='relative py-24 lg:py-32 border-b border-[#e8e0d5] bg-[#faf7f3] overflow-hidden '>
      <div className="absolute inset-0 bg-linear-to-r from-violet-50/50 via-transparent to-purple-50/50"></div>
      <div className='"max-w-7xl mx-auto px-6 lg:px-8 relative'>
       <div className='text-center mb-20 space-y-4 p-4'>
     
              <div className="inline-flex items-center space-x-2 bg-violet-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-violet-900">
              Features
            </span>
        
        </div>
        <h1 className='text-5xl sm:text-6xl lg:text-6xl font-bold
       text-gray-900 leading-tight'>
        Everything you need to
        <span className='block mt-2 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent'>
            Create your Ebook</span>
       </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4">
            Our platform is packed with powerful features to help you write, design,and publish your ebook effortlessly
          </p>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 sm:gap-12 p-4'>
            {FEATURES.map((feature,index) => {
           const Icon = feature.icon;
           return (
            
              <div
                key={index}
                className='group relative bg-white rounded-2xl p-12 border border-gray-100 space-y-4
                 hover:border-violet-200 transition-all duration-300 hover:shadow-xl 
                 hover:shadow-violet-500/50 hover:translate-y-1 flex flex-col items-center'
              >
                <div className={`bg-linear-to-br ${feature.gradient} w-10 h-10 rounded-lg p-2 text-white flex items-center
                justify-center hover:scale-110 shadow-lg shadow-${feature.gradient}-20/50`}>
                    <Icon/>
                    </div>
                   
                 <h3 className='text-black font-bold text-lg mb-3 mt-6'>
                    {feature.title}
                  
                  </h3>
                  <p className='text-gray-600 mt-2 text-sm'>
                    {feature.description}
                  </p>
                       
              </div>
         
           )
          })}
          </div>
          <div className='flex flex-col space-y-4 items-center mt-6 gap-2'>
         <p className='text-gray-600 text-sm mt-4'>Ready to get started</p>
         <Button className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 text-lg text-white px-6 py-6 rounded-xl">Start Creating Today</Button>
          </div>
       </div>
      </div>
    </div>
  )
}

export default Features
