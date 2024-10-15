import {
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";
import { logout as logoutAction } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { apiSlice } from "@/redux/services/apiSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useNavbar() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  let location = useLocation();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [skip, setSkip] = useState(true);

  const { data: user } = useRetrieveUserQuery(undefined, { skip });

  useEffect(() => {
    if (isAuthenticated) {
      setSkip(false);
    }
  }, [isAuthenticated, setSkip]);

  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(apiSlice.util.resetApiState());
        setSkip(true);
        dispatch(logoutAction());
        toast.info("Logged out.");
      })
      .finally(() => {
        navigate("/", { replace: true });
        if (isSheetOpen) {
          handleLinkClick();
        }
      });
  };

  const handleLinkClick = () => {
    if (isSheetOpen) {
      setIsSheetOpen(false);
    }
  };

  return {
    isAuthenticated,
    handleLinkClick,
    isSheetOpen,
    setIsSheetOpen,
    user,
    handleLogout,
  };
}
