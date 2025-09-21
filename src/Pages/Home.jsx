import React from 'react'
import Search from '../components/Search'

function Home() {
  return (
    <>
      <div className="min-h-screen bg-sidebar-accent">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ">
                School Web
                <span className="block bg-blue-600 bg-clip-text text-transparent">
                  Application
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Streamline your educational experience with our comprehensive platform designed for students, teachers, and administrators.
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <span className="inline-flex items-center rounded-full bg-card px-3 py-1 text-sm font-medium text-card-foreground ring-1 ring-border">
                Modern Interface
              </span>
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                Easy to Use
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                Secure & Reliable
              </span>


            </div>
            <Search />
          </div>

          {/* Search Section */}
        </div>
      </div>



    </>
  )
}

export default Home