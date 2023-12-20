import Protected from "@/lib/Protected";

const Page = () => {
  return (
    <div>
      <Protected>
        <div className="">hello</div>
      </Protected>
    </div>
  );
};

export default Page;
