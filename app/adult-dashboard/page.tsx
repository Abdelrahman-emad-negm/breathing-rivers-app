"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Waves,
  Droplets,
  Zap,
  TrendingDown,
  TrendingUp,
  Lightbulb,
  Calculator,
  BarChart3,
  ArrowLeft,
  Leaf,
  Home,
  Car,
  Utensils,
} from "lucide-react"

export default function AdultDashboardPage() {
  const searchParams = useSearchParams()
  const selectedRiver = searchParams.get("river") || "nile"
  const [waterUsage, setWaterUsage] = useState(150)
  const [energyUsage, setEnergyUsage] = useState(25)
  const [currentTab, setCurrentTab] = useState("simulator")

  const riverNames = {
    nile: "The Nile",
    amazon: "The Amazon",
    yangtze: "The Yangtze",
  }

  const riverName = riverNames[selectedRiver as keyof typeof riverNames] || "The Nile"

  // Calculate impact based on usage
  const calculateImpact = () => {
    const waterImpact = Math.max(0, 100 - (waterUsage / 200) * 100)
    const energyImpact = Math.max(0, 100 - (energyUsage / 50) * 100)
    return Math.round((waterImpact + energyImpact) / 2)
  }

  const riverHealth = calculateImpact()

  const beforeAfterData = [
    {
      year: "2019",
      title: "Pre-Conservation Efforts",
      image: "/nile-river-flowing-through-desert-landscape-with-p.jpg",
      stats: { vegetation: 45, pollution: 78, temperature: 32 },
      description: "High pollution levels and declining vegetation coverage",
    },
    {
      year: "2024",
      title: "Current State",
      image: "/amazon-river-winding-through-lush-green-rainforest.jpg",
      stats: { vegetation: 65, pollution: 45, temperature: 28 },
      description: "Improved conditions through community conservation efforts",
    },
  ]

  const practicalTips = [
    {
      category: "Water Conservation",
      icon: Droplets,
      color: "text-blue-600",
      tips: [
        "Take shorter showers (save 25 gallons per day)",
        "Fix leaky faucets immediately",
        "Use a dishwasher instead of hand washing",
        "Collect rainwater for garden irrigation",
        "Install low-flow showerheads and faucets",
      ],
    },
    {
      category: "Energy Efficiency",
      icon: Zap,
      color: "text-yellow-600",
      tips: [
        "Switch to LED light bulbs",
        "Unplug electronics when not in use",
        "Use programmable thermostats",
        "Air dry clothes instead of using dryer",
        "Upgrade to energy-efficient appliances",
      ],
    },
    {
      category: "Sustainable Living",
      icon: Leaf,
      color: "text-green-600",
      tips: [
        "Choose local and seasonal produce",
        "Reduce single-use plastics",
        "Use public transportation or bike",
        "Compost organic waste",
        "Support eco-friendly brands",
      ],
    },
  ]

  const dailyActivities = [
    { icon: Home, name: "Household", water: 80, energy: 12, impact: "Medium" },
    { icon: Car, name: "Transportation", water: 5, energy: 8, impact: "Low" },
    { icon: Utensils, name: "Food & Cooking", water: 25, energy: 5, impact: "Low" },
    { icon: Droplets, name: "Personal Care", water: 40, energy: 0, impact: "High" },
  ]

  const goBack = () => {
    window.location.href = `/dashboard?river=${selectedRiver}`
  }

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
                <h1 className="text-3xl font-bold">Adult Conservation Hub</h1>
                <p className="text-muted-foreground">{riverName} Impact Tracker</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            River Health: {riverHealth}%
          </Badge>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Daily Life Simulator
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Before & After
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Practical Tips
            </TabsTrigger>
          </TabsList>

          {/* Daily Life Simulator */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Daily Consumption Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="water-usage" className="flex items-center gap-2 mb-2">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        Daily Water Usage (gallons)
                      </Label>
                      <Input
                        id="water-usage"
                        type="number"
                        value={waterUsage}
                        onChange={(e) => setWaterUsage(Number(e.target.value))}
                        className="mb-2"
                      />
                      <Progress value={(waterUsage / 300) * 100} className="h-2" />
                      <p className="text-sm text-muted-foreground">Average household: 200 gallons/day</p>
                    </div>

                    <div>
                      <Label htmlFor="energy-usage" className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        Daily Energy Usage (kWh)
                      </Label>
                      <Input
                        id="energy-usage"
                        type="number"
                        value={energyUsage}
                        onChange={(e) => setEnergyUsage(Number(e.target.value))}
                        className="mb-2"
                      />
                      <Progress value={(energyUsage / 50) * 100} className="h-2" />
                      <p className="text-sm text-muted-foreground">Average household: 30 kWh/day</p>
                    </div>
                  </div>

                  {/* Activity Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Activity Breakdown</h4>
                    {dailyActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <activity.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{activity.name}</span>
                        </div>
                        <div className="text-right text-sm">
                          <div>
                            {activity.water}gal • {activity.energy}kWh
                          </div>
                          <Badge
                            variant={
                              activity.impact === "High"
                                ? "destructive"
                                : activity.impact === "Medium"
                                  ? "outline"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {activity.impact}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Impact Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    River Health Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20" />
                      <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{riverHealth}%</div>
                          <div className="text-xs text-muted-foreground">Health</div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {riverHealth >= 80
                        ? "Excellent Impact!"
                        : riverHealth >= 60
                          ? "Good Progress"
                          : riverHealth >= 40
                            ? "Room for Improvement"
                            : "High Impact Needed"}
                    </h3>
                    <p className="text-muted-foreground text-balance">
                      Your daily choices directly affect {riverName}'s ecosystem health
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Water Conservation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {waterUsage < 150 ? (
                          <TrendingDown className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-red-600" />
                        )}
                        <span className="font-bold">
                          {waterUsage < 150 ? "Saving" : "Using"} {Math.abs(150 - waterUsage)} gal/day
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">Energy Efficiency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {energyUsage < 25 ? (
                          <TrendingDown className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-red-600" />
                        )}
                        <span className="font-bold">
                          {energyUsage < 25 ? "Saving" : "Using"} {Math.abs(25 - energyUsage)} kWh/day
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Before & After Comparison */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Environmental Changes Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {beforeAfterData.map((period, index) => (
                    <div key={index} className="space-y-4">
                      <div className="text-center">
                        <Badge variant={index === 0 ? "destructive" : "secondary"} className="mb-2">
                          {period.year}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{period.title}</h3>
                      </div>
                      <img
                        src={period.image || "/placeholder.svg"}
                        alt={period.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Leaf className="h-4 w-4 text-green-600" />
                            Vegetation Coverage
                          </span>
                          <div className="flex items-center gap-2">
                            <Progress value={period.stats.vegetation} className="w-20 h-2" />
                            <span className="font-medium">{period.stats.vegetation}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-600" />
                            Pollution Level
                          </span>
                          <div className="flex items-center gap-2">
                            <Progress value={period.stats.pollution} className="w-20 h-2" />
                            <span className="font-medium">{period.stats.pollution}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-orange-600" />
                            Temperature
                          </span>
                          <span className="font-medium">{period.stats.temperature}°C</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-balance">{period.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practical Tips */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {practicalTips.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-balance">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
