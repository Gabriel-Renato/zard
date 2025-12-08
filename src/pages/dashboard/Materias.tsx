import { useState } from "react";
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

const colorOptions = [
  "#0D9488", "#F59E0B", "#EC4899", "#8B5CF6", 
  "#10B981", "#EF4444", "#3B82F6", "#F97316"
];

interface Subject {
  id: number;
  name: string;
  color: string;
  description: string;
  topics: number;
  flashcards: number;
}

const initialSubjects: Subject[] = [
  { id: 1, name: "Direito Constitucional", color: "#0D9488", description: "Princípios e normas da Constituição", topics: 8, flashcards: 45 },
  { id: 2, name: "Português", color: "#F59E0B", description: "Gramática e interpretação de texto", topics: 12, flashcards: 32 },
  { id: 3, name: "Raciocínio Lógico", color: "#EC4899", description: "Lógica proposicional e matemática", topics: 6, flashcards: 28 },
  { id: 4, name: "Direito Administrativo", color: "#8B5CF6", description: "Princípios da administração pública", topics: 10, flashcards: 38 },
];

const Materias = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [newSubject, setNewSubject] = useState({ name: "", color: colorOptions[0], description: "" });
  const { toast } = useToast();

  const handleSave = () => {
    if (!newSubject.name.trim()) {
      toast({ title: "Erro", description: "Nome da matéria é obrigatório", variant: "destructive" });
      return;
    }

    if (editingSubject) {
      setSubjects(subjects.map(s => 
        s.id === editingSubject.id 
          ? { ...s, name: newSubject.name, color: newSubject.color, description: newSubject.description }
          : s
      ));
      toast({ title: "Matéria atualizada!", description: `${newSubject.name} foi atualizada com sucesso.` });
    } else {
      const newId = Math.max(...subjects.map(s => s.id)) + 1;
      setSubjects([...subjects, { 
        id: newId, 
        name: newSubject.name, 
        color: newSubject.color, 
        description: newSubject.description,
        topics: 0,
        flashcards: 0
      }]);
      toast({ title: "Matéria criada!", description: `${newSubject.name} foi adicionada com sucesso.` });
    }

    setIsDialogOpen(false);
    setEditingSubject(null);
    setNewSubject({ name: "", color: colorOptions[0], description: "" });
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setNewSubject({ name: subject.name, color: subject.color, description: subject.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
    toast({ title: "Matéria removida", description: "A matéria foi excluída com sucesso." });
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
                <div className="h-2" style={{ backgroundColor: subject.color }} />
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${subject.color}20` }}
                      >
                        <BookOpen className="w-6 h-6" style={{ color: subject.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">{subject.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Layers className="w-4 h-4" />
                      {subject.topics} assuntos
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      {subject.flashcards} flashcards
                    </div>
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
    </div>
  );
};

export default Materias;
