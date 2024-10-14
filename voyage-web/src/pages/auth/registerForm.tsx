import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { RegisterSchema, RegisterSchemaType } from "@/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      userName: "",
      website: ""
    }
  })

  const { emailPasswordRegister } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(emailPasswordRegister)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              placeholder="E-mail"
              type="text"
              {...register("email")}
            />
            {errors?.email?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors?.password?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Name"
              {...register("fullName")}
            />
            {errors?.fullName?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register("userName")}
            />
            {errors?.userName?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.userName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Website</Label>
            <Input
              id="website"
              type="text"
              {...register("website")}
            />
            {errors?.website?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.website.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Register</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RegisterForm;