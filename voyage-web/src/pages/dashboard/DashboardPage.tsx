import { Button } from "@/components/ui/button";
import { useApi } from "@/providers/ApiProvider";
import { useAuth } from "@/providers/SupabaseAuthProvider";

const DashboardPage = () => {
  const { profile } = useAuth();
  const { ping } = useApi();
  return (
    <>
     <h1>Hello {profile?.userName}</h1>
     <Button onClick={ping}>Ping DB</Button>
    </>
  )
}

export default DashboardPage;