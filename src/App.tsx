import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import Auth from "./pages/Auth";
import { useAppSelector } from "./redux/hooks";

const Chats = lazy(() => import("./pages/Chats"));
const Chat = lazy(() => import("./pages/Chat"));
const Activation = lazy(() => import("./pages/Activation"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ResetPasswordConfirm = lazy(() => import("./pages/ResetPasswordConfirm"));
const Settings = lazy(() => import("./pages/Settings"));
const ResetEmailConfirm = lazy(() => import("./pages/ResetEmailConfirm"));
const Friends = lazy(() => import("./pages/Friends"));
const FriendRequests = lazy(() => import("./pages/FriendRequests"));

function App() {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isLoading) {
    return <Spinner lg center />;
  }

  return (
    <Suspense fallback={<Spinner lg center />}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/chats" replace /> : <Auth />
          }
        />
        <Route
          path="/chats"
          element={isAuthenticated ? <Chats /> : <Navigate to="/" replace />}
        />
        <Route
          path="/chats/:id"
          element={isAuthenticated ? <Chat /> : <Navigate to="/" replace />}
        />
        <Route
          path="/friends"
          element={isAuthenticated ? <Friends /> : <Navigate to="/" replace />}
        />
        <Route
          path="/friend-requests"
          element={
            isAuthenticated ? <FriendRequests /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/auth/activation/:uid/:token"
          element={
            !isAuthenticated ? <Activation /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            !isAuthenticated ? <ResetPassword /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/auth/reset-password/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <Settings />
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />
        <Route
          path="/auth/reset-email/:uid/:token"
          element={
            isAuthenticated ? (
              <ResetEmailConfirm />
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
