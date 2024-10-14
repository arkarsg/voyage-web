import router from '@/routes';
import { RegisterSchemaType } from '@/types/register';
import { Session, SignInWithPasswordCredentials, SupabaseClient, User } from '@supabase/supabase-js';
import { createContext, useContext, useState } from 'react';
import { toast } from "react-toastify";
import { supabase } from '../supabase/supabaseClient';

type ProfileSchemaType = Omit<RegisterSchemaType, "password" | "email">

interface ISupabaseAuthContext {
  supabaseClient: SupabaseClient
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
  currentUser: User | null;
  profile: ProfileSchemaType | null;
  emailPasswordLogIn: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  emailPasswordRegister: (credentials: RegisterSchemaType) => Promise<void>;
}

const SupabaseAuthContext = createContext<ISupabaseAuthContext | null>(null);

const SupabaseAuthProvider = (props: React.PropsWithChildren) => {
  const supabaseClient = supabase;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileSchemaType | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const getProfile = async (user: User | null) => {
    try {
      const { data, error, status } = await supabase
      .from('profiles')
      .select(`full_name, username, website`)
      .eq('id', user?.id)
      .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }
      setProfile({
        fullName: data?.full_name as string,
        userName: data?.username as string,
        website: data?.website as string
      })
    } catch (error) {
      const { message } = error as Error
      toast.error("Error loading user data: " + message)
    }
  }

  const emailPasswordLogIn = async (credentials: SignInWithPasswordCredentials) => {
    const { error } = await supabaseClient.auth.signInWithPassword(credentials);

    if (error) {
      toast.error(error.message)
    }

    const { data: { user }, } = await supabaseClient.auth.getUser();
    supabase.auth.getSession().then(({data: { session }}) => {
      setSession(session)
    })

    setCurrentUser(user);
    await getProfile(user)
    router.navigate("/")
  }


  const updateProfile = async (user: User | null, credentials: RegisterSchemaType) => {
    const { fullName, userName, website } = credentials
    const { error } = await supabaseClient.from("profiles").upsert({
      id: user?.id as string,
      full_name: fullName,
      username: userName,
      website,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      toast.error(error.message)
    }
  }

  const emailPasswordRegister = async (credentials: RegisterSchemaType) => {
    const { email, password } = credentials
    const { error } = await supabase.auth.signUp({email, password})
  
    if (error) {
      toast.error(error.message)
    }
    const { data: { user }, } = await supabaseClient.auth.getUser();
    await updateProfile(user, credentials);
    setProfile(credentials);
    setCurrentUser(user);

    supabase.auth.getSession().then(({data: { session }}) => {
      setSession(session)
    })
  
    router.navigate("/")
  }
  
  return (
    <SupabaseAuthContext.Provider value={{supabaseClient, session, setSession, currentUser, profile, emailPasswordLogIn, emailPasswordRegister}}>
      {props.children}
    </SupabaseAuthContext.Provider>
  )
}

const useAuth = (): ISupabaseAuthContext => {
  const context = useContext(SupabaseAuthContext)
  if (!context) {
    throw new Error("useAuth must be used within a SupabaseAuthProvider")
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { SupabaseAuthProvider, useAuth };
