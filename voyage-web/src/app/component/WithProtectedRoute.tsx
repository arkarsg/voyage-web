import { type User } from '@supabase/auth-js';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';
import { createClient } from '~/utils/supabase/client';

interface ProtectedRouteProps {
  [key: string]: unknown;
}

const withProtectedRoute = <P extends ProtectedRouteProps>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
        } else {
          console.log("authenticated")
          setUser(user);
        }
      };

      checkUser();
    }, [router, supabase]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  HOC.displayName = `withProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return HOC;
};

export default withProtectedRoute;
