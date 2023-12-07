"use client";

import { Button } from "@/components/ui/button";
import DashboardProtected from "@/lib/DashboardProtected";
import { cn } from "@/lib/utils";
import { sidebar } from "@/redux/features/commonSlice";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { toggle, collapsed } = useSelector((state: any) => state.common);
  const dispatch = useDispatch();
  return (
    <div className={cn(collapsed ? "ml-20" : "ml-64", "transition-all")}>
      <DashboardProtected>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi repellat
        ab dolores. Blanditiis quaerat a unde quos totam repudiandae minus
        aperiam debitis, laborum exercitationem modi numquam laboriosam maxime
        possimus eius dolorum eaque ullam vitae autem? Quas nulla exercitationem
        excepturi eligendi voluptates optio consequuntur. Praesentium repellat
        exercitationem, tempora magni tempore aspernatur, dolores nulla
        reiciendis iure aut laudantium dignissimos id consequuntur neque tenetur
        natus provident, doloremque soluta officia ullam nobis perspiciatis.
        Commodi aspernatur, adipisci dicta soluta explicabo delectus blanditiis
        deserunt natus, dolorum pariatur atque harum, sed repellendus enim amet
        vero! Veritatis quae libero ex, esse molestiae quos vero. Blanditiis
        fugiat dignissimos ea!
        <Button onClick={() => dispatch(sidebar({ toggle: !toggle }))}>
          Toggled
        </Button>
      </DashboardProtected>
    </div>
  );
};

export default Page;
