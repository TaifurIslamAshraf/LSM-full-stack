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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Verification from "./Verification";

const RegistetionFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(22, "Your name should be maximam 22 characters"),
  email: z.string().min(1, "Email is Required").email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password should be at least 6 characters"),
});

const Register = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof RegistetionFormSchema>>({
    resolver: zodResolver(RegistetionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const RegistationHandler = async (
    data: z.infer<typeof RegistetionFormSchema>
  ) => {
    console.log(data);
    form.reset({
      fullName: "",
      email: "",
      password: "",
    });

    const res = "ok";
    res === "ok" && setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              If you dont have an account. register here
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(RegistationHandler)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Taifur Dev" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Example@gmail.com" {...field} />
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

                <div className="">
                  {isLoading ? (
                    <LoadingButton className="w-full" />
                  ) : (
                    <Button className="w-full" type="submit">
                      Sign Up
                    </Button>
                  )}
                </div>
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
      <div className="">
        <Verification isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default Register;
