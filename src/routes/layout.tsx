import { component$, Slot } from "@builder.io/qwik";
import { Link, routeLoader$, type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const loadUserFromCookie = routeLoader$(async (requestEvent) => {
  console.log(
    "This logs every time I navigate to a page. Which means that if I look-up the user based on the cookie, it will do that logic every time I navigate to a page"
  );
  return {
    userId: "12345",
    username: "danbucholtz",
    profilePhotoUrl: "https://myapp.com/photos/blah.jpg",
  };
});

export default component$(() => {
  const user$ = loadUserFromCookie();

  return (
    <>
      <div>
        <li>
          <ol>
            <Link href="/">Root</Link>
          </ol>
          <ol>
            <Link href="/two">Page Two</Link>
          </ol>
          <ol>
            <Link href="/three">Page Three</Link>
          </ol>
        </li>
      </div>
      <Slot />
      <p>
        Imagine that you are a logged in user and have a cookie! You are navigating to the app like you do many others
        like Twitter, Facebook, LinkedIn, etc. You're automatically presented with the logged in experience due to
        having the cookie. If you're signed in to reddit, whether you're visiting reddit.com, or reddit.com/r/tacos or
        reddit.com/u/some-profile, or reddit.com/p/some-post/id, you're presented with the logged in experience when you
        have the cookie.{" "}
        <b>
          With Qwik, I can implement that pattern with a loader. I can check the cookie in the loader, and return the
          session/user data.
        </b>{" "}
        However, in Qwik I'm not sure of a way to do it only once. As you'll see in the vite log, every time I navigate
        to a page, <b>the loader is firing an attempting to load the session data</b>.
      </p>
    </>
  );
});
