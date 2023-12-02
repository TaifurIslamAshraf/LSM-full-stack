"use client";

import { LoadingButton } from "@/components/LoaderButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import AuthProvider from "./AuthProvider";

const LoginFormSchema = z.object({
  email: z.string().min(1, "Email is Required").email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(6, "Password should be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  const onSubmitLogin = async (data: z.infer<typeof LoginFormSchema>) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfull");
      router.replace("/");
      form.reset({
        email: "",
        password: "",
      });
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [data, error, form, isSuccess, router]);

  return (
    <>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              If you have account login now. athorways sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitLogin)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Email" {...field} />
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
                      <FormLabel className="text-primary">Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLoading ? (
                  <LoadingButton className="w-full" />
                ) : (
                  <Button type="submit" className={cn("w-full")}>
                    Sign In
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="">
            <AuthProvider />
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
};

export default Login;
