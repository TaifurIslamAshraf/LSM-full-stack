import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string | undefined;
}

const SectionWrapper = ({ children }: SectionWrapperProps) => {
  return (
    <div className="max-w-[1400px] mx-auto lg:px-14 md:px-10 sm:px-2 px-4 overflow-x-hidden">
      {children}
    </div>
  );
};

export default SectionWrapper;
