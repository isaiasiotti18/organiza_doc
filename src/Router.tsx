import { Route, Routes, Navigate } from "react-router-dom";
import { LoginForm } from "./pages/auth/LoginForm";
import { RegisterForm } from "./pages/auth/RegisterForm";
import { DefaultLayout } from "./layout/DefaultLayout";
import { LoginRegisterLayout } from "./layout/LoginRegisterLayout";
import { Documents } from "./pages/app/Documents";
import { UserLayout } from "./layout/UserLayout";
import { Account } from "./pages/user/Account";
import { Billing } from "./pages/user/Billing";
import ProtectedRoute from "./protected-route";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegisterLayout />}>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />

        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/app"
          element={<Navigate to="/app/documents/all" replace={true} />}
        />
        <Route path="documents/:category" element={<Documents />} />
      </Route>

      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="account" element={<Account />} />
        <Route path="billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}
