"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Wallet, BarChart3, History, User } from "lucide-react"

// Mock data for the dashboard
const transactions = [
  {
    id: "1",
    date: "2023-04-01",
    type: "Purchase",
    amount: "50",
    price: "$1,250.00",
    status: "Completed",
  },
  {
    id: "2",
    date: "2023-03-15",
    type: "Purchase",
    amount: "25",
    price: "$625.00",
    status: "Completed",
  },
  {
    id: "3",
    date: "2023-02-28",
    type: "Purchase",
    amount: "100",
    price: "$2,500.00",
    status: "Completed",
  },
]

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <p className="text-muted-foreground">Manage your carbon credits and profile</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/marketplace">
            <Button>
              Go to Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <History className="mr-2 h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Carbon Credits</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">175</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,375.00</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Footprint Offset</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">175 tons</div>
                <p className="text-xs text-muted-foreground">of CO2 equivalent</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Credits Balance</CardTitle>
              <CardDescription>Your current carbon credits and usage</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="relative h-48 w-48">
                {/* Semi-circular progress chart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">175</div>
                    <div className="text-sm text-muted-foreground">Credits Remaining</div>
                  </div>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 50">
                  {/* Background arc */}
                  <path d="M 0,50 A 50,50 0 1,1 100,50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  {/* Progress arc (70% filled) */}
                  <path
                    d="M 0,50 A 50,50 0 1,1 100,50"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray="157"
                    strokeDashoffset="47.1"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent carbon credit purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.type} - {transaction.amount} Credits
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="ml-auto font-medium">{transaction.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("transactions")}>
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>A record of all your carbon credit transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="p-2">{transaction.date}</td>
                        <td className="p-2">{transaction.type}</td>
                        <td className="p-2">{transaction.amount} Credits</td>
                        <td className="p-2">{transaction.price}</td>
                        <td className="p-2">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Manage your company information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Company Name</h3>
                <p>Acme Corporation</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Email</h3>
                <p>contact@acmecorp.com</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Industry</h3>
                <p>Technology</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Connected Wallet</h3>
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  <p className="text-sm truncate">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

