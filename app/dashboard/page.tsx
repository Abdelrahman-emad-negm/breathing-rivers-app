"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { QRCodeScanner } from "@/components/qr-code-scanner"
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
  Scan,
} from "lucide-react"
import { api } from "@/lib/api"
import type { LeaderboardEntry, EnvironmentalData } from "@/lib/storage"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const selectedRiver = searchParams.get("river") || "nile"
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelapseProgress, setTimelapseProgress] = useState(0)
  const [currentYear, setCurrentYear] = useState(2020)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null)
  const [aiPredictions, setAiPredictions] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showQRGenerator, setShowQRGenerator] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const riverData = {
    nile: {
      name: "The Nile",
      location: "Africa",
      image: "/nile-river-flowing-through-desert-landscape-with-p.jpg",
    },
    amazon: {
      name: "The Amazon",
      location: "South America",
      image: "/amazon-river-winding-through-lush-green-rainforest.jpg",
    },
    yangtze: {
      name: "The Yangtze",
      location: "China",
      image: "/yangtze-river-flowing-through-chinese-mountains-an.jpg",
    },
  }

  const river = riverData[selectedRiver as keyof typeof riverData] || riverData.nile

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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Load environmental data
        const envData = await api.getEnvironmentalData(selectedRiver)
        setEnvironmentalData(envData)

        // Load leaderboard
        const leaderboardData = await api.getLeaderboard()
        setLeaderboard(leaderboardData)

        // Load AI predictions
        const predictions = await api.getAIPredictions(selectedRiver)
        setAiPredictions(predictions)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedRiver])

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

  const handleJoinEvent = async (event: any) => {
    const user = await api.getCurrentUser()
    if (!user) {
      alert("Please register first to join events!")
      return
    }

    setSelectedEvent(event)
    setShowQRGenerator(true)
  }

  const handleQRScanResult = async (result: { valid: boolean; points: number; message: string }) => {
    if (result.valid) {
      // Reload leaderboard to show updated points
      const updatedLeaderboard = await api.getLeaderboard()
      setLeaderboard(updatedLeaderboard)
    }

    // Show result message
    alert(result.message)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <Waves className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading river data...</p>
        </div>
      </div>
    )
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
                {environmentalData ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                          <Thermometer className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">Temperature</h3>
                      <p className="text-2xl font-bold text-blue-600">{environmentalData.temperature.toFixed(1)}°C</p>
                      <p className="text-sm text-muted-foreground">
                        {environmentalData.temperature > 25 ? "+2°C from average" : "Normal range"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                          <TreePine className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">Vegetation Cover</h3>
                      <p className="text-2xl font-bold text-green-600">{environmentalData.vegetation.toFixed(0)}%</p>
                      <Progress value={environmentalData.vegetation} className="mt-2 h-2" />
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
                          environmentalData.pollution < 30
                            ? "secondary"
                            : environmentalData.pollution < 60
                              ? "outline"
                              : "destructive"
                        }
                        className="text-sm"
                      >
                        {environmentalData.pollution < 30
                          ? "Low"
                          : environmentalData.pollution < 60
                            ? "Moderate"
                            : "High"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading environmental data...</p>
                  </div>
                )}
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
                  {/* QR Tools */}
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm" onClick={() => setShowQRScanner(!showQRScanner)}>
                      <Scan className="h-4 w-4 mr-2" />
                      {showQRScanner ? "Hide Scanner" : "Scan QR Code"}
                    </Button>
                  </div>

                  {/* QR Scanner */}
                  {showQRScanner && (
                    <div className="mb-6">
                      <QRCodeScanner onScanResult={handleQRScanResult} />
                    </div>
                  )}

                  {/* QR Generator */}
                  {showQRGenerator && selectedEvent && (
                    <div className="mb-6">
                      <QRCodeGenerator
                        eventId={selectedEvent.id}
                        eventTitle={selectedEvent.title}
                        eventType={selectedEvent.type}
                        onQRGenerated={(qrCode) => {
                          // QR code generated successfully
                        }}
                      />
                      <Button variant="outline" size="sm" onClick={() => setShowQRGenerator(false)} className="mt-2">
                        Close Generator
                      </Button>
                    </div>
                  )}

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
                      <Button variant="outline" size="sm" onClick={() => handleJoinEvent(event)}>
                        <QrCode className="h-4 w-4 mr-2" />
                        Get QR Code
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
                  {leaderboard.length > 0 ? (
                    leaderboard.map((user, index) => (
                      <div key={user.userId} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.activities} activities</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{user.points}</p>
                          <p className="text-xs">
                            {index === 0 ? "🌟" : index === 1 ? "🏆" : index === 2 ? "🥉" : "🌊"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading leaderboard...</p>
                    </div>
                  )}
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
                          <h4 className="font-semibold text-sm">Flood Alert</h4>
                          <Badge variant="outline" className="text-xs">
                            {aiPredictions.flood.risk.toFixed(0)}% risk
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
                          <h4 className="font-semibold text-sm">Pollution Alert</h4>
                          <Badge variant="outline" className="text-xs">
                            {aiPredictions.pollution.level.toFixed(0)}% level
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{aiPredictions.pollution.message}</p>
                        <p className="text-xs font-medium">Current</p>
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
                          <h4 className="font-semibold text-sm">Temperature Alert</h4>
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
                      <p className="text-muted-foreground">Loading AI predictions...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
