import Image from "next/image";
import { getCampaign, CampaignWithCreator } from "@/lib/actions/campaign";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientSideCampaign } from "./client-campaign";

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(params.campaignId);

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const fakeUpdates = [
    { title: "Initial damage assessment", image: "/images/earthquake.jpg" },
    {
      title: "Emergency response team deployed",
      image: "/images/earthquake.jpg",
    },
    { title: "Community support growing", image: "/images/earthquake.jpg" },
  ];

  const donationTier = {
    name: "Supporter",
    amount: 1,
    perks: [
      "Receive a thank you message",
      "Your name on our donor list",
      "Exclusive campaign updates",
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Campaign Creator's Info */}
      <div className="text-center mb-8">
        <Image
          alt={campaign.creatorName}
          className="rounded-full mx-auto mb-4"
          height="120"
          src={"/images/jason.jpg"}
          style={{
            aspectRatio: "120/120",
            objectFit: "cover",
          }}
          width="120"
        />
        <h1 className="text-3xl font-bold sm:text-4xl">{campaign.name}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {campaign.description}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">100 supporters</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">57 well-wishes</span>
          </div>
        </div>
      </div>

      {/* Campaign Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recovery Fund Progress</CardTitle>
          <CardDescription>
            ${Math.round(campaign.goal / 3)} raised of ${campaign.goal} goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={100 / 3} className="w-full" />
          <p className="text-center mt-4 text-muted-foreground">
            {Math.round(100 / 3)}% of goal reached
          </p>
        </CardContent>
      </Card>

      {/* Campaign Description */}
      <div className="prose max-w-none mb-8">
        <p className="mb-4">{campaign.description}</p>
      </div>

      {/* Client-side component for donation functionality */}
      <ClientSideCampaign campaign={campaign} donationTier={donationTier} />

      {/* Recovery Updates */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Recovery Journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fakeUpdates.map((update, i) => (
            <div
              key={i}
              className="aspect-square relative overflow-hidden rounded-lg"
            >
              <Image
                alt={update.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                height="300"
                src={update.image}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <p className="text-white text-sm font-medium">{update.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
