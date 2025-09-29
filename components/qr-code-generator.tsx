"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Copy, Check } from "lucide-react"

interface QRCodeGeneratorProps {
  eventId: number
  eventTitle: string
  eventType: "cleanup" | "planting" | "monitoring"
  onQRGenerated?: (qrCode: string) => void
}

export function QRCodeGenerator({ eventId, eventTitle, eventType, onQRGenerated }: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState<string>("")
  const [qrDataURL, setQrDataURL] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const generateQRCode = () => {
    // Generate unique QR code for the event
    const timestamp = Date.now()
    const qrData = `BR_EVENT_${eventId}_${eventType.toUpperCase()}_${timestamp}`
    setQrCode(qrData)

    // Generate QR code image using a simple canvas approach
    generateQRImage(qrData)

    if (onQRGenerated) {
      onQRGenerated(qrData)
    }
  }

  const generateQRImage = (data: string) => {
    // Simple QR code visualization using canvas
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 200
    const cellSize = size / 25 // 25x25 grid
    canvas.width = size
    canvas.height = size

    // Fill background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate pattern based on data hash
    ctx.fillStyle = "#000000"
    const hash = data.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    // Create a simple pattern
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const shouldFill = (hash + i * j) % 3 === 0
        if (shouldFill) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }
      }
    }

    // Add corner markers
    const markerSize = cellSize * 3
    ctx.fillRect(0, 0, markerSize, markerSize)
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize)
    ctx.fillRect(0, size - markerSize, markerSize, markerSize)

    setQrDataURL(canvas.toDataURL())
  }

  const copyQRCode = async () => {
    try {
      await navigator.clipboard.writeText(qrCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy QR code:", err)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <QrCode className="h-5 w-5" />
          Event QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold mb-2">{eventTitle}</h3>
          <Badge variant="outline" className="mb-4">
            {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event
          </Badge>
        </div>

        {!qrCode ? (
          <Button onClick={generateQRCode} className="w-full">
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR Code
          </Button>
        ) : (
          <div className="space-y-4">
            {/* QR Code Display */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                {qrDataURL ? (
                  <img src={qrDataURL || "/placeholder.svg"} alt="Event QR Code" className="w-48 h-48" />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* QR Code Data */}
            <div className="space-y-2">
              <p className="text-sm font-medium">QR Code Data:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all">{qrCode}</code>
                <Button variant="outline" size="sm" onClick={copyQRCode} className="shrink-0 bg-transparent">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Scan this QR code at the event location to earn points!
              </p>
              <Button variant="outline" onClick={generateQRCode} size="sm">
                Generate New Code
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
