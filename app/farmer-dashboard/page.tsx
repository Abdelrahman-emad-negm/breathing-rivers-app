"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Waves,
  Satellite,
  Sprout,
  AlertTriangle,
  ArrowLeft,
  Droplets,
  Thermometer,
  Sun,
  CloudRain,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  BarChart3,
  Lightbulb,
  Target,
} from "lucide-react"

export default function FarmerDashboardPage() {
  const searchParams = useSearchParams()
  const selectedRiver = searchParams.get("river") || "nile"
  const [selectedField, setSelectedField] = useState("field-1")
  const [currentTab, setCurrentTab] = useState("irrigation")

  const riverNames = {
    nile: "The Nile",
    amazon: "The Amazon",
    yangtze: "The Yangtze",
  }

  const riverName = riverNames[selectedRiver as keyof typeof riverNames] || "The Nile"

  const fieldData = {
    "field-1": {
      name: "North Field",
      crop: "Corn",
      area: "25 acres",
      ndvi: 0.75,
      soilMoisture: 68,
      lastIrrigation: "2 days ago",
      nextRecommended: "Tomorrow",
      waterUsage: 1200,
      efficiency: 85,
    },
    "field-2": {
      name: "South Field",
      crop: "Wheat",
      area: "18 acres",
      ndvi: 0.82,
      soilMoisture: 45,
      lastIrrigation: "4 days ago",
      nextRecommended: "Today",
      waterUsage: 950,
      efficiency: 92,
    },
    "field-3": {
      name: "East Field",
      crop: "Soybeans",
      area: "30 acres",
      ndvi: 0.69,
      soilMoisture: 72,
      lastIrrigation: "1 day ago",
      nextRecommended: "3 days",
      waterUsage: 1100,
      efficiency: 78,
    },
  }

  const currentField = fieldData[selectedField as keyof typeof fieldData]

  const weatherAlerts = [
    {
      type: "flood",
      severity: "moderate",
      title: "Flood Warning",
      message: "Heavy rainfall expected in the next 48 hours. Consider drainage preparations.",
      timeframe: "Next 2 days",
      icon: CloudRain,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
    },
    {
      type: "temperature",
      severity: "low",
      title: "Heat Advisory",
      message: "Temperatures rising above 35°C. Increase irrigation frequency for sensitive crops.",
      timeframe: "Next week",
      icon: Sun,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
    },
    {
      type: "drought",
      severity: "high",
      title: "Drought Conditions",
      message: "Extended dry period forecasted. Implement water conservation measures immediately.",
      timeframe: "Next 14 days",
      icon: Thermometer,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/10",
    },
  ]

  const irrigationTips = [
    {
      title: "Optimal Timing",
      description: "Irrigate early morning (5-7 AM) to minimize evaporation losses",
      impact: "Save 20-30% water",
    },
    {
      title: "Soil Moisture Monitoring",
      description: "Use sensors to track soil moisture levels and avoid over-watering",
      impact: "Reduce water usage by 25%",
    },
    {
      title: "Drip Irrigation",
      description: "Switch to drip irrigation systems for precise water delivery",
      impact: "Increase efficiency by 40%",
    },
    {
      title: "Mulching",
      description: "Apply organic mulch to retain soil moisture and reduce evaporation",
      impact: "Reduce irrigation needs by 15%",
    },
  ]

  const cropHealthData = [
    { month: "Jan", ndvi: 0.3, yield: 65 },
    { month: "Feb", ndvi: 0.45, yield: 72 },
    { month: "Mar", ndvi: 0.62, yield: 78 },
    { month: "Apr", ndvi: 0.75, yield: 85 },
    { month: "May", ndvi: 0.82, yield: 92 },
    { month: "Jun", ndvi: 0.78, yield: 88 },
  ]

  const goBack = () => {
    window.location.href = `/dashboard?river=${selectedRiver}`
  }

  const getNDVIStatus = (ndvi: number) => {
    if (ndvi >= 0.8) return { status: "Excellent", color: "text-green-600", variant: "secondary" as const }
    if (ndvi >= 0.6) return { status: "Good", color: "text-blue-600", variant: "outline" as const }
    if (ndvi >= 0.4) return { status: "Fair", color: "text-yellow-600", variant: "outline" as const }
    return { status: "Poor", color: "text-red-600", variant: "destructive" as const }
  }

  const ndviStatus = getNDVIStatus(currentField.ndvi)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Waves className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Smart Farming Hub</h1>
                <p className="text-muted-foreground">{riverName} Basin Agriculture</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              Water Efficiency: {currentField.efficiency}%
            </Badge>
            <Badge variant="outline" className="text-sm">
              NDVI: {currentField.ndvi}
            </Badge>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="irrigation" className="flex items-center gap-2">
              <Satellite className="h-4 w-4" />
              Smart Irrigation
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              Crop Health
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts & Tips
            </TabsTrigger>
          </TabsList>

          {/* Smart Irrigation Assistant */}
          <TabsContent value="irrigation" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Field Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Field Selection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(fieldData).map(([fieldId, field]) => (
                      <Button
                        key={fieldId}
                        variant={selectedField === fieldId ? "default" : "outline"}
                        className="w-full justify-start h-auto p-4"
                        onClick={() => setSelectedField(fieldId)}
                      >
                        <div className="text-left">
                          <div className="font-semibold">{field.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {field.crop} • {field.area}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Field Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    {currentField.name} Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{currentField.soilMoisture}%</div>
                      <div className="text-sm text-muted-foreground">Soil Moisture</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{currentField.ndvi}</div>
                      <div className="text-sm text-muted-foreground">NDVI Index</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Irrigation</span>
                      <span className="font-medium">{currentField.lastIrrigation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Recommended</span>
                      <Badge variant="outline">{currentField.nextRecommended}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Water Usage</span>
                      <span className="font-medium">{currentField.waterUsage}L/day</span>
                    </div>
                  </div>

                  <Progress value={currentField.efficiency} className="h-3" />
                  <div className="text-center text-sm text-muted-foreground">
                    Irrigation Efficiency: {currentField.efficiency}%
                  </div>
                </CardContent>
              </Card>

              {/* Satellite Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Satellite className="h-5 w-5" />
                    Satellite Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Today's Recommendation</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on satellite data and weather forecasts, reduce irrigation by 15% in the north section.
                      </p>
                      <Button size="sm" className="w-full">
                        Apply Recommendation
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Field Zones</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/10 rounded">
                          <span className="text-sm">North Zone</span>
                          <Badge variant="secondary">Optimal</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/10 rounded">
                          <span className="text-sm">Center Zone</span>
                          <Badge variant="outline">Monitor</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/10 rounded">
                          <span className="text-sm">South Zone</span>
                          <Badge variant="destructive">Needs Water</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Irrigation Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Water Conservation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {irrigationTips.map((tip, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <h4 className="font-semibold mb-2">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 text-balance">{tip.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {tip.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crop Health Insights */}
          <TabsContent value="health" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5" />
                    NDVI Vegetation Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, #ef4444 0deg, #f59e0b 25%, #10b981 50%, #059669 ${
                            currentField.ndvi * 100
                          }%)`,
                        }}
                      />
                      <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{currentField.ndvi}</div>
                          <div className="text-xs text-muted-foreground">NDVI</div>
                        </div>
                      </div>
                    </div>
                    <Badge variant={ndviStatus.variant} className="mb-2">
                      {ndviStatus.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground text-balance">
                      NDVI values above 0.6 indicate healthy vegetation growth
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <span className="flex items-center gap-2">
                        <Sprout className="h-4 w-4 text-green-600" />
                        Chlorophyll Content
                      </span>
                      <span className="font-bold">High</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <span className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        Plant Water Stress
                      </span>
                      <span className="font-bold">Low</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                      <span className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-orange-600" />
                        Photosynthetic Activity
                      </span>
                      <span className="font-bold">Optimal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">+12%</div>
                        <div className="text-sm text-muted-foreground">Growth Rate</div>
                      </div>
                      <div className="text-center p-3 bg-accent/10 rounded-lg">
                        <div className="text-2xl font-bold text-accent">85%</div>
                        <div className="text-sm text-muted-foreground">Expected Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {cropHealthData.slice(-3).map((data, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{data.month}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">NDVI: {data.ndvi}</div>
                              <div className="text-xs text-muted-foreground">Yield: {data.yield}%</div>
                            </div>
                            {index === 2 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Crop Management Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Fertilization</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Apply nitrogen-rich fertilizer to boost chlorophyll production in the south zone.
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Recommended: Next week
                    </Badge>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Pest Control</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Monitor for early signs of aphid infestation based on NDVI anomalies.
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Status: All clear
                    </Badge>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Harvest Timing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Optimal harvest window predicted for mid-August based on current growth rates.
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Estimated: 45 days
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts & Tips */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Weather & Environmental Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${alert.bgColor}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <alert.icon className={`h-5 w-5 ${alert.color}`} />
                          <h4 className="font-semibold">{alert.title}</h4>
                        </div>
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "moderate"
                                ? "outline"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 text-balance">{alert.message}</p>
                      <p className="text-xs font-medium">{alert.timeframe}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Crop Rotation</h4>
                      <p className="text-sm text-muted-foreground text-balance">
                        Rotate crops annually to maintain soil health and reduce pest buildup.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Cover Crops</h4>
                      <p className="text-sm text-muted-foreground text-balance">
                        Plant cover crops during off-season to prevent soil erosion and improve fertility.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Integrated Pest Management</h4>
                      <p className="text-sm text-muted-foreground text-balance">
                        Use biological controls and targeted treatments to minimize chemical pesticide use.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    River Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">-30%</div>
                      <div className="text-sm text-muted-foreground">Water Usage Reduction</div>
                      <p className="text-xs text-muted-foreground mt-1">Compared to traditional methods</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                        <div className="text-lg font-bold text-green-600">85%</div>
                        <div className="text-xs text-muted-foreground">Runoff Reduction</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">92%</div>
                        <div className="text-xs text-muted-foreground">Soil Health Score</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center text-balance">
                      Your sustainable farming practices are helping protect {riverName} and its ecosystem.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
