import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    jokeListItems: await db.joke.findMany(),
  };
  return data;
};

export default function JokesRoute() {
  const data = useLoaderData();

  return (
    <div>
      <h1>J🤪KES</h1>
      <main>
        <Outlet />
        {data.jokeListItems.map((joke) => (
          <li key={joke.id}>
            <Link to={joke.id}>{joke.name}</Link>
          </li>
        ))}
      </main>
    </div>
  );
}