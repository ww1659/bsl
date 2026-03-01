import NewGroupForm from "@/components/customers/NewGroupForm"

function CreateNewGroupPage() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="py-2">Create New Group</h1>
      </div>
      <NewGroupForm />
    </>
  )
}

export default CreateNewGroupPage
