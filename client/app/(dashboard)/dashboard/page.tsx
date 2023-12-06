import DashboardProtected from "@/lib/DashboardProtected";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Skill Sync",
  description: "Learn and Earn with skill sync",
  keywords: "MERN, Programing, web development",
};

const page = () => {
  return (
    <div className="">
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
      </DashboardProtected>
    </div>
  );
};

export default page;
