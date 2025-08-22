"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import {
  Cloud,
  CloudRain,
  Sun,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  Bug,
  Leaf,
  Calendar,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Users,
  Phone,
  Video,
  FileText,
  Bell,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock weather data
const weatherData = {
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    icon: "partly-cloudy",
  },
  forecast: [
    { day: "Today", high: 32, low: 24, condition: "Sunny", icon: "sunny", rain: 0 },
    { day: "Tomorrow", high: 30, low: 22, condition: "Cloudy", icon: "cloudy", rain: 20 },
    { day: "Wed", high: 28, low: 20, condition: "Rainy", icon: "rainy", rain: 80 },
    { day: "Thu", high: 26, low: 18, condition: "Rainy", icon: "rainy", rain: 90 },
    { day: "Fri", high: 29, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy", rain: 30 },
  ],
}

// Mock alerts data
const alerts = [
  {
    id: 1,
    type: "pest",
    severity: "high",
    title: "Brown Plant Hopper Alert",
    description: "High risk of brown plant hopper infestation in rice crops. Immediate action recommended.",
    crop: "Rice",
    location: "Punjab, Haryana",
    date: "2024-02-15",
    action: "Apply recommended pesticides and monitor closely",
  },
  {
    id: 2,
    type: "weather",
    severity: "medium",
    title: "Heavy Rainfall Expected",
    description: "Heavy rainfall predicted for next 3 days. Protect harvested crops and delay sowing.",
    crop: "All Crops",
    location: "Northern India",
    date: "2024-02-16",
    action: "Cover stored grains and ensure proper drainage",
  },
  {
    id: 3,
    type: "disease",
    severity: "medium",
    title: "Leaf Blight in Wheat",
    description: "Early signs of leaf blight detected in wheat fields. Preventive measures advised.",
    crop: "Wheat",
    location: "Uttar Pradesh",
    date: "2024-02-14",
    action: "Apply fungicide spray and improve field ventilation",
  },
]

// Mock expert consultations
const experts = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Crop Protection",
    experience: "15 years",
    rating: 4.9,
    consultations: 1250,
    image: "/expert-crop-protection.png",
    available: true,
    languages: ["Hindi", "English", "Punjabi"],
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Soil Health",
    experience: "12 years",
    rating: 4.8,
    consultations: 980,
    image: "/expert-soil-health.png",
    available: false,
    languages: ["Hindi", "English"],
  },
  {
    id: 3,
    name: "Suresh Patel",
    specialization: "Organic Farming",
    experience: "20 years",
    rating: 4.7,
    consultations: 1500,
    image: "/expert-organic-farming.png",
    available: true,
    languages: ["Hindi", "Gujarati", "English"],
  },
]

// Mock agricultural news
const news = [
  {
    id: 1,
    title: "New Drought-Resistant Wheat Variety Released",
    summary: "Scientists develop new wheat variety that can withstand extended dry periods",
    date: "2024-02-15",
    category: "Research",
    image: "/wheat-research-lab.png",
  },
  {
    id: 2,
    title: "Government Announces Increased MSP for Kharif Crops",
    summary: "Minimum Support Price increased by 8% for major kharif crops including rice and cotton",
    date: "2024-02-14",
    category: "Policy",
    image: "/government-announcement.png",
  },
  {
    id: 3,
    title: "Digital Agriculture Summit 2024",
    summary: "Leading experts to discuss future of smart farming and precision agriculture",
    date: "2024-02-13",
    category: "Events",
    image: "/digital-agriculture-summit.png",
  },
]

export default function AdvisoryPage() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "partly-cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-primary"
      default:
        return "bg-primary"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "pest":
        return <Bug className="h-5 w-5" />
      case "disease":
        return <Leaf className="h-5 w-5" />
      case "weather":
        return <Cloud className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Agricultural Advisory</h1>
          <p className="text-muted-foreground">Get expert guidance, weather updates, and crop protection alerts</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="experts">Expert Consultation</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="news">News & Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Weather Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="mr-2 h-5 w-5" />
                    Weather Forecast
                  </CardTitle>
                  <CardDescription>5-day weather outlook for your region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="font-medium text-sm mb-2">{day.day}</p>
                        <div className="flex justify-center mb-2">{getWeatherIcon(day.condition)}</div>
                        <p className="text-xs text-muted-foreground mb-1">{day.condition}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-bold">
                            {day.high}°/{day.low}°
                          </p>
                          <p className="text-xs text-blue-600">{day.rain}% rain</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Current Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">{getWeatherIcon(weatherData.current.condition)}</div>
                    <p className="text-3xl font-bold">{weatherData.current.temperature}°C</p>
                    <p className="text-muted-foreground">{weatherData.current.condition}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <span className="font-medium">{weatherData.current.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">Wind Speed</span>
                      </div>
                      <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <CloudRain className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">Rainfall</span>
                      </div>
                      <span className="font-medium">{weatherData.current.rainfall} mm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts Section */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Active Alerts
                </CardTitle>
                <CardDescription>Important notifications for your crops and region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)} text-white`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">{alert.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {alert.crop}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{alert.location}</span>
                              <span>{alert.date}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                      </div>
                      {selectedAlert === alert.id && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Recommended Action:</h4>
                          <p className="text-sm text-muted-foreground">{alert.action}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ask an Expert</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get personalized advice from agricultural experts
                  </p>
                  <Button className="w-full hover-lift">Consult Now</Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Crop Calendar</h3>
                  <p className="text-sm text-muted-foreground mb-4">View optimal sowing and harvesting times</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Calendar
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-chart-3/10 rounded-full w-fit mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="font-semibold mb-2">Market Prices</h3>
                  <p className="text-sm text-muted-foreground mb-4">Check current market rates for your crops</p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/marketplace">View Prices</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="experts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card key={expert.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={expert.image || "/placeholder.svg"}
                        alt={expert.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{expert.name}</h3>
                        <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400">{"★".repeat(Math.floor(expert.rating))}</div>
                          <span className="ml-2 text-sm text-muted-foreground">{expert.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{expert.experience}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Consultations:</span>
                        <span className="font-medium">{expert.consultations}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Languages:</span>
                        <span className="font-medium">{expert.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`w-2 h-2 rounded-full ${expert.available ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm">{expert.available ? "Available Now" : "Busy"}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 hover-lift" disabled={!expert.available}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled={!expert.available}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Crop Guides</h3>
                  <p className="text-sm text-muted-foreground mb-4">Comprehensive guides for growing different crops</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Browse Guides
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mb-4">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Government Schemes</h3>
                  <p className="text-sm text-muted-foreground mb-4">Information about subsidies and support programs</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Schemes
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="p-3 bg-chart-3/10 rounded-full w-fit mb-4">
                    <Users className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="font-semibold mb-2">Farmer Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">Connect with other farmers and share experiences</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <Card key={article.id} className="hover-lift overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{article.summary}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
