"use client";

import * as z from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CourseContent from "../components/CourseContent";
import CourseFormSteps from "../components/CourseFormSteps";
import CourseInfo from "../components/CourseInfo";
import CourseOption from "../components/CourseOption";
import CoursePreview from "../components/CoursePreview";

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
  benefits: z.array(
    z.object({
      title: z.string().min(1, "Benefit is required"),
    })
  ),
  prerequisites: z.array(
    z.object({
      title: z.string(),
    })
  ),
  courseData: z.array(
    z.object({
      videoTitle: z.string().min(1, "Course data title is required"),
      VideoDescription: z
        .string()
        .min(1, "Course data description is required"),
      videoUrl: z.string().url("Invalid URL for video"),
      videoSection: z.string().min(1, "Video section is required"),
      links: z.array(
        z.object({
          title: z.string().min(1, "Link title is required"),
          url: z.string().url("Invalid URL for link"),
        })
      ),
      suggestion: z.string().min(1, "Suggestion is required"),
    })
  ),
});

const CreateCourse = () => {
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
      benefits: [],
      prerequisites: [],
      courseData: [
        // {
        //   videoTitle: "",
        //   VideoDescription: "",
        //   videoUrl: "",
        //   videoSection: "Untitled Section",
        //   links: [
        //     {
        //       title: "",
        //       url: "",
        //     },
        //   ],
        //   suggestion: "",
        // },
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

  const handleNextClick = async () => {
    const valid = await CourseForm.trigger();

    // if (valid) {
    // }
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

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
                <CourseOption
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                  form={CourseForm}
                />
              )}
              {formStep === 2 && (
                <CourseContent
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
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
