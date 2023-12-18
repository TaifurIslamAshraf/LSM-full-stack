"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

const CourseOption = ({ handleNextClick, handlePrevClick, form }: Props) => {
  const { fields: benefitsField, append: benefitsAppend } = useFieldArray({
    name: "benefits",
    control: form.control,
  });
  const { fields: prerequisitesField, append: prerequisitesAppend } =
    useFieldArray({
      name: "prerequisites",
      control: form.control,
    });

  const handleAddBenefits = async () => {
    const isValidbenefits = await form.trigger("benefits");
    console.log(isValidbenefits, "benefits");
    if (isValidbenefits) {
      benefitsAppend({ title: "" });
    }
  };

  const handleAddPrerequisites = async () => {
    const isValidPrerequisites = await form.trigger("prerequisites");
    console.log(isValidPrerequisites);
    if (isValidPrerequisites) {
      prerequisitesAppend({ title: "" });
    }
  };

  const NextValidation = () => {};

  return (
    <div className="space-y-6">
      <div className="">
        <FormLabel className="text-primary">Course Benefits</FormLabel>
        {benefitsField?.map((benefit, index) => (
          <div key={benefit.id} className="mb-4">
            <div className="grow">
              <FormField
                control={form.control}
                name={`benefits.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Course Benefits"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <Button variant={"outline"} onClick={handleAddBenefits}>
          <Plus size={30} />
        </Button>
      </div>

      <div className="">
        <FormLabel className="text-primary">Course Prerequisites</FormLabel>
        {prerequisitesField.map((prere, index) => (
          <div key={prere.id} className="mb-4">
            <div className="">
              <FormField
                control={form.control}
                name={`prerequisites.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Course prerequisites"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button variant={"outline"} onClick={handleAddPrerequisites}>
          <Plus size={30} />
        </Button>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button onClick={handlePrevClick} className="w-[80px]">
          Previous
        </Button>
        <Button onClick={NextValidation} className="w-[60px]">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseOption;
