"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import {
  CreditCard,
  Wallet,
  Smartphone,
  Building,
  Receipt,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Mock transaction data
const transactions = [
  {
    id: "TXN001",
    type: "marketplace",
    description: "Basmati Rice Purchase - 500 kg",
    amount: 25000,
    status: "completed",
    date: "2024-02-15",
    paymentMethod: "UPI",
    seller: "Sharma Farms",
    invoiceId: "INV-2024-001",
  },
  {
    id: "TXN002",
    type: "equipment",
    description: "Tractor Rental - 3 days",
    amount: 3600,
    status: "completed",
    date: "2024-02-14",
    paymentMethod: "Credit Card",
    seller: "Singh Equipment",
    invoiceId: "INV-2024-002",
  },
  {
    id: "TXN003",
    type: "storage",
    description: "Cold Storage - 1 month",
    amount: 4400,
    status: "pending",
    date: "2024-02-13",
    paymentMethod: "Net Banking",
    seller: "Modern Cold Storage",
    invoiceId: "INV-2024-003",
  },
  {
    id: "TXN004",
    type: "advisory",
    description: "Expert Consultation - Dr. Kumar",
    amount: 500,
    status: "completed",
    date: "2024-02-12",
    paymentMethod: "Wallet",
    seller: "AgriVerse Advisory",
    invoiceId: "INV-2024-004",
  },
  {
    id: "TXN005",
    type: "marketplace",
    description: "Wheat Seeds - 100 kg",
    amount: 8500,
    status: "failed",
    date: "2024-02-11",
    paymentMethod: "UPI",
    seller: "Premium Seeds Co.",
    invoiceId: "INV-2024-005",
  },
]

// Mock wallet data
const walletData = {
  balance: 15750,
  pendingAmount: 2200,
  totalEarnings: 45000,
  totalSpent: 32450,
}

export default function PaymentsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "marketplace":
        return "bg-primary"
      case "equipment":
        return "bg-accent"
      case "storage":
        return "bg-chart-3"
      case "advisory":
        return "bg-chart-4"
      default:
        return "bg-gray-500"
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "upi":
        return <Smartphone className="h-4 w-4" />
      case "credit card":
      case "debit card":
        return <CreditCard className="h-4 w-4" />
      case "net banking":
        return <Building className="h-4 w-4" />
      case "wallet":
        return <Wallet className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Payments & Wallet</h1>
          <p className="text-muted-foreground">Manage your transactions, payments, and wallet balance</p>
        </div>

        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-6">
            {/* Wallet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wallet Balance</p>
                      <p className="text-2xl font-bold">₹{walletData.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-3 bg-yellow-500/10 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Amount</p>
                      <p className="text-2xl font-bold">₹{walletData.pendingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-3 bg-green-500/10 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">₹{walletData.totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-3 bg-red-500/10 rounded-full">
                      <CreditCard className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">₹{walletData.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Add Money</h3>
                  <p className="text-sm text-muted-foreground mb-4">Top up your wallet balance</p>
                  <Button className="w-full hover-lift" asChild>
                    <Link href="/payments/add-money">Add Money</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                    <Building className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Withdraw</h3>
                  <p className="text-sm text-muted-foreground mb-4">Transfer to bank account</p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/payments/withdraw">Withdraw</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-chart-3/10 rounded-full w-fit mx-auto mb-4">
                    <Receipt className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="font-semibold mb-2">Transaction History</h3>
                  <p className="text-sm text-muted-foreground mb-4">View all transactions</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Transaction Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-xl font-bold">{transactions.filter((t) => t.status === "completed").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Clock className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold">{transactions.filter((t) => t.status === "pending").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Failed</p>
                      <p className="text-xl font-bold">{transactions.filter((t) => t.status === "failed").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-xl font-bold">
                        ₹{transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transactions List */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your payment history and transaction details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() =>
                        setSelectedTransaction(selectedTransaction === transaction.id ? null : transaction.id)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${getTypeColor(transaction.type)} text-white`}>
                            {getStatusIcon(transaction.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{transaction.description}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{transaction.seller}</span>
                              <span>{transaction.date}</span>
                              <div className="flex items-center space-x-1">
                                {getPaymentMethodIcon(transaction.paymentMethod)}
                                <span>{transaction.paymentMethod}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">₹{transaction.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      {selectedTransaction === transaction.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Transaction ID:</p>
                              <p className="font-medium">{transaction.id}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Invoice ID:</p>
                              <p className="font-medium">{transaction.invoiceId}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Download className="mr-2 h-4 w-4" />
                              Download Receipt
                            </Button>
                            {transaction.status === "failed" && (
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry Payment
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* UPI */}
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">UPI</h3>
                      <p className="text-sm text-muted-foreground">Instant payments</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">farmer@paytm</p>
                    <p className="text-sm">farmer@gpay</p>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Manage UPI
                  </Button>
                </CardContent>
              </Card>

              {/* Credit/Debit Cards */}
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <CreditCard className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Cards</h3>
                      <p className="text-sm text-muted-foreground">Credit & Debit cards</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">**** **** **** 1234</p>
                    <p className="text-sm">**** **** **** 5678</p>
                    <Badge variant="secondary">2 Cards</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Manage Cards
                  </Button>
                </CardContent>
              </Card>

              {/* Net Banking */}
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-chart-3/10 rounded-full">
                      <Building className="h-6 w-6 text-chart-3" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Net Banking</h3>
                      <p className="text-sm text-muted-foreground">Bank transfers</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">State Bank of India</p>
                    <p className="text-sm">HDFC Bank</p>
                    <Badge variant="secondary">2 Banks</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Manage Banks
                  </Button>
                </CardContent>
              </Card>

              {/* Digital Wallets */}
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-chart-4/10 rounded-full">
                      <Wallet className="h-6 w-6 text-chart-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Digital Wallets</h3>
                      <p className="text-sm text-muted-foreground">Third-party wallets</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">Paytm Wallet</p>
                    <p className="text-sm">PhonePe Wallet</p>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Manage Wallets
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Invoices & Receipts</CardTitle>
                <CardDescription>Download and manage your transaction receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions
                    .filter((t) => t.status === "completed")
                    .map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Receipt className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{transaction.invoiceId}</h3>
                            <p className="text-sm text-muted-foreground">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold">₹{transaction.amount.toLocaleString()}</p>
                            <Badge variant="secondary">{transaction.type}</Badge>
                          </div>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
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
