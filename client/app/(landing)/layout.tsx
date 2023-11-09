import Header from "@/components/Header";
import { IChildren } from "@/types/global";

const LandingLayout = ({ children }: IChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LandingLayout;
