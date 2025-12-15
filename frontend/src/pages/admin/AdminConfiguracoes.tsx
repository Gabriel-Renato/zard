import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Save,
  Database,
  Mail,
  Shield,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

interface Configuracoes {
  nome_sistema: string;
  email_suporte: string;
  manutencao: boolean;
  registro_aberto: boolean;
  max_flashcards_por_materia: number;
  dias_revisao: number;
}

const AdminConfiguracoes = () => {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>({
    nome_sistema: "Zard Flashcard Mastery",
    email_suporte: "suporte@zard.com",
    manutencao: false,
    registro_aberto: true,
    max_flashcards_por_materia: 1000,
    dias_revisao: 7,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConfiguracoes();
  }, []);

  const loadConfiguracoes = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.obterConfiguracoes();
      if (response.success && response.data) {
        setConfiguracoes(response.data);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiService.salvarConfiguracoes(configuracoes);
      toast({
        title: "Sucesso!",
        description: "Configurações salvas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar configurações",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Configure as opções do sistema</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>Carregando configurações...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Informações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome_sistema">Nome do Sistema</Label>
                <Input
                  id="nome_sistema"
                  value={configuracoes.nome_sistema}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, nome_sistema: e.target.value })}
                  placeholder="Nome do sistema"
                />
              </div>
              <div>
                <Label htmlFor="email_suporte">Email de Suporte</Label>
                <Input
                  id="email_suporte"
                  type="email"
                  value={configuracoes.email_suporte}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, email_suporte: e.target.value })}
                  placeholder="suporte@exemplo.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Manutenção */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Manutenção e Acesso
              </CardTitle>
              <CardDescription>
                Controle de acesso e manutenção do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="manutencao">Modo Manutenção</Label>
                  <p className="text-sm text-muted-foreground">
                    Quando ativado, apenas administradores podem acessar o sistema
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="manutencao"
                  checked={configuracoes.manutencao}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, manutencao: e.target.checked })}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registro_aberto">Registro Aberto</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que novos usuários solicitem cadastro
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="registro_aberto"
                  checked={configuracoes.registro_aberto}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, registro_aberto: e.target.checked })}
                  className="w-5 h-5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Limites */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Limites e Parâmetros
              </CardTitle>
              <CardDescription>
                Configure os limites do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="max_flashcards_por_materia">
                  Máximo de Flashcards por Matéria
                </Label>
                <Input
                  id="max_flashcards_por_materia"
                  type="number"
                  min="1"
                  value={configuracoes.max_flashcards_por_materia}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, max_flashcards_por_materia: parseInt(e.target.value) || 0 })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Limite máximo de flashcards que podem ser criados por matéria
                </p>
              </div>
              <div>
                <Label htmlFor="dias_revisao">Dias para Revisão</Label>
                <Input
                  id="dias_revisao"
                  type="number"
                  min="1"
                  value={configuracoes.dias_revisao}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, dias_revisao: parseInt(e.target.value) || 0 })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Intervalo padrão em dias para revisão de flashcards
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Configurações de Email
              </CardTitle>
              <CardDescription>
                Configurações relacionadas ao envio de emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                As configurações de email são gerenciadas através das variáveis de ambiente do servidor.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminConfiguracoes;

