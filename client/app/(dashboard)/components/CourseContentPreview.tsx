import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, FileEdit, Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface IContentPreview {
  form: any;
}

const CourseContentPreview = ({ form }: IContentPreview) => {
  const [isOpen, setIsOpen] = useState(false);

  const courseContent = form.watch("courseData");
  console.log(courseContent);

  return (
    <>
      <h1
        className={cn(
          "text-2xl font-bold text-center p-4",
          courseContent.length > 0 ? "block" : "hidden"
        )}
      >
        All Content Preview
      </h1>

      {courseContent &&
        courseContent.map((content: any, i: number) => (
          <Collapsible key={i} open={isOpen} onOpenChange={setIsOpen}>
            <div className="mb-6">
              <Card>
                <div className="flex justify-end gap-4">
                  <div className="">
                    <Button variant={"outline"}>
                      <FileEdit />
                    </Button>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline">
                      <ChevronsUpDown />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CardHeader className="">
                  <CardTitle>{content.videoSection}</CardTitle>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <h1>
                      <span className="font-bold">Video Title:</span>{" "}
                      {content.videoTitle}
                    </h1>
                    <p>
                      {" "}
                      <span className="font-bold">Video Description:</span>{" "}
                      {content.videoDescription}
                    </p>
                    <div className="">
                      <Link
                        className="text-blue-500 hover:underline font-semibold"
                        href={content.videoUrl}
                      >
                        Video URL: {content.videoUrl}
                      </Link>
                    </div>

                    <div className="font-bold py-4 text-xl">
                      <h1 className="flex items-center gap-2 my-2">
                        <Link2 /> Additional Link
                      </h1>
                      {content?.links.length > 0 &&
                        content?.links.map((item: any, i: number) => (
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
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </div>
          </Collapsible>
        ))}
    </>
  );
};

export default CourseContentPreview;
