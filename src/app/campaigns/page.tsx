import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Heart, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Campaigns() {
	const campaigns = [
		{
			id: 1,
			title: "Jason's Journey to Recovery",
			description: "Jason suffered a severe accident and spinal injury. He's now on a tough road to recovery, needing urgent support for therapy and surgeries.",
			image: "/images/jason.jpg",
			raised: 15000,
			goal: 20000,
		},
		{
			id: 2,
			title: "Education for All",
			description: "Support education initiatives for underprivileged children worldwide.",
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
		{
			id: 4,
			title: "Medical Aid for Refugees",
			description: "Provide essential medical supplies and care for refugees in crisis zones.",
			image: "/images/refugees.jpg",
			raised: 35000,
			goal: 75000,
		},
		{
			id: 5,
			title: "Animal Shelter Support",
			description: "Help local animal shelters provide care for abandoned and rescued animals.",
			image: "/images/shelter.jpg",
			raised: 8000,
			goal: 20000,
		},
		{
			id: 6,
			title: "Hunger Relief Program",
			description: "Support food banks and meal programs for those facing food insecurity.",
			image: "/images/hunger.jpg",
			raised: 12000,
			goal: 40000,
		},
	]

	return (
		<div className="flex flex-col min-h-screen">
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<Link className="flex items-center justify-center" href="#">
					<Heart className="h-6 w-6" />
					<span className="sr-only">Acme Inc</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
						About
					</Link>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
						Campaigns
					</Link>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
						Contact
					</Link>
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Make a Difference Today
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									Explore our ongoing campaigns and contribute to causes that matter. Your donation can change lives.
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<form className="flex space-x-2">
									<Input className="max-w-lg flex-1" placeholder="Search campaigns" type="text" />
									<Button type="submit" variant="outline">
										<Search className="h-4 w-4" />
										<span className="sr-only">Search</span>
									</Button>
								</form>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
					<div className="container px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
							Active Campaigns
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{campaigns.map((campaign) => (
								<Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
									<Card >
										<CardHeader>
											<Image
												alt={campaign.title}
												className="overflow-hidden rounded-t-lg object-cover w-full"
												quality={50}
												height="200"
												src={campaign.image}
												width="400"
											/>
										</CardHeader>
										<CardContent className="space-y-2">
											<CardTitle>{campaign.title}</CardTitle>
											<p className="text-sm text-gray-500 dark:text-gray-400">{campaign.description}</p>
											<Progress className="w-full" value={(campaign.raised / campaign.goal) * 100} />
											<p className="text-sm font-medium">
												${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
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
									Have a cause you&apos;re passionate about? Create your own campaign and start making a difference today.
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<Button className="w-full" size="lg" asChild>
									<Link href={'/profile/campaigns/new'}>
										Create a Campaign
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Acme Inc. All rights reserved.</p>
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
	)
}