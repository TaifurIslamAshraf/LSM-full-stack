import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

const CourseFormSteps = ({ formStep, setFormStep }: Props) => {
  const FormStepOption = [
    "Course Information",
    "Course Option",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="flex items-center justify-center mb-10">
      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full bg-blue-500 p-1 w-8 h-8 text-center text-white"
            )}
          >
            {formStep > 0 ? <Check /> : <h1>1</h1>}
          </div>
          <div className="w-[200px] h-1 bg-primary"></div>
        </div>
        <h1 className="absolute left-[-15%]">Information</h1>
      </div>

      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full p-1 w-8 h-8 text-center text-white",
              formStep < 1 ? "bg-gray-500" : "bg-blue-500"
            )}
          >
            {formStep > 1 ? <Check /> : <h1>2</h1>}
          </div>
          <div className="w-[200px] h-1 bg-primary"></div>
        </div>
        <h1 className="absolute left-[-8%]">Option</h1>
      </div>

      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full p-1 w-8 h-8 text-center text-white",
              formStep < 2 ? "bg-gray-500" : "bg-blue-500"
            )}
          >
            {formStep > 2 ? <Check /> : <h1>3</h1>}
          </div>
          <div className="w-[200px] h-1 bg-primary"></div>
        </div>
        <h1 className="absolute left-[-8%]">Content</h1>
      </div>

      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full p-1 w-8 h-8 text-center text-white",
              formStep < 3 ? "bg-gray-500" : "bg-blue-500"
            )}
          >
            {formStep >= 3 ? <Check /> : <h1>4</h1>}
          </div>
        </div>
        <h1 className="absolute left-[-50%]">Preview</h1>
      </div>
    </div>
  );
};

export default CourseFormSteps;
