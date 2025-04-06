"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-0"> {/* Removed py-12 */}
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section 
        className="relative pt-0 mt-0 bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('/ok.jpg')" }} // Make sure 'ok.jpg' is in the /public folder
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-4 min-h-screen">
          <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Carbon Credit Marketplace
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
            Connect, trade, and make a positive impact on our planet.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/marketplace">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">Explore Marketplace</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* UNDERSTANDING CARBON CREDITS SECTION */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Understanding Carbon Credits
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Carbon credits are a key tool in the fight against climate change.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              { title: "What are Carbon Credits?", content: "Carbon credits represent 1 ton of CO₂ removed or prevented from being emitted." },
              { title: "How They Work", content: "Companies buy carbon credits while NGOs and projects generate them by reducing emissions." },
              { title: "Benefits", content: "Supports sustainability, regulatory compliance, and incentives for emissions reduction." }
            ].map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-transform transform hover:scale-105 border-2 border-gray-300 hover:border-green-500 hover:shadow-green-500/50 hover:shadow-lg p-6 duration-300"
              >
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW MARKETPLACE WORKS SECTION */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How Our Marketplace Works
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            A transparent and efficient platform for carbon credit trading.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
            {[
              { title: "For Companies", content: "Buy carbon credits to offset emissions and meet sustainability goals.", link: "/auth/company/signup", linkText: "Register as Company" },
              { title: "For NGOs", content: "Sell verified carbon credits and get fair compensation for climate impact.", link: "/auth/ngo/signup", linkText: "Register as NGO" },
              { title: "Blockchain-Powered", content: "Ensuring transparency, traceability, and security in all transactions.", link: "/about", linkText: "Learn More" }
            ].map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-transform transform hover:scale-105 border-2 border-gray-300 hover:border-green-500 hover:shadow-green-500/50 hover:shadow-lg p-6 duration-300"
              >
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                  <div className="mt-4">
                    <Link href={item.link}>
                      <Button variant="outline" className="w-full">
                        {item.linkText}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
