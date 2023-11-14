import Header from "@/app/(landing)/components/Header";
import { IChildren } from "@/types/global";

const LandingLayout = ({ children }: IChildren) => {
  return (
    <div className="bg-background">
      <Header />
      {children}
    </div>
  );
};

export default LandingLayout;
