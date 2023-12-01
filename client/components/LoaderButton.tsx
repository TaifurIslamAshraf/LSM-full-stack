import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoadingButton({
  btnText = "Please wait",
  className,
  variant,
}: {
  btnText?: string;
  className?: string;
  variant?: "outline";
}) {
  return (
    <Button disabled className={cn(className)} variant={variant}>
      <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />
      {btnText}
    </Button>
  );
}
