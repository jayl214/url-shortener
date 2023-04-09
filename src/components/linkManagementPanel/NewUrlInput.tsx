import type { KeyboardEvent, SetStateAction } from "react";

interface INewUrlInput {
  newLinkValue: string;
  error: string;
  setNewLink: (value: SetStateAction<string>) => void;
  onSubmitNewLink: () => void;
}

export const NewUrlInput = ({
  newLinkValue,
  setNewLink,
  error,
  onSubmitNewLink,
}: INewUrlInput) => {
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
          value={newLinkValue}
          onChange={(e) => setNewLink(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <label className="label">
          <span className="label-text-alt h-5 text-red-400">{error}</span>
        </label>
      </div>
      <button
        className="btn-primary btn"
        onClick={() => void onSubmitNewLink()}
      >
        Submit
      </button>
    </div>
  );
};
