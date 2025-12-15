import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SolicitarCadastro from "./pages/SolicitarCadastro";
import EmAnalise from "./pages/EmAnalise";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminSolicitacoes from "./pages/admin/AdminSolicitacoes";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Materias from "./pages/dashboard/Materias";
import Flashcards from "./pages/dashboard/Flashcards";
import Configuracoes from "./pages/dashboard/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/solicitar-cadastro" element={<SolicitarCadastro />} />
          <Route path="/em-analise" element={<EmAnalise />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="solicitacoes" element={<AdminSolicitacoes />} />
            <Route path="configuracoes" element={<AdminConfiguracoes />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="materias" element={<Materias />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
