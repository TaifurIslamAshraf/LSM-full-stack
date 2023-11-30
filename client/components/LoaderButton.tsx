import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoadingButton({
  btnText = "Please wait",
  className,
}: {
  btnText?: string;
  className?: string;
}) {
  return (
    <Button disabled className={cn(className)}>
      <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />
      {btnText}
    </Button>
  );
}
