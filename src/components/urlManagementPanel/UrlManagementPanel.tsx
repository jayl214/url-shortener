import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const ERROR_MESSAGES = {
  invalidUrl: 'Invalid url',
}

export const UrlManagementPanel = () => {
  const [newLink, setNewLink] = useState('')
  
  const {
    data: links,
  } = api.link.getUserLinks.useQuery()

  const utils = api.useContext()

  const {
    error: createNewLinkError,
    isLoading,
    mutate: createNewLink
  } = api.link.createNewLink.useMutation({onSuccess: () => {
    utils.link.getUserLinks.invalidate()
    setNewLink('')
  }})

  const onSubmitNewLink = () => createNewLink({newLink})

  return (
    <div>
      <button
        className="btn"
        onClick={() => void signOut()}
      >
        Sign out
      </button>
      
      <div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Shorten a new URL</span>
          </label>
          <input
            className="input input-bordered"
            type='text'
            placeholder='eg: example.com'
            value={newLink}
            onChange={(event) => setNewLink(event.target.value)}
          />
        </div>
        <button
          className="btn"
          onClick={() => void onSubmitNewLink()}
        >
          Submit
        </button>
      </div>

      <div>
        <div>
          Your URLs
        </div>
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <td>Original URL</td>
                <td>Short URL</td>
              </tr>
            </thead>
            <tbody>
              {links?.map((link) => <tr key={link.shortLinkParam}>
                <td>{link.originalLink}</td>
                <td>{link.shortLinkParam}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}