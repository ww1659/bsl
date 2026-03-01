//router
import { zodResolver } from "@hookform/resolvers/zod"
//supabase client
import { createClient } from "@supabase/supabase-js"
import { Database } from "database.types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
//zod form validation
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
//components
import { Input } from "@/components/ui/input"

//connect to Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&_]/,
      "Password must contain at least one special character"
    ),
})

function LoginPage() {
  const [signUpError, setSignUpError] = useState("")
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function signUpNewUser(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "/",
      },
    })

    if (data.session !== null && data.user !== null) {
      navigate("/")
    } else if (error) {
      if (error.status === 422) {
        setSignUpError("User already exists. Please try logging in.")
      } else {
        setSignUpError(error.message)
      }
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Sign up with your email{" "}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(signUpNewUser)}
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
                            placeholder="youremail@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                            type="password"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Sign Up
                  </Button>
                  {signUpError && (
                    <p className="text-red-500 text-sm text-center">
                      {signUpError}
                    </p>
                  )}
                </form>
              </Form>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="m-auto inline-block text-sm underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-4 bg-secondary">
        <h4 className="text-balance">Black Swan Linen</h4>
        <h4 className="text-balance italic">Created by Billy</h4>

        {/* <img
          src="../../assets/bsl-logo.png"
          alt="black swan linen logo"
          width="auto"
          height="auto"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  )
}

export default LoginPage
