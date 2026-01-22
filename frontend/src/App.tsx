import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Boards from "./pages/Boards";
import Guilds from "./pages/Guilds";
import Classes from "./pages/Classes";
import Members from "./pages/Members";
import MemberProfile from "./pages/MemberProfile";
import Quests from "./pages/Quests";
import Reviews from "./pages/Reviews";
import CalendarPage from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/guilds" element={<Guilds />} />
            <Route path="/guilds/:id" element={<Guilds />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/:id" element={<Classes />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:id" element={<MemberProfile />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/quests/:id" element={<Quests />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
