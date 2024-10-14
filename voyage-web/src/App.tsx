import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SupabaseAuthProvider } from './providers/SupabaseAuthProvider';

import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from './providers/ApiProvider';
import router from './routes';

function App() {
  return (
    <>
      <SupabaseAuthProvider>
        <ApiProvider>
          <RouterProvider router={router}/>
        </ApiProvider>
      </SupabaseAuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
