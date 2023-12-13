import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import Link from "next/link";

interface IContentPreview {
  form: any;
}

const CourseContentPreview = ({ form }: IContentPreview) => {
  const courseContent = form.watch("courseData");
  console.log(courseContent);

  return (
    <>
      <h1 className="text-2xl font-bold text-center p-4">
        All Content Preview
      </h1>

      {courseContent &&
        courseContent.map((content: any, i: number) => (
          <div key={i} className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>{content.videoSection}</CardTitle>
              </CardHeader>
              <CardContent className="mb-4">
                <h1>
                  <span className="font-bold">Video Title:</span>{" "}
                  {content.videoTitle}
                </h1>
                <p>
                  {" "}
                  <span className="font-bold">Video Description:</span>{" "}
                  {content.videoDescription}
                </p>
                <Link
                  className="text-blue-500 hover:underline font-semibold"
                  href={content.videoUrl}
                >
                  Video URL: {content.videoUrl}
                </Link>

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
            </Card>
          </div>
        ))}
    </>
  );
};

export default CourseContentPreview;
