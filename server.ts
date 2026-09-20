import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini initialization
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: AI Clinical Preceptor - Case Analysis & Decision Feedback
app.post("/api/ai/case-preceptor", async (req, res) => {
  try {
    const { caseTitle, caseScenario, userDecision, stage, question } = req.body;
    const ai = getAI();

    if (!ai) {
      // Fallback high-yield preceptor commentary when API key is not yet set
      return res.json({
        feedback: `[Feedback Clínico Pré-estabelecido] Para o caso de "${caseTitle}", sua conduta (${userDecision}) é bem ponderada. Lembre-se que em situações de urgência e alterações hemodinâmicas, a estabilização ABCDE e o ajuste farmacológico criterioso (como vasodilatadores ou inotrópicos) precedem intervenções de maior tempo. Na anatomia vascular correspondente, atente-se para os ramos coronarianos ou leito esplâncnico envolvidos.`,
        pearl: "Pérola de Residência: Farmacocinética de meia-vida rápida é prioritária na fase aguda hospitalar.",
        nextStep: "Reavaliar sinais vitais e gasometria arterial em 15 minutos."
      });
    }

    const prompt = `Você é um preceptor médico sênior de residência médica renomado no Brasil (especialista em Clínica Médica, Farmacologia e Anatomia Cirúrgica).
Analise a resposta do estudante de medicina no seguinte caso clínico:
Caso: ${caseTitle}
Cenário: ${caseScenario}
Etapa: ${stage || 'Conduta'}
Pergunta: ${question || 'Qual a conduta prioritária?'}
Decisão do Estudante: ${userDecision}

Forneça uma resposta estruturada em JSON com:
- feedback: análise detalhada da conduta, correlações farmacológicas dos medicamentos escolhidos (mecanismo de ação, efeitos colaterais, contraindicações) e marcos anatômicos relevantes envolvidos.
- isAppropriate: boolean indicando se a conduta foi excelente/adequada ou necessita correção.
- pearl: "Pérola da Residência" (dica de ouro cobrada nas provas como USP, UNIFESP, ENARE).
- anatomicalNote: correlação anatômica direta crucial para procedimentos ou fisiopatologia.
- pharmacologicalNote: correlação farmacológica rigorosa (ex: receptores, interações medicamentosas).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch {
      res.json({ feedback: text, pearl: "Considere sempre a fisiopatologia e interações medicamentosas de primeira linha." });
    }
  } catch (error: any) {
    console.error("Error in case-preceptor:", error);
    res.status(500).json({
      error: "Erro ao consultar preceptor de IA",
      feedback: "Excelente raciocínio clínico. Continue correlacionando o mecanismo farmacológico com a anatomia topográfica do paciente.",
    });
  }
});

// API: AI Residency Mentorship & Weekly Audit
app.post("/api/ai/mentorship-plan", async (req, res) => {
  try {
    const { studentName, anatomyScore, pharmaScore, weakTopics, totalReviewed } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        summary: `Plano Semanal Personalizado para ${studentName || 'Estudante de Medicina'}: Foco em elevar o rendimento em ${weakTopics?.join(", ") || "Farmacologia Autonômica e Anatomia do Mediastino"}.`,
        diagnosis: "Identificamos boa retenção em conceitos de fisiologia geral, porém necessidade de reforço em doses críticas de drogas vasoativas e acidentes vasculares anatômicos.",
        weeklyGoals: [
          "Revisar 40 flashcards diários com algoritmo SM-2",
          "Executar 1 simulado cronometrado de 15 questões focado nas bancas ENARE e USP",
          "Resolver 3 casos clínicos com ênfase em emergências hipertensivas e bloqueio neuromuscular",
          "Exportar deck semanal atualizado para o Anki para revisão nos plantões"
        ],
        specialistAdvice: "Nas provas de residência, mais de 28% das questões interdisciplinares conectam anatomia topográfica a intervenções cirúrgicas ou farmacológicas de urgência. Priorize correlação clínica!",
      });
    }

    const prompt = `Você é o coordenador de mentoria médica para aprovação em Residência Médica (estilo Medcurso/Sanar/Hardwork).
Gere uma auditoria de mentoria e prescrição semanal para o estudante:
Nome: ${studentName || 'Estudante'}
Desempenho em Anatomia: ${anatomyScore || 70}%
Desempenho em Farmacologia: ${pharmaScore || 65}%
Tópicos com mais erros: ${weakTopics?.join(', ') || 'Plexo braquial, Betabloqueadores, Inibidores de ECA'}
Flashcards revisados no ciclo: ${totalReviewed || 120}

Retorne um JSON com:
- summary: resumo executivo do momento de estudo
- diagnosis: diagnóstico pedagógico das vulnerabilidades
- weeklyGoals: lista com 4 a 5 metas práticas e acionáveis para a semana
- highYieldTopics: lista de 4 temas quentes de Anatomia e Farmacologia para dominar agora
- specialistAdvice: conselho de ouro de médico preceptor para retenção de longo prazo`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch {
      res.json({
        summary: "Plano Semanal Gerado",
        diagnosis: text,
        weeklyGoals: ["Revisar cards pendentes", "Fazer 1 simulado de 20 min"],
      });
    }
  } catch (error: any) {
    console.error("Error in mentorship-plan:", error);
    res.status(500).json({ error: "Erro ao gerar plano de mentoria" });
  }
});

// API: Intelligent Error Analysis for Completed Exams
app.post("/api/ai/exam-error-analysis", async (req, res) => {
  try {
    const { examTitle, score, total, percent, weakTopics, missedQuestions } = req.body;
    const ai = getAI();

    // If no AI key, or if AI fails, provide high-yield structured fallback
    if (!ai) {
      const topWeakness = weakTopics?.[0]?.topic || "Fisiopatologia Cardiovascular";
      return res.json({
        executiveSummary: `Auditoria de Desempenho (${percent}% de acerto em ${examTitle}): O estudante demonstrou domínio parcial, porém apresentou concentração significativa de erros nos tópicos de ${weakTopics?.slice(0, 3).map((w: any) => `"${w.topic}" (${w.errorRate}% de erro)`).join(', ') || 'semiologia e emergência'}.`,
        pedagogicDiagnosis: `A análise das questões erradas revela que a principal armadilha foi a diferenciação entre regimes pressóricos agudos e crônicos, bem como a interpretação das repercussões atriais na perda do ritmo sinusal. Em ${topWeakness}, o estudante confundiu mecanismos compensatórios reflexos com a etiologia hemodinâmica primária.`,
        criticalWeaknesses: weakTopics?.slice(0, 4).map((w: any) => ({
          topic: w.topic,
          errorRate: w.errorRate,
          missedCount: w.incorrect,
          guidance: `Revisar detalhadamente os critérios anatômicos e farmacológicos específicos de ${w.topic}.`
        })) || [],
        studyPrescription: [
          `Focar nas pérolas clínicas de ${topWeakness} nas próximas 48 horas.`,
          "Praticar a revisão ativa filtrando apenas as questões incorretas na navegação da prova.",
          "Consultar a Matriz Sinóptica de Valvopatias para comparar visualmente os sopros sistólicos versus diastólicos."
        ],
        residencyPearl: "Nas provas de Residência Médica, bancas como USP, UNIFESP e ENARE costumam penalizar quem confunde o sopro em decrescendo da insuficiência aguda com o sopro holossistólico da crônica. Priorize o tempo de instalação!"
      });
    }

    const prompt = `Você é um preceptor médico sênior e coordenador pedagógico de residência médica no Brasil, especialista em semiologia cardiovascular, valvopatias e medicina intensiva.
Analise os resultados do estudante na prova "${examTitle}":
- Acertos: ${score} de ${total} (${percent}%)
- Tópicos com maior índice de erro:
${weakTopics?.map((w: any, idx: number) => `${idx + 1}. Tema: ${w.topic} | Erros: ${w.incorrect} de ${w.total} (${w.errorRate}%)`).join('\n') || 'Geral'}

Amostra de questões que o estudante errou:
${missedQuestions?.slice(0, 4).map((q: any) => `- Enunciado resumido: ${q.statement?.slice(0, 140)}... | Tema: ${q.topic} | Resposta do Aluno: ${q.studentAnswerText || 'Incorreta'} | Resposta Correta: ${q.correctAnswerText} | Pérola: ${q.pearl}`).join('\n') || 'Nenhuma'}

Gere um relatório estruturado em JSON com:
- executiveSummary: Síntese objetiva do desempenho (1 parágrafo motivador e direto).
- pedagogicDiagnosis: Diagnóstico minucioso de onde o raciocínio fisiopatológico do estudante vacilou (explicando os nós conceituais que levaram ao erro).
- criticalWeaknesses: Array de objetos com { topic: string, errorRate: number, missedCount: number, guidance: string } para os 3 ou 4 temas mais críticos.
- studyPrescription: Array de 3 a 4 ações pontuais e acionáveis de estudo para sanar essas deficiências.
- residencyPearl: Dica de ouro de banca examinadora de residência médica direcionada a esses erros.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch {
      res.json({
        executiveSummary: `Análise finalizada: ${score}/${total} acertos.`,
        pedagogicDiagnosis: text,
        criticalWeaknesses: [],
        studyPrescription: ["Revisar as questões erradas com foco nas justificativas do professor."],
        residencyPearl: "Atenção máxima às manobras dinâmicas de ausculta e regimes agudos."
      });
    }
  } catch (error: any) {
    console.error("Error in exam-error-analysis:", error);
    res.status(500).json({ error: "Erro ao processar análise de erros" });
  }
});

// API: Generate Custom Medical Flashcards (Anki ready)
app.post("/api/ai/generate-flashcards", async (req, res) => {
  try {
    const { topic, focusArea, count = 5 } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        cards: [
          {
            front: `Qual a principal indicação e contraindicação dos Inibidores da ECA no contexto de ${topic || 'Cardiologia'}?`,
            back: "Indicação: HAS, Insuficiência Cardíaca com FE reduzida, Nefroproteção no Diabetes.\nContraindicação: Estenose bilateral de artéria renal, gravidez, história de angioedema.",
            subspecialty: "Farmacologia Cardiovascular",
            clinicalPearl: "A tosse seca decorre do acúmulo de bradicinina.",
            ankiTags: "farmacologia ieca cardiologia residencia"
          },
          {
            front: `Quais estruturas formam o trígono de Koch e qual sua relevância anatômica?`,
            back: "Limites: Tendão de Todaro, óstio do seio coronário e cúspide septal da valva tricúspide.\nRelevância: Localização do Nó Atrioventricular (AV); risco de bloqueio em ablações.",
            subspecialty: "Anatomia Cardíaca",
            clinicalPearl: "Ponto crítico em eletrofisiologia para evitar BAV total.",
            ankiTags: "anatomia cardio trigono_koch residencia"
          }
        ]
      });
    }

    const prompt = `Gere ${count} flashcards médicos de alta complexidade estilo Anki para estudante de medicina.
Tema: ${topic}
Foco: ${focusArea || 'Anatomia e Farmacologia'}

Retorne um JSON com a propriedade "cards", contendo uma lista de objetos:
- front: pergunta concisa e instigante sobre anatomia ou farmacologia
- back: resposta direta e fundamentada
- subspecialty: subárea médica (ex: Neuroanatomia, Farmacologia Autonômica, Farmacologia Renal)
- clinicalPearl: pérola clínica para residência
- ankiTags: tags separadas por espaço (ex: "anatomia plexo_braquial residencia")`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch {
      res.json({ cards: [] });
    }
  } catch (error: any) {
    console.error("Error generating flashcards:", error);
    res.status(500).json({ error: "Erro ao gerar flashcards" });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SynapseMed Server running on http://localhost:${PORT}`);
  });
}

startServer();
