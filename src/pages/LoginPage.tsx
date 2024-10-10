//router
import { Link } from "react-router-dom";

//redux
import { useAppDispatch } from "@/redux/hooks";

//components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//zod form validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setSession } from "@/redux/features/auth/authslice";

//connect to Supabase client
import { supabase } from "@/services/supabase";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).min(2).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32),
});

function LoginPage() {
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(values: z.infer<typeof loginSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setLoginError(error.message);
    } else if (data.session) {
      dispatch(setSession(data.session));
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSignIn)}
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
                            type="email"
                            placeholder="e.g. youremail@hotmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                  {loginError && <p className="text-red-500">{loginError}</p>}
                </form>
              </Form>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-secondary lg:block"></div>
    </div>
  );
}

export default LoginPage;
