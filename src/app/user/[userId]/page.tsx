export default function User({ params }: { params: { userId: string } }) {
	return <div>User: {params.userId}</div>;
}