"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, MapPin, Warehouse, Phone, Mail, CalendarIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock storage facility data
const facilityData = {
  id: 1,
  name: "Punjab Grain Storage Co.",
  type: "Grain Warehouse",
  location: "Ludhiana, Punjab",
  capacity: "5000 MT",
  availableSpace: "1200 MT",
  dailyRate: 2.5,
  monthlyRate: 65,
  features: [
    "Climate Control",
    "Pest Control",
    "24/7 Security",
    "Loading Dock",
    "Quality Testing",
    "Insurance Coverage",
  ],
  rating: 4.8,
  totalBookings: 245,
  images: ["/grain-warehouse-facility.png", "/warehouse-interior.png", "/loading-dock.png", "/security-system.png"],
  owner: "Punjab Storage Ltd.",
  phone: "+91 98765 43210",
  email: "info@punjabstorage.com",
  established: "2015",
  certifications: ["WDRA", "ISO 9001", "Fire Safety"],
  specifications: {
    temperature: "15-25°C",
    humidity: "60-65%",
    ventilation: "Mechanical",
    flooring: "Concrete",
    roofing: "Insulated Steel",
    fireProtection: "Sprinkler System",
  },
  description:
    "State-of-the-art grain storage facility with modern climate control systems and comprehensive security measures. Perfect for long-term storage of wheat, rice, and other grains.",
}

export default function StorageDetailPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [quantity, setQuantity] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Storage booking:", { selectedDates, quantity })
  }

  const calculateTotal = () => {
    const days = selectedDates.length
    const qty = Number.parseFloat(quantity) || 0
    return days * qty * facilityData.dailyRate
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/logistics">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Logistics
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
                    src={facilityData.images[selectedImage] || "/placeholder.svg"}
                    alt={facilityData.name}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">{facilityData.type}</Badge>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {facilityData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-primary" : "border-border"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${facilityData.name} ${index + 1}`}
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

            {/* Facility Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{facilityData.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {facilityData.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">{"★".repeat(Math.floor(facilityData.rating))}</div>
                    <span className="text-sm text-muted-foreground">
                      {facilityData.rating} ({facilityData.totalBookings} bookings)
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{facilityData.description}</p>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Capacity</p>
                    <p className="font-semibold">{facilityData.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Space</p>
                    <p className="font-semibold text-green-600">{facilityData.availableSpace}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Rate</p>
                    <p className="text-xl font-bold text-primary">₹{facilityData.dailyRate}/MT</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rate</p>
                    <p className="font-semibold">₹{facilityData.monthlyRate}/MT</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {facilityData.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(facilityData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {facilityData.certifications.map((cert) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
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
                  Book Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">Quantity (MT)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity in MT"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>Select Storage Period</Label>
                    <div className="border rounded-lg p-3">
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => setSelectedDates(dates || [])}
                        disabled={(date) => date < new Date()}
                        className="w-full"
                      />
                    </div>
                    {selectedDates.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">{selectedDates.length} day(s) selected</p>
                    )}
                  </div>

                  {selectedDates.length > 0 && quantity && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Quantity:</span>
                          <span>{quantity} MT</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span>{selectedDates.length} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rate:</span>
                          <span>₹{facilityData.dailyRate}/MT/day</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Cost:</span>
                          <span className="text-xl font-bold text-primary">₹{calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full hover-lift"
                    disabled={selectedDates.length === 0 || !quantity}
                  >
                    Book Storage
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Warehouse className="mr-2 h-5 w-5" />
                  Facility Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{facilityData.owner}</h3>
                  <p className="text-sm text-muted-foreground">Established {facilityData.established}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{facilityData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{facilityData.email}</span>
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
