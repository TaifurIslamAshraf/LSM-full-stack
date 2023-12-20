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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDown, Pencil, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { FieldValues, useFieldArray } from "react-hook-form";
import NestedLinkArray from "./NestedLinkArray";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

interface ICourseContent {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  videoSection: string;
  links: {
    title: string;
    url: string;
  }[];
}

const FormStep2 = ({ handleNextClick, handlePrevClick, form }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: "courseData",
    control: form.control,
  });

  const courseData = form.watch("courseData");

  const [isCollapsed, setIsCollapsed] = useState(
    Array(fields.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const typedFields = fields as FieldValues[];

  const addNewVideoSection = async () => {
    const valid = await form.trigger("courseData");
    if (valid) {
      append({
        videoTitle: "",
        videoDescription: "",
        videoUrl: "",
        videoSection: "Untitled Section",
        links: [
          {
            title: "",
            url: "",
          },
        ],
      });
    }
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];

    setIsCollapsed(updatedCollapsed);
  };

  // all function here
  //   const handleDeleteContent = (index: number) => {
  //     if (activeSection > 1) {
  //       setActiveSection((prev) => prev - 1);
  //     }
  //     const updatedData = [...courseContent];
  //     updatedData.splice(index, 1);
  //     setCourseContent(updatedData);
  //   };

  //   const handleCollapseToggle = (index: number) => {
  //     const updatedCollapsed = [...isCollapsed];
  //     updatedCollapsed[index] = !updatedCollapsed[index];
  //     setIsCollapsed(updatedCollapsed);
  //   };

  //   const handleLinkDelete = (index: number, linkIndex: number) => {
  //     const updatedData = [...courseContent];
  //     updatedData[index].links.splice(linkIndex, 1);
  //   };

  //   const handleAddLinks = (index: number) => {
  //     const updatedData = [...courseContent];
  //     const currentLinkValue = updatedData[index].links;

  //     currentLinkValue.push({ title: "", url: "" });
  //     setCourseContent(updatedData);
  //   };

  //   const addNewContentHandler = (item: ICourseContent) => {

  //       let newVideoSection = "";

  //       if (courseContent.length > 0) {
  //         const lastVideoSection =
  //           courseContent[courseContent.length - 1].videoSection;

  //         //if last video section is available then use that else use user input
  //         if (lastVideoSection) {
  //           newVideoSection = lastVideoSection;

  //       }

  //       const newContent: ICourseContent = {
  //         videoTitle: "",
  //         videoDescription: "",
  //         videoSection: newVideoSection,
  //         videoUrl: "",
  //         links: [{ title: "", url: "" }],
  //       };

  //       setCourseContent([...courseContent, newContent]);
  //     }
  //   };

  //   const addNewVideoSection = () => {
  //     if (validation({})) {
  //       toast.error("All field are required");
  //     } else {
  //       setActiveSection((prev) => prev + 1);
  //       const newContentSection: ICourseContent = {
  //         videoTitle: "",
  //         videoDescription: "",
  //         videoSection: `Untitled Section ${activeSection}`,
  //         videoUrl: "",
  //         links: [{ title: "", url: "" }],
  //       };
  //       setCourseContent([...courseContent, newContentSection]);
  //     }
  //   };

  //when click next its tregar validation function
  const NextValidation = async () => {
    const isStepValid = await form.trigger("courseData");

    if (isStepValid) {
      handleNextClick();
    }
  };

  return (
    <div>
      {typedFields?.map((item, index: number) => {
        const isShowVideoSectionInp =
          index === 0 ||
          courseData[index].videoSection !== courseData[index - 1].videoSection;

        return (
          <>
            {isShowVideoSectionInp && (
              <div
                key={index * 10}
                className={cn(
                  isShowVideoSectionInp ? "mt-6" : "mt-0",
                  "bg-transparent flex items-center"
                )}
              >
                <FormField
                  name={`courseData.${index}.videoSection`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className={cn(
                            "outline-none text-xl bg-transparent",
                            courseData[index].videoSection ===
                              "Untitled Section"
                              ? "w-[170px]"
                              : "w-min"
                          )}
                          type="text"
                          {...field}
                          placeholder="Video Section Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Pencil />
              </div>
            )}
            <div className="flex items-center gap-4 justify-end">
              <Trash
                className={cn(index > 0 ? "cursor-pointer" : "hidden")}
                onClick={() => remove(index)}
              />

              <ChevronDown
                className={cn(
                  isCollapsed[index] ? "rotate-180" : "rotate-0",
                  "cursor-pointer"
                )}
                onClick={() => handleCollapseToggle(index)}
              />
            </div>

            <div className="">
              {isCollapsed[index] && (
                <>
                  {courseData[index].videoTitle ? (
                    <p>
                      {index + 1}. {courseData[index].videoTitle}
                    </p>
                  ) : (
                    <p>You Dont have video title</p>
                  )}
                </>
              )}
            </div>

            {!isCollapsed[index] && (
              <div key={item.id} className="space-y-6">
                <FormField
                  control={form.control}
                  name={`courseData.${index}.videoTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Video Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Video Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`courseData.${index}.videoDescription`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Video Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={10}
                          placeholder="Write Your Video Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`courseData.${index}.videoUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Video Url</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Video Url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="">
                  <NestedLinkArray nestedIndex={index} form={form} />
                </div>
              </div>
            )}
          </>
        );
      })}

      <Button
        className="gap-2 mt-10 text-center w-full"
        onClick={addNewVideoSection}
        variant={"outline"}
      >
        <PlusCircle />
        <span>Add New Section</span>
      </Button>

      <div className="flex items-center justify-end mt-10 gap-6">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={NextValidation}>Next</Button>
      </div>
    </div>
  );
};

export default FormStep2;
