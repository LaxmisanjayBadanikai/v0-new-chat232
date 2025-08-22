"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Search, Filter, Plus, MapPin, Calendar, Clock, Star, Wrench } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for equipment listings
const mockEquipment = [
  {
    id: 1,
    name: "John Deere 5050D Tractor",
    owner: "Ramesh Equipment Rentals",
    location: "Punjab, India",
    dailyRate: 1200,
    category: "Tractors",
    horsepower: "50 HP",
    year: 2022,
    condition: "Excellent",
    description: "Powerful and fuel-efficient tractor perfect for medium-scale farming operations",
    image: "/modern-green-tractor.png",
    rating: 4.8,
    totalBookings: 156,
    availability: "available",
    features: ["GPS Navigation", "Air Conditioning", "Power Steering"],
  },
  {
    id: 2,
    name: "Mahindra Arjun 605 DI",
    owner: "Singh Farm Equipment",
    location: "Haryana, India",
    dailyRate: 1000,
    category: "Tractors",
    horsepower: "60 HP",
    year: 2021,
    condition: "Good",
    description: "Reliable tractor with excellent fuel efficiency and low maintenance",
    image: "/red-mahindra-tractor.png",
    rating: 4.6,
    totalBookings: 89,
    availability: "available",
    features: ["4WD", "Hydraulic Steering", "Multi-Speed PTO"],
  },
  {
    id: 3,
    name: "New Holland TC5070 Combine",
    owner: "Modern Agri Solutions",
    location: "Uttar Pradesh, India",
    dailyRate: 3500,
    category: "Harvesters",
    capacity: "5.5 tons/hour",
    year: 2023,
    condition: "Excellent",
    description: "Advanced combine harvester with precision cutting and grain separation",
    image: "/combine-harvester-field.png",
    rating: 4.9,
    totalBookings: 45,
    availability: "booked",
    features: ["Auto Pilot", "Grain Tank Monitor", "Variable Speed Drive"],
  },
  {
    id: 4,
    name: "Rotary Tiller 7ft",
    owner: "Kumar Implements",
    location: "Maharashtra, India",
    dailyRate: 400,
    category: "Tillage",
    width: "7 feet",
    year: 2022,
    condition: "Good",
    description: "Heavy-duty rotary tiller for soil preparation and weed control",
    image: "/rotary-tiller-soil.png",
    rating: 4.4,
    totalBookings: 78,
    availability: "available",
    features: ["Adjustable Depth", "Side Drive", "Heavy Duty Blades"],
  },
  {
    id: 5,
    name: "Drip Irrigation System",
    owner: "AquaTech Irrigation",
    location: "Gujarat, India",
    dailyRate: 200,
    category: "Irrigation",
    coverage: "2 acres",
    year: 2023,
    condition: "Excellent",
    description: "Complete drip irrigation system for water-efficient farming",
    image: "/drip-irrigation-system.png",
    rating: 4.7,
    totalBookings: 134,
    availability: "available",
    features: ["Timer Control", "Pressure Regulator", "Filter System"],
  },
  {
    id: 6,
    name: "Seed Drill 9 Tyne",
    owner: "Precision Farming Co.",
    location: "Rajasthan, India",
    dailyRate: 600,
    category: "Seeding",
    tynes: "9 Tyne",
    year: 2022,
    condition: "Good",
    description: "Precision seed drill for accurate seed placement and spacing",
    image: "/seed-drill-planting.png",
    rating: 4.5,
    totalBookings: 67,
    availability: "available",
    features: ["Depth Control", "Seed Metering", "Fertilizer Box"],
  },
]

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["all", "Tractors", "Harvesters", "Tillage", "Irrigation", "Seeding", "Spraying"]

  const filteredEquipment = mockEquipment.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || equipment.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">Equipment Rental</h1>
            <p className="text-muted-foreground">Access modern farming equipment without the investment</p>
          </div>
          <Button className="hover-lift mt-4 md:mt-0" asChild>
            <Link href="/equipment/list-equipment">
              <Plus className="mr-2 h-4 w-4" />
              List Your Equipment
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search equipment, owners, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Equipment</p>
                  <p className="text-xl font-bold">{mockEquipment.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Now</p>
                  <p className="text-xl font-bold">
                    {mockEquipment.filter((eq) => eq.availability === "available").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <Clock className="h-4 w-4 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Daily Rate</p>
                  <p className="text-xl font-bold">
                    ₹{Math.round(mockEquipment.reduce((sum, eq) => sum + eq.dailyRate, 0) / mockEquipment.length)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-chart-4/10 rounded-lg">
                  <Star className="h-4 w-4 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-xl font-bold">
                    {(mockEquipment.reduce((sum, eq) => sum + eq.rating, 0) / mockEquipment.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((equipment) => (
            <Card key={equipment.id} className="hover-lift border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={equipment.image || "/placeholder.svg"}
                  alt={equipment.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    equipment.availability === "available" ? "bg-primary" : "bg-destructive"
                  }`}
                >
                  {equipment.availability === "available" ? "Available" : "Booked"}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{equipment.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {equipment.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{equipment.dailyRate}</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{equipment.owner}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="secondary">{equipment.category}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{equipment.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Condition:</span>
                    <Badge variant={equipment.condition === "Excellent" ? "default" : "secondary"}>
                      {equipment.condition}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-yellow-400">{"★".repeat(Math.floor(equipment.rating))}</div>
                  <span className="text-sm text-muted-foreground">
                    {equipment.rating} ({equipment.totalBookings} bookings)
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/equipment/${equipment.id}`}>View Details</Link>
                  </Button>
                  <Button size="sm" className="flex-1 hover-lift" disabled={equipment.availability !== "available"}>
                    {equipment.availability === "available" ? "Book Now" : "Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No equipment found matching your criteria</p>
            <Button className="mt-4" asChild>
              <Link href="/equipment/list-equipment">List Your Equipment</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
