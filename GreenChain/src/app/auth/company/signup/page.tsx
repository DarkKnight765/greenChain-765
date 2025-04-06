"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Mail } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function CompanySignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signup, loginWithWallet } = useAuth()
  const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      await signup(companyName, email, password, "company")
      router.push("/")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    try {
      // Simulate wallet connection with a mock address
      const mockWalletAddress = "0x" + Math.random().toString(36).substring(2, 15)
      await loginWithWallet(mockWalletAddress, "company")
      router.push("/")
    } catch (error) {
      console.error("Wallet connection failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      // Simulate Google sign-in
      await signup("Google Company", "company@example.com", "google-auth", "company")
      router.push("/")
    } catch (error) {
      console.error("Google sign-in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign up as a Company</CardTitle>
          <CardDescription>Create an account to start offsetting your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleEmailSignUp}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Acme Inc."
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  <Button variant="outline" type="button" onClick={handleGoogleSignIn} disabled={isLoading}>
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="wallet">
              <div className="grid gap-4">
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your crypto wallet to create an account. We support multiple blockchain networks.
                  </p>
                </div>
                <Button variant="outline" className="w-full" onClick={handleWalletConnect} disabled={isLoading}>
                  <Wallet className="mr-2 h-4 w-4" />
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/company/signin" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

