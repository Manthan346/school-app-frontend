import React, { useState, useEffect, useRef } from 'react'
import { Search, ShoppingCart, User, MapPin, X, Users, GraduationCap, Calendar, Building, Star, ExternalLink, Mic ,Badge} from "lucide-react"
import { schoolsData } from '../data/schoolsData' // Import your school data

const Avatar = ({ className, children, ...props }) => (
  <div className={`rounded-full ${className}`} {...props}>
    {children}
  </div>
)

export default function SearchComponent({ onNavigateToList }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const searchRef = useRef(null)
  const resultsRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      const filtered = schoolsData.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 5))
      setShowResults(true)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target)
      ) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onNavigateToList({ search: searchQuery.trim() })
      setShowResults(false)
    }
  }

  const handleSchoolClick = (school) => {
    onNavigateToList({
      search: school.name,
      state: school.state,
      city: school.city
    })
    setSearchQuery('')
    setShowResults(false)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowResults(false)
  }

  const getSchoolRating = (established) => {
    const age = 2024 - parseInt(established, 10)
    return Math.min(5, Math.max(3.5, (age / 50) + 3.5)).toFixed(1)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
            smart search
          </button>
          <div className="flex items-center gap-6">
            <button
              size="icon"
              className="relative bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center shadow hover:shadow-lg transition"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
             
               
             
            </button>
            <div className="relative">
              {/* Avatar */}
              <Avatar
                className="h-12 w-12 bg-gray-300 flex items-center justify-center border border-black text-white font-medium cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                JD
              </Avatar>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-black rounded-lg shadow-lg py-2 z-50 ">
                  <div className="px-4 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-lg cursor-pointer">
                    Rohit
                  </div>
                  <div className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer">
                    System Admin
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Search Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full bg-white">
        <div className="w-full max-w-2xl px-4 relative">
          <div ref={searchRef} className="relative">
            <div className="flex items-center bg-white border rounded-full shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-blue-500">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for Schools / Institutions"
                className="flex-1 px-4 py-3 bg-transparent border-0 text-base focus:outline-none rounded-full"
                onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                onFocus={() => searchQuery && setShowResults(true)}
              />
              {searchQuery && (
                <button onClick={clearSearch} className="p-2 text-gray-500 hover:text-gray-700">
                  <X className="h-4 w-4" />
                </button>
              )}
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Mic className="h-5 w-5" />
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full m-1"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {showResults && (
              <div
                ref={resultsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
              >
                {isLoading ? (
                  <div className="p-4 text-center text-gray-600">
                    <div className="inline-flex items-center">
                      <div className="animate-spin h-4 w-4 border-b-2 border-blue-600 mr-2 rounded-full"></div>
                      Searching...
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="p-3 border-b bg-gray-50 rounded-t-xl flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        Found {searchResults.length} school{searchResults.length !== 1 && 's'}
                      </span>
                      <button onClick={handleSubmit} className="text-xs text-blue-600 hover:text-blue-800">
                        View all results →
                      </button>
                    </div>
                    {searchResults.map(school => (
                      <div
                        key={school.id}
                        onClick={() => handleSchoolClick(school)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b flex justify-between items-start"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h4 className="font-semibold truncate flex-1">{school.name}</h4>
                            <div className="ml-2 flex items-center bg-yellow-100 px-2 py-0.5 rounded-full">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium text-yellow-800">
                                {getSchoolRating(school.established)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {school.city}, {school.state}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-1 text-xs">
                            <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              <Building className="h-3 w-3 mr-1" />
                              {school.type}
                            </span>
                            <span className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {school.grades}
                            </span>
                            <span className="flex items-center bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
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
                        <ExternalLink className="h-5 w-5 text-gray-400 ml-3" />
                      </div>
                    ))}
                    {searchResults.length === 5 && (
                      <div className="p-3 text-center bg-gray-50 rounded-b-xl">
                        <button onClick={handleSubmit} className="text-sm text-blue-600 hover:text-blue-800">
                          View all search results →
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="font-medium">No schools found</p>
                    <p className="text-sm mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600">
            <span>Lang Selection:</span>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="bg-transparent border-0 text-blue-600 font-medium focus:outline-none cursor-pointer"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
            </select>
          </div>
        </div>

        {/* <footer className="absolute bottom-4 w-full text-center">
          <p className="text-sm text-gray-500">footer for company and website details</p>
        </footer> */}
      </main>
    </div>
  )
}
