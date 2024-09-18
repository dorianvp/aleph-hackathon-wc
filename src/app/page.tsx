import { SignOutButton } from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/ui/navbar/navbar";
import { Progress } from "@/components/ui/progress";
import { Search, ArrowRight, Gift, Users, BarChart, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  const featuredCampaign = {
    id: 0,
    title: "Emergency Relief: Earthquake Victims",
    description:
      "Urgent support needed for victims of the recent earthquake. Provide food, shelter, and medical aid.",
    image: "/images/earthquake.jpg",
    raised: 75000,
    goal: 100000,
  };

  const campaigns = [
    {
      id: 1,
      title: "Jason's Journey to Recovery",
      description:
        "Jason suffered a severe accident and spinal injury. He's now on a tough road to recovery, needing urgent support for therapy and surgeries.",
      image: "/images/jason.jpg",
      raised: 15000,
      goal: 20000,
    },
    {
      id: 2,
      title: "Education for All",
      description:
        "Support education initiatives for underprivileged children worldwide.",
      image: "/images/education.jpg",
      raised: 25000,
      goal: 100000,
    },
    {
      id: 3,
      title: "Reforestation Project",
      description: "Plant trees to combat deforestation and climate change.",
      image: "/images/forest.jpg",
      raised: 10000,
      goal: 30000,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Make a Difference Today
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-sm md:text-base lg:text-lg">
                  Explore our ongoing campaigns and contribute to causes that
                  matter. Your donation can change lives.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search campaigns"
                    type="text"
                  />
                  <Button type="submit" variant="outline">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl  font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 md:mb-8 text-center">
              Featured Campaign
            </h2>
            <Card className="w-full max-w-3xl mx-auto">
              <CardHeader>
                <Image
                  alt={featuredCampaign.title}
                  className="aspect-video overflow-hidden rounded-t-lg object-cover w-full"
                  height="300"
                  src={featuredCampaign.image}
                  width="600"
                  quality={50}
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl md:text-2xl">
                  {featuredCampaign.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm md:text-base">
                  {featuredCampaign.description}
                </p>
                <Progress
                  className="w-full"
                  value={
                    (featuredCampaign.raised / featuredCampaign.goal) * 100
                  }
                />
                <p className="font-medium text-sm md:text-base">
                  ${featuredCampaign.raised.toLocaleString()} raised of $
                  {featuredCampaign.goal.toLocaleString()} goal
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Donate Now</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 md:mb-8 text-center">
              Active Campaigns
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="flex flex-col">
                  <Link href={`/campaigns/26`}>
                    <CardHeader className="p-0">
                      <Image
                        alt={campaign.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                        height="150"
                        src={campaign.image}
                        width="300"
                      />
                    </CardHeader>
                    <CardContent className="flex-grow p-4 space-y-2">
                      <CardTitle className="text-lg md:text-xl line-clamp-1">
                        {campaign.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {campaign.description}
                      </p>
                      <Progress
                        className="w-full"
                        value={(campaign.raised / campaign.goal) * 100}
                      />
                      <p className="text-sm font-medium">
                        ${campaign.raised.toLocaleString()} of $
                        {campaign.goal.toLocaleString()}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Donate Now</Button>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="mt-8 md:mt-10 text-center">
              <Link href={"/campaigns"}>
                <Button variant="outline">
                  View All Campaigns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 md:mb-8 text-center">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Gift className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Choose a Campaign
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Browse through our various campaigns and select a cause
                  you&apos;re passionate about.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Make a Donation
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Contribute any amount you&apos;re comfortable with. Every
                  donation, big or small, makes a difference.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Track Your Impact
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Follow the progress of the campaigns you&apos;ve supported and
                  see the real-world impact of your generosity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 md:mb-8 text-center">
              What Our Donors Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        alt={`Donor ${i}`}
                        className="rounded-full"
                        height="40"
                        src="/placeholder.svg?height=40&width=40"
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width="40"
                      />
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Donor</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base text-muted-foreground">
                      &quot;I&apos;m amazed at how easy it is to make a
                      difference. Patronix has made donating to important causes
                      simple and transparent.&quot;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 md:mb-8 text-center">
              Our Partners
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 items-center justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex items-center justify-center">
                  <Image
                    alt={`Partner ${i}`}
                    className="max-h-8 md:max-h-12 w-auto"
                    height="48"
                    src="/placeholder.svg?height=48&width=120"
                    style={{
                      aspectRatio: "120/48",
                      objectFit: "contain",
                    }}
                    width="120"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Stay Updated
                </h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 text-sm md:text-base lg:text-lg">
                  Subscribe to our newsletter for the latest campaign updates
                  and success stories.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 Patronix. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
