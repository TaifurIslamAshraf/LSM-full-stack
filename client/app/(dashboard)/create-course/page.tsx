"use client";

import { useState } from "react";
import CourseFormSteps from "../components/CourseFormSteps";
import CreateCourseForm from "../components/CreateCourseForm";

const Page = () => {
  const [formStep, setFormStep] = useState(0);

  return (
    <div className="pl-20 mt-[60px]">
      <CourseFormSteps formStep={formStep} setFormStep={setFormStep} />
      <CreateCourseForm formStep={formStep} setFormStep={setFormStep} />
    </div>
  );
};

export default Page;
