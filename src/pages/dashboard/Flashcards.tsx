import { useState } from "react";
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

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  reviewed: boolean;
}

const initialFlashcards: Flashcard[] = [
  { id: 1, question: "O que é o princípio da legalidade?", answer: "O princípio que estabelece que a Administração Pública só pode fazer o que a lei permite.", subject: "Direito Constitucional", difficulty: "medium", reviewed: false },
  { id: 2, question: "Qual a diferença entre sujeito e predicado?", answer: "Sujeito é o termo sobre o qual se declara algo; predicado é o que se declara sobre o sujeito.", subject: "Português", difficulty: "easy", reviewed: true },
  { id: 3, question: "O que é uma proposição simples?", answer: "É uma sentença declarativa que pode ser classificada como verdadeira ou falsa.", subject: "Raciocínio Lógico", difficulty: "easy", reviewed: false },
];

const subjects = ["Direito Constitucional", "Português", "Raciocínio Lógico", "Direito Administrativo"];

const difficultyColors = {
  easy: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  hard: "bg-red-100 text-red-700 border-red-200",
};

const difficultyLabels = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
    subject: subjects[0],
    difficulty: "medium" as "easy" | "medium" | "hard",
  });
  const { toast } = useToast();

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

  const handleSave = () => {
    if (!newCard.question.trim() || !newCard.answer.trim()) {
      toast({ title: "Erro", description: "Pergunta e resposta são obrigatórias", variant: "destructive" });
      return;
    }

    if (editingCard) {
      setFlashcards(flashcards.map(f => 
        f.id === editingCard.id 
          ? { ...f, ...newCard }
          : f
      ));
      toast({ title: "Flashcard atualizado!" });
    } else {
      const newId = Math.max(...flashcards.map(f => f.id), 0) + 1;
      setFlashcards([...flashcards, { id: newId, ...newCard, reviewed: false }]);
      toast({ title: "Flashcard criado!" });
    }

    setIsDialogOpen(false);
    setEditingCard(null);
    setNewCard({ question: "", answer: "", subject: subjects[0], difficulty: "medium" });
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setNewCard({ 
      question: card.question, 
      answer: card.answer, 
      subject: card.subject, 
      difficulty: card.difficulty 
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setFlashcards(flashcards.filter(f => f.id !== id));
    toast({ title: "Flashcard removido" });
  };

  const toggleReviewed = (id: number) => {
    setFlashcards(flashcards.map(f => 
      f.id === id ? { ...f, reviewed: !f.reviewed } : f
    ));
  };

  const openNewDialog = () => {
    setEditingCard(null);
    setNewCard({ question: "", answer: "", subject: subjects[0], difficulty: "medium" });
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
                  value={newCard.question}
                  onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="answer">Resposta</Label>
                <Textarea
                  id="answer"
                  placeholder="Digite a resposta..."
                  value={newCard.answer}
                  onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Matéria</Label>
                  <Select
                    value={newCard.subject}
                    onValueChange={(value) => setNewCard({ ...newCard, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Dificuldade</Label>
                  <Select
                    value={newCard.difficulty}
                    onValueChange={(value: "easy" | "medium" | "hard") => 
                      setNewCard({ ...newCard, difficulty: value })
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
                  className={`absolute inset-0 backface-hidden ${card.reviewed ? "border-green-300" : ""}`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{card.subject}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[card.difficulty]}`}>
                        {difficultyLabels[card.difficulty]}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-lg font-medium text-center">{card.question}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleReviewed(card.id); }}
                        className={`flex items-center gap-1 text-sm ${card.reviewed ? "text-green-600" : "text-muted-foreground"}`}
                      >
                        <Check className="w-4 h-4" />
                        {card.reviewed ? "Revisado" : "Marcar"}
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
                      <p className="text-lg text-center">{card.answer}</p>
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
    </div>
  );
};

export default FlashcardsPage;
