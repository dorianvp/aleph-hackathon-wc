'use client';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <section className="grid min-h-screen place-items-center">
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      {
        user && (
          <div>
            <h2>{user.sid as string}</h2>
          </div>
        )
      }
    </section>
  );
}
