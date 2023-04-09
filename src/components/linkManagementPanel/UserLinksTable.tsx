import { RouterOutputs } from "~/utils/api"

interface IUserLinksTable{
  links?: RouterOutputs["link"]["getUserLinks"]
}

const getFullUrl = (origin:string, shortLink:string) => {
  const fullUrl = new URL(shortLink, origin)
  return fullUrl.toString()
}

export const UserLinksTable = ({
  links = []
}: IUserLinksTable) => {
  const origin = window.location.origin

  return (
    <div className="flex flex-col gap-2 h-3/4">
      <div className="font-bold">
        Your URLs
      </div>
      <div className="overflow-scroll h-3/4">
        <table className="table w-full table-normal">
          <thead className="sticky top-0">
            <tr>
              <td>Original URL</td>
              <td>Short URL</td>
            </tr>
          </thead>
          <tbody className="w-full">
            {links.map((link) => {
              const fullUrl = getFullUrl(origin, link.shortLinkParam)
              return (
                <tr key={link.shortLinkParam}>
                  <td className="max-w-md overflow-scroll">{link.originalLink}</td>
                  <td onClick={() => navigator.clipboard.writeText(fullUrl)}>
                    <div className="tooltip" data-tip="click to copy">
                      <a className="link">
                        {fullUrl}
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}