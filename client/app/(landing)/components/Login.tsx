import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

const Login = () => {
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
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Example@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">password</Label>
              <Input id="password" type="password" placeholder="*****" />
            </div>
          </CardContent>
          <CardFooter className="">
            <div className="w-full space-y-2">
              <Button className="w-full">Sign In</Button>
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
