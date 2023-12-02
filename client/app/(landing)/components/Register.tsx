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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import SocialAuth from "./SocialAuth";
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
  const [register, { isError, isSuccess, data, error, isLoading }] =
    useRegisterMutation();

  const form = useForm<z.infer<typeof RegistetionFormSchema>>({
    resolver: zodResolver(RegistetionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = "Enter Verification Code";
      toast.success(message);
      setIsOpen(true);
    } else if (error) {
      const errorData = error as any;
      const message = errorData?.data.message as any;
      toast.error(message);
    }
  }, [data?.message, error, isError, isSuccess]);

  const RegistationHandler = async (
    data: z.infer<typeof RegistetionFormSchema>
  ) => {
    register({
      name: data.fullName,
      email: data.email,
      password: data.password,
      isSocialAuth: false,
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

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
            <SocialAuth />
          </CardFooter>
        </Card>
      </TabsContent>
      <div className="">
        <Verification
          isOpen={isOpen}
          onClose={onClose}
          message={data?.message}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};

export default Register;
