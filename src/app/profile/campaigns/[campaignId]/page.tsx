'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Heart } from "lucide-react"
import Image from "next/image"
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput, ResponseEvent, MiniAppPaymentPayload } from '@worldcoin/minikit-js'
import { useEffect } from "react"
import Link from "next/link"

export default function PersonalCampaign({ params }: { params: { campaignId: string } }) {
	useEffect(() => {
		if (!MiniKit.isInstalled()) {
			console.error("MiniKit is not installed");
			return;
		}

		MiniKit.subscribe(
			ResponseEvent.MiniAppPayment,
			async (response: MiniAppPaymentPayload) => {
				if (response.status == "success") {
					const res = await fetch(`/api/confirm-payment`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(response),
					});
					const payment = await res.json();
					if (payment.success) {
						// Congrats your payment was successful!
					}
				}
			}
		);

		return () => {
			MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
		};
	}, []);

	const sendPayment = async () => {
		const res = await fetch('/api/initiate-payment', {
			method: 'POST'
		});
		const { id } = await res.json();

		const payload: PayCommandInput = {
			reference: id,
			to: "0xca82d27188ebf3f81fc253e958614564e8dd2cdd", // Test address
			tokens: [
				{
					symbol: Tokens.WLD,
					token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
				},
				{
					symbol: Tokens.USDCE,
					token_amount: tokenToDecimals(3, Tokens.USDCE).toString(),
				},
			],
			description: "Test example payment for minikit",
		};

		if (MiniKit.isInstalled()) {
			MiniKit.commands.pay(payload);
		}
	};
	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			{/* Jason's Info */}
			<div className="text-center mb-8">
				<Image
					alt="Jason"
					className="rounded-full mx-auto mb-4"
					height="120"
					src="/images/jason.jpg"
					style={{
						aspectRatio: "120/120",
						objectFit: "cover",
					}}
					width="120"
				/>
				<h1 className="text-3xl font-bold sm:text-4xl">Support Jason&apos;s Recovery</h1>
				<p className="text-muted-foreground mt-2 text-lg">
					Help Jason overcome his injuries and return to his active lifestyle
				</p>
				<div className="flex justify-center gap-4 mt-4">
					<div className="flex items-center gap-1">
						<Users className="h-5 w-5 text-muted-foreground" />
						<span className="text-muted-foreground">328 supporters</span>
					</div>
					<div className="flex items-center gap-1">
						<Heart className="h-5 w-5 text-muted-foreground" />
						<span className="text-muted-foreground">1.2k well-wishes</span>
					</div>
				</div>
			</div>
			<Button className="w-full mb-5" asChild>
				<Link href={`/profile/campaigns/${params.campaignId}/edit`}>
					Edit campaign
				</Link>
			</Button>
			{/* Campaign Progress */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Recovery Fund Progress</CardTitle>
					<CardDescription>$45,000 raised of $75,000 goal</CardDescription>
				</CardHeader>
				<CardContent>
					<Progress value={60} className="w-full" />
					<p className="text-center mt-4 text-muted-foreground">60% of goal reached</p>
				</CardContent>
			</Card>

			{/* Campaign Description */}
			<div className="prose max-w-none mb-8">
				<h2 className="text-2xl font-bold mb-4">Jason&apos;s Journey to Recovery</h2>
				<p>
					Three months ago, Jason was involved in a serious accident that left him with multiple injuries,
					including a spinal cord injury. He&apos;s facing a long road to recovery, including intensive physical
					therapy and potential surgeries.
				</p>
				<p>
					Your support will help cover:
				</p>
				<ul>
					<li>Medical expenses not covered by insurance</li>
					<li>Specialized equipment for home rehabilitation</li>
					<li>Ongoing physical therapy sessions</li>
					<li>Modifications to Jason&apos;s home for accessibility</li>
				</ul>
				<p>
					Every contribution, no matter the size, will make a significant difference in Jason&apos;s recovery journey.
					Let&apos;s come together as a community to help Jason regain his independence and return to the activities he loves.
				</p>
			</div>

			{/* Donation Tiers */}
			<div className="space-y-6 mb-12">
				<h3 className="text-2xl font-bold text-center">Choose Your Support Level</h3>
				{[
					{ name: "Friend", amount: 25, perks: ["Personal thank you note", "Recovery journey updates"] },
					{ name: "Supporter", amount: 100, perks: ["All Friend perks", "Name on support wall", "Exclusive recovery milestone videos"] },
					{ name: "Champion", amount: 500, perks: ["All Supporter perks", "Personal video call with Jason", "Invitation to recovery celebration event"] }
				].map((tier, index) => (
					<Card key={tier.name}>
						<CardHeader>
							<CardTitle>{tier.name}</CardTitle>
							<CardDescription>${tier.amount} donation</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc list-inside space-y-2">
								{tier.perks.map((perk, i) => (
									<li key={i}>{perk}</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button onClick={sendPayment} className="w-full">Donate ${tier.amount}</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{/* Custom Donation */}
			<div className="text-center mb-12">
				<h3 className="text-xl font-semibold mb-4">Custom Donation</h3>
				<Button variant="outline" className="w-full sm:w-auto">Choose Your Amount</Button>
			</div>

			{/* Recovery Updates */}
			<div className="mt-12">
				<h2 className="text-2xl font-bold mb-6 text-center">Jason&apos;s Recovery Journey</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{[
						"First day of PT",
						"Standing with support",
						"Using parallel bars",
						"First steps with walker",
						"Climbing stairs",
						"Return home day"
					].map((milestone, i) => (
						<div key={i} className="aspect-square relative overflow-hidden rounded-lg">
							<Image
								alt={milestone}
								className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
								height="300"
								src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(milestone)}`}
								style={{
									aspectRatio: "300/300",
									objectFit: "cover",
								}}
								width="300"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
								<p className="text-white text-sm font-medium">{milestone}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}