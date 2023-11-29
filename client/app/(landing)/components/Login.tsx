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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

  const isLoading = form.formState.isSubmitting;

  const onSubmitLogin = async (data: z.infer<typeof LoginFormSchema>) => {
    console.log(data);
    form.reset({
      email: "",
      password: "",
    });
  };

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
            <div className="w-full space-y-2">
              <div className="">
                <p className="text-center font-semibold my-4 border">OR</p>
                <Button className="w-full bg-secondary-foreground/80">
                  <Image
                    className="mr-2"
                    src="/google-logo.svg"
                    alt="google logo"
                    height={30}
                    width={40}
                  />
                  Sign In with Google
                </Button>
              </div>
              <div className="">
                <Button className="w-full bg-secondary-foreground/80">
                  <Image
                    className="mr-3"
                    src="/github.svg"
                    alt="github logo"
                    height={30}
                    width={30}
                  />
                  Sign In with Github
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
};

export default Login;
