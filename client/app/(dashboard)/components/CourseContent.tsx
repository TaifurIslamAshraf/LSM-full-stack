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
import { Pencil, PlusCircle, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CourseContentPreview from "./CourseContentPreview";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

interface TCourse {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  videoSection: string;
  links: { title: string; url: string }[];
}

const CourseContent = ({ handlePrevClick, handleNextClick, form }: Props) => {
  const [courseData, setCourseData] = useState<TCourse>({
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
    videoSection: "Untitled Section",
    links: [],
  });
  const [linksObj, setLinksObj] = useState({
    title: "",
    url: "",
  });

  const [videoSectionEdit, setVideoSectionEdit] = useState(true);
  const currentCourseData = form.getValues("courseData");

  const handleChangeCourseData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeLinks = (e: any) => {
    const { name, value } = e.target;
    setLinksObj({ ...linksObj, [name]: value });
  };

  const handleAddLinks = () => {
    if (linksObj.title.trim() !== "" || linksObj.url.trim() !== "") {
      const updatedData = [...courseData.links, linksObj];
      setCourseData({ ...courseData, links: updatedData });
      setLinksObj({
        title: "",
        url: "",
      });
    }
  };

  const handleCourseData = () => {
    const updatedCourseData = [...currentCourseData, courseData];
    form.setValue("courseData", updatedCourseData);
    setCourseData({
      videoTitle: "",
      videoDescription: "",
      videoSection: "Untitled Section",
      videoUrl: "",
      links: [],
    });
  };

  // const currentValue = form.getValues("courseData");
  // console.log(currentValue);
  console.log(currentCourseData);

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="videoSection"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className={cn(
                      "border-none outline-none bg-transparent font-semibold",
                      videoSectionEdit && "text-primary/70"
                    )}
                    name="videoSection"
                    onChange={handleChangeCourseData}
                    placeholder="Video Section"
                    value={courseData.videoSection}
                    disabled={videoSectionEdit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="cursor-pointer"
            onClick={() => setVideoSectionEdit(false)}
          >
            <Pencil />
          </div>
        </div>

        <FormField
          control={form.control}
          name="videoTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Video Title</FormLabel>
              <FormControl>
                <Input
                  name="videoTitle"
                  onChange={handleChangeCourseData}
                  placeholder="Enter Video Title"
                  value={courseData.videoTitle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Video Description</FormLabel>
              <FormControl>
                <Textarea
                  name="videoDescription"
                  onChange={handleChangeCourseData}
                  rows={10}
                  placeholder="Write Your Video Description"
                  value={courseData.videoDescription}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Video Url</FormLabel>
              <FormControl>
                <Input
                  name="videoUrl"
                  onChange={handleChangeCourseData}
                  placeholder="Enter Video Url"
                  value={courseData.videoUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Link Title</FormLabel>
                <FormControl>
                  <Input
                    name="title"
                    onChange={handleChangeLinks}
                    placeholder="Enter Additional Link Title"
                    value={linksObj.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Additional Link</FormLabel>
                <FormControl>
                  <Input
                    name="url"
                    onChange={handleChangeLinks}
                    placeholder="Enter Additional Link"
                    value={linksObj.url}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            {courseData.links.length > 0 &&
              courseData.links.map((item, i) => (
                <ul key={i} className="list-disc list-inside">
                  <li className="font-semibold mb-2">
                    {item.title}

                    <p className="ml-2 hover:underline text-blue-500">
                      <Link href={item.url} target="_blank">
                        {item.url}
                      </Link>
                    </p>
                  </li>
                </ul>
              ))}
          </div>

          <div className="flex items-center gap-1">
            <PlusCircle onClick={handleAddLinks} className="cursor-pointer" />
            <p className="text-sm">Add new Link</p>
          </div>

          <div className="pt-4">
            <Button variant={"outline"} onClick={handleCourseData}>
              <Video className="mr-2" />
              Add new content
            </Button>
          </div>
        </div>
      </div>

      <CourseContentPreview form={form} />

      <div className="flex items-center justify-end gap-4">
        <Button onClick={handlePrevClick} className="w-[80px]">
          Previous
        </Button>
        <Button onClick={handleNextClick} className="w-[60px]">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseContent;
