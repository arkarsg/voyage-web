"use client"
import withProtectedRoute from "../component/WithProtectedRoute";

const Dashboard = () => {
  return (
    <div>
      <h1>
        Welcome to dashboard page
      </h1>
    </div>
  )
}

export default withProtectedRoute(Dashboard);