import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // pode ser spinner, skeleton, etc
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
