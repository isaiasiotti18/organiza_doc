import { Route, Routes, Navigate } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import { RegisterForm } from "./pages/RegisterForm";
import { DefaultLayout } from "./layout/DefaultLayout";
import { LoginRegisterLayout } from "./layout/LoginRegisterLayout";
import { Home } from "./pages/Home";
import { Documents } from "./pages/Documents";
import { UserLayout } from "./layout/UserLayout";
import { Account } from "./pages/User/Account";
import { Billing } from "./pages/User/Billing";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegisterLayout />}>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />

        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>

      <Route path="/app" element={<DefaultLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="category/:category" element={<Documents />} />
      </Route>

      <Route path="/user" element={<UserLayout />}>
        <Route path="account" element={<Account />} />
        <Route path="billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}
