"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Waves,
  User,
  GraduationCap,
  Tractor,
  BarChart3,
  Gamepad2,
  Satellite,
  ArrowRight,
  CheckCircle,
  Target,
  BookOpen,
  Sprout,
} from "lucide-react"

export default function RoleSelectionPage() {
  const searchParams = useSearchParams()
  const selectedRiver = searchParams.get("river") || "nile"

  const riverNames = {
    nile: "The Nile",
    amazon: "The Amazon",
    yangtze: "The Yangtze",
  }

  const riverName = riverNames[selectedRiver as keyof typeof riverNames] || "The Nile"

  const roles = [
    {
      id: "adult",
      title: "Adult",
      subtitle: "Environmental Advocate",
      description: "Take practical action in your daily life to protect river ecosystems",
      icon: User,
      color: "bg-blue-500",
      features: [
        {
          icon: BarChart3,
          title: "Daily Life Simulator",
          description: "Track your water and energy consumption impact on river health",
        },
        {
          icon: CheckCircle,
          title: "Before-and-After Viewer",
          description: "See visual comparisons of environmental changes over time",
        },
        {
          icon: Target,
          title: "Practical Tips",
          description: "Get actionable advice to reduce water and energy waste",
        },
      ],
      stats: {
        users: "2.3M",
        impact: "15% reduction",
        activities: "Daily tracking",
      },
    },
    {
      id: "student",
      title: "Student",
      subtitle: "Future River Guardian",
      description: "Learn through interactive games and earn achievements for conservation knowledge",
      icon: GraduationCap,
      color: "bg-green-500",
      features: [
        {
          icon: Gamepad2,
          title: "Gamified Quiz",
          description: "Answer questions correctly to improve river health visuals",
        },
        {
          icon: BookOpen,
          title: "Interactive Mini-Games",
          description: "Clean rivers, save fish, and learn through engaging activities",
        },
        {
          icon: CheckCircle,
          title: "Badges & Points",
          description: "Earn achievements and climb the conservation leaderboard",
        },
      ],
      stats: {
        users: "890K",
        impact: "95% completion",
        activities: "Game-based learning",
      },
    },
    {
      id: "farmer",
      title: "Farmer",
      subtitle: "Sustainable Agriculture Expert",
      description: "Use satellite data and AI insights to optimize water usage and crop health",
      icon: Tractor,
      color: "bg-orange-500",
      features: [
        {
          icon: Satellite,
          title: "Smart Irrigation Assistant",
          description: "Get satellite-based recommendations for efficient water use",
        },
        {
          icon: Sprout,
          title: "Crop Health Insights",
          description: "Monitor vegetation with NDVI indicators and health metrics",
        },
        {
          icon: Target,
          title: "Alerts & Tips",
          description: "Receive notifications about weather, floods, and farming best practices",
        },
      ],
      stats: {
        users: "450K",
        impact: "30% water savings",
        activities: "Smart farming",
      },
    },
  ]

  const handleRoleSelect = (roleId: string) => {
    window.location.href = `/${roleId}-dashboard?river=${selectedRiver}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-balance">Choose Your Role</h1>
          </div>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Select your role to get a personalized experience for {riverName} conservation. Each role offers unique
            tools and insights tailored to your interests and expertise.
          </p>
          <Badge variant="secondary" className="mt-4">
            Currently exploring: {riverName}
          </Badge>
        </div>

        {/* Role Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 relative overflow-hidden"
              onClick={() => handleRoleSelect(role.id)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
              </div>

              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${role.color} rounded-full text-white`}>
                    <role.icon className="h-8 w-8" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <div className="font-bold text-lg">{role.stats.users}</div>
                  </div>
                </div>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
                <p className="text-primary font-medium">{role.subtitle}</p>
                <p className="text-muted-foreground text-balance">{role.description}</p>
              </CardHeader>

              <CardContent className="relative">
                {/* Features */}
                <div className="space-y-4 mb-6">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground text-balance">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-lg text-primary">{role.stats.impact}</div>
                    <div className="text-xs text-muted-foreground">Average Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-accent">{role.stats.activities}</div>
                    <div className="text-xs text-muted-foreground">Activity Type</div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Start as {role.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Why Choose a Role?</h3>
              <p className="text-muted-foreground text-balance leading-relaxed">
                Each role provides specialized tools and content designed for your unique perspective on river
                conservation. You can always switch roles later to explore different approaches to environmental
                stewardship.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
