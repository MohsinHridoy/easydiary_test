import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/Root";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import LogIn from "./Components/Home/LogIn";
import Registration from "./Components/Registration/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ComposePage from "./Components/compose/compose";
import AuthProvider from "./providers/AuthProvider";
import { EntryProvider } from "./Components/EntryContext/EntryContext";
import "./i18n/i18n";
import AdminPanel from "./AdminPanel/AdminPanel";
import Notification from "./Components/Notification/Notification";

const App = () => {
  // State for entries (approved, pending, and rejected)
  const [approvedEntries, setApprovedEntries] = useState([]);
  const [pendingEntries, setPendingEntries] = useState([]);
  const [rejectedEntries, setRejectedEntries] = useState([]);

  // Define the router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/", element: <LogIn></LogIn>,
        },
        {
          path: "/registration", element: <Registration></Registration>,
        },
        {
          path: "/notification", element: <Notification></Notification>,
        },
        {
          path: "/dashboard", element: <Dashboard approvedEntries={approvedEntries} />,
        },
        {
          path: "/forgot-password",element: <ForgotPassword></ForgotPassword>,
        },
        {
          path: "/compose",element: (
            <ComposePage
              onSubmit={(formData) =>
                setPendingEntries([...pendingEntries, formData])
              }
            />
          ),
        },
        {
          path: "/admin",
          element: (
            <AdminPanel
              pendingEntries={pendingEntries}
              onApprove={(entry) => {
                setApprovedEntries([...approvedEntries, entry]);
                setPendingEntries(pendingEntries.filter((e) => e !== entry));
              }}
              onReject={(entry) => {
                setRejectedEntries([...rejectedEntries, entry]);
                setPendingEntries(pendingEntries.filter((e) => e !== entry));
              }}
            />
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

// Render the app
createRoot(document.getElementById("root")).render(<App />);
