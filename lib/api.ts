// API Layer for Breathing Rivers App
// Simulates real API calls using local storage

import { storage, type User, type LeaderboardEntry, type EnvironmentalData } from "./storage"
import type { NASAWaterQuality, NASASatelliteData, NASAWeatherData } from "./nasa-api"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class BreathingRiversAPI {
  // Authentication
  async login(email: string, password: string): Promise<User | null> {
    await delay(500)
    const users = storage.getAllUsers()
    const user = users.find((u) => u.email === email)
    return user || null
  }

  async register(userData: {
    name: string
    email: string
    role: "adult" | "student" | "farmer"
    selectedRiver: "nile" | "amazon" | "yangtze"
  }): Promise<User> {
    await delay(500)
    return storage.createUser(userData)
  }

  async getCurrentUser(): Promise<User | null> {
    await delay(100)
    return storage.getCurrentUser()
  }

  // Environmental Data
  async getEnvironmentalData(river: string): Promise<
    EnvironmentalData & {
      nasaData?: {
        waterQuality: NASAWaterQuality
        satellite: NASASatelliteData
        weather: NASAWeatherData
      }
    }
  > {
    await delay(300)

    // Get local data
    let data = storage.getEnvironmentalData(river)

    if (!data) {
      // Create default data if not exists
      const defaultData = {
        temperature: 25 + Math.random() * 10,
        vegetation: 60 + Math.random() * 30,
        pollution: 20 + Math.random() * 40,
        waterLevel: 70 + Math.random() * 20,
      }
      storage.updateEnvironmentalData(river, defaultData)
      data = storage.getEnvironmentalData(river)!
    }

    try {
      const response = await fetch(`/api/nasa-data?river=${river}&type=all`)
      const nasaResponse = await response.json()

      if (nasaResponse.success) {
        const { waterQuality, satellite, weather } = nasaResponse.data

        const nasaEnhancedData = {
          ...data,
          temperature: waterQuality.temperature,
          vegetation: satellite.vegetation * 100, // Convert to percentage
          pollution: waterQuality.pollutionIndex * 100, // Convert to percentage
          waterLevel: satellite.waterCoverage * 100, // Convert to percentage
          lastUpdated: waterQuality.lastUpdated,
          dataSource: "nasa" as const,
          nasaLastSync: new Date().toISOString(),
        }

        // Cache the NASA-enhanced data
        storage.updateEnvironmentalData(river, nasaEnhancedData)

        return {
          ...nasaEnhancedData,
          nasaData: {
            waterQuality,
            satellite,
            weather,
          },
        }
      }
    } catch (error) {
      console.error("NASA API integration error:", error)
    }

    return data
  }

  async updateEnvironmentalData(river: string, updates: Partial<EnvironmentalData>): Promise<void> {
    await delay(200)
    storage.updateEnvironmentalData(river, updates)
  }

  // Leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    await delay(300)
    return storage.getLeaderboard()
  }

  // Quiz System
  async submitQuizAnswer(
    userId: string,
    questionId: string,
    isCorrect: boolean,
  ): Promise<{
    points: number
    riverHealthChange: number
    newRiverHealth: number
  }> {
    await delay(200)

    const points = isCorrect ? 10 : 0
    const riverHealthChange = isCorrect ? 2 : -1

    const currentProgress = storage.getQuizProgress(userId) || {
      userId,
      correctAnswers: 0,
      totalQuestions: 0,
      riverHealth: 50,
      completedQuizzes: [],
    }

    const newProgress = {
      ...currentProgress,
      correctAnswers: currentProgress.correctAnswers + (isCorrect ? 1 : 0),
      totalQuestions: currentProgress.totalQuestions + 1,
      riverHealth: Math.max(0, Math.min(100, currentProgress.riverHealth + riverHealthChange)),
    }

    storage.updateQuizProgress(userId, newProgress)

    if (points > 0) {
      storage.addActivity({
        userId,
        type: "quiz",
        points,
        details: { questionId, isCorrect },
      })
    }

    return {
      points,
      riverHealthChange,
      newRiverHealth: newProgress.riverHealth,
    }
  }

  // Daily Life Simulator
  async submitDailyUsage(
    userId: string,
    data: {
      waterUsage: number
      energyUsage: number
    },
  ): Promise<{
    riverImpact: number
    points: number
    tips: string[]
  }> {
    await delay(300)

    // Calculate impact (lower usage = better impact)
    const waterImpact = Math.max(0, 100 - data.waterUsage)
    const energyImpact = Math.max(0, 100 - data.energyUsage)
    const riverImpact = (waterImpact + energyImpact) / 2

    const points = Math.floor(riverImpact / 10)

    const tips = []
    if (data.waterUsage > 200) {
      tips.push("Try shorter showers to save water")
      tips.push("Fix any leaky faucets")
    }
    if (data.energyUsage > 150) {
      tips.push("Use LED bulbs to reduce energy consumption")
      tips.push("Unplug devices when not in use")
    }
    if (tips.length === 0) {
      tips.push("Great job! Your usage is environmentally friendly")
    }

    storage.addActivity({
      userId,
      type: "simulation",
      points,
      details: { waterUsage: data.waterUsage, energyUsage: data.energyUsage, riverImpact },
    })

    return { riverImpact, points, tips }
  }

  // Farmer Tools
  async getIrrigationRecommendations(
    userId: string,
    fieldData: {
      cropType: string
      soilMoisture: number
      weather: string
    },
  ): Promise<{
    recommendation: string
    waterAmount: number
    timing: string
    efficiency: number
    nasaInsights?: {
      vegetationHealth: number
      precipitationForecast: number
      soilConditions: string
    }
  }> {
    await delay(400)

    const recommendations = {
      corn: { base: 25, timing: "Early morning", efficiency: 85 },
      wheat: { base: 20, timing: "Evening", efficiency: 90 },
      rice: { base: 40, timing: "Morning", efficiency: 75 },
      tomatoes: { base: 30, timing: "Early morning", efficiency: 80 },
    }

    const crop = recommendations[fieldData.cropType as keyof typeof recommendations] || recommendations.corn
    const moistureAdjustment = (100 - fieldData.soilMoisture) / 100

    try {
      const user = await this.getCurrentUser()
      if (user) {
        const response = await fetch(`/api/nasa-data?river=${user.selectedRiver}&type=all`)
        const nasaResponse = await response.json()

        if (nasaResponse.success) {
          const { satellite, weather } = nasaResponse.data

          const vegetationFactor = satellite.vegetation > 0.7 ? 0.9 : 1.1 // Less water needed in healthy vegetation areas
          const precipitationFactor = weather.precipitation > 50 ? 0.7 : 1.0 // Reduce if high precipitation expected

          const waterAmount = crop.base * (1 + moistureAdjustment) * vegetationFactor * precipitationFactor

          let recommendation = `NASA-optimized: Apply ${waterAmount.toFixed(1)}L per square meter`
          if (weather.precipitation > 50) {
            recommendation += ". NASA forecasts high precipitation - reduce irrigation by 30%."
          }

          return {
            recommendation,
            waterAmount,
            timing: crop.timing,
            efficiency: Math.min(95, crop.efficiency + 5), // NASA data improves efficiency
            nasaInsights: {
              vegetationHealth: satellite.vegetation * 100,
              precipitationForecast: weather.precipitation,
              soilConditions: satellite.landUse,
            },
          }
        }
      }
    } catch (error) {
      console.error("NASA farmer data error:", error)
    }

    // Fallback to basic recommendations
    const waterAmount = crop.base * (1 + moistureAdjustment)
    let recommendation = `Apply ${waterAmount.toFixed(1)}L per square meter`
    if (fieldData.weather === "rainy") {
      recommendation += ". Reduce by 50% due to expected rainfall."
    }

    return {
      recommendation,
      waterAmount,
      timing: crop.timing,
      efficiency: crop.efficiency,
    }
  }

  // AI Predictions (simulated)
  async getAIPredictions(river: string): Promise<{
    flood: { risk: number; message: string; source: string }
    pollution: { level: number; message: string; source: string }
    temperature: { change: number; message: string; source: string }
    nasaInsights?: {
      deforestation: number
      urbanization: number
      waterLoss: number
    }
  }> {
    await delay(600)

    try {
      const response = await fetch(`/api/nasa-data?river=${river}&type=all`)
      const nasaResponse = await response.json()

      if (nasaResponse.success) {
        const { weather, satellite } = nasaResponse.data

        const floodRisk = weather.forecast.floodRisk === "high" ? 85 : weather.forecast.floodRisk === "medium" ? 50 : 25
        const pollutionLevel = satellite.changeDetection.urbanization * 100
        const tempChange = weather.temperature - 25 // Baseline temperature

        return {
          flood: {
            risk: floodRisk,
            message:
              weather.forecast.floodRisk === "high"
                ? "NASA data shows high flood risk in next 48 hours"
                : weather.forecast.floodRisk === "medium"
                  ? "NASA satellites detect moderate flood risk this week"
                  : "NASA monitoring shows low flood risk",
            source: "NASA Weather Data",
          },
          pollution: {
            level: pollutionLevel,
            message:
              pollutionLevel > 70
                ? "NASA satellites detect high pollution levels"
                : pollutionLevel > 40
                  ? "NASA monitoring shows moderate pollution levels"
                  : "NASA data confirms good water quality",
            source: "NASA Satellite Imagery",
          },
          temperature: {
            change: tempChange,
            message:
              tempChange > 2
                ? "NASA sensors show temperature rising significantly"
                : tempChange < -2
                  ? "NASA data indicates temperature dropping significantly"
                  : "NASA monitoring shows stable temperature",
            source: "NASA Environmental Sensors",
          },
          nasaInsights: {
            deforestation: satellite.changeDetection.deforestation * 100,
            urbanization: satellite.changeDetection.urbanization * 100,
            waterLoss: satellite.changeDetection.waterLoss * 100,
          },
        }
      }
    } catch (error) {
      console.error("NASA prediction error:", error)
    }

    // Fallback to simulated predictions
    const floodRisk = Math.random() * 100
    const pollutionLevel = Math.random() * 100
    const tempChange = (Math.random() - 0.5) * 4

    return {
      flood: {
        risk: floodRisk,
        message:
          floodRisk > 70
            ? "High flood risk in next 48 hours"
            : floodRisk > 40
              ? "Moderate flood risk this week"
              : "Low flood risk",
        source: "Simulated Data",
      },
      pollution: {
        level: pollutionLevel,
        message:
          pollutionLevel > 70
            ? "High pollution levels detected"
            : pollutionLevel > 40
              ? "Moderate pollution levels"
              : "Good water quality",
        source: "Simulated Data",
      },
      temperature: {
        change: tempChange,
        message:
          tempChange > 2
            ? "Temperature rising significantly"
            : tempChange < -2
              ? "Temperature dropping significantly"
              : "Stable temperature",
        source: "Simulated Data",
      },
    }
  }

  // Community Events
  async validateQRCode(
    userId: string,
    qrCode: string,
    eventType: "cleanup" | "planting",
  ): Promise<{
    valid: boolean
    points: number
    message: string
  }> {
    await delay(300)

    // Simulate QR validation (in real app, this would verify with server)
    const valid = qrCode.startsWith("BR_") && qrCode.length > 10
    const points = valid ? (eventType === "cleanup" ? 50 : 30) : 0

    if (valid) {
      storage.addActivity({
        userId,
        type: eventType,
        points,
        details: { qrCode, eventType },
      })
    }

    return {
      valid,
      points,
      message: valid ? `Great! You earned ${points} points for ${eventType}` : "Invalid QR code. Please try again.",
    }
  }
}

// Export singleton instance
export const api = new BreathingRiversAPI()
