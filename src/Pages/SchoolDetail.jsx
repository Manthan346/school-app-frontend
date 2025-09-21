// src/Pages/SchoolDetail.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { schoolsData } from '../data/schoolsData'
import { ExternalLink, ArrowLeft } from 'lucide-react'

export default function SchoolDetail() {
  const { code } = useParams()
  const school = schoolsData.find((s) => s.code === code)

  if (!school) {
    return (
      <Card className="max-w-md mx-auto mt-20 p-8 bg-card/50 backdrop-blur-sm">
        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground">School not found</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  const entries = Object.entries(school)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-card/70 backdrop-blur-md shadow-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl font-bold">{school.name}</h1>
          <Button 
            variant="link" 
            className="flex items-center text-primary"
            onClick={() => window.open(school.website, '_blank')}
          >
            <ExternalLink className="mr-2 h-5 w-5" /> Visit Website
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {entries.map(([key, value]) => (
            <div key={key} className="space-y-1">
              <span className="text-sm font-medium uppercase text-muted-foreground">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              {key === 'type' || key === 'gender' ? (
                <Badge variant="secondary">{value}</Badge>
              ) : (
                <p className="text-base font-semibold text-foreground">{value}</p>
              )}
            </div>
          ))}
        </CardContent>
        <CardContent className="pt-0 flex justify-end">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
