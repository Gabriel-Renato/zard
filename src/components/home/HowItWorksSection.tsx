import { motion } from "framer-motion";
import { BookOpen, Layers, Brain, Repeat } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Crie suas Matérias",
    description: "Organize seus estudos por disciplinas com cores e ícones personalizados.",
  },
  {
    icon: Layers,
    title: "Adicione Assuntos",
    description: "Divida cada matéria em tópicos específicos para melhor organização.",
  },
  {
    icon: Brain,
    title: "Monte seus Flashcards",
    description: "Crie cartões com perguntas e respostas, tags e níveis de dificuldade.",
  },
  {
    icon: Repeat,
    title: "Revise e Aprenda",
    description: "Use a técnica de repetição espaçada para memorizar de forma duradoura.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Como Funciona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em apenas 4 passos simples, você estará dominando qualquer assunto
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="card-float p-8 h-full hover:shadow-card-hover">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>

                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
