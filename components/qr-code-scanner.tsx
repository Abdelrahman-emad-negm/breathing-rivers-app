"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { QrCode, Scan, CheckCircle, XCircle } from "lucide-react"
import { api } from "@/lib/api"

interface QRCodeScannerProps {
  onScanResult?: (result: { valid: boolean; points: number; message: string }) => void
}

export function QRCodeScanner({ onScanResult }: QRCodeScannerProps) {
  const [qrInput, setQrInput] = useState("")
  const [scanning, setScanning] = useState(false)
  const [lastResult, setLastResult] = useState<{
    valid: boolean
    points: number
    message: string
  } | null>(null)

  const handleScan = async () => {
    if (!qrInput.trim()) return

    setScanning(true)
    try {
      const user = await api.getCurrentUser()
      if (!user) {
        setLastResult({
          valid: false,
          points: 0,
          message: "Please register first to scan QR codes!",
        })
        return
      }

      // Determine event type from QR code
      let eventType: "cleanup" | "planting" = "cleanup"
      if (qrInput.includes("PLANTING")) {
        eventType = "planting"
      }

      const result = await api.validateQRCode(user.id, qrInput, eventType)
      setLastResult(result)

      if (onScanResult) {
        onScanResult(result)
      }
    } catch (error) {
      console.error("Error scanning QR code:", error)
      setLastResult({
        valid: false,
        points: 0,
        message: "Error scanning QR code. Please try again.",
      })
    } finally {
      setScanning(false)
    }
  }

  const handleInputChange = (value: string) => {
    setQrInput(value)
    setLastResult(null) // Clear previous result when input changes
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scan className="h-5 w-5" />
          Scan QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-input">Enter QR Code Data</Label>
          <Input
            id="qr-input"
            placeholder="BR_EVENT_123_CLEANUP_1234567890"
            value={qrInput}
            onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">Paste the QR code data or scan using your device camera</p>
        </div>

        <Button onClick={handleScan} disabled={!qrInput.trim() || scanning} className="w-full">
          {scanning ? (
            <>
              <QrCode className="h-4 w-4 mr-2 animate-pulse" />
              Validating...
            </>
          ) : (
            <>
              <Scan className="h-4 w-4 mr-2" />
              Validate QR Code
            </>
          )}
        </Button>

        {lastResult && (
          <div
            className={`p-4 rounded-lg border ${
              lastResult.valid
                ? "border-green-200 bg-green-50 dark:bg-green-900/10"
                : "border-red-200 bg-red-50 dark:bg-red-900/10"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {lastResult.valid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-semibold">{lastResult.valid ? "Success!" : "Invalid Code"}</span>
            </div>

            <p className="text-sm mb-2">{lastResult.message}</p>

            {lastResult.valid && lastResult.points > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                +{lastResult.points} points earned!
              </Badge>
            )}
          </div>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            QR codes are generated at event locations and contain validation data
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
