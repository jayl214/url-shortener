import { type RouterOutputs } from "~/utils/api";

interface IUserLinksTable {
  links?: RouterOutputs["link"]["getUserLinks"];
}

const getFullUrl = (origin: string, shortLink: string) => {
  const fullUrl = new URL(shortLink, origin);
  return fullUrl.toString();
};

export const UserLinksTable = ({ links = [] }: IUserLinksTable) => {
  const origin = window.location.origin;

  return (
    <div className="flex h-3/4 flex-col gap-2">
      <div className="font-bold">Your URLs</div>
      <div className="h-3/4 overflow-scroll">
        <table className="table-normal table w-full">
          <thead className="sticky top-0">
            <tr>
              <td>Original URL</td>
              <td>Short URL</td>
            </tr>
          </thead>
          <tbody className="w-full">
            {links.map((link) => {
              const fullUrl = getFullUrl(origin, link.shortLinkParam);
              return (
                <tr key={link.shortLinkParam}>
                  <td className="max-w-md overflow-scroll">
                    {link.originalLink}
                  </td>
                  <td
                    onClick={() => void navigator.clipboard.writeText(fullUrl)}
                  >
                    <div className="tooltip" data-tip="click to copy">
                      <a className="link">/{link.shortLinkParam}</a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
