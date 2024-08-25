"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, Edit, Heart, PlusCircle, Settings, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function Component() {
	const [isEditing, setIsEditing] = useState(false)
	const [user, setUser] = useState({
		name: "Marcos Batalla",
		username: "@marcosbatalla",
		bio: "Naci en Buenos Aires. Actualmente vivo en Cordoba.",
		avatar: "/placeholder.svg?height=100&width=100",
		campaignsCount: 3,
		followersCount: 567,
		joinedDate: "March 2023",
	})

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
			title: "Youth Coding Workshop",
			description: "Empowering youth with coding skills for the future",
			raised: 3000,
			goal: 5000,
			supporters: 45,
			daysLeft: 10,
		},
		{
			id: 3,
			title: "Homeless Shelter Support",
			description: "Providing essentials and support for local homeless shelters",
			raised: 7500,
			goal: 15000,
			supporters: 120,
			daysLeft: 30,
		},
	]

	const handleEdit = () => {
		setIsEditing(!isEditing)
		// In a real app, you'd save the changes here
		if (isEditing) {
			console.log("Saving changes...")
		}
	}

	return (
		<div className="container mx-auto p-6">
			<Card className="mb-6">
				<CardContent className="flex flex-col md:flex-row items-start gap-6 pt-6">
					<div className="relative">
						<Avatar className="w-24 h-24">
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
						</Avatar>
						<Button size="icon" className="absolute bottom-0 right-0 rounded-full" onClick={() => console.log("Change avatar")}>
							<Edit className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex-1">
						{isEditing ? (
							<Input
								value={user.name}
								onChange={(e) => setUser({ ...user, name: e.target.value })}
								className="text-2xl font-bold mb-2"
							/>
						) : (
							<h1 className="text-2xl font-bold">{user.name}</h1>
						)}
						<p className="text-muted-foreground">{user.username}</p>
						{isEditing ? (
							<Textarea
								value={user.bio}
								onChange={(e) => setUser({ ...user, bio: e.target.value })}
								className="mt-2"
							/>
						) : (
							<p className="mt-2">{user.bio}</p>
						)}
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
					<div className="flex flex-col gap-2 w-full md:w-auto">
						<Button onClick={handleEdit}>
							{isEditing ? "Save Changes" : "Edit Profile"}
						</Button>
						<Button variant="outline" onClick={() => console.log("View Analytics")}>
							<TrendingUp className="mr-2 h-4 w-4" /> Analytics
						</Button>
						<Button variant="outline" onClick={() => console.log("Account Settings")}>
							<Settings className="mr-2 h-4 w-4" /> Account Settings
						</Button>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="campaigns">
				<TabsList className="mb-4">
					<TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
					<TabsTrigger value="about">About Me</TabsTrigger>
				</TabsList>
				<TabsContent value="campaigns">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold">My Campaigns</h2>
						<Link href={"/profile/campaigns/new"}>
							<Button onClick={() => console.log("Add new campaign")}>
								<PlusCircle className="mr-2 h-4 w-4" /> New Campaign
							</Button>
						</Link>
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{campaigns.map((campaign) => (
							<Card key={campaign.id}>
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
							</Card>
						))}
					</div>
				</TabsContent>
				<TabsContent value="about">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle>About Me</CardTitle>
							<Button size="icon" variant="ghost" onClick={handleEdit}>
								<Edit className="h-4 w-4" />
							</Button>
						</CardHeader>
						<CardContent>
							{isEditing ? (
								<Textarea
									value={user.bio}
									onChange={(e) => setUser({ ...user, bio: e.target.value })}
									className="mt-2"
								/>
							) : (
								<>
									<p>{user.bio}</p>
									<p className="mt-4">
										You've been a member of our platform since {user.joinedDate} and have created {user.campaignsCount} campaigns to date.
										Your dedication to social causes and ability to mobilize supporters have made a significant impact in various areas,
										from environmental conservation to education and community support.
									</p>
								</>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}