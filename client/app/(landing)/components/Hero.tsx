import { styles } from "@/app/style";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={cn(styles.section, styles.padding)}>
      <div className="text-center">
        <h1 className="font-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl uppercase leading-10 text-blue-500">
          Skyrocket your
        </h1>
        <h1 className="font-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl uppercase leading-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Software Engineering career🚀
        </h1>
        <p className="lg:my-10 my-5 lg:text-2xl opacity-80">
          Master modern web dev with a project-based approach & <br /> land your
          dream job with extensive feedback & support from our mentors.
        </p>
        <Image
          className="rounded-lg m-auto border-2 border-blue-200"
          src="/skill.jpg"
          alt="skill"
          width={600}
          height={350}
        />
      </div>
    </div>
  );
};

export default Hero;
