export default function Campaign({ params }: { params: { campaignId: string } }) {
	return <div>Campaign: {params.campaignId}</div>;
}