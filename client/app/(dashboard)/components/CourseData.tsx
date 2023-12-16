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
import { ChevronDown, ListPlus, Pencil, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

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

const CourseData = ({ handleNextClick, handlePrevClick, form }: Props) => {
  const [courseContent, setCourseContent] = useState<ICourseContent[]>([
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
  ]);

  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContent.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  // all function here
  const handleDeleteContent = (index: number) => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
    }
    const updatedData = [...courseContent];
    updatedData.splice(index, 1);
    setCourseContent(updatedData);
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleLinkDelete = (index: number, linkIndex: number) => {
    const updatedData = [...courseContent];
    updatedData[index].links.splice(linkIndex, 1);
  };

  const handleAddLinks = (index: number) => {
    const updatedData = [...courseContent];
    const currentLinkValue = updatedData[index].links;

    currentLinkValue.push({ title: "", url: "" });
    setCourseContent(updatedData);
  };

  const addNewContentHandler = (item: ICourseContent) => {
    if (validation({ item })) {
      toast.error("All field are required");
    } else {
      let newVideoSection = "";

      if (courseContent.length > 0) {
        const lastVideoSection =
          courseContent[courseContent.length - 1].videoSection;

        //if last video section is available then use that else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent: ICourseContent = {
        videoTitle: "",
        videoDescription: "",
        videoSection: newVideoSection,
        videoUrl: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContent([...courseContent, newContent]);
    }
  };

  const addNewVideoSection = () => {
    if (validation({})) {
      toast.error("All field are required");
    } else {
      setActiveSection((prev) => prev + 1);
      const newContentSection: ICourseContent = {
        videoTitle: "",
        videoDescription: "",
        videoSection: `Untitled Section ${activeSection}`,
        videoUrl: "",
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContentSection]);
    }
  };

  const validation = ({ item }: { item?: ICourseContent }): boolean => {
    if (item) {
      const { videoTitle, videoDescription, videoUrl, links } = item;
      return (
        videoTitle.trim() === "" ||
        videoDescription.trim() === "" ||
        videoUrl.trim() === "" ||
        links[0].title.trim() === "" ||
        links[0].url.trim() === ""
      );
    } else {
      const lastContent = courseContent[courseContent.length - 1];
      return (
        lastContent.videoTitle.trim() === "" ||
        lastContent.videoDescription.trim() === "" ||
        lastContent.links[0].title.trim() === "" ||
        lastContent.links[0].url.trim() === ""
      );
    }
  };

  return (
    <div>
      {courseContent?.map((item: ICourseContent, index: number) => {
        const showSectionInput =
          index === 0 ||
          item.videoSection !== courseContent[index - 1].videoSection;

        return (
          <>
            <div
              className={cn(
                "w-full p-4 flex justify-between",
                showSectionInput ? "mt-10" : "mt-0"
              )}
            >
              {showSectionInput && (
                <div className="flex items-center">
                  <input
                    className={cn(
                      "text-lg border-none outline-none bg-transparent",
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    )}
                    value={courseContent[index].videoSection}
                    onChange={(e: any) => {
                      const updatedCourseContent = [...courseContent];
                      updatedCourseContent[index].videoSection = e.target.value;
                      setCourseContent(updatedCourseContent);
                    }}
                  />
                  <Pencil />
                </div>
              )}
            </div>
            {/* all button actions */}

            <div className="flex items-center gap-4 justify-end">
              <Trash
                className={cn(index > 0 ? "cursor-pointer" : "hidden")}
                onClick={() => handleDeleteContent(index)}
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
              {isCollapsed[index] ? (
                <>
                  {item.videoTitle && (
                    <p>
                      {index + 1}. {item.videoTitle}
                    </p>
                  )}
                </>
              ) : (
                <div></div>
              )}
            </div>

            {!isCollapsed[index] && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="videoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Video Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          name="videoTitle"
                          onChange={(e) => {
                            const updatedData = [...courseContent];
                            updatedData[index].videoTitle = e.target.value;
                            setCourseContent(updatedData);
                          }}
                          placeholder="Enter Video Title"
                          value={item.videoTitle}
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
                      <FormLabel className="text-primary">
                        Video Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          name="videoDescription"
                          onChange={(e) => {
                            const updatedData = [...courseContent];
                            updatedData[index].videoDescription =
                              e.target.value;
                            setCourseContent(updatedData);
                          }}
                          rows={10}
                          placeholder="Write Your Video Description"
                          value={item.videoDescription}
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
                          onChange={(e) => {
                            const updatedData = [...courseContent];
                            updatedData[index].videoUrl = e.target.value;
                            setCourseContent(updatedData);
                          }}
                          placeholder="Enter Video Url"
                          value={item.videoUrl}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  {item.links.map((link, linkIndex) => {
                    return (
                      <div key={linkIndex} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
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
                                  name="title"
                                  onChange={(e) => {
                                    const updatedData = [...courseContent];
                                    updatedData[index].links[linkIndex].title =
                                      e.target.value;
                                    setCourseContent(updatedData);
                                  }}
                                  placeholder="Enter Link Title"
                                  value={link.title}
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
                              <FormControl>
                                <Input
                                  name="url"
                                  onChange={(e) => {
                                    const updatedData = [...courseContent];
                                    updatedData[index].links[linkIndex].url =
                                      e.target.value;
                                    setCourseContent(updatedData);
                                  }}
                                  placeholder="Enter Link Url"
                                  value={link.url}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    );
                  })}
                  <Button
                    className="flex items-center gap-1"
                    onClick={() => handleAddLinks(index)}
                    variant={"link"}
                  >
                    <ListPlus className="cursor-pointer" />
                    <p className="font-semibold">Add new Link</p>
                  </Button>
                </div>
              </div>
            )}

            {index === courseContent.length - 1 && (
              <Button
                className="gap-2 mt-6"
                variant={"outline"}
                onClick={() => addNewContentHandler(item)}
              >
                <PlusCircle />
                <span>Add New Content</span>
              </Button>
            )}
          </>
        );
      })}

      {/* add new video section */}
      <Button
        className="gap-2 mt-10 text-center w-full"
        onClick={addNewVideoSection}
      >
        <PlusCircle />
        <span>Add New Section</span>
      </Button>
    </div>
  );
};

export default CourseData;
