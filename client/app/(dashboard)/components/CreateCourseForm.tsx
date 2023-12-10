"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

const courseFormSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price must be a positive number"),
  estimatedPrice: z.string(),
  tags: z.string().min(1, "Tags are required"),
  level: z.string().min(1, "Level is required"),
  demoUrl: z.string().url("Invalid URL for demo"),
  thumbnail: z.string().min(1, "Thumbnail is Required"),
  // benefits: z.array(
  //   z.object({
  //     title: z.string().min(1, "Benefit is required"),
  //   })
  // ),
  // prerequisites: z.array(
  //   z.object({
  //     title: z.string().min(1, "Prerequisite is required"),
  //   })
  // ),
  // courseData: z.array(
  //   z.object({
  //     title: z.string().min(1, "Course data title is required"),
  //     description: z.string().min(1, "Course data description is required"),
  //     videoUrl: z.string().url("Invalid URL for video"),
  //     videoSection: z.string().min(1, "Video section is required"),
  //     links: z.array(
  //       z.object({
  //         title: z.string().min(1, "Link title is required"),
  //         url: z.string().url("Invalid URL for link"),
  //       })
  //     ),
  //     suggestion: z.string().min(1, "Suggestion is required"),
  //   })
  // ),
});

const CreateCourseForm = ({ formStep, setFormStep }: Props) => {
  const CourseForm = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoUrl: "",
      thumbnail: "",
      // benefits: [{ title: "" }],
      // prerequisites: [{ title: "" }],
      // courseData: [
      //   {
      //     title: "",
      //     description: "",
      //     videoUrl: "",
      //     videoSection: "",
      //     links: [
      //       {
      //         title: "",
      //         url: "",
      //       },
      //     ],
      //     suggestion: "",
      //   },
      // ],
    },
  });

  const handleCreateCourse = (data: z.infer<typeof courseFormSchema>) => {
    console.log(data);
  };

  return (
    <Card className="max-w-[900px] py-5 mx-auto">
      <CardContent>
        <Form {...CourseForm}>
          <form onSubmit={CourseForm.handleSubmit(handleCreateCourse)}>
            {formStep === 0 && (
              <CourseInfo
                form={CourseForm}
                formStep={formStep}
                setFormStep={setFormStep}
              />
            )}
            {formStep === 1 && <CourseContent />}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCourseForm;
