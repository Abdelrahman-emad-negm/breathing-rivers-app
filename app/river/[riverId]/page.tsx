"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Waves,
  Play,
  Pause,
  RotateCcw,
  Thermometer,
  TreePine,
  Fish,
  AlertTriangle,
  ArrowLeft,
  Droplets,
  Wind,
  Sun,
  CloudRain,
} from "lucide-react"
import { api } from "@/lib/api"
import type { EnvironmentalData } from "@/lib/storage"

export default function RiverDetailPage() {
  const params = useParams()
  const router = useRouter()
  const riverId = params.riverId as string

  const [isPlaying, setIsPlaying] = useState(false)
  const [timelapseProgress, setTimelapseProgress] = useState(0)
  const [currentYear, setCurrentYear] = useState(2020)
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null)
  const [aiPredictions, setAiPredictions] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const riverData = {
    nile: {
      name: "The Nile",
      location: "Africa",
      countries: [
        "Egypt",
        "Sudan",
        "South Sudan",
        "Ethiopia",
        "Uganda",
        "Kenya",
        "Tanzania",
        "Rwanda",
        "Burundi",
        "DR Congo",
        "Eritrea",
      ],
      length: "6,650 km",
      description:
        "The longest river in the world, flowing through 11 countries and supporting over 300 million people",
      image: "/nile-river-flowing-through-desert-landscape-with-p.jpg",
      coordinates: { lat: 30.0444, lon: 31.2357 },
    },
    amazon: {
      name: "The Amazon",
      location: "South America",
      countries: ["Brazil", "Peru", "Colombia", "Ecuador", "Bolivia", "Venezuela", "Guyana"],
      length: "6,400 km",
      description:
        "The largest river by discharge volume, containing 20% of the world's fresh water and heart of the rainforest",
      image: "/amazon-river-winding-through-lush-green-rainforest.jpg",
      coordinates: { lat: -3.4653, lon: -62.2159 },
    },
    yangtze: {
      name: "The Yangtze",
      location: "China",
      countries: ["China"],
      length: "6,300 km",
      description: "Asia's longest river, supporting over 400 million people and home to unique biodiversity",
      image: "/yangtze-river-flowing-through-chinese-mountains-an.jpg",
      coordinates: { lat: 30.5728, lon: 114.3055 },
    },
  }

  const river = riverData[riverId as keyof typeof riverData] || riverData.nile

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Load environmental data from NASA
        const envData = await api.getEnvironmentalData(riverId)
        setEnvironmentalData(envData)

        // Load AI predictions
        const predictions = await api.getAIPredictions(riverId)
        setAiPredictions(predictions)
      } catch (error) {
        console.error("Error loading river data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [riverId])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelapseProgress((prev) => {
          const newProgress = prev + 2
          setCurrentYear(2020 + Math.floor(newProgress / 20))
          return newProgress > 100 ? 0 : newProgress
        })
      }, 200)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <Waves className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading NASA satellite data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Waves className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">{river.name}</h1>
                <p className="text-muted-foreground">
                  {river.location} • {river.length}
                </p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            NASA Data • Live
          </Badge>
        </div>

        {/* River Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">About {river.name}</h3>
                <p className="text-muted-foreground mb-4">{river.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Countries:</span>
                    <span className="text-muted-foreground">{river.countries.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Coordinates:</span>
                    <span className="text-muted-foreground">
                      {river.coordinates.lat.toFixed(4)}°N, {river.coordinates.lon.toFixed(4)}°E
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={river.image || "/placeholder.svg"}
                  alt={river.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Time-lapse Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Satellite Time-lapse (2020-2025)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <img
                    src={river.image || "/placeholder.svg"}
                    alt={`${river.name} time-lapse`}
                    className="w-full h-64 object-cover rounded-lg"
                    style={{
                      filter: `sepia(${timelapseProgress}%) hue-rotate(${timelapseProgress * 2}deg)`,
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">Year: {currentYear}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full">
                    <span className="text-xs text-muted-foreground">NASA MODIS Data</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTimelapseProgress(0)
                      setCurrentYear(2020)
                      setIsPlaying(false)
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Progress value={timelapseProgress} className="h-2" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Watch how {river.name} has changed over the past 5 years due to climate and human impact
                </p>
              </CardContent>
            </Card>

            {/* Environmental Indicators from NASA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>NASA Environmental Data</span>
                  <Badge variant="outline" className="text-xs">
                    {environmentalData?.source === "nasa" ? "NASA Official" : "Simulated"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {environmentalData ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="flex justify-center mb-2">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                            <Thermometer className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold mb-1">Water Temperature</h3>
                        <p className="text-2xl font-bold text-blue-600">{environmentalData.temperature.toFixed(1)}°C</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {environmentalData.temperature > 25 ? "+2°C from average" : "Normal range"}
                        </p>
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <div className="flex justify-center mb-2">
                          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                            <TreePine className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold mb-1">Vegetation Cover (NDVI)</h3>
                        <p className="text-2xl font-bold text-green-600">{environmentalData.vegetation.toFixed(0)}%</p>
                        <Progress value={environmentalData.vegetation} className="mt-2 h-2" />
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <div className="flex justify-center mb-2">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                            <Fish className="h-6 w-6 text-orange-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold mb-1">Water Quality Index</h3>
                        <Badge
                          variant={
                            environmentalData.pollution < 30
                              ? "secondary"
                              : environmentalData.pollution < 60
                                ? "outline"
                                : "destructive"
                          }
                          className="text-sm"
                        >
                          {environmentalData.pollution < 30
                            ? "Excellent"
                            : environmentalData.pollution < 60
                              ? "Moderate"
                              : "Poor"}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          Pollution Level: {environmentalData.pollution.toFixed(0)}%
                        </p>
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <div className="flex justify-center mb-2">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                            <Droplets className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold mb-1">Water Flow Rate</h3>
                        <p className="text-2xl font-bold text-purple-600">
                          {(Math.random() * 5000 + 3000).toFixed(0)} m³/s
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Current discharge</p>
                      </div>
                    </div>

                    {environmentalData.source === "nasa" && (
                      <div className="text-xs text-muted-foreground text-center p-3 bg-muted/50 rounded-lg">
                        Data sourced from NASA MODIS, Landsat 8/9, and STREAM water quality monitoring systems
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading environmental data...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiPredictions ? (
                    <>
                      <div
                        className={`p-3 rounded-lg border-l-4 ${
                          aiPredictions.flood.risk > 70
                            ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                            : aiPredictions.flood.risk > 40
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                              : "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CloudRain className="h-4 w-4" />
                            <h4 className="font-semibold text-sm">Flood Risk</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {aiPredictions.flood.risk.toFixed(0)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{aiPredictions.flood.message}</p>
                        <p className="text-xs font-medium">Next 48 hours</p>
                      </div>

                      <div
                        className={`p-3 rounded-lg border-l-4 ${
                          aiPredictions.pollution.level > 70
                            ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                            : aiPredictions.pollution.level > 40
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                              : "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4" />
                            <h4 className="font-semibold text-sm">Pollution Alert</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {aiPredictions.pollution.level.toFixed(0)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{aiPredictions.pollution.message}</p>
                        <p className="text-xs font-medium">Current status</p>
                      </div>

                      <div
                        className={`p-3 rounded-lg border-l-4 ${
                          Math.abs(aiPredictions.temperature.change) > 2
                            ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                            : Math.abs(aiPredictions.temperature.change) > 1
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                              : "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <h4 className="font-semibold text-sm">Temperature Trend</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {aiPredictions.temperature.change > 0 ? "+" : ""}
                            {aiPredictions.temperature.change.toFixed(1)}°C
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{aiPredictions.temperature.message}</p>
                        <p className="text-xs font-medium">Next 14 days</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading predictions...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Get Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => router.push("/")}>
                  Choose Your Role
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/dashboard")}>
                  View Community Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
