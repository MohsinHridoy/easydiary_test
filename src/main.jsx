import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Components/Root/Root";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import LogIn from "./Components/Home/LogIn";
import Registration from "./Components/Registration/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import Received from "./Components/ReceivePage/received.jsx";
import Complete from "./Components/complete/complete.jsx";
import Pending from "./Components/pending/pending.jsx";


import Sent from "./Components/Sent/sent.jsx";


import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ComposePage from "./Components/compose/compose";
import Notification from "./Components/Notification/Notification";
import AuthProvider from "./providers/AuthProvider";
import { EntryProvider } from "./Components/EntryContext/EntryContext";
import EmailManager from "./Components/EmailManager/EmailManager";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import "./i18n/i18n";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <LogIn /> },
        { path: "/registration", element: <Registration /> },
        { path: "/forgot-password", element: <ForgotPassword /> },

        // Secure Routes
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/compose",
          element: (
            <ProtectedRoute>
              <ComposePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/sent",
          element: (
            <ProtectedRoute>
              <Sent />
            </ProtectedRoute>
          ),
        },
        {
          path: "/pending",
          element: (
            <ProtectedRoute>
              <Pending />
            </ProtectedRoute>
          ),
        },
        {
          path: "/complete",
          element: (
            <ProtectedRoute>
              <Complete />
            </ProtectedRoute>
          ),
        },
        {
          path: "/receive",
          element: (
            <ProtectedRoute>
              <Received />
            </ProtectedRoute>
          ),
        },
        {
          path: "/notification",
          element: (
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          ),
        },
        {
          path: "/emails",
          element: (
            <ProtectedRoute>
              <EmailManager />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <StrictMode>
      <AuthProvider>
        <EntryProvider>
          <RouterProvider router={router} />
        </EntryProvider>
      </AuthProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
