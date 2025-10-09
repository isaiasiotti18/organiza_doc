import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    console.log(user);
    return <Navigate to="/login" replace />;
  }

  return children;
}
