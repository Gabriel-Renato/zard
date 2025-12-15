import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Palette, Shield, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

const Configuracoes = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const userId = parseInt(localStorage.getItem('userId') || '0');
      if (userId) {
        const response = await apiService.obterPerfil(userId);
        if (response.success && response.data) {
          setUser(response.data);
          setFormData({
            nome: response.data.nome || "",
            email: response.data.email || "",
            senha: "",
            confirmarSenha: "",
          });
        }
      } else {
        // Tentar carregar do localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userData = JSON.parse(userStr);
          setUser(userData);
          setFormData({
            nome: userData.nome || "",
            email: userData.email || "",
            senha: "",
            confirmarSenha: "",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar dados do usuário",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const userId = parseInt(localStorage.getItem('userId') || '0');
      const updateData: any = {
        nome: formData.nome,
        email: formData.email,
      };
      
      if (formData.senha) {
        updateData.senha = formData.senha;
      }

      const response = await apiService.atualizarPerfil(userId, updateData);
      if (response.success) {
        // Atualizar localStorage
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          setUser(response.data);
        }
        
        toast({
          title: "Sucesso!",
          description: "Perfil atualizado com sucesso.",
        });
        
        // Limpar campos de senha
        setFormData({
          ...formData,
          senha: "",
          confirmarSenha: "",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar perfil",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (nome: string) => {
    if (!nome) return "U";
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Personalize sua experiência no Zard</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil
            </CardTitle>
            <CardDescription>Suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">
                <p>Carregando dados...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {getInitials(formData.nome)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Alterar foto
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="senha">Nova Senha (deixe em branco para não alterar)</Label>
                    <Input
                      id="senha"
                      type="password"
                      value={formData.senha}
                      onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                      placeholder="Digite uma nova senha"
                    />
                  </div>
                  {formData.senha && (
                    <div>
                      <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        value={formData.confirmarSenha}
                        onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                        placeholder="Confirme a nova senha"
                      />
                    </div>
                  )}
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar alterações"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
            <CardDescription>Gerencie suas preferências de notificação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Lembretes de revisão</p>
                <p className="text-sm text-muted-foreground">Receba lembretes para revisar flashcards</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Relatórios semanais</p>
                <p className="text-sm text-muted-foreground">Resumo semanal do seu progresso</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dicas de estudo</p>
                <p className="text-sm text-muted-foreground">Receba dicas para melhorar seu aprendizado</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Aparência
            </CardTitle>
            <CardDescription>Personalize a interface do Zard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo escuro</p>
                <p className="text-sm text-muted-foreground">Alternar entre tema claro e escuro</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
            <CardDescription>Proteja sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Você pode alterar sua senha na seção de Perfil acima.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;
