import { type NextRequest, NextResponse } from "next/server"
import { nasaAPI } from "@/lib/nasa-api"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const river = searchParams.get("river") as "nile" | "amazon" | "yangtze"
  const dataType = searchParams.get("type") as "water" | "satellite" | "weather" | "all"

  if (!river || !["nile", "amazon", "yangtze"].includes(river)) {
    return NextResponse.json({ error: "Invalid river parameter" }, { status: 400 })
  }

  try {
    let data

    switch (dataType) {
      case "water":
        data = await nasaAPI.getWaterQuality(river)
        break
      case "satellite":
        data = await nasaAPI.getSatelliteData(river)
        break
      case "weather":
        data = await nasaAPI.getWeatherData(river)
        break
      case "all":
      default:
        const [waterQuality, satellite, weather] = await Promise.all([
          nasaAPI.getWaterQuality(river),
          nasaAPI.getSatelliteData(river),
          nasaAPI.getWeatherData(river),
        ])
        data = { waterQuality, satellite, weather }
        break
    }

    return NextResponse.json({
      success: true,
      data,
      source: "NASA_SIMULATION",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("NASA API Error:", error)
    return NextResponse.json({ error: "Failed to fetch NASA data" }, { status: 500 })
  }
}
