"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Search, Filter, Plus, MapPin, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for crop listings
const mockCrops = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    farmer: "Rajesh Kumar",
    location: "Punjab, India",
    price: 45,
    quantity: 500,
    unit: "kg",
    category: "Grains",
    quality: "Grade A",
    harvestDate: "2024-01-15",
    description: "Premium quality basmati rice with excellent aroma and taste",
    image: "/basmati-rice-field.png",
    bids: 12,
    highestBid: 47,
    status: "available",
  },
  {
    id: 2,
    name: "Organic Tomatoes",
    farmer: "Priya Sharma",
    location: "Maharashtra, India",
    price: 25,
    quantity: 200,
    unit: "kg",
    category: "Vegetables",
    quality: "Organic",
    harvestDate: "2024-01-20",
    description: "Fresh organic tomatoes, pesticide-free and naturally grown",
    image: "/fresh-red-tomatoes.png",
    bids: 8,
    highestBid: 28,
    status: "available",
  },
  {
    id: 3,
    name: "Fresh Wheat",
    farmer: "Amit Singh",
    location: "Haryana, India",
    price: 22,
    quantity: 1000,
    unit: "kg",
    category: "Grains",
    quality: "Grade B",
    harvestDate: "2024-01-10",
    description: "High-quality wheat suitable for flour production",
    image: "/golden-wheat-harvest.png",
    bids: 15,
    highestBid: 24,
    status: "available",
  },
  {
    id: 4,
    name: "Alphonso Mangoes",
    farmer: "Suresh Patil",
    location: "Gujarat, India",
    price: 120,
    quantity: 100,
    unit: "kg",
    category: "Fruits",
    quality: "Premium",
    harvestDate: "2024-01-25",
    description: "Sweet and juicy Alphonso mangoes, king of fruits",
    image: "/placeholder-bf7jb.png",
    bids: 20,
    highestBid: 125,
    status: "bidding",
  },
  {
    id: 5,
    name: "Green Chillies",
    farmer: "Lakshmi Devi",
    location: "Andhra Pradesh, India",
    price: 35,
    quantity: 150,
    unit: "kg",
    category: "Vegetables",
    quality: "Grade A",
    harvestDate: "2024-01-18",
    description: "Spicy green chillies perfect for cooking",
    image: "/placeholder-3fd6g.png",
    bids: 6,
    highestBid: 38,
    status: "available",
  },
  {
    id: 6,
    name: "Cotton",
    farmer: "Ravi Reddy",
    location: "Telangana, India",
    price: 55,
    quantity: 800,
    unit: "kg",
    category: "Cash Crops",
    quality: "Grade A",
    harvestDate: "2024-01-12",
    description: "High-quality cotton for textile industry",
    image: "/placeholder-mlmix.png",
    bids: 10,
    highestBid: 58,
    status: "available",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["all", "Grains", "Vegetables", "Fruits", "Cash Crops"]

  const filteredCrops = mockCrops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || crop.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">Crop Marketplace</h1>
            <p className="text-muted-foreground">Discover fresh crops directly from farmers</p>
          </div>
          <Button className="hover-lift mt-4 md:mt-0" asChild>
            <Link href="/marketplace/list-crop">
              <Plus className="mr-2 h-4 w-4" />
              List Your Crop
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search crops, farmers, or locations..."
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
              <SelectItem value="most-bids">Most Bids</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-xl font-bold">{mockCrops.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Bids</p>
                  <p className="text-xl font-bold">{mockCrops.reduce((sum, crop) => sum + crop.bids, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Price</p>
                  <p className="text-xl font-bold">
                    ₹{Math.round(mockCrops.reduce((sum, crop) => sum + crop.price, 0) / mockCrops.length)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-chart-4/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-xl font-bold">{categories.length - 1}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="hover-lift border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={crop.image || "/placeholder.svg"}
                  alt={crop.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${crop.status === "bidding" ? "bg-accent" : "bg-primary"}`}>
                  {crop.status === "bidding" ? "Bidding" : "Available"}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {crop.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{crop.price}</p>
                    <p className="text-sm text-muted-foreground">per {crop.unit}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Farmer:</span>
                    <span className="font-medium">{crop.farmer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">
                      {crop.quantity} {crop.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quality:</span>
                    <Badge variant="secondary">{crop.quality}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Harvest:</span>
                    <span className="font-medium flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(crop.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {crop.bids > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{crop.bids} bids</span>
                      <span className="text-sm font-medium">Highest: ₹{crop.highestBid}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/marketplace/${crop.id}`}>View Details</Link>
                  </Button>
                  <Button size="sm" className="flex-1 hover-lift">
                    {crop.status === "bidding" ? "Place Bid" : "Buy Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No crops found matching your criteria</p>
            <Button className="mt-4" asChild>
              <Link href="/marketplace/list-crop">List Your First Crop</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
