"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CourseFormSteps from "../components/createCourseForm/CourseFormSteps";
import CourseInfo from "../components/createCourseForm/CourseInfo";
import CoursePreview from "../components/createCourseForm/CoursePreview";
import FormStep1 from "../components/createCourseForm/FormStep1";
import FormStep2 from "../components/createCourseForm/FormStep2";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

interface INext {
  validation?: () => boolean;
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
  benefits: z
    .array(
      z.object({
        title: z.string().min(1, "Benefit is required"),
      })
    )
    .nonempty("Benefits is required"),
  prerequisites: z
    .array(
      z.object({
        title: z.string().min(1, "Prerequisites is required"),
      })
    )
    .nonempty("Prerequisites is required"),
  courseData: z.array(
    z.object({
      videoTitle: z.string().min(1, "Video title is required"),
      videoDescription: z.string().min(1, "Video description is required"),
      videoUrl: z.string().url("Invalid URL for video"),
      videoSection: z.string().min(1, "Video section is required"),
      links: z.array(
        z.object({
          title: z.string().min(1, "Link title is required"),
          url: z.string().url("Invalid URL for link"),
        })
      ),
    })
  ),
});

const CreateCourse = () => {
  const CourseForm = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoUrl: "",
      thumbnail: "",
      benefits: [{ title: "" }],
      prerequisites: [{ title: "" }],
      courseData: [
        {
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
        },
      ],
    },
  });
  const [formStep, setFormStep] = useState(2);

  const handleCreateCourse = (data: z.infer<typeof courseFormSchema>) => {
    console.log(data);
  };

  const handlePrevClick = () => {
    if (formStep > 0 && formStep <= 3) {
      setFormStep(formStep - 1);
    }
  };

  const handleNextClick = () => {
    if (formStep > 0 && formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  console.log(CourseForm.watch());

  return (
    <div className="mt-[60px] pl-20">
      <CourseFormSteps formStep={formStep} setFormStep={setFormStep} />
      <Card className="max-w-[900px] py-5 mx-auto ">
        <CardContent>
          <Form {...CourseForm}>
            <form onSubmit={CourseForm.handleSubmit(handleCreateCourse)}>
              {formStep === 0 && (
                <CourseInfo
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                  form={CourseForm}
                />
              )}
              {formStep === 1 && (
                <FormStep1
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                  form={CourseForm}
                />
              )}
              {formStep === 2 && (
                <FormStep2
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                  form={CourseForm}
                />
              )}
              {formStep === 3 && (
                <CoursePreview
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                  form={CourseForm}
                />
              )}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
