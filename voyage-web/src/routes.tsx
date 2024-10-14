import {
  createBrowserRouter
} from "react-router-dom";
import RootLayout from "./components/PageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/auth/AuthPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/auth",
    element: 
      <RootLayout>
        <AuthPage />
      </RootLayout>
  }
])

export default router;