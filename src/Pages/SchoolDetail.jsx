import React, { useState, useEffect } from 'react'
import { schoolsData, states, genderOptions } from '../data/schoolsData'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Search, ShoppingCart, User, MapPin, X } from "lucide-react"

export default function SchoolList() {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')
  const [year, setYear] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [state, city, gender, year, searchTerm])

  const filtered = schoolsData.filter(school => (
    (!searchTerm || school.name.toLowerCase().includes(searchTerm.toLowerCase())
      || school.city.toLowerCase().includes(searchTerm.toLowerCase())
      || school.state.toLowerCase().includes(searchTerm.toLowerCase()))
    && (!state || school.state === state)
    && (!city || school.city === city)
    && (!gender || school.gender === gender)
    && (!year || +school.established >= +year)
  ))

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const clearFilters = () => {
    setSearchTerm(''); setState(''); setCity(''); setGender(''); setYear('')
  }
  
  const addToCart = id => setCartItems(prev => new Set(prev).add(id))

  // Check if any filters are applied
  const hasFilters = searchTerm || state || city || gender || year

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-1/4 p-6 bg-card/90 rounded-l-lg space-y-4">
        <h2 className="text-lg font-bold">Search Options</h2>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="w-full"><SelectValue placeholder="State" /></SelectTrigger>
          <SelectContent>
            {Object.keys(states).map(st => <SelectItem key={st} value={st}>{st}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={city} onValueChange={setCity} disabled={!state}>
          <SelectTrigger className="w-full"><SelectValue placeholder="City" /></SelectTrigger>
          <SelectContent>
            {(states[state]||[]).map(ct => <SelectItem key={ct} value={ct}>{ct}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Gender" /></SelectTrigger>
          <SelectContent>
            {genderOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Year"
          min="1600"
          max="2024"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="w-full"
        />
        <Button variant="outline" onClick={clearFilters} className="w-full mt-2">
          Clear Filters
        </Button>
      </aside>

      <main className="flex-1 p-8">
        {/* Search Bar */}
        <div className="flex items-center mb-4 space-x-4">
          <div className="flex flex-1 items-center bg-white border border-border rounded-lg">
            <Input
              placeholder="Search for Schools / Institutions"
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
              className="border-none flex-1 px-4 py-2"
            />
            <Search className="h-10 w-10 bg-blue-600" />
          </div>
          <button className="relative">
            <ShoppingCart className="h-6 w-6 text-primary" />
            {cartItems.size>0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{cartItems.size}</span>
            )}
          </button>
          <button><User className="h-6 w-6 text-primary" /></button>
        </div>

        {/* Filters Applied Section */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">Filters applied:</span>
          
          {searchTerm && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1">
              Search: {searchTerm}
              <X 
                className="ml-2 h-3 w-3 cursor-pointer" 
                onClick={() => setSearchTerm('')}
              />
            </Badge>
          )}
          
          {state && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1">
              State: {state}
              <X 
                className="ml-2 h-3 w-3 cursor-pointer" 
                onClick={() => setState('')}
              />
            </Badge>
          )}
          
          {city && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1">
              City: {city}
              <X 
                className="ml-2 h-3 w-3 cursor-pointer" 
                onClick={() => setCity('')}
              />
            </Badge>
          )}
          
          {gender && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1">
              Gender: {gender}
              <X 
                className="ml-2 h-3 w-3 cursor-pointer" 
                onClick={() => setGender('')}
              />
            </Badge>
          )}
          
          {year && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1">
              Year ≥ {year}
              <X 
                className="ml-2 h-3 w-3 cursor-pointer" 
                onClick={() => setYear('')}
              />
            </Badge>
          )}
          
          {!hasFilters && (
            <span className="text-sm text-gray-500">None</span>
          )}
          
          {hasFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="ml-4 text-xs"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Showing Results */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filtered.length} results
        </div>

        {/* Results Container - Absolutely NO GAPS */}
        <div style={{border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
          {currentItems.map((school, index) => (
            <div 
              key={school.id}
              style={{
                backgroundColor: 'white',
                borderBottom: index !== currentItems.length - 1 ? '1px solid #e2e8f0' : 'none',
                margin: 0,
                padding: 0
              }}
            >
              <div style={{padding: '24px'}}>
                <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
                  {/* Left: School Name & Address */}
                  <div style={{flex: 1, minWidth: '280px'}}>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', margin: 0}}>
                      {school.name}
                    </h3>
                    <div style={{fontSize: '14px', color: '#6b7280', lineHeight: '1.4'}}>
                      <div style={{display: 'flex', alignItems: 'start', marginBottom: '4px'}}>
                        <MapPin style={{height: '16px', width: '16px', marginRight: '4px', marginTop: '2px', flexShrink: 0}} />
                        <span>{school.address}</span>
                      </div>
                      <div style={{marginLeft: '20px'}}>
                        {school.city}, {school.state}
                      </div>
                      <div style={{marginLeft: '20px'}}>
                        United States
                      </div>
                    </div>
                  </div>

                  {/* Middle: Details */}
                  <div style={{flex: 1, paddingLeft: '32px', paddingRight: '32px'}}>
                    <div style={{fontSize: '14px'}}>
                      <div style={{marginBottom: '4px'}}>
                        <span style={{fontStyle: 'italic'}}>Distance:</span> <span style={{fontWeight: '600'}}>Miles</span>
                      </div>
                      <div style={{marginBottom: '4px'}}>
                        <span style={{fontStyle: 'italic'}}>Campus Type:</span> <span style={{fontWeight: '600'}}>{school.type}</span>
                      </div>
                      <div>
                        <span style={{fontStyle: 'italic'}}>Grades:</span> <span style={{fontWeight: '600'}}>{school.grades}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Gender & Code */}
                  <div style={{flex: 1, paddingLeft: '32px', paddingRight: '32px'}}>
                    <div style={{fontSize: '14px'}}>
                      <div style={{marginBottom: '4px'}}>
                        <span style={{fontStyle: 'italic'}}>Gender:</span> <span style={{fontWeight: '600'}}>{school.gender} School</span>
                      </div>
                      <div>
                        <span style={{fontStyle: 'italic'}}>School Code:</span> <span style={{fontWeight: '600'}}>{school.code}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '8px', minWidth: '180px'}}>
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                      Learn More about this School →
                    </Button>
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                      Go to website →
                    </Button>
                    <Button 
                      style={{
                        backgroundColor: '#f97316',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '8px'
                      }}
                      onClick={() => addToCart(school.id)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-1 mt-6">
          <Button variant="outline" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            FIRST
          </Button>
          <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            PREV
          </Button>
          
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button 
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNum)}
                className="min-w-[40px]"
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            NEXT
          </Button>
          <Button variant="outline" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            LAST
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          footer for company and website details
        </div>
      </main>
    </div>
  )
}
