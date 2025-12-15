import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2,
  Layers,
  CreditCard,
  MoreVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

const colorOptions = [
  "#0D9488", "#F59E0B", "#EC4899", "#8B5CF6", 
  "#10B981", "#EF4444", "#3B82F6", "#F97316"
];

interface Subject {
  id: number;
  nome: string;
  cor: string;
  descricao: string;
  flashcards_count?: number;
  flashcards_revisados?: number;
}

const Materias = () => {
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [newSubject, setNewSubject] = useState({ name: "", color: colorOptions[0], description: "" });
  const { toast } = useToast();

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const response = await apiService.listarMaterias(userId);
      if (response.success && response.data) {
        setSubjects(response.data);
      }
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao carregar matérias", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newSubject.name.trim()) {
      toast({ title: "Erro", description: "Nome da matéria é obrigatório", variant: "destructive" });
      return;
    }

    try {
      if (editingSubject) {
        await apiService.atualizarMateria(userId, editingSubject.id, {
          nome: newSubject.name,
          descricao: newSubject.description,
          cor: newSubject.color
        });
        toast({ title: "Matéria atualizada!", description: `${newSubject.name} foi atualizada com sucesso.` });
      } else {
        await apiService.criarMateria(userId, newSubject.name, newSubject.description, newSubject.color);
        toast({ title: "Matéria criada!", description: `${newSubject.name} foi adicionada com sucesso.` });
      }
      await loadSubjects();
      setIsDialogOpen(false);
      setEditingSubject(null);
      setNewSubject({ name: "", color: colorOptions[0], description: "" });
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao salvar matéria", 
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setNewSubject({ name: subject.nome, color: subject.cor, description: subject.descricao || "" });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.deletarMateria(userId, id);
      toast({ title: "Matéria removida", description: "A matéria foi excluída com sucesso." });
      await loadSubjects();
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao remover matéria", 
        variant: "destructive" 
      });
    }
  };

  const openNewDialog = () => {
    setEditingSubject(null);
    setNewSubject({ name: "", color: colorOptions[0], description: "" });
    setIsDialogOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Matérias</h1>
          <p className="text-muted-foreground">Organize seus estudos por disciplinas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Matéria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSubject ? "Editar Matéria" : "Nova Matéria"}</DialogTitle>
              <DialogDescription>
                {editingSubject ? "Atualize as informações da matéria" : "Adicione uma nova matéria aos seus estudos"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Nome da Matéria</Label>
                <Input
                  id="name"
                  placeholder="Ex: Direito Constitucional"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input
                  id="description"
                  placeholder="Breve descrição da matéria"
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Cor</Label>
                <div className="flex gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full transition-transform ${
                        newSubject.color === color ? "scale-125 ring-2 ring-offset-2 ring-foreground" : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewSubject({ ...newSubject, color })}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingSubject ? "Salvar Alterações" : "Criar Matéria"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subjects Grid */}
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Carregando...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {subjects.map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group hover:shadow-card-hover transition-all overflow-hidden">
                {/* Color Bar */}
                <div className="h-2" style={{ backgroundColor: subject.cor }} />
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${subject.cor}20` }}
                      >
                        <BookOpen className="w-6 h-6" style={{ color: subject.cor }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{subject.nome}</h3>
                        <p className="text-sm text-muted-foreground">{subject.descricao || ''}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      {subject.flashcards_count || 0} flashcards
                    </div>
                    {subject.flashcards_revisados !== undefined && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Layers className="w-4 h-4" />
                        {subject.flashcards_revisados} revisados
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(subject)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(subject.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Materias;
