import Protected from "@/lib/Protected";

const Page = () => {
  return (
    <div>
      <Protected>
        <h1>Hello people</h1>
      </Protected>
    </div>
  );
};

export default Page;
