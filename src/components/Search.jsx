import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'  // Import useNavigate hook
import { 
  Search, 
  MapPin, 
  Users, 
  GraduationCap, 
  Calendar,
  Building,
  Star,
  X,
  ExternalLink
} from "lucide-react"

// Import your actual school data
import { schoolsData } from '../data/schoolsData'  // Adjust path as needed

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef(null)
  const resultsRef = useRef(null)
  
  // Use React Router's navigate hook
  const navigate = useNavigate()

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsLoading(true)
    
    // Simulate API delay for better UX
    const timeoutId = setTimeout(() => {
      const filteredSchools = schoolsData.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setSearchResults(filteredSchools.slice(0, 5)) // Limit to 5 results
      setShowResults(true)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Navigating to SchoolList with search:', searchQuery.trim())
      // Navigate to SchoolList with search query as a parameter
      navigate(`/SchoolList?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
    }
  }

  const handleSchoolClick = (school) => {
    console.log('Navigating to SchoolList for school:', school.name)
    // Navigate to SchoolList with specific filters based on the clicked school
    const params = new URLSearchParams({
      search: school.name,
      state: school.state,
      city: school.city
    })
    navigate(`/SchoolList?${params.toString()}`)
    setShowResults(false)
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowResults(false)
  }

  const getSchoolRating = (established) => {
    const age = 2024 - parseInt(established)
    return Math.min(5, Math.max(3.5, (age / 50) + 3.5)).toFixed(1)
  }

  return (
    <div className="flex justify-center items-center relative top-10 p-4">
      <div className="w-full max-w-2xl relative">
        <div className="flex items-center gap-3">
          {/* Search Input Container */}
          <div className="relative flex-1" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for schools, locations, programs..."
              className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              onFocus={() => searchQuery && setShowResults(true)}
            />
            
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-sm hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {/* Mic Icon */}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-sm hover:bg-gray-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>
          </div>
          
          {/* Search Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div 
            ref={resultsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                  Searching...
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="p-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Found {searchResults.length} school{searchResults.length !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={handleSubmit}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all results →
                    </button>
                  </div>
                </div>
                
                {searchResults.map((school) => (
                  <div
                    key={school.id}
                    onClick={() => handleSchoolClick(school)}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {school.name}
                          </h4>
                          <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-full">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium text-amber-700">
                              {getSchoolRating(school.established)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="truncate">{school.city}, {school.state}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {school.type}
                          </span>
                          <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full flex items-center">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {school.grades}
                          </span>
                          <span className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 rounded-full flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {school.gender}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Est. {school.established}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {school.students} students
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-3 flex-shrink-0">
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {searchResults.length === 5 && (
                  <div className="p-3 text-center border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    <button
                      onClick={handleSubmit}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all search results →
                    </button>
                  </div>
                )}
              </>
            ) : searchQuery.trim() !== '' ? (
              <div className="p-8 text-center text-gray-500">
                <div className="mb-3">
                  <Search className="h-8 w-8 text-gray-300 mx-auto" />
                </div>
                <p className="font-medium">No schools found</p>
                <p className="text-sm mt-1">Try searching with different keywords</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchComponent