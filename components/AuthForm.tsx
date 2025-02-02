"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up"
        ? z.string().min(2, {
            message: "Username must be at least 2 characters long",
          })
        : z.string().optional(),
    email: z.string().trim().email({
      message: "Invalid email address",
    }),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <h1 className="form-title">
          {type === "sign-up" ? "SignUp" : "SignIn"}
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-10 py-6 border-2 border-gray-100 rounded-xl space-y-8 shadow-md"
        >
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl className="text-sm">
                    <Input placeholder="Enter a username... " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl className="text-sm">
                    <Input placeholder="Enter an email... " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
      <div className="text-center mb-5 mt-3">
        <span className="text-sm">
          {type === "sign-up"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            href={type === "sign-up" ? "/sign-in" : "/sign-up"}
            className="text-red-500 hover:underline"
          >
            {type === "sign-up" ? "  Sign In" : "  Sign Up"}
          </Link>
        </span>
      </div>
    </>
  );
};

export default AuthForm;
