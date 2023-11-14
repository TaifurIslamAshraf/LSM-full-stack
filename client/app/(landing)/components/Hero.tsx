import { styles } from "@/app/style";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={cn(styles.section, styles.padding)}>
      <div className="">
        <Image src="/skill.jpg" alt="skill" width={300} height={350} />
      </div>
    </div>
  );
};

export default Hero;
