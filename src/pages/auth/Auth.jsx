import Login from "@/components/miscellaneous/auth/Login";
import Signup from "@/components/miscellaneous/auth/Signup";
import background from "../../assets/app-bg.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <div className="relative flex justify-center w-full min-h-screen text-black bg-slate-300 ">
      <img
        src={background}
        alt="background"
        className="absolute object-cover w-full h-full brightness-50 "
      />

      <Tabs defaultValue="login" className="w-[700px] mt-5  z-10  ">
        <TabsList className="grid w-full grid-cols-2 border h-fit border-black/20 ">
          <TabsTrigger
            className="p-2 text-base data-[state=active]:bg-black/20  "
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="p-2 text-base data-[state=active]:bg-black/20 "
            value="signup"
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
