//router
import { Link, useNavigate } from "react-router-dom";

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
  password: z.string().max(32),
});

function LoginPage() {
  const navigate = useNavigate();
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
      navigate("/");
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to log in
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Log in
                  </Button>
                  {loginError && (
                    <p className="text-red-500 text-sm text-center font-bold">
                      {loginError}
                    </p>
                  )}
                </form>
              </Form>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="m-auto inline-block text-sm underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-4 bg-secondary">
        <h4 className="text-balance">Black Swan Linen</h4>
        <h4 className="text-balance italic">Created by Billy</h4>
      </div>
    </div>
  );
}

export default LoginPage;
