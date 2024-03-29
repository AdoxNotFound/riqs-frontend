import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MainLayout from "./layout/MainLayout";
import Dashboard from "../scenes/dashboard/index";
import Team from "../scenes/team";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import Calendar from "../scenes/calendar";
import Login from "../scenes/login";
import UploadFile from "../scenes/uploadFile/index";
import AccountProfile from "../scenes/profile";

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
        children: [{ index: true, element: <Dashboard /> }],
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
        path: "upload-file",
        element: <MainLayout />,
        children: [{ index: true, element: <UploadFile /> }],
      },
      {
        path: "profile",
        element: <MainLayout />,
        children: [{ index: true, element: <AccountProfile /> }],
      },
    ],
  },
]);
