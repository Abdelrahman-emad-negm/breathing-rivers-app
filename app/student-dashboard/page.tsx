"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Waves,
  Trophy,
  Star,
  Gamepad2,
  Brain,
  ArrowLeft,
  CheckCircle,
  Fish,
  TreePine,
  Droplets,
  Zap,
  Award,
  Target,
  Clock,
} from "lucide-react"
import { api } from "@/lib/api"
import type { User } from "@/lib/storage"

export default function StudentDashboardPage() {
  const searchParams = useSearchParams()
  const selectedRiver = searchParams.get("river") || "nile"
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [riverHealth, setRiverHealth] = useState(45)
  const [gameScore, setGameScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isGameActive, setIsGameActive] = useState(false)
  const [currentTab, setCurrentTab] = useState("quiz")
  const [user, setUser] = useState<User | null>(null)
  const [quizProgress, setQuizProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const riverNames = {
    nile: "The Nile",
    amazon: "The Amazon",
    yangtze: "The Yangtze",
  }

  const riverName = riverNames[selectedRiver as keyof typeof riverNames] || "The Nile"

  const quizQuestions = [
    {
      id: "q1",
      question: "What percentage of Earth's water is freshwater?",
      options: ["97%", "3%", "10%", "50%"],
      correct: 1,
      explanation: "Only 3% of Earth's water is freshwater, making it a precious resource!",
    },
    {
      id: "q2",
      question: "Which activity uses the most water in a typical household?",
      options: ["Drinking", "Showering", "Toilet flushing", "Washing dishes"],
      correct: 2,
      explanation: "Toilet flushing accounts for about 30% of household water use.",
    },
    {
      id: "q3",
      question: "How long can a river ecosystem take to recover from pollution?",
      options: ["1 year", "5 years", "10-50 years", "100+ years"],
      correct: 2,
      explanation: "River ecosystems can take 10-50 years or more to fully recover from severe pollution.",
    },
    {
      id: "q4",
      question: "What is the main cause of river pollution worldwide?",
      options: ["Industrial waste", "Agricultural runoff", "Plastic waste", "Oil spills"],
      correct: 1,
      explanation: "Agricultural runoff containing fertilizers and pesticides is the leading cause of river pollution.",
    },
  ]

  const badges = [
    {
      id: "water-saver",
      name: "Water Saver",
      icon: Droplets,
      earned: true,
      description: "Completed water conservation quiz",
    },
    { id: "eco-warrior", name: "Eco Warrior", icon: TreePine, earned: true, description: "Planted 10 virtual trees" },
    {
      id: "fish-friend",
      name: "Fish Friend",
      icon: Fish,
      earned: false,
      description: "Save 50 fish in the cleanup game",
    },
    { id: "quiz-master", name: "Quiz Master", icon: Brain, earned: false, description: "Score 100% on all quizzes" },
    { id: "river-guardian", name: "River Guardian", icon: Waves, earned: false, description: "Reach 90% river health" },
    {
      id: "speed-cleaner",
      name: "Speed Cleaner",
      icon: Zap,
      earned: true,
      description: "Complete cleanup game in under 60 seconds",
    },
  ]

  const currentQuestion = quizQuestions[currentQuestionIndex]

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true)

        const currentUser = await api.getCurrentUser()
        if (!currentUser) {
          // Create a demo student user if none exists
          const newUser = await api.register({
            name: "Student Demo",
            email: "student@demo.com",
            role: "student",
            selectedRiver: selectedRiver as any,
          })
          setUser(newUser)
        } else {
          setUser(currentUser)
        }

        // Load quiz progress
        const progress = await api.getCurrentUser()
        if (progress) {
          // Get quiz progress from storage
          const quizData = JSON.parse(localStorage.getItem("breathing_rivers_quiz_progress") || "null")
          if (quizData) {
            const userProgress = quizData.find((p: any) => p.userId === progress.id)
            if (userProgress) {
              setQuizProgress(userProgress)
              setRiverHealth(userProgress.riverHealth || 45)
              setScore(userProgress.correctAnswers * 25 || 0)
            }
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [selectedRiver])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsGameActive(false)
    }
    return () => clearInterval(interval)
  }, [isGameActive, timeLeft])

  const handleQuizAnswer = async (selectedIndex: number) => {
    if (!user) return

    const isCorrect = selectedIndex === currentQuestion.correct

    try {
      const result = await api.submitQuizAnswer(user.id, currentQuestion.id, isCorrect)

      setScore(score + result.points)
      setRiverHealth(result.newRiverHealth)

      if (result.points > 0) {
        // Show success feedback
        console.log(`[v0] Correct answer! +${result.points} points, river health: ${result.newRiverHealth}%`)
      }
    } catch (error) {
      console.error("Error submitting quiz answer:", error)
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz completed
      setCurrentQuestionIndex(0)
    }
  }

  const startCleanupGame = () => {
    setIsGameActive(true)
    setTimeLeft(30)
    setGameScore(0)
  }

  const collectTrash = async () => {
    if (isGameActive && user) {
      const points = 10
      setGameScore(gameScore + points)
      setRiverHealth(Math.min(100, riverHealth + 2))

      // Add activity to backend
      try {
        await api.submitDailyUsage(user.id, { waterUsage: 150, energyUsage: 120 })
      } catch (error) {
        console.error("Error recording activity:", error)
      }
    }
  }

  const saveFish = async () => {
    if (isGameActive && user) {
      const points = 25
      setGameScore(gameScore + points)
      setRiverHealth(Math.min(100, riverHealth + 5))

      // Add activity to backend
      try {
        await api.submitDailyUsage(user.id, { waterUsage: 100, energyUsage: 80 })
      } catch (error) {
        console.error("Error recording activity:", error)
      }
    }
  }

  const goBack = () => {
    window.location.href = `/dashboard?river=${selectedRiver}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading student dashboard...</p>
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
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Waves className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Student Learning Hub</h1>
                <p className="text-muted-foreground">{riverName} Conservation Games</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              Score: {score + gameScore}
            </Badge>
            <Badge variant="outline" className="text-sm">
              River Health: {riverHealth}%
            </Badge>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Knowledge Quiz
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Mini-Games
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Badges & Achievements
            </TabsTrigger>
          </TabsList>

          {/* Knowledge Quiz */}
          <TabsContent value="quiz" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    River Conservation Quiz
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                      {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-balance">{currentQuestion.question}</h3>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto p-4 bg-transparent"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-sm font-bold">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-balance">{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Did you know?</strong> {currentQuestion.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    River Health Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="relative w-40 h-40 mx-auto mb-4">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, #3b82f6 0deg, #10b981 ${
                            (riverHealth / 100) * 360
                          }deg, #e5e7eb ${(riverHealth / 100) * 360}deg)`,
                        }}
                      />
                      <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">{riverHealth}%</div>
                          <div className="text-sm text-muted-foreground">Healthy</div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {riverHealth >= 80
                        ? "Thriving Ecosystem!"
                        : riverHealth >= 60
                          ? "Healthy River"
                          : riverHealth >= 40
                            ? "Needs Care"
                            : "Critical State"}
                    </h3>
                    <p className="text-muted-foreground text-balance">
                      Keep answering questions correctly to improve {riverName}'s health!
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <span className="flex items-center gap-2">
                        <Fish className="h-4 w-4 text-blue-600" />
                        Fish Population
                      </span>
                      <span className="font-bold">{Math.round((riverHealth / 100) * 1000)} fish</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <span className="flex items-center gap-2">
                        <TreePine className="h-4 w-4 text-green-600" />
                        Plant Life
                      </span>
                      <span className="font-bold">{Math.round((riverHealth / 100) * 85)}% coverage</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                      <span className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-orange-600" />
                        Water Quality
                      </span>
                      <Badge
                        variant={riverHealth >= 80 ? "secondary" : riverHealth >= 60 ? "outline" : "destructive"}
                        className="text-xs"
                      >
                        {riverHealth >= 80 ? "Excellent" : riverHealth >= 60 ? "Good" : "Poor"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mini-Games */}
          <TabsContent value="games" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    River Cleanup Challenge
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge variant={isGameActive ? "destructive" : "secondary"}>
                      {isGameActive ? "Active" : "Ready"}
                    </Badge>
                    {isGameActive && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-bold">{timeLeft}s</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <img
                      src="/amazon-river-winding-through-lush-green-rainforest.jpg"
                      alt="River cleanup game"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      style={{
                        filter: isGameActive ? "brightness(1.2) saturate(1.3)" : "brightness(0.8)",
                      }}
                    />
                    <div className="text-2xl font-bold text-primary mb-2">Game Score: {gameScore}</div>
                    <p className="text-muted-foreground text-balance">
                      Click the buttons below to clean the river and save wildlife!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={collectTrash}
                      disabled={!isGameActive}
                      className="h-16 flex flex-col items-center gap-2"
                    >
                      <Fish className="h-6 w-6" />
                      <span>Collect Trash</span>
                      <span className="text-xs">+10 points</span>
                    </Button>
                    <Button
                      onClick={saveFish}
                      disabled={!isGameActive}
                      className="h-16 flex flex-col items-center gap-2"
                    >
                      <TreePine className="h-6 w-6" />
                      <span>Save Fish</span>
                      <span className="text-xs">+25 points</span>
                    </Button>
                  </div>

                  {!isGameActive && (
                    <Button onClick={startCleanupGame} className="w-full" size="lg">
                      Start Cleanup Game
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Today's Goals</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Complete 3 quiz questions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Score 100+ points in cleanup game
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                          Reach 70% river health
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Fun Facts</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Rivers provide water for 2 billion people worldwide</li>
                        <li>• A single tree can filter 48 pounds of CO2 per year</li>
                        <li>• Wetlands can remove up to 90% of pollutants from water</li>
                        <li>• Rivers support 40% of all fish species</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Next Challenge</h4>
                      <p className="text-sm text-muted-foreground">
                        Unlock the "Ecosystem Builder" game by reaching 80% river health and earning 3 new badges!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Badges & Achievements */}
          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Your Achievement Collection
                </CardTitle>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    {badges.filter((b) => b.earned).length} of {badges.length} earned
                  </Badge>
                  <Progress value={(badges.filter((b) => b.earned).length / badges.length) * 100} className="flex-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        badge.earned ? "border-primary bg-primary/5 shadow-md" : "border-muted bg-muted/20 opacity-60"
                      }`}
                    >
                      <div className="text-center mb-3">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
                            badge.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <badge.icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-semibold">{badge.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground text-center text-balance">{badge.description}</p>
                      {badge.earned && (
                        <div className="flex items-center justify-center mt-3">
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Earned!
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Leaderboard Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-primary mb-2">#{Math.floor(Math.random() * 50) + 1}</div>
                  <p className="text-muted-foreground mb-4">Your current rank among all students</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{score + gameScore}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{badges.filter((b) => b.earned).length}</div>
                      <div className="text-sm text-muted-foreground">Badges Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{riverHealth}%</div>
                      <div className="text-sm text-muted-foreground">River Health</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
