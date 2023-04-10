import { signOut } from "next-auth/react";
import { api } from "~/utils/api";
import { NewUrlInput } from "./NewUrlInput";
import { UserLinksTable } from "./UserLinksTable";

export const LinkManagementPanel = () => {
  const { data: links } = api.link.getUserLinks.useQuery();

  return (
    <div className="flex h-full max-h-[56rem] w-1/2 min-w-0 max-w-4xl flex-col">
      <div className="flex h-1/6 items-center justify-end">
        <button className="btn-outline btn" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>

      <div className="flex h-5/6 flex-col justify-center gap-8">
        <NewUrlInput />

        <UserLinksTable links={links} />
      </div>
    </div>
  );
};
