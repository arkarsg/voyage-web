"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editAccountFormSchema } from "./types"

import { useState } from "react"
import ErrorAlert from "~/app/ui/alert"
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

export default function EditAccountForm({ initialFullName, initialUsername, initialWebsite, handleUpdate }: {
    initialFullName: string | null,
    initialUsername: string | null,
    initialWebsite: string | null
    handleUpdate: ({ fullname, username, website, }: { username: string | null; fullname: string | null; website: string | null; }) => Promise<boolean>
}) {
  const [error, setError] = useState<string | undefined>(undefined)
  const form = useForm<z.infer<typeof editAccountFormSchema>>({
    resolver: zodResolver(editAccountFormSchema),
    defaultValues: {
      fullname: initialFullName!,
      username: initialUsername!,
      website: initialWebsite!
    },
  })

  const onSubmit = async (formData: z.infer<typeof editAccountFormSchema>) => {
    const res = await handleUpdate(formData)
    if (res) {
      setError('Error updating the data!')
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
            name="fullname"
            render={({field}) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
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
            name="username"
            render={({field}) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormDescription>
                  Min. 6 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({field}) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
      {error ? <ErrorAlert>{error}</ErrorAlert> : null}
    </>
  )
}