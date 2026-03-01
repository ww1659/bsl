//components
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
//zod form validation
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/loading'
//connect to Supabase client
import { supabase } from '@/services/supabase'

const forgottenPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(2).max(50),
})

function ForgottenPassword() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof forgottenPasswordSchema>>({
    resolver: zodResolver(forgottenPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function handleForgottenPassword(
    values: z.infer<typeof forgottenPasswordSchema>
  ) {
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: '/login/update-password',
    })
    if (error) {
      alert(error.message)
    } else {
      setLoading(false)
      alert('Password recovery email sent')
    }
  }

  // useEffect(() => {
  //  supabase.auth.onAuthStateChange(async (event, session) => {
  //    if (event == "PASSWORD_RECOVERY") {
  //      const newPassword = prompt("What would you like your new password to be?");
  //      const { data, error } = await supabase.auth
  //        .updateUser({ password: newPassword })

  //      if (data) alert("Password updated successfully!")
  //      if (error) alert("There was an error updating your password.")
  //    }
  //  })
  // }, [])

  return (
    <div className="flex justify-center items-center">
      <div className="w-full grid min-h-screen lg:grid-cols-2 lg:gap-24">
        <div className="hidden lg:grid lg:items-center lg:justify-end lg:py-12">
          <div className="mx-auto grid w-[120px] lg:w-[350px]">
            <img
              src="/src/public/static/images/bsl-logo.png"
              className="w-full"
            ></img>
          </div>
        </div>
        <div className="grid items-center justify-center lg:justify-start">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-left">
              <div className="justify-start">
                <h1 className="text-3xl font-bold">Forgotten Password?</h1>
                <p className="text-normal text-muted-foreground">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleForgottenPassword)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                              type="email"
                              placeholder="e.g. youremail@hotmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <Button className="w-full" type="submit">
                      {loading ? (
                        <Spinner className="text-secondary" size="sm" />
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                    <div className="flex flex-center justify-center">
                      <Link
                        to="/login"
                        className="text-sm font-light underline-offset-2 hover:underline"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgottenPassword
