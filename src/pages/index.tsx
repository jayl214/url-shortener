import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { SignIn } from "~/components/signIn/SignIn";
import { UrlManagementPanel } from "~/components/urlManagementPanel/UrlManagementPanel";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Lumen5 URL Shortener</title>
        <meta name="description" content="url shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Lumen5 URL Shortener</h1>
        {sessionData ?
          <UrlManagementPanel /> :
          <SignIn />
        }
      </main>
    </>
  );
};

export default Home;