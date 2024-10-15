import { Button } from "@/components/ui/button";
import { useApi } from "@/providers/ApiProvider";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import VoyagesList from "./voyagesList";

const DashboardPage = () => {
  const { profile } = useAuth();
  const { ping } = useApi();
  return (
    <>
     <h1>Hello {profile?.userName}</h1>
     <Button onClick={ping}>Ping DB</Button>
     <VoyagesList />
    </>
  )
}

export default DashboardPage;