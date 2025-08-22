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
import { Upload, Camera, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

export default function ListCropPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "kg",
    price: "",
    quality: "",
    harvestDate: "",
    location: "",
    description: "",
    images: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement crop listing logic
    console.log("Crop listing:", formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">List Your Crop</h1>
            <p className="text-muted-foreground">Share your harvest with buyers across the platform</p>
          </div>

          <Card className="hover-lift border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Crop Details</CardTitle>
              <CardDescription>Provide accurate information to attract the right buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Crop Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Basmati Rice"
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
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="cash-crops">Cash Crops</SelectItem>
                        <SelectItem value="spices">Spices</SelectItem>
                        <SelectItem value="pulses">Pulses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quantity and Price */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="100"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="kg" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="tons">Tons</SelectItem>
                        <SelectItem value="quintal">Quintal</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per {formData.unit} (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="50"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Quality and Harvest Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality Grade *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, quality: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="grade-a">Grade A</SelectItem>
                        <SelectItem value="grade-b">Grade B</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="harvestDate"
                        type="date"
                        className="pl-10"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                        required
                      />
                    </div>
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

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your crop quality, farming methods, and any special features..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Crop Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Upload crop images</p>
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
                    <Link href="/marketplace">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1 hover-lift">
                    List Crop
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
