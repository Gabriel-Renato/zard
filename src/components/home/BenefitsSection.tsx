import { motion } from "framer-motion";
import { Check, Sparkles, Target, Clock, BarChart3, Shield } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Aprendizado Focado",
    description: "Concentre-se no que realmente importa com flashcards direcionados ao seu objetivo.",
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Estude de forma mais eficiente e reduza o tempo necessário para memorizar conteúdos.",
  },
  {
    icon: BarChart3,
    title: "Acompanhe seu Progresso",
    description: "Visualize estatísticas detalhadas do seu desempenho e evolução nos estudos.",
  },
  {
    icon: Sparkles,
    title: "Interface Intuitiva",
    description: "Design limpo e moderno que torna o estudo mais agradável e produtivo.",
  },
  {
    icon: Shield,
    title: "Dados Seguros",
    description: "Seus flashcards e progresso estão sempre protegidos e sincronizados.",
  },
  {
    icon: Check,
    title: "Acesso Multiplataforma",
    description: "Estude de qualquer dispositivo, a qualquer hora, em qualquer lugar.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Por que escolher o Zard?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra os benefícios que fazem do Zard a melhor plataforma de estudos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-float p-8 h-full group-hover:border-primary/30 border-2 border-transparent">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
