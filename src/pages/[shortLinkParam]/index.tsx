import { PrismaClient } from "@prisma/client";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import ErrorPage from "next/error";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, never>>> {
  const shortLinkParam = context.params?.shortLinkParam;

  if (typeof shortLinkParam !== "string") {
    return {
      props: {},
    };
  }

  const prisma = new PrismaClient();
  const link = await prisma.link.findFirst({
    where: {
      shortLinkParam,
    },
  });

  if (!link) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: link.originalLink,
      permanent: false,
    },
  };
}

const NotFoundPage: NextPage = () => {
  return <ErrorPage statusCode={404} />;
};

export default NotFoundPage;
