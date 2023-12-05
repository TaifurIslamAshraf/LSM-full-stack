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
import { useUpdateUserPasswordMutation } from "@/redux/features/users/usersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "Old Password required")
    .min(6, "Password should be at least 6 characters"),
  newPassword: z
    .string()
    .min(1, "New Password Required")
    .min(6, "Password should be at least 6 characters"),
});

const ChangePassword = () => {
  const [updateUserPassword, { isSuccess, error, isLoading }] =
    useUpdateUserPasswordMutation();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmitPassword = (data: z.infer<typeof changePasswordSchema>) => {
    updateUserPassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("password update successfull");
      form.reset();
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [error, form, isSuccess]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitPassword)}>
              <FormField
                name="oldPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Old Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your old password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter New Password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-7">
                {isLoading ? (
                  <LoadingButton className="w-auto" btnText="saving" />
                ) : (
                  <Button type="submit">Save Password</Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ChangePassword;
