"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, MapPin, Calendar, User, Phone, Mail, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for individual crop
const mockCrop = {
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
  description:
    "Premium quality basmati rice with excellent aroma and taste. Grown using traditional methods with minimal use of chemicals. Perfect for export quality requirements.",
  images: ["/golden-basmati-field.png", "/basmati-rice-grains.png", "/rice-harvest-machinery.png"],
  bids: 12,
  highestBid: 47,
  status: "available",
  farmerDetails: {
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    experience: "15 years",
    rating: 4.8,
    totalSales: 156,
  },
  specifications: {
    variety: "Pusa Basmati 1121",
    moisture: "12%",
    purity: "98%",
    brokenGrains: "2%",
    packaging: "Jute bags",
  },
}

export default function CropDetailPage() {
  const [bidAmount, setBidAmount] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement bidding logic
    console.log("Bid placed:", bidAmount)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
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
                    src={mockCrop.images[selectedImage] || "/placeholder.svg"}
                    alt={mockCrop.name}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">
                    {mockCrop.status === "bidding" ? "Bidding Active" : "Available"}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {mockCrop.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-primary" : "border-border"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${mockCrop.name} ${index + 1}`}
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

            {/* Crop Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{mockCrop.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockCrop.location}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {mockCrop.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{mockCrop.description}</p>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold">
                      {mockCrop.quantity} {mockCrop.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quality</p>
                    <Badge variant="outline">{mockCrop.quality}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Harvest Date</p>
                    <p className="font-semibold flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(mockCrop.harvestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold text-primary">₹{mockCrop.price}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(mockCrop.specifications).map(([key, value]) => (
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
            {/* Pricing & Bidding */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Current Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">₹{mockCrop.price}</p>
                  <p className="text-muted-foreground">per {mockCrop.unit}</p>
                </div>

                {mockCrop.bids > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Total Bids</span>
                      <span className="font-semibold">{mockCrop.bids}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Highest Bid</span>
                      <span className="font-semibold text-accent">₹{mockCrop.highestBid}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleBid} className="space-y-3">
                  <div>
                    <Label htmlFor="bid">Your Bid (₹ per {mockCrop.unit})</Label>
                    <Input
                      id="bid"
                      type="number"
                      placeholder={`Minimum ₹${mockCrop.highestBid + 1}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={mockCrop.highestBid + 1}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1 hover-lift">
                      Place Bid
                    </Button>
                    <Button type="button" variant="outline" className="flex-1 bg-transparent">
                      Buy Now
                    </Button>
                  </div>
                </form>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="mr-1 h-4 w-4" />
                  Secure payment with escrow protection
                </div>
              </CardContent>
            </Card>

            {/* Farmer Information */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Farmer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{mockCrop.farmer}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">{"★".repeat(Math.floor(mockCrop.farmerDetails.rating))}</div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {mockCrop.farmerDetails.rating} ({mockCrop.farmerDetails.totalSales} sales)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{mockCrop.farmerDetails.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockCrop.farmerDetails.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{mockCrop.farmerDetails.email}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Contact Farmer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
