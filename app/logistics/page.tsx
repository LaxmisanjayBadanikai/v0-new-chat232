"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Warehouse, Truck, MapPin, Calendar, Search, Filter, Plus, Package, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock storage facilities data
const storageFacilities = [
  {
    id: 1,
    name: "Punjab Grain Storage Co.",
    type: "Grain Warehouse",
    location: "Ludhiana, Punjab",
    capacity: "5000 MT",
    availableSpace: "1200 MT",
    dailyRate: 2.5,
    monthlyRate: 65,
    features: ["Climate Control", "Pest Control", "24/7 Security", "Loading Dock"],
    rating: 4.8,
    image: "/grain-warehouse-facility.png",
    owner: "Punjab Storage Ltd.",
    phone: "+91 98765 43210",
    email: "info@punjabstorage.com",
    established: "2015",
    certifications: ["WDRA", "ISO 9001"],
  },
  {
    id: 2,
    name: "Modern Cold Storage",
    type: "Cold Storage",
    location: "Nashik, Maharashtra",
    capacity: "2000 MT",
    availableSpace: "450 MT",
    dailyRate: 8.0,
    monthlyRate: 220,
    features: ["Temperature Control", "Humidity Control", "Quick Freezing", "Sorting Area"],
    rating: 4.9,
    image: "/cold-storage-facility.png",
    owner: "FreshKeep Solutions",
    phone: "+91 87654 32109",
    email: "bookings@freshkeep.com",
    established: "2018",
    certifications: ["HACCP", "FSSAI"],
  },
  {
    id: 3,
    name: "Rajasthan Spice Warehouse",
    type: "Spice Storage",
    location: "Jodhpur, Rajasthan",
    capacity: "800 MT",
    availableSpace: "200 MT",
    dailyRate: 4.0,
    monthlyRate: 110,
    features: ["Moisture Control", "Aroma Preservation", "Quality Testing", "Packaging Area"],
    rating: 4.6,
    image: "/spice-warehouse-facility.png",
    owner: "Desert Storage Co.",
    phone: "+91 76543 21098",
    email: "contact@desertstorage.in",
    established: "2012",
    certifications: ["Spice Board", "ISO 22000"],
  },
  {
    id: 4,
    name: "Gujarat Cotton Godown",
    type: "Cotton Storage",
    location: "Ahmedabad, Gujarat",
    capacity: "3000 MT",
    availableSpace: "800 MT",
    dailyRate: 3.2,
    monthlyRate: 85,
    features: ["Fire Safety", "Moisture Control", "Bale Handling", "Quality Grading"],
    rating: 4.7,
    image: "/cotton-storage-facility.png",
    owner: "Gujarat Fiber Storage",
    phone: "+91 65432 10987",
    email: "info@gujaratfiber.com",
    established: "2010",
    certifications: ["Cotton Corporation", "Fire Safety"],
  },
]

// Mock transportation services data
const transportServices = [
  {
    id: 1,
    name: "AgriTrans Logistics",
    vehicleType: "Covered Truck",
    capacity: "10 MT",
    ratePerKm: 25,
    baseRate: 2000,
    coverage: "Pan India",
    rating: 4.8,
    totalTrips: 1250,
    image: "/covered-truck-transport.png",
    features: ["GPS Tracking", "Insurance Coverage", "Temperature Monitoring", "Real-time Updates"],
    phone: "+91 98765 43210",
    available: true,
  },
  {
    id: 2,
    name: "ColdChain Express",
    vehicleType: "Refrigerated Truck",
    capacity: "8 MT",
    ratePerKm: 45,
    baseRate: 3500,
    coverage: "North & West India",
    rating: 4.9,
    totalTrips: 890,
    image: "/refrigerated-truck-transport.png",
    features: ["Temperature Control", "Humidity Control", "GPS Tracking", "Quality Assurance"],
    phone: "+91 87654 32109",
    available: true,
  },
  {
    id: 3,
    name: "Bulk Cargo Movers",
    vehicleType: "Open Truck",
    capacity: "15 MT",
    ratePerKm: 18,
    baseRate: 1500,
    coverage: "Regional",
    rating: 4.5,
    totalTrips: 2100,
    image: "/open-truck-transport.png",
    features: ["Heavy Load Capacity", "Tarpaulin Cover", "Loading Assistance", "Route Optimization"],
    phone: "+91 76543 21098",
    available: false,
  },
]

// Mock booking data
const recentBookings = [
  {
    id: 1,
    type: "storage",
    facility: "Punjab Grain Storage Co.",
    duration: "3 months",
    quantity: "500 MT",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
  },
  {
    id: 2,
    type: "transport",
    service: "AgriTrans Logistics",
    route: "Delhi to Mumbai",
    quantity: "8 MT",
    status: "completed",
    date: "2024-02-10",
  },
  {
    id: 3,
    type: "storage",
    facility: "Modern Cold Storage",
    duration: "1 month",
    quantity: "200 MT",
    status: "pending",
    startDate: "2024-02-20",
    endDate: "2024-03-20",
  },
]

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const storageTypes = ["all", "Grain Warehouse", "Cold Storage", "Spice Storage", "Cotton Storage"]
  const locations = ["all", "Punjab", "Maharashtra", "Rajasthan", "Gujarat"]

  const filteredFacilities = storageFacilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || facility.type === selectedType
    const matchesLocation = selectedLocation === "all" || facility.location.includes(selectedLocation)
    return matchesSearch && matchesType && matchesLocation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary"
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">Logistics & Storage</h1>
            <p className="text-muted-foreground">Secure storage and reliable transportation for your crops</p>
          </div>
          <Button className="hover-lift mt-4 md:mt-0" asChild>
            <Link href="/logistics/list-facility">
              <Plus className="mr-2 h-4 w-4" />
              List Your Facility
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="storage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="storage">Storage Facilities</TabsTrigger>
            <TabsTrigger value="transport">Transportation</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="storage" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search storage facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Storage Type" />
                </SelectTrigger>
                <SelectContent>
                  {storageTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Storage Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => (
                <Card key={facility.id} className="hover-lift border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">{facility.type}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{facility.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {facility.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">₹{facility.dailyRate}</p>
                        <p className="text-xs text-muted-foreground">per MT/day</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Capacity:</span>
                        <span className="font-medium">{facility.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Available:</span>
                        <span className="font-medium text-green-600">{facility.availableSpace}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Rate:</span>
                        <span className="font-medium">₹{facility.monthlyRate}/MT</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex text-yellow-400">{"★".repeat(Math.floor(facility.rating))}</div>
                      <span className="text-sm text-muted-foreground">{facility.rating}</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {facility.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{facility.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <Link href={`/logistics/storage/${facility.id}`}>View Details</Link>
                      </Button>
                      <Button size="sm" className="flex-1 hover-lift">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transportServices.map((service) => (
                <Card key={service.id} className="hover-lift border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${service.available ? "bg-primary" : "bg-destructive"}`}>
                      {service.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.vehicleType}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">₹{service.ratePerKm}</p>
                        <p className="text-xs text-muted-foreground">per km</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-medium">{service.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Rate:</span>
                        <span className="font-medium">₹{service.baseRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Coverage:</span>
                        <span className="font-medium">{service.coverage}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex text-yellow-400">{"★".repeat(Math.floor(service.rating))}</div>
                      <span className="text-sm text-muted-foreground">
                        {service.rating} ({service.totalTrips} trips)
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{service.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        disabled={!service.available}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button size="sm" className="flex-1 hover-lift" disabled={!service.available}>
                        Book Transport
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Warehouse className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Storage</p>
                      <p className="text-xl font-bold">
                        {recentBookings.filter((b) => b.type === "storage" && b.status === "active").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Truck className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transport Trips</p>
                      <p className="text-xl font-bold">{recentBookings.filter((b) => b.type === "transport").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-chart-3/10 rounded-lg">
                      <Package className="h-4 w-4 text-chart-3" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Quantity</p>
                      <p className="text-xl font-bold">1200 MT</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your storage and transportation bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-muted rounded-lg">
                            {booking.type === "storage" ? (
                              <Warehouse className="h-4 w-4" />
                            ) : (
                              <Truck className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {booking.type === "storage" ? booking.facility : booking.service}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.type === "storage"
                                ? `${booking.duration} • ${booking.quantity}`
                                : `${booking.route} • ${booking.quantity}`}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status.toUpperCase()}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {booking.type === "storage" ? `${booking.startDate} to ${booking.endDate}` : booking.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
