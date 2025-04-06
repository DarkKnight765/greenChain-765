"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section
        className="relative w-full h-[400px] flex items-center justify-center text-center rounded-xl overflow-hidden mb-16 mt-0"
        style={{
          backgroundImage: `url('/hi.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            About Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            Our mission is to accelerate climate action through transparent carbon markets.
          </p>
        </div>
      </section>

      {/* Our Story and Mission */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Carbon Credit Marketplace was founded with a simple yet powerful vision:
                to create a more accessible, transparent, and efficient way for organizations to participate in carbon markets.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We recognized that while carbon credits are a crucial tool in the fight against climate change,
                the traditional markets were often opaque, fragmented, and inaccessible to many organizations
                that wanted to make a difference.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By leveraging blockchain technology and creating a user-friendly platform,
                we've built a marketplace that connects companies looking to offset their carbon footprint
                directly with NGOs and projects that are making a real impact on the ground.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We envision a future where sustainability is not an afterthought but a core part of every business strategy.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our mission is to empower organizations to take meaningful climate action by simplifying access to trusted carbon credits,
                promoting responsible offsetting, and supporting initiatives that bring measurable environmental impact.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Lowering barriers to participate in carbon markets</li>
                <li>Making all transactions transparent and traceable</li>
                <li>Boosting support for impactful environmental projects</li>
                <li>Empowering companies of every size to go green</li>
                <li>Accelerating a just transition to a net-zero world</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Manas Sharma", image: "/manas.jpg" },
              { name: "Surendra Vishnoi", image: "/surendra.jpg" },
              { name: "Nihal Sharma", image: "/nihal.jpg" },
              { name: "Parth Vijay", image: "/parth.jpg" },
            ].map((member, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_2px_rgba(34,197,94,0.6)]"
              >
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 transition duration-300 group-hover:scale-105"
                  />
                  <CardTitle className="text-center">{member.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Technology</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Blockchain Integration",
                content:
                  "Our platform leverages blockchain technology to ensure transparency, traceability, and security in all carbon credit transactions. Each credit is tokenized, creating an immutable record of its origin, ownership, and retirement.",
              },
              {
                title: "Verification Standards",
                content:
                  "We work with leading carbon credit verification standards to ensure that all credits traded on our platform represent real, additional, and permanent emissions reductions or removals.",
              },
            ].map((tech, index) => (
              <Card
                key={index}
                className="border-gray-200 transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_2px_rgba(34,197,94,0.5)]"
              >
                <CardHeader>
                  <CardTitle>{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{tech.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
