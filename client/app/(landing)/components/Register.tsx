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

const Register = () => {
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
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Taifur dev" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Example@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">password</Label>
              <Input id="password" type="password" placeholder="*****" />
            </div>
          </CardContent>
          <CardFooter className="">
            <div className="w-full space-y-2">
              <Button className="w-full">Sign Up</Button>
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
                  Sign Up with Google
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
                  Sign Up with Github
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
};

export default Register;
