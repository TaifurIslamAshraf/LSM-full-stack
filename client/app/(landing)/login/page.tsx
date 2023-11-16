import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import Login from "../components/Login";
import Register from "../components/Register";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-32">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <Login />
        <Register />
      </Tabs>
    </div>
  );
};

export default page;
