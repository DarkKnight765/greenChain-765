"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { FaArrowLeft } from 'react-icons/fa'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { ethers, parseEther, formatEther } from "ethers"

const contractAddress = "0x60cc08240589d8717004Ae198D09C2F1A2F680D0"

const abi = [
  "function buyToken(uint256 projectId) payable"
]

const projectData = {
  id: "1",
  title: "Reforestation Project",
  organization: "Green Earth Initiative",
  location: "Brazil",
  type: "Forestry",
  price: 25,
  available: 500,
  verified: true,
  verificationStandard: "Verified Carbon Standard (VCS)",
  startDate: "2020-01-15",
  endDate: "2050-01-15",
  description: "This project focuses on reforestation of degraded lands in the Amazon rainforest, helping to sequester carbon and restore biodiversity. The project involves planting native tree species and working with local communities to ensure sustainable forest management practices.",
  longDescription: "The Amazon Reforestation Project aims to restore 5,000 hectares of degraded forest land in the Brazilian Amazon. By planting a diverse mix of native tree species, the project will sequester carbon dioxide from the atmosphere, helping to mitigate climate change while also restoring vital habitat for endangered species.",
  impact: "The project works closely with local communities, providing sustainable livelihoods and training in forest management techniques.",
  images: ["/untitled-design3.png?height=400&width=600", "/untitled-design4.png?height=400&width=600", "/untitled-design5.jpg?height=400&width=600"],
  documents: [{ name: "Project Design Document", url: "#" }, { name: "Verification Report", url: "#" }, { name: "Monitoring Report", url: "#" }]
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  const totalPrice = quantity * projectData.price

  const handleWalletConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setWalletAddress(address)
      } catch (error) {
        alert("Failed to connect wallet.")
      }
    } else {
      alert("MetaMask is not installed.")
    }
  }

  const handlePurchase = async () => {
    if (!user) {
      setShowLoginDialog(true)
    } else if (user.type === "company") {
      if (!walletAddress) {
        await handleWalletConnect()
      }

      if (walletAddress) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)

          const balance = await provider.getBalance(walletAddress)
          const totalPriceInEth = parseEther((totalPrice / 1000).toString())

          if (balance < totalPriceInEth) {
            alert("Insufficient balance.")
            return
          }

          const tx = await contract.buyToken(projectData.id, {
            value: totalPriceInEth,
            gasLimit: 500000,
          })

          await tx.wait()
          alert(`Purchase successful! You've bought ${quantity} credits.`)
          router.push("/dashboard/company")
        } catch (error: any) {
          console.error("Transaction Error:", error)
          alert("Transaction failed: " + (error?.message || "Unknown error"))
        }
      }
    } else {
      alert("Only companies can purchase credits.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/marketplace">
          <Button variant="ghost" size="sm">
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Carousel */}
        <div className="w-full lg:w-2/3">
          <img
            src={projectData.images[activeImageIndex]}
            alt="Project Preview"
            className="w-full h-96 object-cover rounded-lg mb-4 border"
          />
          <div className="flex space-x-2 overflow-x-auto">
            {projectData.images.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`w-20 h-20 object-cover rounded border cursor-pointer ${activeImageIndex === index ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Purchase Block */}
        <div className="w-full lg:w-1/3">
          <Card className="bg-muted p-6 rounded-lg shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Purchase Carbon Credits</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Each credit represents 1 metric ton of CO₂ equivalent
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-muted-foreground">Price per Credit:</span>
                <span className="font-semibold text-white">${projectData.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-muted-foreground">Available Credits:</span>
                <span className="font-semibold text-white">{projectData.available}</span>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                  Quantity:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  max={projectData.available}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Total:</span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}{" "}
                    <span className="text-xs text-muted-foreground">
                      (≈ {formatEther(parseEther((totalPrice / 1000).toString()))} ETH)
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={handlePurchase} className="w-full bg-green-600 hover:bg-green-700">
                Purchase Credits
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-10 space-y-6">
        <h2 className="text-2xl font-bold">{projectData.title}</h2>
        <p className="text-gray-600">{projectData.organization} • {projectData.location}</p>
        <p className="mt-2 text-gray-700">{projectData.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Project Type</p>
            <p className="font-medium">{projectData.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Verification Standard</p>
            <p className="font-medium">{projectData.verificationStandard}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{projectData.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium">{projectData.endDate}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Detailed Description</h3>
          <p className="text-gray-700 mt-2">{projectData.longDescription}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Impact</h3>
          <p className="text-gray-700 mt-2">{projectData.impact}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Documents</h3>
          <ul className="list-disc list-inside text-blue-600 mt-2">
            {projectData.documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log in to purchase credits</DialogTitle>
            <DialogDescription>
              You need to log in as a company to purchase carbon credits.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose onClick={() => setShowLoginDialog(false)}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
