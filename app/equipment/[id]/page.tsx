"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, MapPin, CalendarIcon, User, Phone, Mail, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for individual equipment
const mockEquipment = {
  id: 1,
  name: "John Deere 5050D Tractor",
  owner: "Ramesh Equipment Rentals",
  location: "Punjab, India",
  dailyRate: 1200,
  weeklyRate: 7500,
  monthlyRate: 25000,
  category: "Tractors",
  horsepower: "50 HP",
  year: 2022,
  condition: "Excellent",
  description:
    "Powerful and fuel-efficient tractor perfect for medium-scale farming operations. Well-maintained with regular servicing and genuine parts replacement.",
  images: ["/modern-green-tractor.png", "/tractor-cabin-interior.png", "/tractor-hydraulic-system.png"],
  rating: 4.8,
  totalBookings: 156,
  availability: "available",
  features: ["GPS Navigation", "Air Conditioning", "Power Steering", "Hydraulic Lift", "PTO"],
  ownerDetails: {
    phone: "+91 98765 43210",
    email: "ramesh.rentals@email.com",
    experience: "12 years",
    rating: 4.9,
    totalEquipment: 25,
  },
  specifications: {
    engine: "3-Cylinder Diesel",
    transmission: "8F + 2R",
    fuelTank: "65 Liters",
    weight: "2100 kg",
    liftCapacity: "1500 kg",
  },
  bookedDates: ["2024-02-15", "2024-02-16", "2024-02-20", "2024-02-21"],
}

export default function EquipmentDetailPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [rentalDuration, setRentalDuration] = useState("daily")
  const [selectedImage, setSelectedImage] = useState(0)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking logic
    console.log("Booking request:", { selectedDates, rentalDuration })
  }

  const calculateTotal = () => {
    const days = selectedDates.length
    if (rentalDuration === "weekly") {
      return Math.ceil(days / 7) * mockEquipment.weeklyRate
    }
    if (rentalDuration === "monthly") {
      return Math.ceil(days / 30) * mockEquipment.monthlyRate
    }
    return days * mockEquipment.dailyRate
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/equipment">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Equipment
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={mockEquipment.images[selectedImage] || "/placeholder.svg"}
                    alt={mockEquipment.name}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">Available</Badge>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {mockEquipment.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-primary" : "border-border"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${mockEquipment.name} ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{mockEquipment.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockEquipment.location}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {mockEquipment.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{mockEquipment.description}</p>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="font-semibold">{mockEquipment.horsepower}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold">{mockEquipment.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <Badge variant="outline">{mockEquipment.condition}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Rate</p>
                    <p className="text-2xl font-bold text-primary">₹{mockEquipment.dailyRate}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockEquipment.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(mockEquipment.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Book Equipment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Daily</p>
                    <p className="font-bold">₹{mockEquipment.dailyRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Weekly</p>
                    <p className="font-bold">₹{mockEquipment.weeklyRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly</p>
                    <p className="font-bold">₹{mockEquipment.monthlyRate}</p>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label>Select Dates</Label>
                    <div className="border rounded-lg p-3">
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => setSelectedDates(dates || [])}
                        disabled={(date) => {
                          const dateStr = date.toISOString().split("T")[0]
                          return mockEquipment.bookedDates.includes(dateStr) || date < new Date()
                        }}
                        className="w-full"
                      />
                    </div>
                    {selectedDates.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">{selectedDates.length} day(s) selected</p>
                    )}
                  </div>

                  {selectedDates.length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Cost:</span>
                        <span className="text-xl font-bold text-primary">₹{calculateTotal()}</span>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full hover-lift" disabled={selectedDates.length === 0}>
                    Book Now
                  </Button>
                </form>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="mr-1 h-4 w-4" />
                  Secure booking with damage protection
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Equipment Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{mockEquipment.owner}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(mockEquipment.ownerDetails.rating))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {mockEquipment.ownerDetails.rating} rating
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{mockEquipment.ownerDetails.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equipment:</span>
                    <span className="font-medium">{mockEquipment.ownerDetails.totalEquipment} items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockEquipment.ownerDetails.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockEquipment.ownerDetails.email}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Contact Owner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
