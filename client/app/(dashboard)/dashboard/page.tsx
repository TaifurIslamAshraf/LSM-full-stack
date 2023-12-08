"use client";

import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

const Page = () => {
  const { toggle, collapsed } = useSelector((state: any) => state.common);
  return (
    <div className={cn("mt-[60px] h-[200vh] transition-all ml-20")}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi repellat
      ab dolores. Blanditiis quaerat a unde quos totam repudiandae minus aperiam
      debitis, laborum exercitationem modi numquam laboriosam maxime possimus
      eius dolorum eaque ullam vitae autem? Quas nulla exercitationem excepturi
      eligendi voluptates optio consequuntur. Praesentium repellat
      exercitationem, tempora magni tempore aspernatur, dolores nulla reiciendis
      iure aut laudantium dignissimos id consequuntur neque tenetur natus
      provident, doloremque soluta officia ullam nobis perspiciatis. Commodi
      aspernatur, adipisci dicta soluta explicabo delectus blanditiis deserunt
      natus, dolorum pariatur atque harum, sed repellendus enim amet vero!
      Veritatis quae libero ex, esse molestiae quos vero. Blanditiis fugiat
      dignissimos ea!
    </div>
  );
};

export default Page;
