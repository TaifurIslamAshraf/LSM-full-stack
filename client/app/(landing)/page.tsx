import Hero from "@/app/(landing)/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Sync",
  description: "Learn and Earn",
  keywords: "MERN, Programing, web development",
};

const page = () => {
  return (
    <>
      <div className="hero md:pt-20">
        <Hero />
      </div>
      <div className="">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          asperiores rerum sunt eius suscipit? Ducimus facere fugiat, voluptas
          aliquam laborum ex omnis, totam rerum aliquid laboriosam porro?
          Aliquam eveniet vitae asperiores expedita, voluptatum quisquam aperiam
          sequi blanditiis incidunt laudantium officiis optio dignissimos
          laboriosam alias animi sunt magni facere enim architecto perspiciatis,
          molestias assumenda est. Ipsam labore voluptatibus quia corporis
          nostrum mollitia delectus beatae nemo adipisci tenetur, illo quisquam
          fuga similique deserunt distinctio impedit vel repudiandae pariatur!
          Odit incidunt, dolorum laudantium laboriosam fugiat iusto maxime
          laborum perspiciatis ut ducimus soluta facilis ex explicabo nesciunt!
          Itaque sequi quos cupiditate? Adipisci sint suscipit minus deserunt
          expedita dolore ducimus magni possimus placeat! Ut quod delectus rerum
          quo sed excepturi, accusamus asperiores aperiam facere consequuntur
          modi nulla sint aliquid blanditiis sit nostrum, at quia neque
          quibusdam quas mollitia recusandae minus quam provident? Nam maxime et
          at, quaerat accusamus reprehenderit odio repellat molestias. Omnis
          culpa nesciunt vitae rem ducimus similique quis mollitia nostrum
          tempore saepe labore quam enim fugiat sit perferendis ratione non
          officia quos, ab maxime ea aliquam nam ipsum sed! Magnam dolorum et,
          qui ad ipsa, aperiam reiciendis est harum, iure consectetur
          perspiciatis quaerat saepe beatae accusantium animi quam odit aliquid
          ut fugiat voluptatibus dignissimos fugit mollitia? Saepe delectus,
          aliquid rerum ipsa obcaecati quaerat nostrum eos corrupti tempore
          aliquam consequuntur commodi quos voluptas iusto velit ex eaque sit
          iure quas sed recusandae. Facilis odio ratione molestiae repellendus
          dolorum doloremque eligendi dolor porro consequuntur quas, quo
          exercitationem alias, vitae qui ipsam aut consectetur laudantium?
          Animi officia doloremque cupiditate libero nobis, dolorem distinctio
          doloribus omnis? Accusamus, nam. Quia alias quasi modi porro facere et
          officia assumenda dolorum quibusdam corrupti facilis nemo tempore quam
          totam temporibus eum non excepturi, provident tenetur, nisi
          consectetur. Magnam deleniti ipsam eos temporibus fugiat eaque, rerum
          asperiores blanditiis nesciunt non soluta repellat!
        </p>
      </div>
    </>
  );
};

export default page;
