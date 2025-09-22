import React, { useState } from 'react'
import SearchComponent from './components/SearchComponent'
import SchoolList from './Pages/SchoolList'

export default function App() {
  const [currentView, setCurrentView] = useState('search')
  const [filters, setFilters] = useState({})

  const handleNavigateToList = (newFilters) => {
    setFilters(newFilters)
    setCurrentView('list')
  }

  const handleBackToSearch = () => {
    setCurrentView('search')
    setFilters({})
  }

  const handleUpdateFilters = (newFilters) => {
    setFilters(newFilters)
  }

  if (currentView === 'search') {
    return <SearchComponent onNavigateToList={handleNavigateToList} />
  }

  return (
    <SchoolList 
      filters={filters} 
      onBackToSearch={handleBackToSearch}
      onUpdateFilters={handleUpdateFilters}
    />
  )
}