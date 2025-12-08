import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Palette, Shield } from "lucide-react";

const Configuracoes = () => {
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
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">ES</span>
              </div>
              <Button variant="outline" size="sm">Alterar foto</Button>
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue="Estudante" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="estudante@email.com" />
              </div>
            </div>
            <Button>Salvar alterações</Button>
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
            <Button variant="outline">Alterar senha</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;
