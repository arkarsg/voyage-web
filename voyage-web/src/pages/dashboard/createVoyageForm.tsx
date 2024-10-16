import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApi } from "@/providers/ApiProvider";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { CreateVoyageSchema, CreateVoyageSchemaType } from "@/types/voyage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

const CreateVoyageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateVoyageSchemaType>({
    resolver: zodResolver(CreateVoyageSchema),
    defaultValues: {
      voyageName: "",
      voyageDestination: ""
    }
  })

  const { currentUser } = useAuth();
  const { createVoyage } = useApi();

  const doCreateVoyage = async (formData: CreateVoyageSchemaType) => {
    const {voyageName, voyageDestination} = formData;
    const id = currentUser?.id as string;
    console.log(id, voyageDestination, voyageName)
    await createVoyage({voyageName, voyageDestination, ownerId: id});
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your voyage</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(doCreateVoyage)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Voyage Name</Label>
            <Input
              id="name"
              type="text"
              {...register("voyageName")}
            />
            {errors?.voyageName?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.voyageName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              type="text"
              {...register("voyageDestination")}
            />
            {errors?.voyageDestination?.message && (
              <p className="text-red-700 m-2 text-sm">{errors.voyageDestination.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Create</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CreateVoyageForm;