import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { NewUrlInput } from "./NewUrlInput";
import { UserLinksTable } from "./UserLinksTable";

export const LinkManagementPanel = () => {
  const [newLink, setNewLink] = useState('')
  const [error, setError] = useState('')
  
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

  useEffect(() => {
    const inputZodError = createNewLinkError?.data?.zodError
    if(inputZodError?.fieldErrors?.newLink?.[0] === "Invalid url"){
      setError('Please enter a valid URL')
      return
    }
    const errorMessage = createNewLinkError?.message
    if(errorMessage){
      setError(errorMessage)
      return
    }
  }, [createNewLinkError])

  const onSubmitNewLink = () => {
    const sanitizedNewLink = newLink.trim().toLowerCase()
    createNewLink({newLink: sanitizedNewLink})
    setError('')
  }

  return (
    <div className="flex flex-col h-full w-1/2 min-w-0 max-w-4xl max-h-[56rem]">
      <div className="flex justify-end items-center h-1/6">
        <button
          className="btn btn-outline"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
      
      <div className="h-5/6 flex flex-col justify-center gap-8">
        <NewUrlInput
          error={error}
          newLinkValue={newLink}
          setNewLink={setNewLink}
          onSubmitNewLink={onSubmitNewLink}
        />

        <UserLinksTable
          links={links}
        />
      </div>
    </div>
  )
}