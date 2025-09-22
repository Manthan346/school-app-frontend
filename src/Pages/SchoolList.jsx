// import React, { useState, useEffect } from 'react'
// import { Search, ShoppingCart, User, MapPin, X } from "lucide-react"
// import { schoolsData } from '../data/schoolsData' // Import your school data
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"


// const states = {
//   "Pennsylvania": ["Jenkintown", "Philadelphia"],
//   "Florida": ["Land O Lakes", "Coral Gables"],
//   "California": ["San Francisco", "Studio City"],
//   "Massachusetts": ["Boston"],
//   "Illinois": ["Chicago"],
//   "Colorado": ["Lakewood"],
//   "New York": ["New York"],
//   "District of Columbia": ["Washington"],
//   "Virginia": ["Richmond"]
// }


// const genderOptions = [
//   { value: "Coed", label: "Coed" },
//   { value: "Boys", label: "Boys" },
//   { value: "Girls", label: "Girls" }
// ]


// // Mock UI components
// const Input = ({ className, ...props }) => <input className={`border rounded px-3 py-2 ${className}`} {...props} />
// const Button = ({ variant, className, children, disabled, ...props }) => (
//   <button
//     className={`px-4 py-2 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''
//       } ${variant === 'outline' ? 'border bg-white hover:bg-gray-50' : 'bg-blue-600 text-white hover:bg-blue-700'
//       } ${className}`}
//     disabled={disabled}
//     {...props}
//   >
//     {children}
//   </button>
// )
// const Select = ({ value, onValueChange, disabled, children }) => (
//   <select
//     value={value}
//     onChange={e => onValueChange(e.target.value)}
//     disabled={disabled}
//     className="w-full border rounded px-3 py-2 bg-white"
//   >
//     {children}
//   </select>
// )
// const Badge = ({ className, children, onClick }) => (
//   <span className={`inline-flex items-center px-2 py-1 rounded text-sm cursor-pointer ${className}`} onClick={onClick}>
//     {children}
//   </span>
// )


// export default function SchoolList({ filters = {}, onBackToSearch, onUpdateFilters }) {
//   const [state, setState] = useState(filters.state || '')
//   const [city, setCity] = useState(filters.city || '')
//   const [gender, setGender] = useState('')
//   const [year, setYear] = useState('')
//   const [searchTerm, setSearchTerm] = useState(filters.search || '')
//   const [cartItems, setCartItems] = useState(new Set())
//   const [currentPage, setCurrentPage] = useState(1)
//   const [showFilters, setShowFilters] = useState(false)

//   const itemsPerPage = 5

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [state, city, gender, year, searchTerm])

//   useEffect(() => {
//     if (filters.search && !searchTerm) {
//       setSearchTerm(filters.search)
//     }
//     if (filters.state && !state) {
//       setState(filters.state)
//     }
//     if (filters.city && !city) {
//       setCity(filters.city)
//     }
//   }, [filters])

//   const filtered = schoolsData.filter(school => (
//     (!searchTerm || school.name.toLowerCase().includes(searchTerm.toLowerCase())
//       || school.city.toLowerCase().includes(searchTerm.toLowerCase())
//       || school.state.toLowerCase().includes(searchTerm.toLowerCase()))
//     && (!state || school.state === state)
//     && (!city || school.city === city)
//     && (!gender || school.gender === gender)
//     && (!year || +school.established >= +year)
//   ))

//   const totalPages = Math.ceil(filtered.length / itemsPerPage)
//   const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const clearFilters = () => {
//     setSearchTerm('')
//     setState('')
//     setCity('')
//     setGender('')
//     setYear('')
//     setCurrentPage(1)
//     onUpdateFilters({})
//   }

//   const removeFilter = (filterType) => {
//     switch (filterType) {
//       case 'search':
//         setSearchTerm('')
//         break
//       case 'state':
//         setState('')
//         setCity('')
//         break
//       case 'city':
//         setCity('')
//         break
//       case 'gender':
//         setGender('')
//         break
//       case 'year':
//         setYear('')
//         break
//     }
//     setCurrentPage(1)
//   }

//   const addToCart = id => setCartItems(prev => new Set(prev).add(id))
//   const hasFilters = searchTerm || state || city || gender || year

//   const generatePageNumbers = () => {
//     const pages = []
//     const maxVisiblePages = 5

//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i)
//       }
//     } else {
//       let startPage = Math.max(1, currentPage - 2)
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

//       if (endPage - startPage < maxVisiblePages - 1) {
//         startPage = Math.max(1, endPage - maxVisiblePages + 1)
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i)
//       }
//     }

//     return pages
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50 r">

//       {/* Button to toggle filters dropdown */}
//      <div className="fixed top-4 left-4 z-50 h-10 mb-10">
//   <Button
//     onClick={() => setShowFilters(!showFilters)}
//     className="rounded-full px-5 py-2 text-sm w-75 relative top-5"
//   >
//     {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
//   </Button>
// </div>


//       {/* Filters Dropdown - appears below the toggle button */}
//       {showFilters && (
//         <div className="fixed top-20 left-4 w-75 h-190 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-lg font-bold text-gray-800">Search Options</h2>
          
//           </div>

//           {/* State Dropdown */}
//           <select
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             className="w-full h-10 border border-gray-300 rounded-lg p-2 text-sm   mb-3"
//           >
//             <option value="">Select State</option>
//             {Object.keys(states).map((st) => (
//               <option key={st} value={st}>
//                 {st}
//               </option>
//             ))}
//           </select>

//           {/* City Dropdown */}
//           <select
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             disabled={!state}
//             className="w-full border border-gray-300 rounded-lg p-2 text-sm  disabled:bg-gray-100 mb-3"
//           >
//             <option value="">Select City</option>
//             {(states[state] || []).map((ct) => (
//               <option key={ct} value={ct}>
//                 {ct}
//               </option>
//             ))}
//           </select>

//           {/* Gender */}
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 text-sm  mb-3"
//           >
//             <option value="">Select Gender</option>
//             {genderOptions.map((o) => (
//               <option key={o.value} value={o.value}>
//                 {o.label}
//               </option>
//             ))}
//           </select>

//           {/* Year */}
//           <Input
//             type="number"
//             placeholder="Established Year (minimum)"
//             min="1600"
//             max="2024"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 mb-3"
//           />

//           {/* Clear Filters Button */}
//           <Button
//             variant="outline"
//             onClick={clearFilters}
//             className="w-full rounded-lg border-gray-300 hover:bg-gray-100"
//           >
//             Clear All Filters
//           </Button>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-8 ml-0 md:ml-80">
//         {/* Search Bar */}
//         <div className="flex items-center mb-4 space-x-4">
//           <div className="flex flex-1 items-center bg-white border rounded-lg shadow-sm">
//             <Input
//               placeholder="Search for Schools / Institutions"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               className="border-none flex-1 px-4 py-2 focus:outline-none"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => removeFilter('search')}
//                 className="p-2 text-red-500 hover:text-red-700"
//                 title="Clear search"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             )}
//             <button className="p-2"><Search className="text-blue-600" /></button>
//           </div>
//           <button className="relative">
//             <ShoppingCart className="h-10 w-10 text-blue-600 " />
//             {cartItems.size > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{cartItems.size}</span>
//             )}
//           </button>
//           <Avatar className="w-10 h-10">
//             <AvatarImage src="https://github.cm/shacn.png" />
//   <AvatarFallback>Ma</AvatarFallback>
// </Avatar>
//           {/* <button><User className="h-10 w-10 text-blue-600" /></button> */}
//         </div>

//         {/* Filters Applied */}
//         <div className="flex items-center gap-2 mb-4 flex-wrap">
//           <span className="text-sm font-medium">Filters applied:</span>

//           {searchTerm && (
//             <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-1" onClick={() => removeFilter('search')}>
//               Search: {searchTerm}
//               <X className="ml-2 h-3 w-3 cursor-pointer" />
//             </Badge>
//           )}
//           {state && (
//             <Badge className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-1" onClick={() => removeFilter('state')}>
//               State: {state}
//               <X className="ml-2 h-3 w-3 cursor-pointer" />
//             </Badge>
//           )}
//           {city && (
//             <Badge className="bg-green-100 text-green-800 border border-green-300 px-3 py-1" onClick={() => removeFilter('city')}>
//               City: {city}
//               <X className="ml-2 h-3 w-3 cursor-pointer" />
//             </Badge>
//           )}
//           {gender && (
//             <Badge className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-1" onClick={() => removeFilter('gender')}>
//               Gender: {gender}
//               <X className="ml-2 h-3 w-3 cursor-pointer" />
//             </Badge>
//           )}
//           {year && (
//             <Badge className="bg-orange-100 text-orange-800 border border-orange-300 px-3 py-1" onClick={() => removeFilter('year')}>
//               Year ≥ {year}
//               <X className="ml-2 h-3 w-3 cursor-pointer" />
//             </Badge>
//           )}

//           {!hasFilters && <span className="text-sm text-gray-500">None</span>}
//           {hasFilters && (
//             <Button variant="outline" onClick={clearFilters} className="ml-2 text-xs">
//               Clear all filters
//             </Button>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="text-sm text-gray-600 mb-4">
//           Showing {filtered.length} results (Page {currentPage} of {totalPages})
//         </div>

//         {/* School Cards */}
//         <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
//           {currentItems.length > 0 ? (
//             currentItems.map((school, index) => (
//               <div key={school.id} className={`${index !== currentItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
//                 <div className="p-8 flex justify-between items-start">
//                   {/* Left */}
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">{school.name}</h3>

//                     <div className="flex items-start text-gray-600 mb-6">
//                       {/* Address block */}
//                       <div className="flex items-start w-1/2 pr-6">
//                         <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
//                         <div className="text-sm leading-relaxed">
//                           <div>{school.address}</div>
//                           <div>
//                             {school.city}, {school.state} {school.zipCode}
//                           </div>
//                           <div>United States</div>
//                         </div>
//                       </div>

//                       {/* Details block (on right side) */}
//                       <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm w-1/2">
//                         <div>
//                           <span className="text-gray-500 italic">Distance:</span>{" "}
//                           <span className="font-semibold">{school.distance} Miles</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 italic">Gender:</span>{" "}
//                           <span className="font-semibold">{school.gender} School</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 italic">Campus Type:</span>{" "}
//                           <span className="font-semibold">{school.type}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 italic">School Code:</span>{" "}
//                           <span className="font-semibold">{school.code}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 italic">Students:</span>{" "}
//                           <span className="font-semibold">{school.students}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500 italic">Grades:</span>{" "}
//                           <span className="font-semibold">{school.grades}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Right */}
//                   <div className="flex flex-col items-end space-y-3 ml-8">
//                     <button className="text-blue-600 text-sm hover:underline">Learn More →</button>
//                     <button className="text-blue-600 text-sm hover:underline">Go to website →</button>
//                     <button
//                       onClick={() => addToCart(school.id)}
//                       className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors mt-4"
//                     >
//                       Apply Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-12 text-center text-gray-500">
//               <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//               <h3 className="text-lg font-medium mb-2">No schools found</h3>
//               <p className="mb-4">Try adjusting your search criteria or filters</p>
//               <Button variant="outline" onClick={clearFilters}>
//                 Clear All Filters
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-1 mt-6">
//             <Button variant="outline" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
//               FIRST
//             </Button>
//             <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
//               PREV
//             </Button>
//             {generatePageNumbers().map(pageNum => (
//               <Button
//                 key={pageNum}
//                 variant={currentPage === pageNum ? "default" : "outline"}
//                 onClick={() => setCurrentPage(pageNum)}
//                 className="min-w-[40px]"
//               >
//                 {pageNum}
//               </Button>
//             ))}
//             <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
//               NEXT
//             </Button>
//             <Button variant="outline" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
//               LAST
//             </Button>
//           </div>
//         )}

//         <div className="text-center text-sm text-gray-500 mt-6">
//           footer for company and website details
//         </div>
//       </main>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, MapPin, X, ChevronDown,Mic } from "lucide-react"
import { schoolsData } from '../data/schoolsData' // Import your school data
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

const states = {
  "Pennsylvania": ["Jenkintown", "Philadelphia"],
  "Florida": ["Land O Lakes", "Coral Gables"],
  "California": ["San Francisco", "Studio City"],
  "Massachusetts": ["Boston"],
  "Illinois": ["Chicago"],
  "Colorado": ["Lakewood"],
  "New York": ["New York"],
  "District of Columbia": ["Washington"],
  "Virginia": ["Richmond"]
}

const genderOptions = [
  { value: "Coed", label: "Coed" },
  { value: "Boys", label: "Boys" },
  { value: "Girls", label: "Girls" }
]

export default function SchoolList({ filters = {}, onBackToSearch, onUpdateFilters }) {
  const [state, setState] = useState(filters.state || '')
  const [city, setCity] = useState(filters.city || '')
  const [gender, setGender] = useState('')
  const [year, setYear] = useState('')
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [cartItems, setCartItems] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);

  const itemsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [state, city, gender, year, searchTerm])

  useEffect(() => {
    if (filters.search && !searchTerm) {
      setSearchTerm(filters.search)
    }
    if (filters.state && !state) {
      setState(filters.state)
    }
    if (filters.city && !city) {
      setCity(filters.city)
    }
  }, [filters])

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
    setSearchTerm('')
    setState('')
    setCity('')
    setGender('')
    setYear('')
    setCurrentPage(1)
    onUpdateFilters({})
  }

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        setSearchTerm('')
        break
      case 'state':
        setState('')
        setCity('')
        break
      case 'city':
        setCity('')
        break
      case 'gender':
        setGender('')
        break
      case 'year':
        setYear('')
        break
    }
    setCurrentPage(1)
  }

  const addToCart = id => setCartItems(prev => new Set(prev).add(id))
  const hasFilters = searchTerm || state || city || gender || year

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Button to toggle filters dropdown */}
      <div className="fixed top-4 left-4 z-50 h-10 mb-10">
             <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium relative top-5"
        >
          {showFilters ? "Smart Search ▲" : "Smart Search ▼"}
        </button>
      </div>

      {/* Filters Dropdown - appears below the toggle button */}
      {showFilters && (
        <div className="fixed top-22 left-4 w-75 h-190 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
          {/* Header */}
          {/* <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Search Options</h2>
          </div> */}

          {/* State Dropdown */}
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="w-full h-10 rounded-lg mb-3 border-black">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {Object.keys(states).map((st) => (
                <SelectItem key={st} value={st} className="rounded-lg">
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* City Dropdown */}
          <Select 
            value={city} 
            onValueChange={setCity}
            disabled={!state}
          >
            <SelectTrigger className="w-full rounded-lg mb-3 disabled:bg-gray-100 border-black">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {(states[state] || []).map((ct) => (
                <SelectItem key={ct} value={ct} className="rounded-lg">
                  {ct}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Gender */}
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="w-full rounded-lg mb-3 border-black">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {genderOptions.map((o) => (
                <SelectItem key={o.value} value={o.value} className="rounded-lg">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year */}
          <Input
            type="number"
            placeholder="Established Year (minimum)"
            min="1600"
            max="2024"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-lg mb-3 border-black"
          />

          {/* Clear Filters Button */}
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full rounded-lg"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 ml-0 md:ml-80">
        {/* Search Bar */}
        <div className="flex items-center mb-4 space-x-4">
          <div className="flex items-center bg-white border rounded-full shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-blue-500 w-full">
            <input
              placeholder="Search for Schools / Institutions"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent border-0 text-base focus:outline-none rounded-full"
              style={{ border: "none" }}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter('search')}
                className="p-2 text-red-500 hover:text-red-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
               <button className="p-2 text-gray-500 hover:text-gray-700">
                <Mic className="h-5 w-5" />
              </button>
            <button variant="ghost" size="sm" className=" h-10w-10 bg-blue-700  text-white p-3 rounded-full m-1">
              <Search className="" />
            </button>
          </div>
      <div className="flex items-center gap-6 relative">
      {/* Shopping Cart */}
 <button
  size="icon"
  className="relative bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center shadow hover:shadow-lg transition"
>
  <ShoppingCart className="h-6 w-6 text-white" />
  {cartItems.size > 0 && (
    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
      {cartItems.size}
    </Badge>
  )}
</button>



      {/* Avatar */}
      <div className="relative">
        <Avatar
          className="h-12 w-12 bg-gray-300 flex items-center justify-center text-white font-medium cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          JD
        </Avatar>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2  top-14">
            <div className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
              Rohit
            </div>
            <div className="px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
              System Admin
            </div>
          </div>
        )}
      </div>
    </div>
        </div>

        {/* Filters Applied */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm font-medium">Filters applied:</span>

          {searchTerm && (
            <Badge 
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-1 rounded-lg cursor-pointer" 
              onClick={() => removeFilter('search')}
            >
              Search: {searchTerm}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {state && (
            <Badge 
              variant="secondary"
              className="bg-blue-100 text-blue-800 border border-blue-300 px-3 py-1 rounded-lg cursor-pointer" 
              onClick={() => removeFilter('state')}
            >
              State: {state}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {city && (
            <Badge 
              variant="secondary"
              className="bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-lg cursor-pointer" 
              onClick={() => removeFilter('city')}
            >
              City: {city}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {gender && (
            <Badge 
              variant="secondary"
              className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-1 rounded-lg cursor-pointer" 
              onClick={() => removeFilter('gender')}
            >
              Gender: {gender}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {year && (
            <Badge 
              variant="secondary"
              className="bg-orange-100 text-orange-800 border border-orange-300 px-3 py-1 rounded-lg cursor-pointer" 
              onClick={() => removeFilter('year')}
            >
              Year ≥ {year}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}

          {!hasFilters && <span className="text-sm text-gray-500">None</span>}
          {hasFilters && (
            <Button variant="outline" onClick={clearFilters} className="ml-2 text-xs rounded-lg">
              Clear all filters
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filtered.length} results (Page {currentPage} of {totalPages})
        </div>

        {/* School Cards */}
        <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white">
          {currentItems.length > 0 ? (
            currentItems.map((school, index) => (
              <div key={school.id} className={`${index !== currentItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="p-8 flex justify-between items-start">
                  {/* Left */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{school.name}</h3>

                    <div className="flex items-start text-gray-600 mb-6">
                      {/* Address block */}
                      <div className="flex items-start w-1/2 pr-6">
                        <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                        <div className="text-sm leading-relaxed">
                          <div>{school.address}</div>
                          <div>
                            {school.city}, {school.state} {school.zipCode}
                          </div>
                          <div>United States</div>
                        </div>
                      </div>

                      {/* Details block (on right side) */}
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm w-1/2">
                        <div>
                          <span className="text-gray-500 italic">Distance:</span>{" "}
                          <span className="font-semibold">{school.distance} Miles</span>
                        </div>
                        <div>
                          <span className="text-gray-500 italic">Gender:</span>{" "}
                          <span className="font-semibold">{school.gender} School</span>
                        </div>
                        <div>
                          <span className="text-gray-500 italic">Campus Type:</span>{" "}
                          <span className="font-semibold">{school.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 italic">School Code:</span>{" "}
                          <span className="font-semibold">{school.code}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 italic">Students:</span>{" "}
                          <span className="font-semibold">{school.students}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 italic">Grades:</span>{" "}
                          <span className="font-semibold">{school.grades}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="flex flex-col items-end space-y-3 ml-8">
                    <Button variant="link" className="text-blue-600 text-sm p-0 h-auto rounded-lg">
                      Learn More →
                    </Button>
                    <Button variant="link" className="text-blue-600 text-sm p-0 h-auto rounded-lg">
                      Go to website →
                    </Button>
                    <Button
                      onClick={() => addToCart(school.id)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors mt-4"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No schools found</h3>
              <p className="mb-4">Try adjusting your search criteria or filters</p>
              <Button variant="outline" onClick={clearFilters} className="rounded-lg">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-1 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className="rounded-lg"
            >
              FIRST
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
              disabled={currentPage === 1}
              className="rounded-lg"
            >
              PREV
            </Button>
            {generatePageNumbers().map(pageNum => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNum)}
                className="min-w-[40px] rounded-lg"
              >
                {pageNum}
              </Button>
            ))}
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="rounded-lg"
            >
              NEXT
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className="rounded-lg"
            >
              LAST
            </Button>
          </div>
        )}

        {/* <div className="text-center text-sm text-gray-500 mt-6">
          footer for company and website details
        </div> */}
      </main>
    </div>
  )
}