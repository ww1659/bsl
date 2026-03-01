import { supabase } from "@/services/supabase"

import { Button } from "./ui/button"

async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error signing out:", error.message)
  }
}

function SignOutButton() {
  return (
    <Button className="w-full" onClick={handleSignOut}>
      Logout
    </Button>
  )
}

export default SignOutButton
