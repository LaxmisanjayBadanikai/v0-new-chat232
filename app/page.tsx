import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Leaf, Truck, TrendingUp, Users, Zap, BarChart3, CreditCard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-float mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Leaf className="h-10 w-10" />
              </div>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AgriVerse</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              The future of farming is here. Connect, trade, and grow with our comprehensive digital ecosystem for
              modern agriculture - from marketplace to analytics, all in one platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="hover-lift animate-pulse-glow" asChild>
                <Link href="/marketplace">
                  Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover-lift bg-transparent" asChild>
                <Link href="/signup">Join AgriVerse</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Complete agricultural ecosystem in one platform
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From crop trading to data analytics, we provide everything modern farmers need
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Crop Marketplace</CardTitle>
                <CardDescription>
                  Transparent pricing, direct buyer connections, bidding system, and fair trade practices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Equipment Rental</CardTitle>
                <CardDescription>Access modern farming equipment with booking system and owner ratings</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10 text-chart-3">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Advisory Hub</CardTitle>
                <CardDescription>
                  Weather forecasts, pest alerts, expert consultations, and agricultural guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4">
                  <Truck className="h-6 w-6" />
                </div>
                <CardTitle>Logistics & Storage</CardTitle>
                <CardDescription>
                  Warehouse booking, transportation services, and supply chain management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <CreditCard className="h-6 w-6" />
                </div>
                <CardTitle>Payment System</CardTitle>
                <CardDescription>
                  Secure wallet, multiple payment methods, transaction history, and invoice management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Revenue insights, crop performance, market trends, and business intelligence
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your farming experience?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of farmers already using AgriVerse to grow their business with our complete agricultural
              platform
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" className="hover-lift" asChild>
                <Link href="/signup">Get Started Today</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/analytics">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
