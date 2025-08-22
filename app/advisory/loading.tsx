export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  )
}
