"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { KeyRound } from "lucide-react";

interface VerificationProps {
  isOpen: boolean;
  onClose?: () => void;
}

type IVerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification = ({ isOpen, onClose }: VerificationProps) => {
  const [isMounted, setIsModunted] = useState(false);
  const [invalidError, setInvalidError] = useState<boolean>(true);
  const [verifyNumber, setVerifyNumber] = useState<IVerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    setVerifyNumber({ ...verifyNumber, [index]: value });

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const verificationHandler = async () => {
    console.log(verifyNumber);
  };

  useEffect(() => {
    setIsModunted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Your Account</DialogTitle>
          <DialogDescription>
            We send a mail. Check you mail for verification code
            <div className="w-[40px] h-[40px] mx-auto mt-1 bg-primary-foreground rounded-full ">
              <KeyRound size={35} className="text-blue-500 m-auto" />
            </div>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="">
          <div className={cn("flex items-center justify-around")}>
            {Object.keys(verifyNumber).map((key, index) => (
              <Input
                type="number"
                key={index}
                ref={inputRefs[index]}
                maxLength={1}
                minLength={1}
                value={verifyNumber[key as keyof IVerifyNumber]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={cn(
                  "sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] bg-transparent",
                  invalidError ? "shake border-red-500" : ""
                )}
              />
            ))}
          </div>
          <Button
            className="w-full mt-5"
            variant={"outline"}
            onClick={verificationHandler}
          >
            Verify OTP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Verification;
