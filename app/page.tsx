"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Droplets, TreePine, Fish, ArrowRight, Globe, Users, Award } from "lucide-react"

export default function HomePage() {
  const [selectedRiver, setSelectedRiver] = useState<string | null>(null)
  const [showRiverSelection, setShowRiverSelection] = useState(false)

  const rivers = [
    {
      id: "nile",
      name: "The Nile",
      location: "Africa",
      length: "6,650 km",
      description: "The longest river in the world, flowing through 11 countries",
      image: "/nile-river-flowing-through-desert-landscape-with-p.jpg",
      stats: { temperature: "28°C", vegetation: "65%", pollution: "Moderate" },
    },
    {
      id: "amazon",
      name: "The Amazon",
      location: "South America",
      length: "6,400 km",
      description: "The largest river by discharge volume, heart of the rainforest",
      image: "/amazon-river-winding-through-lush-green-rainforest.jpg",
      stats: { temperature: "26°C", vegetation: "92%", pollution: "Low" },
    },
    {
      id: "yangtze",
      name: "The Yangtze",
      location: "China",
      length: "6,300 km",
      description: "Asia's longest river, supporting over 400 million people",
      image: "/yangtze-river-flowing-through-chinese-mountains-an.jpg",
      stats: { temperature: "18°C", vegetation: "58%", pollution: "High" },
    },
  ]

  const handleStart = () => {
    setShowRiverSelection(true)
  }

  const handleRiverSelect = (riverId: string) => {
    setSelectedRiver(riverId)
    // Navigate to shared features dashboard
    window.location.href = `/dashboard?river=${riverId}`
  }

  if (showRiverSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Waves className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-balance">Choose Your River</h1>
            </div>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Select one of the world's most vital rivers to begin your conservation journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rivers.map((river) => (
              <Card
                key={river.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => handleRiverSelect(river.id)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={river.image || "/placeholder.svg"}
                    alt={river.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {river.location}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold">{river.name}</h3>
                    <span className="text-sm text-muted-foreground">{river.length}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-balance">{river.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        Temperature
                      </span>
                      <span className="font-medium">{river.stats.temperature}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <TreePine className="h-4 w-4 text-green-500" />
                        Vegetation
                      </span>
                      <span className="font-medium">{river.stats.vegetation}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Fish className="h-4 w-4 text-orange-500" />
                        Pollution Level
                      </span>
                      <span
                        className={`font-medium ${
                          river.stats.pollution === "Low"
                            ? "text-green-600"
                            : river.stats.pollution === "Moderate"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {river.stats.pollution}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explore {river.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Waves className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-ping" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Breathing Rivers
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Experience the pulse of our planet's most vital waterways. Join a global community dedicated to river
            conservation through interactive exploration and real-world action.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="text-center p-6 border-2 hover:border-primary/50 transition-colors">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
            <p className="text-muted-foreground text-balance">
              Monitor real-time environmental data from three of the world's most important rivers
            </p>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-primary/50 transition-colors">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Users className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Action</h3>
            <p className="text-muted-foreground text-balance">
              Participate in cleanup events, tree planting, and conservation activities with QR validation
            </p>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-primary/50 transition-colors">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-secondary/30 rounded-full">
                <Award className="h-8 w-8 text-secondary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Journey</h3>
            <p className="text-muted-foreground text-balance">
              Tailored experiences for Adults, Students, and Farmers with role-specific tools and insights
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="mb-8">
            <img
              src="/flowing-river-with-environmental-data-overlays-and.jpg"
              alt="Rivers flowing with data visualization"
              className="mx-auto rounded-xl shadow-2xl max-w-2xl w-full"
            />
          </div>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={handleStart}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">Join thousands of conservationists worldwide</p>
        </div>
      </div>
    </div>
  )
}
