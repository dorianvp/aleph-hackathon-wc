enum Currencies {
	USDC = 'USDC',
	ETH = 'ETH',
}

type Campaign = {
	userId: string;
	name: string;
	description: string;
	currency: Currencies;
	goal: number;
	isPublic: boolean;
	images: string[];
	creatorVisibility: 'public' | 'private';
}

export async function createCampaign(name: string, userId: string) {

}