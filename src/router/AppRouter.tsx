import { Navigate, Route, Routes } from "react-router";
import AuthRoutes from "../auth/routes/AuthRoutes";
import { AuthStatusType } from "../auth/types/auth.interface";
import { useCheckAuth } from "../hooks/useCheckAuth";
import JournalRoutes from "../journal/routes/JournalRoutes";
import CheckingAuth from "../ui/components/checkingAuth/CheckingAuth";

const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === AuthStatusType.authType3) return <CheckingAuth />;

  return (
    <Routes>
      {status === AuthStatusType.authType1 ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRouter;
