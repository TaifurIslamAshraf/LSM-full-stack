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
import { useState } from "react";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
  form: any;
}

const CourseInfo = ({ form, formStep, setFormStep }: Props) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleChangeThumbnail = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();
      render.onload = (e: any) => {
        if (render.readyState === 2) {
          form.setValue("thumbnail", render.result);
          setThumbnailPreview(render.result);
        }
      };
      render.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Course Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Description</FormLabel>
            <FormControl>
              <Textarea
                rows={10}
                placeholder="Write Your Course Description"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-between gap-5">
        <div className="grow">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Course Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Course Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grow">
          <FormField
            control={form.control}
            name="estimatedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Estimated Price(Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Estimated Course Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="grow">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Course Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js,React.js,MERN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grow">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Course Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Beginner, Expart or intermediate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="demoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Demo Url</FormLabel>
            <FormControl>
              <Input placeholder="Enter Your Course Demo Url" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary">Course Thumbnail</FormLabel>
            <FormControl>
              <Input
                onChange={handleChangeThumbnail}
                className="w-full min-h-[10vh]"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <img src={thumbnailPreview} />
      <Button
        onClick={() => setFormStep(formStep + 1)}
        disabled={form.formState.isDirty}
      >
        Next
      </Button>
    </div>
  );
};

export default CourseInfo;
