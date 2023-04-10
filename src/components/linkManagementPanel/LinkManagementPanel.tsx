import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { NewUrlInput } from "./NewUrlInput";
import { UserLinksTable } from "./UserLinksTable";

export const LinkManagementPanel = () => {
  const [newLink, setNewLink] = useState("");
  const [error, setError] = useState("");

  const { data: links } = api.link.getUserLinks.useQuery();

  const utils = api.useContext();

  const {
    error: createNewLinkError,
    isLoading,
    mutate: createNewLink,
  } = api.link.createNewLink.useMutation({
    onSuccess: () => {
      void utils.link.getUserLinks.invalidate();
      setNewLink("");
    },
  });

  useEffect(() => {
    const inputZodError = createNewLinkError?.data?.zodError;
    if (inputZodError?.fieldErrors?.newLink?.[0] === "Invalid url") {
      setError("Please enter a valid URL");
      return;
    }
    const errorMessage = createNewLinkError?.message;
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
  }, [createNewLinkError]);

  const onSubmitNewLink = () => {
    const sanitizedNewLink = newLink.trim().toLowerCase();
    createNewLink({ newLink: sanitizedNewLink });
    setError("");
  };

  const onChangeNewLink = (newLinkValue: string) => {
    setError("");
    setNewLink(newLinkValue);
  };

  return (
    <div className="flex h-full max-h-[56rem] w-1/2 min-w-0 max-w-4xl flex-col">
      <div className="flex h-1/6 items-center justify-end">
        <button className="btn-outline btn" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>

      <div className="flex h-5/6 flex-col justify-center gap-8">
        <NewUrlInput
          error={error}
          isDisabled={isLoading}
          newLinkValue={newLink}
          onChangeNewLink={onChangeNewLink}
          onSubmitNewLink={onSubmitNewLink}
        />

        <UserLinksTable links={links} />
      </div>
    </div>
  );
};
