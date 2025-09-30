"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Waves,
  Droplets,
  TreePine,
  Fish,
  ArrowRight,
  Globe,
  Users,
  Award,
  GraduationCap,
  Sprout,
  Briefcase,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("rivers")

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

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Learn through interactive games, quizzes, and educational content about river conservation",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      features: ["Educational Games", "Interactive Quizzes", "Progress Tracking", "Achievement Badges"],
    },
    {
      id: "adult",
      title: "Adult",
      description:
        "Track your daily water usage, carbon footprint, and participate in community conservation activities",
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      features: ["Daily Life Simulator", "Carbon Footprint Tracker", "Community Events", "Impact Reports"],
    },
    {
      id: "farmer",
      title: "Farmer",
      description: "Get smart irrigation recommendations, crop planning tools, and sustainable farming insights",
      icon: Sprout,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      features: ["Smart Irrigation", "Crop Planning", "Weather Forecasts", "Soil Health Monitoring"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Waves className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-accent rounded-full animate-ping" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Breathing Rivers
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Powered by <span className="font-bold text-primary">Team EarthLens</span>
            </p>
            <Sparkles className="h-5 w-5 text-accent" />
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14">
            <TabsTrigger value="rivers" className="text-lg gap-2">
              <Droplets className="h-5 w-5" />
              Explore Rivers
            </TabsTrigger>
            <TabsTrigger value="roles" className="text-lg gap-2">
              <Users className="h-5 w-5" />
              Choose Role
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rivers" className="mt-0">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Explore Our Rivers</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Discover real-time environmental data from NASA satellites for three of the world's most vital rivers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {rivers.map((river) => (
                <Card
                  key={river.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => router.push(`/river/${river.id}`)}
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
                      View NASA Data
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="mt-0">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose Your Role</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Select your role to access personalized activities, tools, and conservation challenges
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <Card
                    key={role.id}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50"
                    onClick={() => router.push(`/${role.id}-dashboard`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 ${role.bgColor} rounded-full`}>
                          <Icon className={`h-10 w-10 ${role.color}`} />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-3">{role.title}</h3>
                      <p className="text-muted-foreground text-balance text-center mb-6">{role.description}</p>

                      <div className="space-y-2 mb-6">
                        {role.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Start as {role.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
