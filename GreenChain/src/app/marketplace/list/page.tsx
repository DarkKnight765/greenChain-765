"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function ListCreditsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [listingType, setListingType] = useState("new")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      window.location.href = "/dashboard/ngo"
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/dashboard/ngo">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">List Carbon Credits</h1>
        <p className="text-muted-foreground mb-8">List your verified carbon credits on the marketplace</p>

        <Tabs value={listingType} onValueChange={setListingType}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="new">New Project</TabsTrigger>
            <TabsTrigger value="existing">Existing Project</TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>New Carbon Credit Project</CardTitle>
                  <CardDescription>Create a new carbon credit project listing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input id="project-name" placeholder="Reforestation Project" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-type">Project Type</Label>
                      <Select required>
                        <SelectTrigger id="project-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forestry">Forestry</SelectItem>
                          <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                          <SelectItem value="methane-reduction">Methane Reduction</SelectItem>
                          <SelectItem value="energy-efficiency">Energy Efficiency</SelectItem>
                          <SelectItem value="blue-carbon">Blue Carbon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Country or region" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verification-standard">Verification Standard</Label>
                      <Select required>
                        <SelectTrigger id="verification-standard">
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vcs">Verified Carbon Standard (VCS)</SelectItem>
                          <SelectItem value="gold-standard">Gold Standard</SelectItem>
                          <SelectItem value="cdm">Clean Development Mechanism (CDM)</SelectItem>
                          <SelectItem value="american-carbon-registry">American Carbon Registry</SelectItem>
                          <SelectItem value="climate-action-reserve">Climate Action Reserve</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits-amount">Number of Credits</Label>
                      <Input id="credits-amount" type="number" min="1" placeholder="100" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price-per-credit">Price per Credit (USD)</Label>
                      <Input id="price-per-credit" type="number" min="1" step="0.01" placeholder="25.00" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Describe your carbon credit project in detail..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Project Images</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Drag and drop images or click to browse</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                      <Input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" multiple />
                      <Button variant="outline" size="sm" className="mt-4">
                        Select Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Verification Documents</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Upload verification documents</p>
                      <p className="text-xs text-muted-foreground">PDF or DOC (max. 10MB)</p>
                      <Input type="file" className="hidden" accept=".pdf, .doc, .docx" multiple />
                      <Button variant="outline" size="sm" className="mt-4">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit for Verification"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="existing">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>List Credits from Existing Project</CardTitle>
                  <CardDescription>Add more credits to an existing project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="existing-project">Select Project</Label>
                    <Select required>
                      <SelectTrigger id="existing-project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project-1">Reforestation Project</SelectItem>
                        <SelectItem value="project-2">Solar Energy Farm</SelectItem>
                        <SelectItem value="project-3">Mangrove Restoration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits-amount-existing">Number of Credits</Label>
                      <Input id="credits-amount-existing" type="number" min="1" placeholder="100" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price-per-credit-existing">Price per Credit (USD)</Label>
                      <Input
                        id="price-per-credit-existing"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="25.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verification-documents">New Verification Documents (if applicable)</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Upload verification documents</p>
                      <p className="text-xs text-muted-foreground">PDF or DOC (max. 10MB)</p>
                      <Input type="file" className="hidden" accept=".pdf, .doc, .docx" multiple />
                      <Button variant="outline" size="sm" className="mt-4">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "List Credits"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

