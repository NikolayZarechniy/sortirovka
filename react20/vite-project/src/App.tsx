import { useState } from "react";
import ExamplePage from "./pages/pract";
import HomePage from "./pages/home";
import WorksPage from "./pages/works";
import NotificationsPage from "./pages/notifications";
import Nav from "./ui/nav/Nav";
import TaskPage from "./pages/task";

type PageName = "home" | "works" | "example" | "notifications" | "task";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const pages = {
    home: <HomePage />,
    works: <WorksPage />,
    example: <ExamplePage />, 
    notifications: <NotificationsPage />,
    task: <TaskPage />
  };

  return (
    <>
      <Nav setPage={setPage} active={page} />
      {pages[page]}
    </>
  );
}
