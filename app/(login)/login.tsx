"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { signIn } from "./actions";
import { ActionState } from "@/lib/middelware";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function Login({ mode = "signin" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const FormSchema = z.object({
    username: z
      .string()
      .min(9, {
        message: "Le code client doit contenir 9 ou 10 caractères",
      })
      .max(10, {
        message: "Le code client doit contenir 9 ou 10 caractères",
      })
      .regex(
        /^[A-Z0-9]+$/,
        "Le code client doit contenir uniquement des lettres majuscules et des chiffres"
      ),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
  });

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,

    {
      error: "",
    }
  );

  const formSign = useForm<z.infer<typeof FormSchema>>({
    //!Comment below line to disable client-side validation for testing server-side validation
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmitHandler() {
    startTransition(() => {
      formAction(new FormData(formRef.current!));
    });
  }

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (state?.status === "success") {
      setTimeout(() => {
        router.push(state.redirectTo || "/dashboard");
      }, 100); // small delay to show toast before redirect
    }
  }, [state]);

  interface OpenNewTabButtonProps {
    url: string;
    label: string;
  }

  const OpenNewTabButton: React.FC<OpenNewTabButtonProps> = ({
    url,
    label,
  }) => {
    return (
      <Link
        href={url}
        passHref
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:underline"
      >
        <Label
          htmlFor={label}
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </Link>
    );
  };
  return (
    <Card className=" flex flex-col  justify-center py-4 px-4 sm:px-6 lg:px-8 bg-gray-50  rounded-md shadow-xl">
      <div className="">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
          {mode === "signin"
            ? "Se connecter à votre compte"
            : "Créer un compte"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form {...formSign}>
          <form
            ref={formRef}
            onSubmit={formSign.handleSubmit(onSubmitHandler)}
            className="max-w-md  space-y-3"
          >
            <FormField
              control={formSign.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code client
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      //defaultValue={state.username}
                      required
                      maxLength={10}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Enter votre code client"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formSign.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de Passe </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      //defaultValue={state.password}
                      required
                      minLength={8}
                      maxLength={100}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Enter votre mot de passe "
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show pending state while submiting */}
            <Button
              type="submit"
              className="w-full flex justify-center items-center px-4 border border-transparent rounded-md
   shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              disabled={pending}
            >
              {pending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Connecter"
              )}
            </Button>
            <div className="mt-4 text-left text-sm text-gray-600 hover:underline hover:underline-offset-1">
              <Link href="/forget-password">Oublie mot de passe ? </Link>
            </div>

            {/* Show error messages from server */}
            <p
              className={`${
                !state?.success ? "text-red-500" : "text-green-500"
              }`}
              aria-live="polite"
            >
              {state?.message}
            </p>
            <div aria-live="polite" className="text-red-500">
              {state?.errors && (
                <ul>
                  {state.errors.map((error: string, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            {/*state?.error && (
              <div className="text-center text-red-500 text-sm">
                {state.error}
              </div>
            )*/}
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {mode === "signin"
                  ? "Nouveau sur notre plateforme ?"
                  : "Vous avez déjà un compte ?"}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}`}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
            >
              {mode === "signin"
                ? "Créer un compte"
                : "Se connecter à votre compte"}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
