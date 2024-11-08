import Login from "@/components/miscellaneous/auth/Login";
import Signup from "@/components/miscellaneous/auth/Signup";
import SignUpImage from "@/assets/11.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <div className="relative flex w-full min-h-screen space-x-4 text-black bg-black md:justify-around ">
      <div className="items-center justify-center hidden lg:flex " >
        <img src={SignUpImage} className="h-[600px] object-contain "   alt="background" />
      </div>
      
      <Tabs defaultValue="login" className="w-[700px]  mt-20   z-10  ">
        <TabsList className="grid w-full grid-cols-2 text-white bg-transparent h-fit border-black/20 ">
          <TabsTrigger
            className="p-2 text-base border border-yellow-500  data-[state=active]:bg-yellow-500 data-[state=active]:text-white "
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="p-2 text-base border border-yellow-500 data-[state=active]:bg-yellow-500 data-[state=active]:text-white "
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
