import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  Mail,
  Calendar,
  Shield,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: 'admin' | 'estudante';
  ativo: boolean;
  criado_em: string;
}

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [deleteUser, setDeleteUser] = useState<Usuario | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    nome: "",
    email: "",
    tipo: "estudante" as "admin" | "estudante",
    ativo: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUsuarios();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = usuarios.filter(
        (u) =>
          u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsuarios(filtered);
    } else {
      setFilteredUsuarios(usuarios);
    }
  }, [searchTerm, usuarios]);

  const loadUsuarios = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.listarUsuarios();
      if (response.success && response.data) {
        // Converter ativo de 0/1 para boolean
        const usuariosFormatados = response.data.map((u: any) => ({
          ...u,
          ativo: Boolean(u.ativo),
        }));
        setUsuarios(usuariosFormatados);
        setFilteredUsuarios(usuariosFormatados);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar usuários",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setEditForm({
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      ativo: usuario.ativo,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      await apiService.atualizarUsuario(editingUser.id, editForm);
      toast({
        title: "Sucesso!",
        description: "Usuário atualizado com sucesso.",
      });
      setIsEditDialogOpen(false);
      setEditingUser(null);
      await loadUsuarios();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar usuário",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (usuario: Usuario) => {
    setDeleteUser(usuario);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteUser) return;

    try {
      await apiService.deletarUsuario(deleteUser.id);
      toast({
        title: "Sucesso!",
        description: "Usuário deletado com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      setDeleteUser(null);
      await loadUsuarios();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao deletar usuário",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (usuario: Usuario) => {
    try {
      await apiService.atualizarUsuario(usuario.id, { ativo: !usuario.ativo });
      toast({
        title: "Sucesso!",
        description: `Usuário ${!usuario.ativo ? "ativado" : "desativado"} com sucesso.`,
      });
      await loadUsuarios();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar status do usuário",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">Gerencie todos os usuários do sistema</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Lista de Usuários ({filteredUsuarios.length})
          </CardTitle>
          <CardDescription>
            Total de {usuarios.length} usuários cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>Carregando...</p>
            </div>
          ) : filteredUsuarios.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsuarios.map((usuario, i) => (
                <motion.div
                  key={usuario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/70 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      usuario.tipo === 'admin' ? 'bg-primary/20' : 'bg-accent/20'
                    }`}>
                      {usuario.tipo === 'admin' ? (
                        <Shield className="w-6 h-6 text-primary" />
                      ) : (
                        <User className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{usuario.nome}</p>
                        {usuario.tipo === 'admin' && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                            Admin
                          </span>
                        )}
                        {!usuario.ativo && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/20 text-destructive">
                            Inativo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        {usuario.email}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Cadastrado em {new Date(usuario.criado_em).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(usuario)}
                      title={usuario.ativo ? "Desativar usuário" : "Ativar usuário"}
                    >
                      {usuario.ativo ? (
                        <UserCheck className="w-4 h-4 text-green-600" />
                      ) : (
                        <UserX className="w-4 h-4 text-red-600" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(usuario)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {usuario.tipo !== 'admin' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(usuario)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize as informações do usuário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={editForm.nome}
                onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <select
                id="tipo"
                value={editForm.tipo}
                onChange={(e) => setEditForm({ ...editForm, tipo: e.target.value as "admin" | "estudante" })}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="estudante">Estudante</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ativo"
                checked={editForm.ativo}
                onChange={(e) => setEditForm({ ...editForm, ativo: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="ativo">Usuário ativo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar o usuário {deleteUser?.nome}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsuarios;

