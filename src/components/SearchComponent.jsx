import React, { useState, useEffect, useRef } from 'react'
import { Search, ShoppingCart, MapPin, X, Users, GraduationCap, Calendar, Building, Star, ExternalLink, Mic } from 'lucide-react'
import { states, schoolsData, genderOptions, schoolTypes } from '../data/schoolsData'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

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
  const [showDropdown, setShowDropdown] = useState(false)

  // Filters
  const [showFilters, setShowFilters] = useState(false)
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [year, setYear] = useState('')

  const clearFilters = () => {
    setSelectedState('')
    setSelectedCity('')
    setSelectedGender('')
    setSelectedType('')
    setYear('')
  }

  useEffect(() => {
    if (
      !searchQuery.trim() &&
      !selectedState &&
      !selectedCity &&
      !selectedGender &&
      !selectedType &&
      !year
    ) {
      setSearchResults([])
      setShowResults(false)
      return
    }
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      let filtered = schoolsData

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        filtered = filtered.filter(
          school =>
            school.name.toLowerCase().includes(q) ||
            school.city.toLowerCase().includes(q) ||
            school.state.toLowerCase().includes(q) ||
            school.address.toLowerCase().includes(q) ||
            school.type.toLowerCase().includes(q)
        )
      }
      if (selectedState)
        filtered = filtered.filter(school => school.state === selectedState)
      if (selectedCity)
        filtered = filtered.filter(school => school.city === selectedCity)
      if (selectedGender)
        filtered = filtered.filter(school => school.gender === selectedGender)
      if (selectedType)
        filtered = filtered.filter(school => school.type === selectedType)
      if (year)
        filtered = filtered.filter(
          school => Number(school.established) >= Number(year)
        )

      setSearchResults(filtered.slice(0, 5))
      setShowResults(true)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedState, selectedCity, selectedGender, selectedType, year])

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
      city: school.city,
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
    return Math.min(5, Math.max(3.5, age / 50 + 3.5)).toFixed(1)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">

      {/* Smart Search Filter Toggle */}
      <div className="fixed top-4 left-4 z-50 mb-10">
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          aria-controls="smart-search-filters"
          className="bg-blue-600 shadow-lg text-white w-80 rounded-4xl h-10 "
        >
          {showFilters ? 'Smart Search ▲' : 'Smart Search ▼'}
        </button>
      </div>

      {/* Smart Search Sidebar */}
      {showFilters && (
        <div
          id="smart-search-filters"
          className="fixed top-20 left-4 w-[330px] p-6 bg-white rounded-2xl shadow-2xl border border-black h-190 z-40 space-y-5"
        >
          <div>
            <label htmlFor="state-select" className="block mb-2 font-semibold text-gray-700">
              State
            </label>
            <Select value={selectedState} onValueChange={val => {setSelectedState(val); setSelectedCity('')}}>
              <SelectTrigger id="state-select" className="w-full h-10 rounded-lg border border-black">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {Object.keys(states).map((st) => (
                  <SelectItem key={st} value={st}>{st}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="city-select" className="block mb-2 font-semibold text-gray-700">
              City
            </label>
            <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
              <SelectTrigger id="city-select" className={`w-full h-10 rounded-lg border border-black ${!selectedState ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {(states[selectedState] || []).map((ct) => (
                  <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="gender-select" className="block mb-2 font-semibold text-gray-700">
              Gender
            </label>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger id="gender-select" className="w-full h-10 rounded-lg border border-black">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {genderOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="type-select" className="block mb-2 font-semibold text-gray-700">
              School Type
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type-select" className="w-full h-10 rounded-lg border border-black">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {schoolTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="year-input" className="block mb-2 font-semibold text-gray-700">
              Established Year (minimum)
            </label>
            <Input
              id="year-input"
              type="number"
              placeholder="e.g. 1900"
              min={1600}
              max={2024}
              value={year}
              onChange={e => setYear(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Header */}
      <header className="w-full bg-white ">
        <div className="w-full px-6 py-4 flex justify-end items-center">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center shadow hover:shadow-lg transition"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
            </Button>
            <div className="relative">
              <Avatar
                className="h-12 w-12 bg-gray-300 flex items-center justify-center border border-black text-white font-medium cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                JD
              </Avatar>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-black rounded-lg shadow-lg py-2 z-50">
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
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full bg-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl relative">
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
                aria-label="Search schools or institutions"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Microphone">
                <Mic className="h-5 w-5" />
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full m-1"
                aria-label="Search"
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
                    {searchResults.map((school) => (
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
      </main>
    </div>
  )
}
