import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Heart } from "lucide-react"
import Image from "next/image"

export default function Campaign({ params }: { params: { campaignId: string } }) {
	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			{/* Creator Info */}
			<div className="text-center mb-8">
				<Image
					alt="Jane Creator"
					className="rounded-full mx-auto mb-4"
					height="120"
					src="/placeholder.svg?height=120&width=120"
					style={{
						aspectRatio: "120/120",
						objectFit: "cover",
					}}
					width="120"
				/>
				<h1 className="text-3xl font-bold sm:text-4xl">Jane Creator</h1>
				<p className="text-muted-foreground mt-2 text-lg">
					Digital artist and storyteller creating unique worlds and characters
				</p>
				<div className="flex justify-center gap-4 mt-4">
					<div className="flex items-center gap-1">
						<Users className="h-5 w-5 text-muted-foreground" />
						<span className="text-muted-foreground">1.2k supporters</span>
					</div>
					<div className="flex items-center gap-1">
						<Heart className="h-5 w-5 text-muted-foreground" />
						<span className="text-muted-foreground">5k likes</span>
					</div>
				</div>
			</div>

			{/* Campaign Progress */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Campaign Progress</CardTitle>
					<CardDescription>$15,000 raised of $20,000 goal</CardDescription>
				</CardHeader>
				<CardContent>
					<Progress value={75} className="w-full" />
					<p className="text-center mt-4 text-muted-foreground">75% of goal reached</p>
				</CardContent>
			</Card>

			{/* Campaign Description */}
			<div className="prose max-w-none mb-8">
				<h2 className="text-2xl font-bold mb-4">Support My Next Big Art Project</h2>
				<p>
					I&apos;m embarking on my most ambitious project yet - creating a series of interconnected
					fantasy worlds through digital art. Your support will help me dedicate the next six
					months to bringing these vivid landscapes and characters to life.
				</p>
				<p>
					With your help, I&apos;ll be able to:
				</p>
				<ul>
					<li>Create 10 large-scale digital paintings</li>
					<li>Develop a series of character designs</li>
					<li>Produce a digital art book compiling the entire project</li>
				</ul>
				<p>
					Every contribution, no matter the size, brings us one step closer to making this dream a reality.
					Join me on this creative journey and let&apos;s make something amazing together!
				</p>
			</div>

			{/* Donation Tiers */}
			<div className="space-y-6 mb-12">
				<h3 className="text-2xl font-bold text-center">Choose Your Support Tier</h3>
				{['Supporter', 'Enthusiast', 'Superfan'].map((tier, index) => (
					<Card key={tier}>
						<CardHeader>
							<CardTitle>{tier}</CardTitle>
							<CardDescription>${(index + 1) * 25} one-time donation</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc list-inside space-y-2">
								<li>Digital wallpaper pack</li>
								<li>Name in the credits of the art book</li>
								{index > 0 && <li>Signed print of your choice</li>}
								{index > 1 && <li>Personalized digital character sketch</li>}
							</ul>
						</CardContent>
						<CardFooter>
							<Button className="w-full">Donate ${(index + 1) * 25}</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{/* Custom Donation */}
			<div className="text-center mb-12">
				<h3 className="text-xl font-semibold mb-4">Custom Donation</h3>
				<Button variant="outline" className="w-full sm:w-auto">Choose Your Amount</Button>
			</div>

			{/* Gallery */}
			<div className="mt-12">
				<h2 className="text-2xl font-bold mb-6 text-center">My Recent Works</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="aspect-square relative overflow-hidden rounded-lg">
							<Image
								alt={`Artwork ${i + 1}`}
								className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
								height="300"
								src={`/placeholder.svg?height=300&width=300&text=Artwork${i + 1}`}
								style={{
									aspectRatio: "300/300",
									objectFit: "cover",
								}}
								width="300"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}