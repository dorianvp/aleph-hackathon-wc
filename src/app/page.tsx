import { getSession } from '@auth0/nextjs-auth0';


export default async function Home() {
  const session = await getSession();
  return (
    <section className="grid min-h-screen place-items-center">
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      {
        session && (
          <div>
            <h2>{JSON.stringify(session.user, null, 2)}</h2>
          </div>
        )
      }
    </section>
  );
}
