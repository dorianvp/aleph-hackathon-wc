import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/ui/navbar/navbar";
import { getCampaigns } from "@/lib/actions/campaign";

const CAMPAIGN_IMAGES = [
  "/images/jason.jpg",
  "/images/education.jpg",
  "/images/forest.jpg",
  "/images/refugees.jpg",
  "/images/shelter.jpg",
  "/images/hunger.jpg",
];

export default async function Campaigns() {
  noStore();
  const fetchedCampaigns = await getCampaigns();
  console.log("Fetched campaigns:", fetchedCampaigns);

  const fakeCampaigns = [
    {
      id: 1,
      name: "Jason's Journey to Recovery",
      description:
        "Jason suffered a severe accident and spinal injury. He's now on a tough road to recovery, needing urgent support for therapy and surgeries.",
      image: "/images/jason.jpg",
      raised: 15000,
      goal: 20000,
    },
    {
      id: 2,
      name: "Education for All",
      description:
        "Support education initiatives for underprivileged children worldwide.",
      image: "/images/education.jpg",
      raised: 25000,
      goal: 100000,
    },
    {
      id: 3,
      name: "Reforestation Project",
      description: "Plant trees to combat deforestation and climate change.",
      image: "/images/forest.jpg",
      raised: 10000,
      goal: 30000,
    },
    {
      id: 4,
      name: "Medical Aid for Refugees",
      description:
        "Provide essential medical supplies and care for refugees in crisis zones.",
      image: "/images/refugees.jpg",
      raised: 35000,
      goal: 75000,
    },
    {
      id: 5,
      name: "Animal Shelter Support",
      description:
        "Help local animal shelters provide care for abandoned and rescued animals.",
      image: "/images/shelter.jpg",
      raised: 8000,
      goal: 20000,
    },
    {
      id: 6,
      name: "Hunger Relief Program",
      description:
        "Support food banks and meal programs for those facing food insecurity.",
      image: "/images/hunger.jpg",
      raised: 12000,
      goal: 40000,
    },
  ];

  const campaigns = [...fetchedCampaigns, ...fakeCampaigns];

  function getRandomImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * CAMPAIGN_IMAGES.length);
    return CAMPAIGN_IMAGES[randomIndex];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Active Campaigns
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
                  <Card>
                    <CardHeader>
                      <Image
                        alt={campaign.name}
                        className="overflow-hidden rounded-t-lg object-cover w-full"
                        quality={50}
                        height="200"
                        // @ts-ignore
                        src={campaign.image || getRandomImageUrl()}
                        width="400"
                      />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CardTitle>{campaign.name}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {campaign.description}
                      </p>
                      <Progress
                        className="w-full"
                        // @ts-ignore
                        value={(campaign.raised / campaign.goal) * 100}
                      />
                      <p className="text-sm font-medium">
                        {/* @ts-ignore */}$
                        {campaign.raised?.toLocaleString() || "0"} raised of $
                        {campaign.goal?.toLocaleString() || "0"} goal
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Donate Now</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your Own Campaign
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Have a cause you&apos;re passionate about? Create your own
                  campaign and start making a difference today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href={"/profile/campaigns/new"}>Create a Campaign</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Acme Inc. All rights reserved.
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
