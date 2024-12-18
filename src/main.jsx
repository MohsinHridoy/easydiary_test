import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Components/Root/Root";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import LogIn from "./Components/Home/LogIn";
import Registration from "./Components/Registration/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ComposePage from "./Components/compose/compose";
import Notification from "./Components/Notification/Notification";
import AuthProvider from "./providers/AuthProvider";
import { EntryProvider } from "./Components/EntryContext/EntryContext";
import EmailManager from "./Components/EmailManager/EmailManager";

const App = () => {
  // State for entries
  const [approvedEntries, setApprovedEntries] = useState([]);
  const [pendingEntries, setPendingEntries] = useState([]);
  const [rejectedEntries, setRejectedEntries] = useState([]);

  // Define the router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <LogIn /> },
        { path: "/registration", element: <Registration /> },
        { path: "/notification", element: <Notification /> },
        { path: "/dashboard", element: <Dashboard approvedEntries={approvedEntries} /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        {
          path: "/compose",
          element: (
            <ComposePage
              onSubmit={(formData) =>
                setPendingEntries([...pendingEntries, formData])
              }
            />
          ),
        },
        // {
        //   path: "/admin",
        //   element: (
        //     <AdminPanel
        //       pendingEntries={pendingEntries}
        //       onApprove={(entry) => {
        //         setApprovedEntries([...approvedEntries, entry]);
        //         setPendingEntries(pendingEntries.filter((e) => e !== entry));
        //       }}
        //       onReject={(entry) => {
        //         setRejectedEntries([...rejectedEntries, entry]);
        //         setPendingEntries(pendingEntries.filter((e) => e !== entry));
        //       }}
        //     />
        //   ),
        // },
        {
          path: "/emails",
          element: <EmailManager />,
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
