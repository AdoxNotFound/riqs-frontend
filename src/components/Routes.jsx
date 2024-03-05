import { createBrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useApiContext } from "../context/ApiContext";
import AppLayout from "./layout/AppLayout";
import MainLayout from "./layout/MainLayout";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
import Geography from "../scenes/geography";
import Calendar from "../scenes/calendar";
import Login from "../scenes/login";

/*const IndustryRoute = ({ children }) => {
  const { generalSettings } = useApiContext();
  if (generalSettings.role === "industria") {
    return children;
  }
  return <Navigate to="/home" />;
};*/

const ProtectedRoute = ({ element }) => {
  const { generalSettings } = useApiContext();
  return generalSettings.isLoggedIn ? element : <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "home",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "team",
        element: <MainLayout />,
        children: [{ index: true, element: <Team /> }],
      },
      {
        path: "contacts",
        element: <MainLayout />,
        children: [{ index: true, element: <Contacts /> }],
      },
      {
        path: "invoices",
        element: <MainLayout />,
        children: [{ index: true, element: <Invoices /> }],
      },
      {
        path: "form",
        element: <MainLayout />,
        children: [{ index: true, element: <Form /> }],
      },
      {
        path: "calendar",
        element: <MainLayout />,
        children: [{ index: true, element: <Calendar /> }],
      },
      {
        path: "faq",
        element: <MainLayout />,
        children: [{ index: true, element: <FAQ /> }],
      },
      {
        path: "bar",
        element: <MainLayout />,
        children: [{ index: true, element: <Bar /> }],
      },
      {
        path: "pie",
        element: <MainLayout />,
        children: [{ index: true, element: <Pie /> }],
      },
      {
        path: "line",
        element: <MainLayout />,
        children: [{ index: true, element: <Line /> }],
      },
      {
        path: "geography",
        element: <MainLayout />,
        children: [{ index: true, element: <Geography /> }],
      },
    ],
  },
]);
