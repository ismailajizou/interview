import { selectUser } from "@/redux/features/user.slice";
import { useAppSelector } from "@/redux/hooks";
import { FunctionComponent, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// interface ProtectedLayoutProps {
// //   children: React.ReactNode;
// }

const ProtectedLayout: FunctionComponent= () => {
  const { isAuthenticated } = useAppSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return <Outlet />
};

export default ProtectedLayout;
