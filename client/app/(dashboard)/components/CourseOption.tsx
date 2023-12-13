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
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

const CourseOption = ({ handleNextClick, handlePrevClick, form }: Props) => {
  const [benefitTitle, setBenefitTitle] = useState("");
  const [prerequisitesTitle, setPrerequisitesTitle] = useState("");
  const currentBenefits = form.getValues("benefits");
  const currentPrerequisitesValue = form.getValues("prerequisites");

  const handleChangeBenefits = (e: any) => {
    e.preventDefault();
    setBenefitTitle(e.target.value);
  };

  const handleChangePrerequisites = (e: any) => {
    e.preventDefault();
    setPrerequisitesTitle(e.target.value);
  };

  const handleAddBenefits = async () => {
    if (benefitTitle.trim() !== "") {
      const updatedBenefits = [...currentBenefits, { title: benefitTitle }];
      form.setValue("benefits", updatedBenefits);
      setBenefitTitle("");
    }
  };

  const handleAddPrerequisites = () => {
    if (prerequisitesTitle.trim() !== "") {
      const updatedPrerequisites = [
        ...currentPrerequisitesValue,
        { title: prerequisitesTitle },
      ];

      form.setValue("prerequisites", updatedPrerequisites);

      setPrerequisitesTitle("");
    }
  };

  const NextValidation = () => {
    if (
      currentBenefits.length === 0 ||
      currentPrerequisitesValue.length === 0
    ) {
      toast.error("You have at least one Benefits and Prerequisites");
    } else {
      handleNextClick();
    }
  };

  return (
    <div className="space-y-6">
      <div className="">
        <div className="flex items-end">
          <div className="grow">
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Course Benefits
                  </FormLabel>
                  <FormControl>
                    <Input
                      onChange={handleChangeBenefits}
                      placeholder="Enter Your Course Benefits"
                      value={benefitTitle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className="bg-blue-500 text-white cursor-pointer p-1"
            onClick={handleAddBenefits}
          >
            <Plus size={30} />
          </div>
        </div>

        <ol className="list-decimal ml-4 mt-3">
          {form.watch("benefits") &&
            form
              .watch("benefits")
              .map((benefit: { title: string }, i: number) => (
                <li className="font-semibold py-1" key={i}>
                  {benefit.title}
                </li>
              ))}
        </ol>
      </div>

      <div className="">
        <div className="flex items-end">
          <div className="grow">
            <FormField
              control={form.control}
              name="prerequisites"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Course Prerequisites
                  </FormLabel>
                  <FormControl>
                    <Input
                      onChange={handleChangePrerequisites}
                      placeholder="Enter Your Course prerequisites"
                      value={prerequisitesTitle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div
            className="bg-blue-500 text-white cursor-pointer p-1"
            onClick={handleAddPrerequisites}
          >
            <Plus size={30} />
          </div>
        </div>

        <ol className="list-decimal ml-4 mt-3">
          {form.watch("prerequisites") &&
            form
              .watch("prerequisites")
              .map((benefit: { title: string }, i: number) => (
                <li className="font-semibold py-1" key={i}>
                  {benefit.title}
                </li>
              ))}
        </ol>
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
