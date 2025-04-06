"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Wallet, BarChart3, History, User, Plus } from "lucide-react"

// Mock data for the dashboard
const transactions = [
  {
    id: "1",
    date: "2023-04-01",
    type: "Sale",
    amount: "50",
    price: "$1,250.00",
    buyer: "Acme Corp",
    status: "Completed",
  },
  {
    id: "2",
    date: "2023-03-15",
    type: "Sale",
    amount: "25",
    price: "$625.00",
    buyer: "Tech Solutions Inc",
    status: "Completed",
  },
  {
    id: "3",
    date: "2023-02-28",
    type: "Sale",
    amount: "100",
    price: "$2,500.00",
    buyer: "Global Enterprises",
    status: "Completed",
  },
]

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">NGO Dashboard</h1>
          <p className="text-muted-foreground">Manage your carbon credits and profile</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link href="/marketplace/list">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              List Credits
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline">
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
            Sales History
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
                <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">250</div>
                <p className="text-xs text-muted-foreground">Ready to be listed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
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
                <CardTitle className="text-sm font-medium">Credits Sold</CardTitle>
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
                <div className="text-2xl font-bold">175</div>
                <p className="text-xs text-muted-foreground">Total credits sold</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Credits Balance</CardTitle>
              <CardDescription>Your current carbon credits inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Available Credits</p>
                    <p className="text-sm text-muted-foreground">Ready to be listed on the marketplace</p>
                  </div>
                  <div className="ml-auto font-medium">250 Credits</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Listed Credits</p>
                    <p className="text-sm text-muted-foreground">Currently for sale on the marketplace</p>
                  </div>
                  <div className="ml-auto font-medium">75 Credits</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Pending Verification</p>
                    <p className="text-sm text-muted-foreground">Credits awaiting verification</p>
                  </div>
                  <div className="ml-auto font-medium">100 Credits</div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/marketplace/list">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    List Credits
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Your recent carbon credit sales</CardDescription>
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
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} to {transaction.buyer}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{transaction.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("transactions")}>
                  View All Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales History</CardTitle>
              <CardDescription>A record of all your carbon credit sales</CardDescription>
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
                      <th className="text-left p-2">Buyer</th>
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
                        <td className="p-2">{transaction.buyer}</td>
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
              <CardTitle>NGO Profile</CardTitle>
              <CardDescription>Manage your organization information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Organization Name</h3>
                <p>Green Earth Initiative</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Email</h3>
                <p>contact@greenearth.org</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Project Type</h3>
                <p>Reforestation</p>
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

