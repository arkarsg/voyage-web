import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../supabase/supabaseClient';

interface IApiContext {
  ping: () => Promise<void>;
}

const ApiContext = createContext<IApiContext | null>(null);

const ApiProvider = (props: React.PropsWithChildren) => {
  const ping = async () => {
    try {
      const { data, error, status } = await supabase.rpc("ping");

      if (error && status !== 406) {
          console.log(error)
          throw error
      }
      toast.info(data)
    } catch (error) {
      const { message } = error as Error
      toast.error("Could not ping backend: " + message)
    }
  }

  return (
    <ApiContext.Provider value={{ping}}>
      {props.children}
    </ApiContext.Provider>
  )
}

const useApi = (): IApiContext => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error("useAuth must be used within a SupabaseAuthProvider")
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { ApiProvider, useApi };
