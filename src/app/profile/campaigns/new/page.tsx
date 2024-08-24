'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
	const [campaign, setCampaign] = useState({
		name: '',
		description: '',
		donationTiers: [{ name: '', amount: '' }],
		isPublic: true,
		images: [],
		creatorVisibility: 'public',
		goal: '',
		currency: 'USDC',
	})
	const [goalError, setGoalError] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setCampaign(prev => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (name: string, value: string) => {
		setCampaign(prev => ({ ...prev, [name]: value }))
	}

	const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
			setCampaign(prev => ({ ...prev, goal: value }))
			setGoalError('')
		} else {
			setGoalError('Please enter a valid positive number')
		}
	}

	const handleSwitchChange = (name: string) => {
		setCampaign(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
	}

	const handleTierChange = (index: number, field: string, value: string) => {
		const newTiers = [...campaign.donationTiers]
		newTiers[index] = { ...newTiers[index], [field]: value }
		setCampaign(prev => ({ ...prev, donationTiers: newTiers }))
	}

	const addTier = () => {
		setCampaign(prev => ({
			...prev,
			donationTiers: [...prev.donationTiers, { name: '', amount: '' }]
		}))
	}

	const removeTier = (index: number) => {
		setCampaign(prev => ({
			...prev,
			donationTiers: prev.donationTiers.filter((_, i) => i !== index)
		}))
	}

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			// @ts-ignore
			setCampaign(prev => ({
				...prev,
				images: [...prev.images, ...Array.from(e.target.files as FileList)]
			}))
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (goalError) {
			return // Prevent submission if there's a goal error
		}
		const submissionData = {
			...campaign,
			goal: campaign.goal ? parseInt(campaign.goal) : null
		}
		console.log('Campaign data:', submissionData)
		// Here you would typically send the data to your backend
	}

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<h1 className="text-3xl font-bold mb-6">Create a Donation Campaign</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="name">Campaign Name</Label>
					<Input
						id="name"
						name="name"
						value={campaign.name}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Campaign Description</Label>
					<Textarea
						id="description"
						name="description"
						value={campaign.description}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="currency">Payment Currency</Label>
					<Select
						value={campaign.currency}
						onValueChange={(value) => handleSelectChange('currency', value)}
					>
						<SelectTrigger id="currency">
							<SelectValue placeholder="Select currency" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="USDC">USDC</SelectItem>
							<SelectItem value="WLD">WLD</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label>Donation Tiers</Label>
					{campaign.donationTiers.map((tier, index) => (
						<Card key={index} className="mb-2">
							<CardContent className="pt-4 flex items-end gap-2">
								<div className="flex-grow">
									<Input
										placeholder="Tier Name"
										value={tier.name}
										onChange={(e) => handleTierChange(index, 'name', e.target.value)}
										className="mb-2"
									/>
									<Input
										type="number"
										placeholder={`Amount (${campaign.currency})`}
										value={tier.amount}
										onChange={(e) => handleTierChange(index, 'amount', e.target.value)}
									/>
								</div>
								<Button type="button" variant="destructive" size="icon" onClick={() => removeTier(index)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					))}
					<Button type="button" onClick={addTier} variant="outline" className="w-full">
						<PlusCircle className="mr-2 h-4 w-4" /> Add Tier
					</Button>
				</div>

				<div className="flex items-center space-x-2">
					<Switch
						id="isPublic"
						checked={campaign.isPublic}
						onCheckedChange={() => handleSwitchChange('isPublic')}
					/>
					<Label htmlFor="isPublic">Make campaign public</Label>
				</div>

				<div className="space-y-2">
					<Label htmlFor="images">Campaign Images</Label>
					<Input
						id="images"
						type="file"
						accept="image/*"
						multiple
						onChange={handleImageUpload}
					/>
					{campaign.images.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-2">
							{campaign.images.map((image, index) => (
								<img
									key={index}
									src={URL.createObjectURL(image)}
									alt={`Campaign image ${index + 1}`}
									className="w-20 h-20 object-cover rounded"
								/>
							))}
						</div>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="creatorVisibility">Creator Visibility</Label>
					<Select
						value={campaign.creatorVisibility}
						onValueChange={(value) => handleSelectChange('creatorVisibility', value)}
					>
						<SelectTrigger id="creatorVisibility">
							<SelectValue placeholder="Select visibility" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="public">Public</SelectItem>
							<SelectItem value="anonymous">Anonymous</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="goal">Fundraising Goal (Optional)</Label>
					<Input
						id="goal"
						name="goal"
						type="number"
						value={campaign.goal}
						onChange={handleGoalChange}
						placeholder={`Recommended (${campaign.currency})`}
						min="1"
						step="1"
					/>
					{goalError && (
						<Alert variant="destructive">
							<AlertDescription>{goalError}</AlertDescription>
						</Alert>
					)}
				</div>

				<Button type="submit" className="w-full">Create Campaign</Button>
			</form>
		</div>
	)
}