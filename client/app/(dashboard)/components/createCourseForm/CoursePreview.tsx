import { Button } from "@/components/ui/button";

interface Props {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  form: any;
}

const CoursePreview = ({ handlePrevClick, handleNextClick, form }: Props) => {
  return (
    <div>
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

export default CoursePreview;
