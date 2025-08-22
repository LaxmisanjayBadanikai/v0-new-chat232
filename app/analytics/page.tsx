"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Truck,
  Download,
  Calendar,
  Target,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock analytics data
const overviewMetrics = {
  totalRevenue: 2450000,
  revenueGrowth: 12.5,
  totalUsers: 15420,
  userGrowth: 8.3,
  totalTransactions: 8945,
  transactionGrowth: 15.2,
  averageOrderValue: 3250,
  aovGrowth: -2.1,
}

const revenueData = [
  { month: "Jan", revenue: 185000, transactions: 650, users: 1200 },
  { month: "Feb", revenue: 195000, transactions: 720, users: 1350 },
  { month: "Mar", revenue: 210000, transactions: 780, users: 1480 },
  { month: "Apr", revenue: 225000, transactions: 850, users: 1620 },
  { month: "May", revenue: 240000, transactions: 920, users: 1750 },
  { month: "Jun", revenue: 255000, transactions: 980, users: 1890 },
]

const categoryData = [
  { name: "Marketplace", value: 45, revenue: 1102500, color: "#22c55e" },
  { name: "Equipment Rental", value: 25, revenue: 612500, color: "#3b82f6" },
  { name: "Storage & Logistics", value: 20, revenue: 490000, color: "#f59e0b" },
  { name: "Advisory Services", value: 10, revenue: 245000, color: "#ef4444" },
]

const cropPerformanceData = [
  { crop: "Rice", yield: 85, price: 2200, volume: 1500, profit: 15.2 },
  { crop: "Wheat", yield: 78, price: 1800, volume: 1200, profit: 12.8 },
  { crop: "Cotton", yield: 92, price: 5500, volume: 800, profit: 18.5 },
  { crop: "Sugarcane", yield: 88, price: 3200, volume: 600, profit: 14.3 },
  { crop: "Maize", yield: 82, price: 1600, volume: 900, profit: 11.7 },
]

const equipmentUtilizationData = [
  { equipment: "Tractors", utilization: 85, bookings: 245, revenue: 294000 },
  { equipment: "Harvesters", utilization: 72, bookings: 156, revenue: 546000 },
  { equipment: "Tillers", utilization: 68, bookings: 189, revenue: 75600 },
  { equipment: "Irrigation", utilization: 91, bookings: 312, revenue: 62400 },
]

const marketTrendsData = [
  { week: "W1", rice: 2150, wheat: 1750, cotton: 5200, maize: 1550 },
  { week: "W2", rice: 2180, wheat: 1780, cotton: 5350, maize: 1580 },
  { week: "W3", rice: 2200, wheat: 1800, cotton: 5500, maize: 1600 },
  { week: "W4", rice: 2220, wheat: 1820, cotton: 5450, maize: 1620 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="market">Market Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(overviewMetrics.totalRevenue)}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">
                          {formatPercentage(overviewMetrics.revenueGrowth)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{overviewMetrics.totalUsers.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">{formatPercentage(overviewMetrics.userGrowth)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-full">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Transactions</p>
                      <p className="text-2xl font-bold">{overviewMetrics.totalTransactions.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">
                          {formatPercentage(overviewMetrics.transactionGrowth)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-chart-3/10 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-chart-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Order Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(overviewMetrics.averageOrderValue)}</p>
                      <div className="flex items-center mt-1">
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-500">{formatPercentage(overviewMetrics.aovGrowth)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-chart-4/10 rounded-full">
                      <Target className="h-6 w-6 text-chart-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Trend */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and transaction growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name]} />
                    <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Revenue by Service</CardTitle>
                  <CardDescription>Distribution of revenue across services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                  <CardDescription>Revenue breakdown by service category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(category.revenue)}</p>
                          <p className="text-sm text-muted-foreground">{category.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Monthly Revenue Growth</CardTitle>
                  <CardDescription>Revenue and transaction trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name]} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Transaction Volume</CardTitle>
                  <CardDescription>Monthly transaction count</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="transactions" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crops" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Crop Performance Analysis</CardTitle>
                <CardDescription>Yield, pricing, and profitability metrics by crop type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Crop</th>
                        <th className="text-right p-2">Yield %</th>
                        <th className="text-right p-2">Avg Price</th>
                        <th className="text-right p-2">Volume (MT)</th>
                        <th className="text-right p-2">Profit Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropPerformanceData.map((crop) => (
                        <tr key={crop.crop} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{crop.crop}</td>
                          <td className="p-2 text-right">
                            <Badge variant={crop.yield > 80 ? "default" : "secondary"}>{crop.yield}%</Badge>
                          </td>
                          <td className="p-2 text-right">{formatCurrency(crop.price)}</td>
                          <td className="p-2 text-right">{crop.volume}</td>
                          <td className="p-2 text-right">
                            <span className="text-green-600 font-medium">{formatPercentage(crop.profit)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Crop Yield Comparison</CardTitle>
                <CardDescription>Performance comparison across different crops</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yield" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {equipmentUtilizationData.map((equipment) => (
                <Card key={equipment.equipment} className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{equipment.equipment}</h3>
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Utilization:</span>
                        <span className="font-medium">{equipment.utilization}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bookings:</span>
                        <span className="font-medium">{equipment.bookings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium">{formatCurrency(equipment.revenue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Equipment Utilization Rates</CardTitle>
                <CardDescription>Usage efficiency across different equipment types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={equipmentUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="equipment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Market Price Trends</CardTitle>
                <CardDescription>Weekly price movements for major crops</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name]} />
                    <Legend />
                    <Line type="monotone" dataKey="rice" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="wheat" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="cotton" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="maize" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Price Volatility</CardTitle>
                  <CardDescription>Weekly price change percentages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Rice</span>
                      <Badge variant="default">+3.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wheat</span>
                      <Badge variant="default">+4.0%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cotton</span>
                      <Badge variant="secondary">-0.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Maize</span>
                      <Badge variant="default">+4.5%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>Key market observations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm font-medium text-green-800">Strong demand for organic rice varieties</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-blue-800">Wheat prices stabilizing after monsoon</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-sm font-medium text-yellow-800">Cotton export opportunities increasing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
