import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { SignIn } from "~/components/signIn/SignIn";
import { LinkManagementPanel } from "~/components/linkManagementPanel/LinkManagementPanel";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Lumen5 URL Shortener</title>
        <meta name="description" content="url shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center justify-center">
        {sessionData ?
          <LinkManagementPanel /> :
          <SignIn />
        }
      </main>
    </>
  );
};

export default Home;