"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { logIn } from "~/app/login/actions"
import { signUpFormSchema as logInFormSchema } from "./type"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

export default function LogInForm() {
  const [error, setError] = useState<string | undefined>()
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (formData: z.infer<typeof logInFormSchema>) => {
    const res = await logIn(formData)
    if (res) {
      setError(res.code)
    } else {
      setError(undefined)
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormDescription>
                  Required
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription>
                  Min. 6 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log In</Button>
        </form>
      </Form>
      {error ?? <p>{error}</p>}
    </>
  )
}