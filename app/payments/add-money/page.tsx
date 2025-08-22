"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Wallet, Smartphone, CreditCard, Building, Shield } from "lucide-react"
import Link from "next/link"

export default function AddMoneyPage() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("upi")

  const quickAmounts = [500, 1000, 2000, 5000, 10000]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement payment processing
    console.log("Adding money:", { amount, paymentMethod })
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "upi":
        return <Smartphone className="h-5 w-5" />
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "netbanking":
        return <Building className="h-5 w-5" />
      default:
        return <Wallet className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/payments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payments
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">Add Money to Wallet</h1>
            <p className="text-muted-foreground">Top up your AgriVerse wallet for seamless transactions</p>
          </div>

          <Card className="hover-lift border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Add Money
              </CardTitle>
              <CardDescription>Choose amount and payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div className="space-y-4">
                  <Label htmlFor="amount">Enter Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    max="50000"
                    required
                  />
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setAmount(quickAmount.toString())}
                      >
                        ₹{quickAmount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label>Select Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="upi" id="upi" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <Label htmlFor="upi" className="font-medium cursor-pointer">
                              UPI
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Pay using UPI apps like GPay, PhonePe, Paytm
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <CreditCard className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <Label htmlFor="card" className="font-medium cursor-pointer">
                              Credit/Debit Card
                            </Label>
                            <p className="text-sm text-muted-foreground">Pay using your saved cards</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 bg-chart-3/10 rounded-lg">
                            <Building className="h-5 w-5 text-chart-3" />
                          </div>
                          <div>
                            <Label htmlFor="netbanking" className="font-medium cursor-pointer">
                              Net Banking
                            </Label>
                            <p className="text-sm text-muted-foreground">Direct bank transfer</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Secure Payment</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                {/* Summary */}
                {amount && (
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Payment Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Amount to add:</span>
                        <span className="font-medium">₹{amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payment method:</span>
                        <div className="flex items-center space-x-1">
                          {getPaymentMethodIcon(paymentMethod)}
                          <span className="font-medium capitalize">{paymentMethod}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing fee:</span>
                        <span className="font-medium">₹0</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total amount:</span>
                          <span className="font-bold text-primary">₹{amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full hover-lift" disabled={!amount}>
                  Proceed to Pay ₹{amount || "0"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
