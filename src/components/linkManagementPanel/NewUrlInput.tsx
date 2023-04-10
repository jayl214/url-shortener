import { type KeyboardEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { validations } from "~/validations";

const INVALID_URL_ERROR = "Please enter a valid URL";

export const NewUrlInput = () => {
  const [newLink, setNewLink] = useState("");
  const [error, setError] = useState("");

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
      setError(INVALID_URL_ERROR);
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

    const isValidUrl = validations.isValidUrl.safeParse({
      newLink: sanitizedNewLink,
    }).success;

    if (!isValidUrl) {
      setError(INVALID_URL_ERROR);
      return;
    }

    createNewLink({ newLink: sanitizedNewLink });
    setError("");
  };

  const onChangeNewLink = (newLinkValue: string) => {
    setError("");
    setNewLink(newLinkValue);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitNewLink();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">Shorten a new URL</span>
        </label>
        <input
          className={`input-bordered input ${error && "input-error"}`}
          type="text"
          placeholder="eg: example.com"
          value={newLink}
          onChange={(e) => onChangeNewLink(e.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        <label className="label">
          <span className="label-text-alt h-5 text-red-400">{error}</span>
        </label>
      </div>
      <button
        className={`btn-primary btn ${isLoading ? "btn-disabled" : ""}`}
        onClick={() => void onSubmitNewLink()}
      >
        Submit
      </button>
    </div>
  );
};
