"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { sendEmailOtp, verifyOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sessionId = await verifyOTP({ accountId, otp });
      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to send verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    await sendEmailOtp({ email });
  };
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="flex-col items-center justify-center w-fit px-4 py-2">
          <AlertDialogHeader>
            <Image
              src={"/icons/close.svg"}
              alt="close"
              width={20}
              height={20}
              className="right-3 top-3 absolute cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <AlertDialogTitle className="text-center">
              Enter OTP to continue
            </AlertDialogTitle>
            <p className="text-sm text-center text-gray-500">
              Code sent to <b className="text-sm text-red-400">{email}</b>
            </p>
          </AlertDialogHeader>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-x-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button
            className="text-xs text-center underline text-gray-600"
            onClick={handleResendOTP}
          >
            Click to resend OTP
          </button>
          <AlertDialogAction
            className={isLoading ? "bg-gray-400 hover:bg-gray-400/50 disabled" : "bg-black"}
            onClick={(e) => handleSubmit(e)}
            type="button"
          >
            Submit
            {isLoading && (
              <Image
                src="/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 text-white animate-spin"
              />
            )}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OTPModal;
