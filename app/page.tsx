"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Waves,
  Droplets,
  TreePine,
  Fish,
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
      color: "from-amber-400 to-orange-600",
    },
    {
      id: "amazon",
      name: "The Amazon",
      location: "South America",
      length: "6,400 km",
      description: "The largest river by discharge volume, heart of the rainforest",
      image: "/amazon-river-winding-through-lush-green-rainforest.jpg",
      stats: { temperature: "26°C", vegetation: "92%", pollution: "Low" },
      color: "from-emerald-400 to-green-600",
    },
    {
      id: "yangtze",
      name: "The Yangtze",
      location: "China",
      length: "6,300 km",
      description: "Asia's longest river, supporting over 400 million people",
      image: "/yangtze-river-flowing-through-chinese-mountains-an.jpg",
      stats: { temperature: "18°C", vegetation: "58%", pollution: "High" },
      color: "from-cyan-400 to-blue-600",
    },
  ]

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Learn through interactive games, quizzes, and educational content about river conservation",
      icon: GraduationCap,
      color: "from-blue-400 to-blue-600",
      features: ["Educational Games", "Interactive Quizzes", "Progress Tracking", "Achievement Badges"],
    },
    {
      id: "adult",
      title: "Adult",
      description:
        "Track your daily water usage, carbon footprint, and participate in community conservation activities",
      icon: Briefcase,
      color: "from-green-400 to-green-600",
      features: ["Daily Life Simulator", "Carbon Footprint Tracker", "Community Events", "Impact Reports"],
    },
    {
      id: "farmer",
      title: "Farmer",
      description: "Get smart irrigation recommendations, crop planning tools, and sustainable farming insights",
      icon: Sprout,
      color: "from-orange-400 to-orange-600",
      features: ["Smart Irrigation", "Crop Planning", "Weather Forecasts", "Soil Health Monitoring"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Waves className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-ping" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            Breathing Rivers
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <p className="text-base md:text-lg text-muted-foreground">
              Powered by <span className="font-bold text-primary">Team EarthLens</span>
            </p>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Experience the pulse of our planet's most vital waterways through interactive exploration and real-world
            action.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card className="relative overflow-hidden text-center p-6 border-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-blue-600/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
              <p className="text-muted-foreground text-balance">
                Monitor real-time environmental data from three of the world's most important rivers
              </p>
            </div>
          </Card>

          <Card className="relative overflow-hidden text-center p-6 border-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-600/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-600/20">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Action</h3>
              <p className="text-muted-foreground text-balance">
                Participate in cleanup events, tree planting, and conservation activities with QR validation
              </p>
            </div>
          </Card>

          <Card className="relative overflow-hidden text-center p-6 border-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-600/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-600/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Journey</h3>
              <p className="text-muted-foreground text-balance">
                Tailored experiences for Adults, Students, and Farmers with role-specific tools and insights
              </p>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 h-12">
            <TabsTrigger value="rivers" className="text-base gap-2">
              <Droplets className="h-4 w-4" />
              Explore Rivers
            </TabsTrigger>
            <TabsTrigger value="roles" className="text-base gap-2">
              <Users className="h-4 w-4" />
              Choose Role
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rivers" className="mt-0">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Explore Our Rivers</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Click on a river to discover real-time NASA satellite data
              </p>
            </div>

            <TooltipProvider>
              <div className="flex justify-center items-center gap-12 flex-wrap max-w-4xl mx-auto">
                {rivers.map((river) => (
                  <Tooltip key={river.id} delayDuration={200}>
                    <TooltipTrigger asChild>
                      <div
                        className="flex flex-col items-center gap-3 cursor-pointer group"
                        onClick={() => router.push(`/river/${river.id}`)}
                      >
                        <div
                          className={`relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-background transition-all duration-300 group-hover:ring-8 group-hover:scale-110 bg-gradient-to-br ${river.color} shadow-xl`}
                        >
                          <img
                            src={river.image || "/placeholder.svg"}
                            alt={river.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <Badge variant="secondary" className="bg-white/90 text-black text-xs">
                              {river.location}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{river.name}</h3>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs p-4">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">{river.description}</p>
                        <div className="text-xs space-y-1 pt-2 border-t">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Droplets className="h-3 w-3 text-blue-500" />
                              Temperature
                            </span>
                            <span className="font-medium">{river.stats.temperature}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <TreePine className="h-3 w-3 text-green-500" />
                              Vegetation
                            </span>
                            <span className="font-medium">{river.stats.vegetation}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Fish className="h-3 w-3 text-orange-500" />
                              Pollution
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
                        <p className="text-xs text-muted-foreground pt-2">Length: {river.length}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </TabsContent>

          <TabsContent value="roles" className="mt-0">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Choose Your Role</h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Select your role to access personalized activities and tools
              </p>
            </div>

            <TooltipProvider>
              <div className="flex justify-center items-center gap-12 flex-wrap max-w-4xl mx-auto">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <Tooltip key={role.id} delayDuration={200}>
                      <TooltipTrigger asChild>
                        <div
                          className="flex flex-col items-center gap-3 cursor-pointer group"
                          onClick={() => router.push(`/${role.id}-dashboard`)}
                        >
                          <div
                            className={`relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-background transition-all duration-300 group-hover:ring-8 group-hover:scale-110 bg-gradient-to-br ${role.color} shadow-xl flex items-center justify-center`}
                          >
                            <Icon className="h-16 w-16 text-white" />
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{role.title}</h3>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs p-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">{role.description}</p>
                          <div className="pt-2 border-t space-y-1">
                            {role.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </TooltipProvider>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
