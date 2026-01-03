import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2,
  Tag,
  RotateCw,
  Check,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

interface Flashcard {
  id: number;
  pergunta: string;
  resposta: string;
  materia_id: number;
  dificuldade: "easy" | "medium" | "hard";
  revisado: boolean;
  materia_nome?: string;
}

interface Materia {
  id: number;
  nome: string;
}

const difficultyColors = {
  easy: "bg-blue-100 text-blue-700 border-blue-200",
  medium: "bg-cyan-100 text-cyan-700 border-cyan-200",
  hard: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

const difficultyLabels = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

const FlashcardsPage = () => {
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [newCard, setNewCard] = useState({
    pergunta: "",
    resposta: "",
    materia_id: 0,
    dificuldade: "medium" as "easy" | "medium" | "hard",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const [flashcardsRes, materiasRes] = await Promise.all([
        apiService.listarFlashcards(userId),
        apiService.listarMaterias(userId)
      ]);
      
      if (flashcardsRes.success && flashcardsRes.data) {
        setFlashcards(flashcardsRes.data);
      }
      
      if (materiasRes.success && materiasRes.data) {
        setMaterias(materiasRes.data);
        if (materiasRes.data.length > 0 && !newCard.materia_id) {
          setNewCard({ ...newCard, materia_id: materiasRes.data[0].id });
        }
      }
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao carregar dados", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlip = (id: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    if (!newCard.pergunta.trim() || !newCard.resposta.trim()) {
      toast({ title: "Erro", description: "Pergunta e resposta são obrigatórias", variant: "destructive" });
      return;
    }

    if (!newCard.materia_id) {
      toast({ title: "Erro", description: "Selecione uma matéria", variant: "destructive" });
      return;
    }

    try {
      if (editingCard) {
        await apiService.atualizarFlashcard(userId, editingCard.id, {
          pergunta: newCard.pergunta,
          resposta: newCard.resposta,
          dificuldade: newCard.dificuldade,
          materia_id: newCard.materia_id
        });
        toast({ title: "Flashcard atualizado!" });
      } else {
        await apiService.criarFlashcard(
          userId,
          newCard.materia_id,
          newCard.pergunta,
          newCard.resposta,
          newCard.dificuldade
        );
        toast({ title: "Flashcard criado!" });
      }
      await loadData();
      setIsDialogOpen(false);
      setEditingCard(null);
      if (materias.length > 0) {
        setNewCard({ pergunta: "", resposta: "", materia_id: materias[0].id, dificuldade: "medium" });
      }
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao salvar flashcard", 
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setNewCard({ 
      pergunta: card.pergunta, 
      resposta: card.resposta, 
      materia_id: card.materia_id, 
      dificuldade: card.dificuldade 
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.deletarFlashcard(userId, id);
      toast({ title: "Flashcard removido" });
      await loadData();
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao remover flashcard", 
        variant: "destructive" 
      });
    }
  };

  const toggleReviewed = async (id: number) => {
    const card = flashcards.find(f => f.id === id);
    if (!card) return;
    
    try {
      await apiService.atualizarFlashcard(userId, id, {
        revisado: !card.revisado
      });
      await loadData();
    } catch (error: any) {
      toast({ 
        title: "Erro", 
        description: error.message || "Erro ao atualizar flashcard", 
        variant: "destructive" 
      });
    }
  };

  const openNewDialog = () => {
    setEditingCard(null);
    if (materias.length > 0) {
      setNewCard({ pergunta: "", resposta: "", materia_id: materias[0].id, dificuldade: "medium" });
    }
    setIsDialogOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <p className="text-muted-foreground">Crie e revise seus cartões de memória</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Flashcard
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingCard ? "Editar Flashcard" : "Novo Flashcard"}</DialogTitle>
              <DialogDescription>
                {editingCard ? "Atualize as informações do flashcard" : "Crie um novo cartão de memória"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="question">Pergunta</Label>
                <Textarea
                  id="question"
                  placeholder="Digite a pergunta..."
                  value={newCard.pergunta}
                  onChange={(e) => setNewCard({ ...newCard, pergunta: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="answer">Resposta</Label>
                <Textarea
                  id="answer"
                  placeholder="Digite a resposta..."
                  value={newCard.resposta}
                  onChange={(e) => setNewCard({ ...newCard, resposta: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Matéria</Label>
                  <Select
                    value={newCard.materia_id.toString()}
                    onValueChange={(value) => setNewCard({ ...newCard, materia_id: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materias.map((materia) => (
                        <SelectItem key={materia.id} value={materia.id.toString()}>
                          {materia.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Dificuldade</Label>
                  <Select
                    value={newCard.dificuldade}
                    onValueChange={(value: "easy" | "medium" | "hard") => 
                      setNewCard({ ...newCard, dificuldade: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="hard">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingCard ? "Salvar Alterações" : "Criar Flashcard"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Flashcards Grid */}
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Carregando...</div>
      ) : flashcards.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>Nenhum flashcard encontrado. Crie seu primeiro flashcard!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {flashcards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="perspective-1000"
            >
              <div
                className={`relative h-64 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
                  flippedCards.has(card.id) ? "rotate-y-180" : ""
                }`}
                onClick={() => handleFlip(card.id)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <Card 
                  className={`absolute inset-0 backface-hidden ${card.revisado ? "border-blue-300" : ""}`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {materias.find(m => m.id === card.materia_id)?.nome || 'Sem matéria'}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[card.dificuldade]}`}>
                        {difficultyLabels[card.dificuldade]}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-lg font-medium text-center">{card.pergunta}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleReviewed(card.id); }}
                        className={`flex items-center gap-1 text-sm ${card.revisado ? "text-blue-600" : "text-muted-foreground"}`}
                      >
                        <Check className="w-4 h-4" />
                        {card.revisado ? "Revisado" : "Marcar"}
                      </button>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleEdit(card); }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2 text-muted-foreground">
                      <RotateCw className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* Back */}
                <Card 
                  className="absolute inset-0 bg-primary text-primary-foreground rotate-y-180 backface-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="text-xs opacity-70 mb-2">Resposta</div>
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-lg text-center">{card.resposta}</p>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-70">
                      <RotateCw className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
