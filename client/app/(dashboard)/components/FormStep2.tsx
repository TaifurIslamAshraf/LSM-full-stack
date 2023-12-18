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
import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { FieldValues, useFieldArray } from "react-hook-form";

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
  const { fields, append } = useFieldArray({
    name: "courseData",
    control: form.control,
  });

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

  const handleLinkDelete = (index: number, linkIndex: number) => {};

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
    console.log(isStepValid);

    if (isStepValid) {
      handleNextClick();
    }
  };

  return (
    <div>
      {typedFields?.map((item, index: number) => {
        return (
          <>
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
                  {item.links.map((link: object, linkIndex: number) => (
                    <div key={linkIndex + 3}>
                      <div key={linkIndex} className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`courseData.${index}.links.${linkIndex}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-primary">
                                  Link {linkIndex + 1}
                                </FormLabel>
                                <Button
                                  onClick={() =>
                                    handleLinkDelete(index, linkIndex)
                                  }
                                  className={cn("cursor-pointer")}
                                  variant={"outline"}
                                  disabled={linkIndex === 0}
                                >
                                  <Trash size={20} />
                                </Button>
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="Enter Link Title"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`courseData.${index}.links.${linkIndex}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Enter Link Url"
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
                </div>
              </div>
            )}
          </>
        );
      })}

      <Button
        className="gap-2 mt-10 text-center w-full"
        onClick={addNewVideoSection}
      >
        <PlusCircle />
        <span>Add New Section</span>
      </Button>

      <Button onClick={NextValidation}>Next</Button>
    </div>
  );
};

export default FormStep2;
