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

import { LoadingButton } from "@/components/LoaderButton";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface VerificationProps {
  isOpen: boolean;
  onClose?: () => void;
  message: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type IVerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification = ({
  isOpen,
  setIsOpen,
  onClose,
  message,
}: VerificationProps) => {
  const [isMounted, setIsModunted] = useState(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<IVerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [activation, { error, isLoading, isSuccess, data }] =
    useActivationMutation();
  const route = useRouter();
  const { token } = useSelector((state: any) => state.auth);
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

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activation successfully");
      setInvalidError(false);
      setIsOpen(false);
      window.location.reload();
    }
    if (error) {
      setInvalidError(true);
      const errorMsg = error as any;
      toast.error(errorMsg.data.message);
    }
  }, [error, isSuccess, route, setIsOpen]);

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
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
            <div className="text-green-700">{message}</div>
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
                  "sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] text-center bg-transparent",
                  invalidError ? "shake border-red-500" : ""
                )}
              />
            ))}
          </div>
          {isLoading ? (
            <LoadingButton variant="outline" className="w-full" />
          ) : (
            <Button
              className="w-full mt-5"
              variant={"outline"}
              onClick={verificationHandler}
            >
              Verify OTP
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Verification;
