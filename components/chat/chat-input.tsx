"use client";
import { ElementRef, useEffect, useRef } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import qs from "query-string";
import axios from "axios";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

type Props = {
  apiUrl: string;
  name: string;
  paramKey: string;
  paramValue: string;
};

const formSchema = z.object({
  message: z.string().min(1, {
    message: "",
  }),
});

export default function ChatInput({
  name,
  apiUrl,
  paramKey,
  paramValue,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<ElementRef<"input">>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    if (isLoading) return;
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query: {
          [paramKey]: paramValue,
        },
      });
      await axios.post(url, value);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoFocus
                    disabled={isLoading}
                    className="ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 bg-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-600"
                    type="text"
                    placeholder={`Message ${name}`}
                    {...field}
                    ref={inputRef}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
