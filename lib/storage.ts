// Local Storage Backend for Breathing Rivers App
// Handles all data persistence without external database

export interface User {
  id: string
  name: string
  email: string
  role: "adult" | "student" | "farmer"
  selectedRiver: "nile" | "amazon" | "yangtze"
  joinedAt: string
  points: number
  level: number
  badges: string[]
}

export interface LeaderboardEntry {
  userId: string
  name: string
  points: number
  activities: number
  river: string
}

export interface QuizProgress {
  userId: string
  correctAnswers: number
  totalQuestions: number
  riverHealth: number
  completedQuizzes: string[]
}

export interface EnvironmentalData {
  river: string
  temperature: number
  vegetation: number
  pollution: number
  waterLevel: number
  lastUpdated: string
  dataSource?: "nasa" | "simulated" | "mixed"
  nasaLastSync?: string
}

export interface UserActivity {
  userId: string
  type: "quiz" | "cleanup" | "planting" | "simulation"
  points: number
  timestamp: string
  details: any
}

class LocalStorageBackend {
  private getStorageKey(key: string): string {
    return `breathing_rivers_${key}`
  }

  // Generic storage methods
  private setItem<T>(key: string, data: T): void {
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(data))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  private getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getStorageKey(key))
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  }

  // User Management
  createUser(userData: Omit<User, "id" | "joinedAt" | "points" | "level" | "badges">): User {
    const user: User = {
      ...userData,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString(),
      points: 0,
      level: 1,
      badges: [],
    }

    const users = this.getAllUsers()
    users.push(user)
    this.setItem("users", users)
    this.setItem("currentUser", user)

    return user
  }

  getCurrentUser(): User | null {
    return this.getItem<User>("currentUser")
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const users = this.getAllUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates }
    this.setItem("users", users)

    // Update current user if it's the same
    const currentUser = this.getCurrentUser()
    if (currentUser?.id === userId) {
      this.setItem("currentUser", users[userIndex])
    }

    return users[userIndex]
  }

  getAllUsers(): User[] {
    return this.getItem<User[]>("users") || []
  }

  // Leaderboard
  getLeaderboard(): LeaderboardEntry[] {
    const users = this.getAllUsers()
    const activities = this.getAllActivities()

    return users
      .map((user) => ({
        userId: user.id,
        name: user.name,
        points: user.points,
        activities: activities.filter((a) => a.userId === user.id).length,
        river: user.selectedRiver,
      }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 10)
  }

  // Environmental Data
  updateEnvironmentalData(river: string, data: Partial<EnvironmentalData>): void {
    const allData = this.getItem<EnvironmentalData[]>("environmental_data") || []
    const existingIndex = allData.findIndex((d) => d.river === river)

    const updatedData: EnvironmentalData = {
      river,
      temperature: 25,
      vegetation: 70,
      pollution: 30,
      waterLevel: 80,
      lastUpdated: new Date().toISOString(),
      dataSource: "simulated",
      ...data,
    }

    if (existingIndex >= 0) {
      allData[existingIndex] = updatedData
    } else {
      allData.push(updatedData)
    }

    this.setItem("environmental_data", allData)
  }

  getEnvironmentalData(river: string): EnvironmentalData | null {
    const allData = this.getItem<EnvironmentalData[]>("environmental_data") || []
    return allData.find((d) => d.river === river) || null
  }

  // Quiz Progress
  updateQuizProgress(userId: string, progress: Partial<QuizProgress>): void {
    const allProgress = this.getItem<QuizProgress[]>("quiz_progress") || []
    const existingIndex = allProgress.findIndex((p) => p.userId === userId)

    const updatedProgress: QuizProgress = {
      userId,
      correctAnswers: 0,
      totalQuestions: 0,
      riverHealth: 50,
      completedQuizzes: [],
      ...progress,
    }

    if (existingIndex >= 0) {
      allProgress[existingIndex] = { ...allProgress[existingIndex], ...updatedProgress }
    } else {
      allProgress.push(updatedProgress)
    }

    this.setItem("quiz_progress", allProgress)
  }

  getQuizProgress(userId: string): QuizProgress | null {
    const allProgress = this.getItem<QuizProgress[]>("quiz_progress") || []
    return allProgress.find((p) => p.userId === userId) || null
  }

  // User Activities
  addActivity(activity: Omit<UserActivity, "timestamp">): void {
    const activities = this.getAllActivities()
    const newActivity: UserActivity = {
      ...activity,
      timestamp: new Date().toISOString(),
    }

    activities.push(newActivity)
    this.setItem("activities", activities)

    // Update user points
    const user = this.getCurrentUser()
    if (user && user.id === activity.userId) {
      this.updateUser(user.id, {
        points: user.points + activity.points,
        level: Math.floor((user.points + activity.points) / 100) + 1,
      })
    }
  }

  getAllActivities(): UserActivity[] {
    return this.getItem<UserActivity[]>("activities") || []
  }

  getUserActivities(userId: string): UserActivity[] {
    return this.getAllActivities().filter((a) => a.userId === userId)
  }

  // Initialize sample data
  initializeSampleData(): void {
    // Only initialize if no data exists
    if (this.getAllUsers().length === 0) {
      // Create sample environmental data
      this.updateEnvironmentalData("nile", {
        temperature: 28,
        vegetation: 65,
        pollution: 45,
        waterLevel: 75,
      })

      this.updateEnvironmentalData("amazon", {
        temperature: 26,
        vegetation: 85,
        pollution: 25,
        waterLevel: 90,
      })

      this.updateEnvironmentalData("yangtze", {
        temperature: 22,
        vegetation: 55,
        pollution: 60,
        waterLevel: 70,
      })

      // Create sample users for leaderboard
      const sampleUsers = [
        {
          name: "Ahmed Hassan",
          email: "ahmed@example.com",
          role: "adult" as const,
          selectedRiver: "nile" as const,
          points: 850,
        },
        {
          name: "Sara Mohamed",
          email: "sara@example.com",
          role: "student" as const,
          selectedRiver: "amazon" as const,
          points: 720,
        },
        {
          name: "Mohamed Ali",
          email: "mohamed@example.com",
          role: "farmer" as const,
          selectedRiver: "yangtze" as const,
          points: 680,
        },
        {
          name: "Fatma Ibrahim",
          email: "fatma@example.com",
          role: "student" as const,
          selectedRiver: "nile" as const,
          points: 590,
        },
        {
          name: "Omar Khaled",
          email: "omar@example.com",
          role: "adult" as const,
          selectedRiver: "amazon" as const,
          points: 520,
        },
      ]

      sampleUsers.forEach((userData) => {
        const user = this.createUser(userData)
        this.updateUser(user.id, { points: userData.points })
      })
    }
  }

  // Clear all data (for testing)
  clearAllData(): void {
    const keys = ["users", "currentUser", "environmental_data", "quiz_progress", "activities"]
    keys.forEach((key) => {
      localStorage.removeItem(this.getStorageKey(key))
    })
  }

  cacheNASAData(river: string, dataType: "water" | "satellite" | "weather", data: any): void {
    const cacheKey = `nasa_${dataType}_${river}`
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + 3600000, // 1 hour cache
    }
    this.setItem(cacheKey, cacheData)
  }

  getCachedNASAData(river: string, dataType: "water" | "satellite" | "weather"): any | null {
    const cacheKey = `nasa_${dataType}_${river}`
    const cached = this.getItem<{ data: any; timestamp: number; expiry: number }>(cacheKey)

    if (cached && Date.now() < cached.expiry) {
      return cached.data
    }

    return null
  }
}

// Export singleton instance
export const storage = new LocalStorageBackend()

// Initialize sample data on first load
if (typeof window !== "undefined") {
  storage.initializeSampleData()
}
