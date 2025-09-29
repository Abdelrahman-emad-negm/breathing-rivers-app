"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
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
  Trophy,
  QrCode,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const selectedRiver = searchParams.get("river") || "nile"
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelapseProgress, setTimelapseProgress] = useState(0)
  const [currentYear, setCurrentYear] = useState(2020)

  const riverData = {
    nile: {
      name: "The Nile",
      location: "Africa",
      currentTemp: 28,
      vegetation: 65,
      pollutionLevel: "Moderate",
      image: "/nile-river-flowing-through-desert-landscape-with-p.jpg",
    },
    amazon: {
      name: "The Amazon",
      location: "South America",
      currentTemp: 26,
      vegetation: 92,
      pollutionLevel: "Low",
      image: "/amazon-river-winding-through-lush-green-rainforest.jpg",
    },
    yangtze: {
      name: "The Yangtze",
      location: "China",
      currentTemp: 18,
      vegetation: 58,
      pollutionLevel: "High",
      image: "/yangtze-river-flowing-through-chinese-mountains-an.jpg",
    },
  }

  const river = riverData[selectedRiver as keyof typeof riverData] || riverData.nile

  const leaderboardData = [
    { rank: 1, name: "EcoWarrior2024", points: 2850, activities: 45, badge: "🌟" },
    { rank: 2, name: "RiverGuardian", points: 2640, activities: 38, badge: "🏆" },
    { rank: 3, name: "GreenThumb", points: 2420, activities: 35, badge: "🥉" },
    { rank: 4, name: "AquaDefender", points: 2180, activities: 31, badge: "🌊" },
    { rank: 5, name: "TreePlanter", points: 1950, activities: 28, badge: "🌳" },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "River Cleanup Drive",
      date: "Dec 15, 2024",
      location: "Nile Delta",
      participants: 156,
      type: "cleanup",
    },
    {
      id: 2,
      title: "Mangrove Planting",
      date: "Dec 22, 2024",
      location: "Amazon Basin",
      participants: 89,
      type: "planting",
    },
    {
      id: 3,
      title: "Water Quality Testing",
      date: "Jan 5, 2025",
      location: "Yangtze River",
      participants: 67,
      type: "monitoring",
    },
  ]

  const aiPredictions = [
    {
      type: "flood",
      severity: "moderate",
      message: "Moderate flood risk detected in the upper basin region",
      timeframe: "Next 7 days",
      confidence: 78,
    },
    {
      type: "pollution",
      severity: "high",
      message: "Industrial runoff levels increasing downstream",
      timeframe: "Current",
      confidence: 92,
    },
    {
      type: "temperature",
      severity: "low",
      message: "Temperature rising above seasonal average",
      timeframe: "Next 14 days",
      confidence: 65,
    },
  ]

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

  const handleRoleSelection = () => {
    window.location.href = `/role-selection?river=${selectedRiver}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Waves className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{river.name} Dashboard</h1>
              <p className="text-muted-foreground">{river.location}</p>
            </div>
          </div>
          <Button onClick={handleRoleSelection} className="bg-primary hover:bg-primary/90">
            Choose Your Role
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Time-lapse Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  River Time-lapse Visualization
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

            {/* Environmental Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Thermometer className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">Temperature</h3>
                    <p className="text-2xl font-bold text-blue-600">{river.currentTemp}°C</p>
                    <p className="text-sm text-muted-foreground">+2°C from average</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <TreePine className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">Vegetation Cover</h3>
                    <p className="text-2xl font-bold text-green-600">{river.vegetation}%</p>
                    <Progress value={river.vegetation} className="mt-2 h-2" />
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                        <Fish className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">Pollution Level</h3>
                    <Badge
                      variant={
                        river.pollutionLevel === "Low"
                          ? "secondary"
                          : river.pollutionLevel === "Moderate"
                            ? "outline"
                            : "destructive"
                      }
                      className="text-sm"
                    >
                      {river.pollutionLevel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Community Events & QR Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {event.type === "cleanup" && <Fish className="h-4 w-4 text-primary" />}
                          {event.type === "planting" && <TreePine className="h-4 w-4 text-green-600" />}
                          {event.type === "monitoring" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.participants} joined
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <QrCode className="h-4 w-4 mr-2" />
                        Join Event
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Conservation Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold">
                          {user.rank}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.activities} activities</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{user.points}</p>
                        <p className="text-xs">{user.badge}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  AI Predictions & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiPredictions.map((prediction, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        prediction.severity === "high"
                          ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                          : prediction.severity === "moderate"
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                            : "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm capitalize">{prediction.type} Alert</h4>
                        <Badge variant="outline" className="text-xs">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{prediction.message}</p>
                      <p className="text-xs font-medium">{prediction.timeframe}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
