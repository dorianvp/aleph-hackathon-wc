import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Heart, Users } from "lucide-react"
import Link from "next/link"

export default function Component() {
	const user = {
		name: "Sarah Johnson",
		username: "@sarahjohnson",
		bio: "Passionate about making a difference through crowdfunding and social causes.",
		avatar: "/placeholder.svg?height=100&width=100",
		campaignsCount: 5,
		followersCount: 1234,
		joinedDate: "January 2022",
	}

	const campaigns = [
		{
			id: 1,
			title: "Jason's Journey to Recovery",
			description: "Jason suffered a severe accident and spinal injury. He's now on a tough road to recovery, needing urgent support for therapy and surgeries.",
			raised: 15000,
			goal: 20000,
			supporters: 230,
			daysLeft: 15,
		},
		{
			id: 2,
			title: "Education for Children",
			description: "Supporting education initiatives for underprivileged children",
			raised: 8000,
			goal: 10000,
			supporters: 150,
			daysLeft: 7,
		},
		{
			id: 3,
			title: "Reforestation Project",
			description: "Planting trees to combat deforestation",
			raised: 5000,
			goal: 15000,
			supporters: 100,
			daysLeft: 30,
		},
	]

	return (
		<div className="container mx-auto p-6">
			<Card className="mb-6">
				<CardContent className="flex flex-col md:flex-row items-center gap-6 pt-6">
					<Avatar className="w-24 h-24">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<h1 className="text-2xl font-bold">{user.name}</h1>
						<p className="text-muted-foreground">{user.username}</p>
						<p className="mt-2">{user.bio}</p>
						<div className="flex items-center gap-4 mt-4">
							<div className="flex items-center gap-1">
								<Heart className="w-4 h-4" />
								<span>{user.campaignsCount} Campaigns</span>
							</div>
							<div className="flex items-center gap-1">
								<Users className="w-4 h-4" />
								<span>{user.followersCount} Followers</span>
							</div>
							<div className="flex items-center gap-1">
								<CalendarDays className="w-4 h-4" />
								<span>Joined {user.joinedDate}</span>
							</div>
						</div>
					</div>
					<Button className="w-full md:w-auto">Follow</Button>
				</CardContent>
			</Card>

			<Tabs defaultValue="campaigns">
				<TabsList className="mb-4">
					<TabsTrigger value="campaigns">Campaigns</TabsTrigger>
					<TabsTrigger value="about">About</TabsTrigger>
				</TabsList>
				<TabsContent value="campaigns">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{campaigns.map((campaign) => (
							<Card key={campaign.id}>
								<Link href={`/campaigns/${campaign.id}`}>
									<CardHeader>
										<CardTitle>{campaign.title}</CardTitle>
										<CardDescription>{campaign.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<Progress value={(campaign.raised / campaign.goal) * 100} className="mb-2" />
										<div className="flex justify-between text-sm text-muted-foreground">
											<span>${campaign.raised.toLocaleString()} raised</span>
											<span>${campaign.goal.toLocaleString()} goal</span>
										</div>
									</CardContent>
									<CardFooter className="flex justify-between">
										<div className="flex items-center gap-2">
											<Users className="w-4 h-4" />
											<span>{campaign.supporters} supporters</span>
										</div>
										<Badge variant="secondary">{campaign.daysLeft} days left</Badge>
									</CardFooter>
								</Link>
							</Card>
						))}
					</div>
				</TabsContent>
				<TabsContent value="about">
					<Card>
						<CardHeader>
							<CardTitle>About {user.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{user.bio}</p>
							<p className="mt-4">
								{user.name} has been a member of our platform since {user.joinedDate} and has created {user.campaignsCount} campaigns to date.
								Their dedication to social causes and ability to mobilize supporters have made a significant impact in various areas,
								from environmental conservation to education and healthcare.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}