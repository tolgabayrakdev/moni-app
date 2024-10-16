import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import('./pages/Home'));

const SignInPage = lazy(() => import('./pages/auth/SignIn'));
const SignUpPage = lazy(() => import('./pages/auth/SignUp'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgetPassword'));

const FeedLayout = lazy(() => import('./layouts/FeedLayout'));
const FeedIndexPaage = lazy(() => import('./pages/feed/Index'));
const FeedSettingsPage = lazy(() => import('./pages/feed/Settings'));
const FeedProfilePage = lazy(() => import('./pages/feed/Profile'));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/sign-in",
        element: <SignInPage />
    },
    {
        path: "/sign-up",
        element: <SignUpPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />
    },
    {
        path: "feed",
        element: <FeedLayout />,
        children: [
            { path: "", element: <FeedIndexPaage /> },
            { path: "settings", element: <FeedSettingsPage /> },
            { path: "profile", element: <FeedProfilePage /> },
        ]
    }
]);

export default routes;