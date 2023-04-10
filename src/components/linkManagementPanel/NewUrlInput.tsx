import type { KeyboardEvent } from "react";

interface INewUrlInput {
  newLinkValue: string;
  isDisabled: boolean;
  error: string;
  onChangeNewLink: (newLinkValue: string) => void;
  onSubmitNewLink: () => void;
}

export const NewUrlInput = ({
  newLinkValue,
  onChangeNewLink,
  isDisabled,
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
          onChange={(e) => onChangeNewLink(e.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        <label className="label">
          <span className="label-text-alt h-5 text-red-400">{error}</span>
        </label>
      </div>
      <button
        className={`btn-primary btn ${isDisabled ? "btn-disabled" : ""}`}
        onClick={() => void onSubmitNewLink()}
      >
        Submit
      </button>
    </div>
  );
};
