import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'  
import { 
  Search, 
  ShoppingCart, 
  User, 
  MapPin, 
  Clock, 
  Users, 
  GraduationCap, 
  Filter, 
  X, 
  ExternalLink,
  Check,
  Star,
  Award,
  Calendar,
  Building,
  Heart,
  Sparkles,
  TrendingUp
} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../components/ui/select'
import { Badge } from '../components/ui/badge'

import { schoolsData,schoolTypes,states,genderOptions } from '../data/schoolsData'  // Adjust path as needed


export default function SchoolList() {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')
  const [year, setYear] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [filtered, setFiltered] = useState(schoolsData)
  const [showFilters, setShowFilters] = useState(false)
  const [cartItems, setCartItems] = useState(new Set())
  const [favorites, setFavorites] = useState(new Set())
  const [expandedId, setExpandedId] = useState(null)

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchFromUrl = urlParams.get('search')
    const stateFromUrl = urlParams.get('state')
    const cityFromUrl = urlParams.get('city')
    const highlightFromUrl = urlParams.get('highlight')
    
    if (searchFromUrl) setSearchTerm(searchFromUrl)
    if (stateFromUrl) setState(stateFromUrl)
    if (cityFromUrl) setCity(cityFromUrl)
    if (highlightFromUrl) setExpandedId(parseInt(highlightFromUrl))
  }, [])

  useEffect(() => {
    let list = schoolsData
    
    if (searchTerm) {
      list = list.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (state) {
      list = list.filter(school => school.state === state)
    }
    
    if (city) {
      list = list.filter(school => school.city === city)
    }
    
    if (gender) {
      list = list.filter(school => school.gender === gender)
    }
    
    if (year) {
      list = list.filter(school => parseInt(school.established) >= parseInt(year))
    }
    
    setFiltered(list)
  }, [state, city, gender, year, searchTerm])

  const clearFilters = () => {
    setState('')
    setCity('')
    setGender('')
    setYear('')
    setSearchTerm('')
    setExpandedId(null)
  }

  const addToCart = (schoolId) => {
    if (!cartItems.has(schoolId)) {
      setCartItems(new Set([...cartItems, schoolId]))
      setCartCount(prev => prev + 1)
    }
  }

  const toggleDetails = (schoolId) => {
    setExpandedId(expandedId === schoolId ? null : schoolId)
  }

  const isInCart = (schoolId) => cartItems.has(schoolId)
  const isFavorite = (schoolId) => favorites.has(schoolId)
  const hasActiveFilters = state || city || gender || year || searchTerm

  const getSchoolRating = (established) => {
    const age = 2024 - parseInt(established)
    return Math.min(5, Math.max(3.5, (age / 50) + 3.5)).toFixed(1)
  }

  return (
    <>
      {/* Hero Section */}
     

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-center border-2 hover:border-primary/50 transition-all duration-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative ">
          {/* Enhanced Sidebar Filters */}
          <aside className={`lg:w-[20%] relative ${showFilters ? 'block' : 'hidden md:block'}`}>
            <Card className="sticky top-6 backdrop-blur-sm bg-card/95 w-70 border-0 shadow-2xl ring-1 ring-border/20 hover:shadow-xl hover:ring-primary/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between ">
                  <h3 className="text-lg font-bold flex items-center">
                    <div className="p-2 bg-primary/10 rounded-lg mr-2">
                      <Filter className="h-4 w-4 text-primary" />
                    </div>
                    Search Criteria
                  </h3>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">State</label>
                  <Select value={state} onValueChange={(v) => { setState(v); setCity('') }}>
                    <SelectTrigger className="border-2 hover:border-primary/50 focus:border-primary transition-all duration-300 hover:shadow-md">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(states).map((st) => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">City</label>
                  <Select value={city} onValueChange={setCity} disabled={!state}>
                    <SelectTrigger className="border-2 hover:border-primary/50 focus:border-primary transition-all duration-300 disabled:opacity-50 hover:shadow-md">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {(states[state] || []).map((ct) => (
                        <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Gender</label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="border-2 hover:border-primary/50 focus:border-primary transition-all duration-300 hover:shadow-md">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Established Year</label>
                  <Input
                    placeholder="e.g. 1900"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    type="number"
                    min="1600"
                    max="2024"
                    className="border-2 hover:border-primary/50 focus:border-primary transition-all duration-300 hover:shadow-md"
                  />
                </div>

                {/* Enhanced Active Filters */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-sm font-semibold text-foreground mb-2">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {state && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer">{state}</Badge>}
                      {city && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer">{city}</Badge>}
                      {gender && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer">{gender}</Badge>}
                      {year && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer">Est. ≥{year}</Badge>}
                      {searchTerm && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer">Search: "{searchTerm}"</Badge>}
                    </div>
                  </div>
                )}

                {/* Search Stats */}
                <div className="pt-4 border-t border-border/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Results found:</span>
                    <span className="font-bold text-primary text-lg">{filtered.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Enhanced Main Content */}
          <main className="flex-1 lg:w-[70%] space-y-6">
            {/* Enhanced Header with Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <div className="relative group">
                  <Input 
                    placeholder="Search schools, locations, programs..." 
                    className="pl-12 pr-4 py-3 text-base border-2 bg-card/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary group-hover:shadow-lg transition-all duration-300 w-full hover:bg-primary/5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <Button variant="outline" className="relative group border-2 hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:text-primary transition-all duration-300">
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="font-semibold group-hover:text-primary">Cart</span>
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary animate-pulse hover:scale-110 transition-transform duration-200">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="outline" className="border-2 hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:text-primary transition-all duration-300 group">
                  <User className="h-4 w-4 mr-2 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="font-semibold group-hover:text-primary">Profile</span>
                </Button>
              </div>
            </div>

            {/* Enhanced Results Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Premium Schools
                </h2>
                <p className="text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? 'institution' : 'institutions'} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Top Rated</span>
              </div>
            </div>

            {/* Enhanced Results Grid */}
            <div className="grid gap-6">
              {filtered.length === 0 ? (
                <Card className="p-12 text-center border-0 shadow-2xl bg-gradient-to-br from-card to-accent/5">
                  <div className="text-muted-foreground space-y-4">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">No schools found</h3>
                    <p className="text-base">Try adjusting your search criteria to find your perfect match</p>
                    <Button onClick={clearFilters} className="mt-4">
                      Reset Filters
                    </Button>
                  </div>
                </Card>
              ) : (
                filtered.map((school, index) => (
                  <Card key={school.id} className={`group hover:shadow-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 border ring-1 ring-border/20 hover:ring-primary/40 backdrop-blur-sm bg-card/95 hover:scale-[1.02] animation-delay-${index * 100}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col xl:flex-row gap-6">
                        {/* Enhanced School Info */}
                        <div className="flex-1 space-y-4">
                          {/* Header with Rating */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 
                                  className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 hover:scale-105 transform cursor-pointer"
                                  onClick={() => toggleDetails(school.id)}
                                >
                                  {school.name}
                                </h4>
                              </div>
                              
                              <p className="text-muted-foreground flex items-start space-x-2 mb-3">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                                <span className="text-sm">{school.address}</span>
                              </p>
                            </div>

                            {/* Rating Badge */}
                            <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-amber-700 text-sm">{getSchoolRating(school.established)}</span>
                            </div>
                          </div>

                          {/* Enhanced School Details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center space-x-2 p-2 bg-accent/5 rounded-lg hover:bg-primary/10 hover:border-primary/20 border transition-all duration-300">
                              <Building className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              <div>
                                <span className="text-xs text-muted-foreground">Type</span>
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">{school.type}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 p-2 bg-accent/5 rounded-lg hover:bg-primary/10 hover:border-primary/20 border transition-all duration-300">
                              <GraduationCap className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              <div>
                                <span className="text-xs text-muted-foreground">Grades</span>
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">{school.grades}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 p-2 bg-accent/5 rounded-lg hover:bg-primary/10 hover:border-primary/20 border transition-all duration-300">
                              <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              <div>
                                <span className="text-xs text-muted-foreground">Gender</span>
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">{school.gender}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 p-2 bg-accent/5 rounded-lg hover:bg-primary/10 hover:border-primary/20 border transition-all duration-300">
                              <Award className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              <div>
                                <span className="text-xs text-muted-foreground">Code</span>
                                <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">{school.code}</p>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Additional Info */}
                          <div className="flex flex-wrap gap-4 pt-3 border-t border-border/10">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span className="text-xs text-muted-foreground">Est.</span>
                              <span className="font-semibold text-primary text-sm">{school.established}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-3 w-3 text-primary" />
                              <span className="font-semibold text-primary text-sm">{school.students}</span>
                              <span className="text-xs text-muted-foreground">students</span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Action Section */}
                        <div className="flex flex-col justify-between xl:w-56 space-y-4">
                          {/* Enhanced Links */}
                          <div className="space-y-2">
                            <Button 
                              variant="link" 
                              className="text-primary hover:text-primary/80 p-0 h-auto justify-start font-semibold group/link text-sm hover:bg-primary/10 px-2 py-1 rounded transition-all duration-200"
                              onClick={() => toggleDetails(school.id)}
                            >
                              <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                                {expandedId === school.id ? 'Hide Details' : 'Learn More'} →
                              </span>
                            </Button>
                            <Button 
                              variant="link" 
                              className="text-primary hover:text-primary/80 p-0 h-auto justify-start font-semibold group/link text-sm hover:bg-primary/10 px-2 py-1 rounded transition-all duration-200"
                              onClick={() => window.open(school.website, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-2 group-hover/link:scale-110 transition-transform duration-300" />
                              <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                                Visit Website →
                              </span>
                            </Button>
                          </div>

                          {/* Enhanced Action Buttons */}
                          <div className="space-y-3">
                            <Button
                              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                              onClick={() => window.open(`/apply/${school.code}`, '_blank')}
                            >
                              <Award className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                            
                            <Button
                              variant={isInCart(school.id) ? "secondary" : "outline"}
                              className={`w-full py-2 font-semibold border-2 transition-all duration-300 ${
                                isInCart(school.id) 
                                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                                  : "hover:border-primary hover:bg-primary/5 hover:shadow-lg"
                              }`}
                              onClick={() => addToCart(school.id)}
                              disabled={isInCart(school.id)}
                            >
                              {isInCart(school.id) ? (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Added to Cart
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Enhanced Cart Indicator */}
                          {isInCart(school.id) && (
                            <div className="flex justify-center">
                              <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                                  <ShoppingCart className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                                  1
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expandable Details Section */}
                      {expandedId === school.id && (
                        <div className="mt-6 pt-6 border-t border-border/20 bg-card/50 backdrop-blur-sm p-4 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(school).map(([key, value]) => (
                              <div key={key} className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase">
                                  {key.replace(/([A-Z])/g, ' $1')}
                                </span>
                                <p className="font-semibold text-foreground">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
