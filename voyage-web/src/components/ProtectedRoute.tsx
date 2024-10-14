import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/SupabaseAuthProvider";
import NavBar from "./NavBar";
import RootLayout from "./PageLayout";

const ProtectedRoute = (props: React.PropsWithChildren) => {
  const {supabaseClient, session, setSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session === null) {
      console.log("Session", session)
      navigate("/auth");
    }

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [session, supabaseClient.auth, setSession, navigate])

  return (
    <>
      <NavBar />
      <RootLayout>
        {props.children}
      </RootLayout>
    </>
  )
}

export default ProtectedRoute;