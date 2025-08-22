"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Upload, Camera, MapPin, Wrench } from "lucide-react"
import Link from "next/link"

export default function ListEquipmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dailyRate: "",
    weeklyRate: "",
    monthlyRate: "",
    condition: "",
    year: "",
    location: "",
    description: "",
    specifications: {
      power: "",
      capacity: "",
      fuel: "",
      weight: "",
    },
    features: [] as string[],
    images: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement equipment listing logic
    console.log("Equipment listing:", formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      })
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter((f) => f !== feature)
        : [...formData.features, feature],
    })
  }

  const commonFeatures = [
    "GPS Navigation",
    "Air Conditioning",
    "Power Steering",
    "Hydraulic Lift",
    "PTO",
    "4WD",
    "Auto Pilot",
    "Digital Display",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">List Your Equipment</h1>
            <p className="text-muted-foreground">Share your farming equipment and earn rental income</p>
          </div>

          <Card className="hover-lift border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                Equipment Details
              </CardTitle>
              <CardDescription>Provide accurate information to attract the right renters</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Equipment Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., John Deere 5050D Tractor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tractors">Tractors</SelectItem>
                        <SelectItem value="harvesters">Harvesters</SelectItem>
                        <SelectItem value="tillage">Tillage Equipment</SelectItem>
                        <SelectItem value="irrigation">Irrigation Systems</SelectItem>
                        <SelectItem value="seeding">Seeding Equipment</SelectItem>
                        <SelectItem value="spraying">Spraying Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rental Rates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailyRate">Daily Rate (₹) *</Label>
                    <Input
                      id="dailyRate"
                      type="number"
                      placeholder="1200"
                      value={formData.dailyRate}
                      onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeklyRate">Weekly Rate (₹)</Label>
                    <Input
                      id="weeklyRate"
                      type="number"
                      placeholder="7500"
                      value={formData.weeklyRate}
                      onChange={(e) => setFormData({ ...formData, weeklyRate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRate">Monthly Rate (₹)</Label>
                    <Input
                      id="monthlyRate"
                      type="number"
                      placeholder="25000"
                      value={formData.monthlyRate}
                      onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value })}
                    />
                  </div>
                </div>

                {/* Condition and Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Manufacturing Year *</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2022"
                      min="1990"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="location"
                      placeholder="e.g., Punjab, India"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4">
                  <Label>Specifications</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="power">Power/Capacity</Label>
                      <Input
                        id="power"
                        placeholder="e.g., 50 HP or 5 tons/hour"
                        value={formData.specifications.power}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specifications: { ...formData.specifications, power: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel">Fuel Type</Label>
                      <Input
                        id="fuel"
                        placeholder="e.g., Diesel, Electric"
                        value={formData.specifications.fuel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specifications: { ...formData.specifications, fuel: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        placeholder="e.g., 2100 kg"
                        value={formData.specifications.weight}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specifications: { ...formData.specifications, weight: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Tank/Storage Capacity</Label>
                      <Input
                        id="capacity"
                        placeholder="e.g., 65 Liters"
                        value={formData.specifications.capacity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specifications: { ...formData.specifications, capacity: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {commonFeatures.map((feature) => (
                      <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your equipment condition, maintenance history, and any special features..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Equipment Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Upload equipment images</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB each</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Choose Images
                      </Button>
                    </div>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="text-sm text-muted-foreground">{formData.images.length} image(s) selected</div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/equipment">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1 hover-lift">
                    List Equipment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
