'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { z } from "zod"
import { createClient } from "~/utils/supabase/server"
import { signUpFormSchema } from "./type"

export async function logIn(formData: z.infer<typeof signUpFormSchema>) {
  const supabase = createClient()
  const data = {
    email: formData.email as string,
    password: formData.confirmPassword as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/account")
}

export async function signUp(formData: z.infer<typeof signUpFormSchema>) {
  const supabase = createClient()
  const data = {
    email: formData.email as string,
    password: formData.confirmPassword as string,
  }

  const { error } = await supabase.auth.signUp(data)
  if (error) {
    redirect('/error')
  }
  
  revalidatePath('/', 'layout')
  redirect('/account')
}
