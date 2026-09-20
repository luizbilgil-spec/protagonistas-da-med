import { Flashcard, QuestionAlternative } from '../types';
import { VALVOPATHY_EASY_EXAM } from './valvopathyEasyExam';
import { VALVOPATHY_MEDIUM_EXAM } from './valvopathyMediumExam';
import { VALVOPATHY_HARD_EXAM } from './valvopathyHardExam';

export { VALVOPATHY_EASY_EXAM, VALVOPATHY_MEDIUM_EXAM, VALVOPATHY_HARD_EXAM };

export interface ValvopathyExamQuestion {
  id: string;
  questionNumber: number;
  subject: string;
  topic: string;
  caderno?: string;
  difficulty?: 'facil' | 'media' | 'dificil';
  difficultyLabel?: 'Fácil' | 'Média' | 'Difícil';
  statement: string;
  clinicalContext?: string;
  alternatives: QuestionAlternative[];
  professorCorrection: {
    correctOptionId: string;
    summaryTitle: string;
    clinicalPearl: string;
    detailedExplanation: string;
    distractorAnalysis: string;
    anatomicalAndPharmacologicalNotes?: string;
  };
}

// =========================================================================
// CADERNO A: CENÁRIOS CLÍNICOS AGUDOS, EMERGÊNCIA E TERAPIA INTENSIVA (10Q)
// =========================================================================
export const VALVOPATHY_QUESTIONS_SET_A: ValvopathyExamQuestion[] = [
  {
    id: 'cad-a-q01',
    questionNumber: 1,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Semiologia Cardiovascular & Ritmo Cardíaco',
    topic: 'Fisiopatologia da Quarta Bulha (B4) e Fibrilação Atrial na Emergência',
    statement: `Um paciente de 72 anos com histórico de hipertensão arterial sistêmica de longa data mal controlada dá entrada na sala de emergência com quadro de dor precordial atípica e cansaço. A monitorização cardíaca e o ECG de 12 derivações revelam Fibrilação Atrial aguda com resposta ventricular média de 135 bpm. 

O residente de clínica médica realiza o exame físico cardiovascular e anota em prontuário: "Presença de galope telediastólico com Quarta Bulha (B4) nítida em ápice, indicando sobrecarga pressórica crônica do ventrículo esquerdo". 

Com base na semiogênese das bulhas cardíacas e na mecânica atrioventricular, a anotação do residente está:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Correta, pois a presença de hipertensão crônica sempre preserva a quarta bulha independente do ritmo cardíaco do paciente.',
        isCorrect: false,
        explanation: 'Incorreta. A gênese acústica de B4 depende obrigatoriamente de uma contração mecânica atrial coordenada e vigorosa no final da diástole.'
      },
      {
        id: 'alt-b',
        text: 'Incorreta, pois a quarta bulha (B4) decorre exclusivamente da sístole atrial mecânica ejetando sangue contra um ventrículo rígido; na fibrilação atrial não há contração atrial organizada, sendo impossível auscultar B4.',
        isCorrect: true,
        explanation: 'Correta. A B4 (ruído telediastólico / pré-sistólico) exige o "kick" ou sístole mecânica do átrio impulsionando sangue contra a parede ventricular hipertrofiada e de complacência reduzida. Na FA, o miocárdio atrial despolariza desordenadamente sem contração mecânica eficaz, tornando a gênese de B4 absolutamente impossível.'
      },
      {
        id: 'alt-c',
        text: 'Correta, porém B4 só é audível na fibrilação atrial quando a frequência ventricular for superior a 120 bpm.',
        isCorrect: false,
        explanation: 'Incorreta. Frequências elevadas na FA podem gerar fusão de ruídos ou B3, mas jamais B4 pela ausência de sístole atrial.'
      },
      {
        id: 'alt-d',
        text: 'Incorreta, pois B4 é um ruído protodiastólico de enchimento ventricular rápido gerado pelo fechamento tardio da valva mitral.',
        isCorrect: false,
        explanation: 'Incorreta. O ruído protodiastólico de enchimento rápido é a Terceira Bulha (B3), não a B4.'
      },
      {
        id: 'alt-e',
        text: 'Incorreta, pois B4 só ocorre na presença de regurgitação mitral grave com sobrecarga volumétrica excêntrica.',
        isCorrect: false,
        explanation: 'Incorreta. Regurgitação mitral causa sobrecarga de volume gerando B3, e não B4.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Semiogênese de B4 e Impossibilidade Fisiológica na Fibrilação Atrial',
      clinicalPearl: 'Regra de ouro das bulhas: Se o paciente está em Fibrilação Atrial, É IMPOSSÍVEL EXISTIR B4! Se você auscultou um galope na FA, ou é uma B3 (galope protodiastólico) ou houve erro semiológico de interpretação.',
      detailedExplanation: `• Gênese de B4: Som de baixa frequência gerado no terço final da diástole (telediástole / pré-sístole). Ocorre quando a sístole atrial (contração ativa do átrio) projeta sangue sob pressão contra uma câmara ventricular de complacência reduzida (ventrículo rígido, hipertrofia concêntrica por HAS ou estenose aórtica).
• Efeito da Fibrilação Atrial: Na FA, há perda completa da contração mecânica atrial coordenada ("kick atrial"). Sem sístole atrial mecânica, não há impacto de fluxo pré-sistólico e, portanto, B4 simplesmente não pode existir.
• Além de B4, na FA também desaparece a onda 'a' do pulso venoso jugular e o reforço pré-sistólico do sopro da estenose mitral!`,
      distractorAnalysis: 'O distrator D tenta confundir a B4 (telediastólica de contração atrial) com a B3 (protodiastólica de enchimento rápido). O distrator A ignora a mecânica da câmara atrial na fibrilação.',
      anatomicalAndPharmacologicalNotes: 'No controle agudo da frequência cardíaca na FA com resposta ventricular elevada e disfunção ventricular, empregam-se betabloqueadores (como esmolol ou metoprolol) ou bloqueadores de canal de cálcio não-di-hidropiridínicos (diltiazem) se a fração de ejeção estiver preservada.'
    }
  },
  {
    id: 'cad-a-q02',
    questionNumber: 2,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Semiologia Cardiovascular & Fisiopatologia de IC',
    topic: 'Semiogênese da Terceira Bulha (B3) no Paciente Descompensado',
    statement: `Um homem de 59 anos com miocardiopatia dilatada idiopática (fração de ejeção do ventrículo esquerdo de 24%) é internado na UTI coronariana por insuficiência cardíaca congestiva descompensada com perfil hemodinâmico B (quente e úmido). À ausculta cardíaca no ápice com a campânula do estetoscópio, o médico identifica um som de baixa frequência logo após a segunda bulha cardíaca (ritmo de galope ventricular). 

A respeito da fisiopatologia e do momento cronológico exato em que esse som adicional é produzido, assinale a afirmativa correta:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Ocorre na protodiástole durante a fase de enchimento ventricular rápido, refletindo sobrecarga de volume e desaceleração súbita do influxo sanguíneo em um miocárdio dilatado.',
        isCorrect: true,
        explanation: 'Correta. A terceira bulha (B3) surge no início da diástole (protodiástole), cerca de 0,12 a 0,18 segundos após B2, coincidindo com a fase de enchimento ventricular rápido. É o marco acústico clássico de sobrecarga de volume, disfunção sistólica com fração de ejeção deprimida e pressões de enchimento esquerdas elevadas (Pcap > 20 mmHg).'
      },
      {
        id: 'alt-b',
        text: 'Ocorre na telediástole gerado pela contração vigorosa do átrio esquerdo impulsionando o sangue contra o ventrículo hipertrofiado concêntrico.',
        isCorrect: false,
        explanation: 'Incorreta. Essa descrição corresponde à quarta bulha (B4), que é telediastólica e expressa sobrecarga pressórica/disfunção diastólica.'
      },
      {
        id: 'alt-c',
        text: 'Ocorre no meio da sístole decorrente da abertura sob alta pressão da valva aórtica calcificada.',
        isCorrect: false,
        explanation: 'Incorreta. A abertura da valva aórtica estenosada produz clique ou estalido de ejeção aórtico, no início da sístole.'
      },
      {
        id: 'alt-d',
        text: 'Ocorre na mesodiástole gerado pelo fechamento tardio e redundante da valva pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. O atraso do fechamento pulmonar causa desdobramento de B2, não B3.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Mecanismo da Terceira Bulha (B3): Enchimento Rápido Protodiastólico e Sobrecarga de Volume',
      clinicalPearl: 'Mnemônico fonético: B3 = "Ken-tuc-ky" (TUM-tá-tá). Ocorre logo após B2 (protodiástole), significando VENTRÍCULO DILATADO, SOBRECARGA DE VOLUME e DISFUNÇÃO SISTÓLICA!',
      detailedExplanation: `• Momento do Ciclo Cardíaco: Protodiástole (fase inicial da diástole).
• Fisiopatologia de B3: Logo após a abertura da valva mitral, o sangue represado no átrio sob alta pressão entra em turbilhão rápido no ventrículo esquerdo. Quando essa coluna volumosa de sangue desacelera subitamente de encontro às paredes miocárdicas complacentes e dilatadas, as estruturas ventriculares entram em vibração de baixa frequência, gerando a B3.
• Significado Clínico: No paciente adulto > 40 anos, B3 é o sinal semiológico mais específico de disfunção sistólica ventricular esquerda e elevação da pressão capilar pulmonar (> 20 mmHg), sendo excelente parâmetro para guiar desmame de diuréticos e vasodilatadores.`,
      distractorAnalysis: 'Distratores comuns tentam inverter B3 (protodiástole / enchimento rápido / volume) com B4 (telediástole / sístole atrial / pressão).'
    }
  },
  {
    id: 'cad-a-q03',
    questionNumber: 3,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Valvopatias & Hemodinâmica',
    topic: 'Estenose Aórtica: Pulso Parvus et Tardus, Sopro em Diamante e Sobrecarga de Pressão',
    statement: `Um senhor de 66 anos comparece à consulta com queixa de cansaço progressivo e dor no peito aos esforços. Ao examiná-lo, o médico nota:
• Pulso carotídeo com ascensão vagarosa e amplitude marcadamente diminuída;
• À palpação precordial: Ictus de VE no 5º EICE na linha hemiclavicular, sustentado, sem desvio lateral significativo;
• À ausculta: Sopro mesossistólico em diamante (crescendo-decrescendo) audível no 2º EICD com irradiação para os vasos da base cervical, acompanhado de quarta bulha (B4).

Diante desses achados, assinale a opção que define corretamente o tipo de pulso arterial periférico, a característica do sopro e o mecanismo miocárdico predominante:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Pulso em martelo d\'água (Corrigan); sopro holossistólico em platô; sobrecarga volumétrica excêntrica.',
        isCorrect: false,
        explanation: 'Incorreta. Pulso de Corrigan e sobrecarga volumétrica são característicos da insuficiência aórtica.'
      },
      {
        id: 'alt-b',
        text: 'Pulso parvus et tardus; sopro mesossistólico ejetivo; sobrecarga pressórica concêntrica do ventrículo esquerdo.',
        isCorrect: true,
        explanation: 'Correta. A estenose aórtica gera pulso parvus et tardus (pequeno e lento), sopro ejetivo em diamante no foco aórtico e sobrecarga de pressão crônica com hipertrofia concêntrica do miocárdio, manifestada pela B4.'
      },
      {
        id: 'alt-c',
        text: 'Pulso bisfiriens; sopro diastólico aspirativo; sobrecarga volumétrica pura com dilatação biventricular.',
        isCorrect: false,
        explanation: 'Incorreta. Pulso bisfiriens e sopro diastólico aspirativo ocorrem na dupla lesão aórtica ou insuficiência aórtica pura.'
      },
      {
        id: 'alt-d',
        text: 'Pulso dicrotico; sopro contínuo em maquinaria; sobrecarga pressórica da artéria pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. Sopro em maquinaria é típico da persistência do canal arterial (PCA).'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Estenose Aórtica: Pulso Parvus et Tardus e Hipertrofia Concêntrica por Sobrecarga de Pressão',
      clinicalPearl: 'Associação obrigatória: Estenose Aórtica = Sobrecarga de PRESSÃO = Hipertrofia CONCÊNTRICA = B4 + Pulso PARVUS ET TARDUS + Sopro mesossistólico em diamante.',
      detailedExplanation: `1. Pulso Parvus et Tardus: Decorre da obstrução mecânica fixa da valva aórtica calcificada. A ejeção do ventrículo esquerdo é prolongada e enfrenta resistência máxima, de modo que a onda carotídea atinge um pico amortecido e atrasado.
2. Sopro Ejetivo: Formato crescendo-decrescendo (em diamante). Inicia-se após a abertura valvar aórtica, atinge o ápice de intensidade no meio da sístole e encerra-se antes do componente aórtico de B2.
3. Sobrecarga de Pressão: A elevação da pós-carga estimula a replicação de sarcômeros em paralelo, gerando hipertrofia concêntrica com preservação inicial da cavidade. A diminuição da complacência ventricular exige contração atrial vigorosa, gerando a Quarta Bulha (B4).`,
      distractorAnalysis: 'Confundir sobrecarga de pressão (estenose) com sobrecarga de volume (insuficiência) é a principal pegadinha em exames práticos e teóricos de valvopatias.'
    }
  },
  {
    id: 'cad-a-q04',
    questionNumber: 4,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Oncologia Clínica & Cardiologia',
    topic: 'Cardiopatia Carcinoide: Mecanismo de Acometimento Valvar Direito e Blindagem Esquerda',
    statement: `Um paciente de 61 anos com diagnóstico de tumor neuroendócrino de íleo terminal e múltiplas metástases hepáticas volumosas é avaliado na enfermaria de oncologia. Apresenta crises diárias de flushing facial súbito, hipotensão, diarreia profusa e telangiectasias malares. 

O ecocardiograma transtorácico evidencia espessamento fibroso intenso com retração e imobilização das cúspides da valva tricúspide e pulmonar, determinando dupla lesão tricúspide com insuficiência tricúspide grave e estenose pulmonar moderada. As valvas mitral e aórtica encontram-se estrutural e funcionalmente intactas.

Qual é a explicação fisiopatológica exata para que a cardiopatia carcinoide acometa seletivamente as valvas do coração direito e poupe o coração esquerdo?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A serotonina liberada pelas metástases hepáticas na veia cava banha diretamente as cavidades direitas, sendo posteriormente inativada pela enzima monoamina oxidase (MAO) durante sua passagem pelo endotélio vascular pulmonar antes de atingir as câmaras esquerdas.',
        isCorrect: true,
        explanation: 'Correta. As metástases hepáticas secretam serotonina, bradicinina e taquicininas diretamente nas veias hepáticas e na veia cava inferior, atingindo o coração direito sem depuração portal prévia. As câmaras direitas sofrem estímulo fibroblástico endocárdico (via receptores 5-HT2B). Ao cruzar a circulação pulmonar, a serotonina é extensamente captada e degradada pela monoamina oxidase (MAO) endotelial pulmonar, blindando as valvas mitral e aórtica.'
      },
      {
        id: 'alt-b',
        text: 'As valvas esquerdas não expressam receptores para serotonina devido à maior espessura mecânica do endotélio aórtico e mitral.',
        isCorrect: false,
        explanation: 'Incorreta. As cúspides esquerdas possuem os mesmos receptores e também são lesadas se houver shunt direita-esquerda (como FOP) ou tumor primário brônquico pulmonar.'
      },
      {
        id: 'alt-c',
        text: 'O coração direito possui pressão arterial mais elevada que o coração esquerdo, facilitando a adesão plaquetária de serotonina.',
        isCorrect: false,
        explanation: 'Incorreta. As cavidades direitas são de baixa pressão (circulação de baixa resistência).'
      },
      {
        id: 'alt-d',
        text: 'O tumor primário do íleo drena diretamente para a artéria pulmonar através do ducto torácico, desviando-se das câmaras esquerdas.',
        isCorrect: false,
        explanation: 'Incorreta. A drenagem neoplásica metastática atinge a veia cava pelas veias hepáticas.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Cardiopatia Carcinoide: Lesão Valvar Direita e Inativação Pulmonar pela MAO',
      clinicalPearl: 'Filtro Pulmonar da Serotonina: O endotélio pulmonar é rico em Monoamina Oxidase (MAO), que destrói a serotonina antes que ela alcance o coração esquerdo! Logo, Cardiopatia Carcinoide acomete Valva Tricúspide e Pulmonar (Coração Direito)!',
      detailedExplanation: `• Patogênese: Em tumores carcinoides intestinais sem metástase hepática, a serotonina cai na veia porta e é totalmente degradada pelo fígado (não há síndrome carcinoide sistêmica).
• Quando surgem metástases hepáticas: A serotonina é sintetizada diretamente nos nódulos secundários do parênquima hepático e cai na circulação sistêmica venosa (veias hepáticas -> veia cava inferior -> átrio e ventrículo direitos).
• Fibrose Endocárdica: A serotonina estimula os receptores 5-HT2B nos miofibroblastos subendocárdicos, estimulando a síntese desgovernada de colágeno. Causa fusão, espessamento e retração das cúspides da tricúspide e pulmonar (Insuficiência Tricúspide + Insuficiência/Estenose Pulmonar).
• Por que poupa o lado esquerdo? A rede capilar dos pulmões possui alta densidade de Monoamina Oxidase (MAO) e transportadores SERT, degradando mais de 80-90% da serotonina em ácido 5-hidroxi-indolacético (5-HIAA). O sangue chega no átrio esquerdo livre de serotonina ativa.
• Exceções onde o lado esquerdo é acometido: Se houver forame oval patente (shunt D-E) ou se o tumor carcinoide for primário do pulmão (brônquico).`,
      distractorAnalysis: 'Cobrança clássica de patologia clínica: entender a metabolização pulmonar e o trajeto circulatório venoso.'
    }
  },
  {
    id: 'cad-a-q05',
    questionNumber: 5,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Farmacologia, Bioquímica & Nutrição Clínica',
    topic: 'Pelagra Secundária ao Tumor Carcinoide: Sequestro do Triptofano',
    statement: `Um paciente de 58 anos com síndrome carcinoide avançada dá entrada no ambulatório de gastroenterologia apresentando lesões cutâneas hiperpigmentadas, eritematosas, descamativas e dolorosas com distribuição simétrica no dorso das mãos e na região cervical ("Colar de Casal"), além de diarreia aquosa crônica e episódios frequentes de confusão mental e alucinações auditivas. 

A respeito da correlação bioquímica entre o tumor carcinoide e o surgimento dessa síndrome pelagróide, assinale a opção que elucida corretamente a carência vitamínica e seu mecanismo:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Deficiência de Niacina (Vitamina B3), resultante do desvio massivo do aminoácido essencial triptofano para a síntese neoplásica de serotonina em detrimento da produção endógena de niacina.',
        isCorrect: true,
        explanation: 'Correta. Fisiologicamente, 99% do triptofano da dieta é destinado à produção de niacina (Vitamina B3) e síntese proteica. No tumor carcinoide, até 70-80% de todo o triptofano é sequestrado pelas células tumorais para produzir serotonina. Sem triptofano disponível, ocorre deficiência grave de niacina, desencadeando a clássica tríade da Pelagra (Dermatite, Diarreia e Demência).'
      },
      {
        id: 'alt-b',
        text: 'Deficiência de Tiamina (Vitamina B1), causada pela inibição da fosforilação de tiamina-pirofosfato por metabólitos da histamina.',
        isCorrect: false,
        explanation: 'Incorreta. Deficiência de B1 causa beribéri ou encefalopatia de Wernicke, e não pelagra.'
      },
      {
        id: 'alt-c',
        text: 'Deficiência de Cobalamina (Vitamina B12), decorrente da destruição das células parietais gástricas por imunocomplexos tumorais.',
        isCorrect: false,
        explanation: 'Incorreta. Deficiência de B12 causa anemia megaloblástica e degeneração combinada subaguda da medula.'
      },
      {
        id: 'alt-d',
        text: 'Deficiência de Piridoxina (Vitamina B6), devida ao bloqueio do transporte jejunal mediado por gastrina excessiva.',
        isCorrect: false,
        explanation: 'Incorreta. O desvio metabólico no tumor carcinoide é do triptofano afetando a síntese de niacina (B3).'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Pelagra Secundária ao Carcinoide: O Roubo Metabólico do Triptofano e Depleção de Niacina (B3)',
      clinicalPearl: 'Fisiopatologia da Pelagra no Carcinoide: Triptofano vira 100% SEROTONINA no tumor -> Zera a produção de NIACINA (Vitamina B3) -> Tríade dos 3Ds da Pelagra: Dermatite fotossensível (Colar de Casal), Diarreia e Demência!',
      detailedExplanation: `• Metabolismo Normal: O triptofano é um aminoácido essencial. Em condições normais, apenas 1% é convertido em serotonina pelas células enterocromafins e neurônios; os outros 99% são canalizados para a via da quinurenina, sintetizando Niacina (Vitamina B3 / NAD/NADP) e proteínas corporais.
• No Tumor Carcinoide: As células neoplásicas neuroendócrinas hiperativam a enzima triptofano hidroxilase, desviando até 70% a 80% de todo o pool corporal de triptofano exclusivamente para a rota da 5-hidroxitriptamina (serotonina).
• Consequência: Ocorre colapso da síntese endógena de niacina. A deficiência de B3 compromete os sistemas celulares de alta taxa de turnover (pele, trato gastrointestinal e sistema nervoso central), gerando a Pelagra clássica (Dermatite fotossensível com o típico "Colar de Casal", Diarreia crônica e Demência com encefalopatia).`,
      distractorAnalysis: 'Lembrar sempre do trio Niacina / Vitamina B3 / Triptofano. Vitaminas B1, B6 e B12 são distratores clássicos em questões de carências vitamínicas.'
    }
  },
  {
    id: 'cad-a-q06',
    questionNumber: 6,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Valvopatias & Hipertensão Pulmonar',
    topic: 'Sopro de Graham Steell: Regurgitação Pulmonar Funcional de Alta Pressão na Estenose Mitral',
    statement: `Uma mulher de 42 anos com estenose mitral pós-reumática grave não tratada evolui com dispneia progressiva aos mínimos esforços e tosse seca. O cateterismo cardíaco direito confirma Hipertensão Arterial Pulmonar pré e pós-capilar grave, com pressão sistólica de artéria pulmonar de 82 mmHg. 

Ao exame cardiovascular da paciente:
• Ápice: B1 hiperfonética, estalido de abertura e ruflar diastólico com duração prolongada;
• Foco pulmonar (2º espaço intercostal esquerdo): B2 hiperfonética com P2 audível inclusive no ápice, acompanhada de um sopro diastólico precoce de alta frequência, suave, em decrescendo, aspirativo. Os pulsos periféricos são finos e não há sinais de pulso colapsante.

O sopro diastólico aspirativo no foco pulmonar e a sua denominação epônima correta correspondem a:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Insuficiência aórtica funcional associada (Sopro de Austin Flint).',
        isCorrect: false,
        explanation: 'Incorreta. Austin Flint é um sopro diastólico apical gerado pela regurgitação aórtica empurrando a cúspide mitral anterior.'
      },
      {
        id: 'alt-b',
        text: 'Regurgitação da valva pulmonar decorrente da dilatação do anel valvar pulmonar secundária à grave hipertensão pulmonar (Sopro de Graham Steell).',
        isCorrect: true,
        explanation: 'Correta. O sopro de Graham Steell é um sopro diastólico precoce aspirativo no foco pulmonar (2º EICE) que surge em decorrência da incompetência funcional da valva pulmonar provocada por extrema dilatação do tronco pulmonar e de seu anel fibroso devido à grave hipertensão pulmonar associada à estenose mitral.'
      },
      {
        id: 'alt-c',
        text: 'Estenose congênita da artéria pulmonar com refluxo telediastólico (Sopro de Gibson).',
        isCorrect: false,
        explanation: 'Incorreta. Sopro de Gibson é o sopro contínuo em maquinaria da persistência do canal arterial.'
      },
      {
        id: 'alt-d',
        text: 'Valvulite reumática ativa da valva tricúspide (Sopro de Carey Coombs).',
        isCorrect: false,
        explanation: 'Incorreta. Carey Coombs é o ruflar apical transitório da cardite reumática aguda.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Sopro de Graham Steell: Regurgitação Pulmonar de Alta Pressão por Hipertensão Pulmonar',
      clinicalPearl: 'Sopro de Graham Steell = Sopro DIASTÓLICO precoce aspirativo no FOCO PULMONAR (2º EICE). Decorre de insuficiência pulmonar funcional pela dilatação da artéria pulmonar na Hipertensão Pulmonar severa (secundária à Estenose Mitral)!',
      detailedExplanation: `• Mecanismo Hemodinâmico: A estenose mitral grave restringe o fluxo atrioventricular esquerdo -> estase venocapilar pulmonar crônica -> remodelamento arterial e arteriolar pulmonar -> Hipertensão Pulmonar Grave (PSAP > 60-80 mmHg).
• Com a elevação drástica da pressão na artéria pulmonar, o tronco e o anel valvar pulmonar se dilatam progressivamente. As cúspides pulmonares normais passam a não se tocar na diástole (coaptação incompleta), permitindo um jato regurgitante de alta velocidade do tronco pulmonar para o ventrículo direito.
• Esse jato de alta pressão produz o Sopro de Graham Steell: diastólico, aspirativo precoce, localizado no 2º espaço intercostal esquerdo, que pode se intensificar ligeiramente com a inspiração (manobra de Rivero-Carvallo).
• Diferenciação com Insuficiência Aórtica: A IAo produz PA divergente e pulso em martelo d'água; já o Graham Steell cursa com pulsos normais ou finos, e sinais claros de cor pulmonale / hipertrofia de ventrículo direito.`,
      distractorAnalysis: 'Questão de alto rendimento que testa epônimos clássicos da cardiologia (Graham Steell vs. Austin Flint vs. Carey Coombs vs. Gibson).'
    }
  },
  {
    id: 'cad-a-q07',
    questionNumber: 7,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Valvopatias & Fisiopatologia Hemodinâmica',
    topic: 'Fisiopatologia da Síncope aos Esforços na Estenose Aórtica Grave',
    statement: `Um paciente de 69 anos com estenose aórtica calcificada grave (área valvar de 0,7 cm² e gradiente médio de 52 mmHg ao ecocardiograma) sofreu uma perda súbita da consciência com recuperação espontânea em menos de 1 minuto enquanto corria para alcançar um ônibus. 

Considerando os mecanismos fisiopatológicos que desencadeiam a síncope durante a atividade física vigorosa na estenose aórtica, assinale a opção correta:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Ocorre aumento reflexo excessivo da pós-carga sistêmica por vasoconstrição muscular generalizada, impedindo a ejeção ventricular.',
        isCorrect: false,
        explanation: 'Incorreta. Durante o exercício ocorre vasodilatação periférica na musculatura esquelética para receber oxigênio, e não vasoconstrição.'
      },
      {
        id: 'alt-b',
        text: 'A estenose aórtica impõe um débito cardíaco fixo; durante o exercício, a vasodilatação fisiológica dos leitos arteriais musculares reduz a resistência vascular periférica sem que o coração consiga elevar o volume minuto, provocando colapso da pressão arterial média e hipoperfusão cerebral súbita.',
        isCorrect: true,
        explanation: 'Correta. Em corações normais, o débito cardíaco sobe até 3-5 vezes no exercício para suprir os músculos vasodilatados e manter a PAM. Na estenose aórtica grave, a barreira mecânica fixa impede o aumento do volume ejetado (débito fixo). A queda abrupta da RVP sem elevação proporcional do débito faz a pressão arterial sistólica desabar, causando isquemia cerebral transitória e síncope.'
      },
      {
        id: 'alt-c',
        text: 'Ocorre colapso agudo do átrio esquerdo por ausência de enchimento diastólico, gerando parada sinusal transitória.',
        isCorrect: false,
        explanation: 'Incorreta. O átrio esquerdo na estenose aórtica sofre sobrecarga crônica e hipertrofia de parede para vencer a rigidez de VE.'
      },
      {
        id: 'alt-d',
        text: 'Ocorre regurgitação aórtica aguda catastrófica decorrente da avulsão das cordoalhas aórticas induzida pelo estresse de cisalhamento.',
        isCorrect: false,
        explanation: 'Incorreta. A valva aórtica não possui cordoalhas tendíneas.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Síncope na Estenose Aórtica: O Fenômeno do Débito Cardíaco Fixo',
      clinicalPearl: 'Fórmula básica da síncope: PAM = Débito Cardíaco x Resistência Vascular Periférica. No esforço, a RVP despenca pelos músculos em atividade; como a valva estenosada trava o Débito Cardíaco (débito fixo), a PAM cai a zero e o cérebro apaga: síncope!',
      detailedExplanation: `• Hemodinâmica no Exercício: Em indivíduos normais, a ativação simpática e os metabólitos locais (adenosina, lactato, K+) provocam dilatação intensa dos leitos arteriolares da musculatura estriada esquelética, derrubando a RVP. Para evitar hipotensão, o coração saudável eleva a frequência cardíaca e o volume sistólico, aumentando o Débito Cardíaco em até 300-400%.
• Na Estenose Aórtica Grave: A área valvar crítica (< 1,0 cm²) cria uma restrição mecânica inflexível ao fluxo anterógrado. O ventrículo esquerdo é incapaz de aumentar o volume ejetado.
• Como a RVP cai acentuadamente e o Débito permanece fixo, a Pressão Arterial Média sistêmica despenca de forma vertiginosa. A pressão de perfusão cerebral cai abaixo do limiar crítico de autorregulação, ocorrendo perda momentânea da consciência (síncope de esforço).
• Além do débito fixo, reflexos barorreceptores ventriculares de alta pressão (reflexo de Bezold-Jarisch) também podem provocar vasodilatação paradoxal e bradicardia.`,
      distractorAnalysis: 'Lembrar que o exercício produz vasodilatação muscular (e não vasoconstrição) e que valva aórtica não possui cordoalhas (presentes em mitral e tricúspide).'
    }
  },
  {
    id: 'cad-a-q08',
    questionNumber: 8,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Semiometria Cardiovascular & Gravidade Valvar',
    topic: 'Marcadores Semiométricos de Gravidade da Estenose Aórtica no Idoso',
    statement: `Um médico cardiologista avalia no ambulatório três pacientes idosos portadores de sopro sistólico na base cardíaca. Ele deseja determinar clinicamente, antes da realização do ecocardiograma com Doppler, qual paciente apresenta os sinais semiológicos de maior probabilidade de Estenose Aórtica Calcificada Criticamente Grave.

Entre os parâmetros semiométricos descritos a seguir, qual constitui o marcador de exame físico mais fidedigno de área valvar aórtica severamente reduzida?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A intensidade máxima do sopro em decibéis (sopros grau 5+/6+ com frêmito)',
        isCorrect: false,
        explanation: 'Incorreta. Em fases avançadas com disfunção ventricular e fração de ejeção reduzida (estenose aórtica de baixo fluxo e baixo gradiente), o fluxo através da valva é fraco e o sopro pode se tornar quase inaudível (sopro suave ou ausente apesar da estenose crítica).'
      },
      {
        id: 'alt-b',
        text: 'O pico tardio de intensidade máxima do sopro sistólico na segunda metade da sístole e o atraso do pulso carotídeo.',
        isCorrect: true,
        explanation: 'Correta. Em estenoses aórticas leves a moderadas, a ejeção do VE ocorre rapidamente na fase inicial da sístole (pico precoce em diamante). Conforme a área valvar se torna milimétrica (< 0,8 - 1,0 cm²), o ventrículo precisa de toda a sístole para ejetar o volume, fazendo com que o pico do sopro se desloque para o final da sístole (pico tardio). O pulso parvus et tardus e o desdobramento paradoxal de B2 corroboram essa gravidade.'
      },
      {
        id: 'alt-c',
        text: 'A presença de hiperfonese isolada da primeira bulha (B1) auscultada na axila.',
        isCorrect: false,
        explanation: 'Incorreta. B1 hiperfonética é característica de estenose mitral em ápice, e irradiação axilar é de regurgitação mitral.'
      },
      {
        id: 'alt-d',
        text: 'O surgimento de pressão arterial sistêmica amplamente divergente (ex: 180 x 40 mmHg).',
        isCorrect: false,
        explanation: 'Incorreta. PA divergente é marcador de gravidade de Insuficiência Aórtica crônica, enquanto na estenose aórtica a PA tende a ser convergente (ex: 105 x 85 mmHg).'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Semiometria Fina da Estenose Aórtica: O Valor do Pico Tardio do Sopro Sistólico',
      clinicalPearl: 'Atenção aos mitos: A "altura" ou volume do sopro NÃO mede gravidade na estenose aórtica! O marcador mais refinado de gravidade é o PICO TARDIO do sopro (tempo prolongado de ejeção) associado a A2 hipofonético ou ausente e pulso parvus et tardus!',
      detailedExplanation: `• Por que o volume do sopro engana? A intensidade do sopro (classificação de Levine 1 a 6) depende diretamente do Débito Cardíaco e da contratilidade ventricular. Um paciente com estenose aórtica gravíssima e fração de ejeção de 20% tem um fluxo tão lento que seu sopro pode ser grau 1 ou 2/6 ("estenose aórtica silenciosa").
• Por que o Pico Tardio é o padrão-ouro no exame físico? Em orifícios pequenos e rígidos, a velocidade de esvaziamento cai drasticamente. O ventrículo esquerdo consome praticamente toda a sístole para forçar o sangue através da barreira estenótica, atrasando o ápice de pressão máxima para o terço final da sístole (pico telessistólico).
• Outros Marcadores Físicos de Gravidade:
  1. Pulso carotídeo parvus et tardus (pequeno, lento e com frêmito carotídeo);
  2. Apagamento ou desaparecimento do componente aórtico da 2ª bulha (A2 inaudível);
  3. Desdobramento paradoxal de B2 (A2 fecha tão tarde que passa a ocorrer depois do componente pulmonar P2);
  4. Quarta bulha (B4) palpável ou audível em pacientes com ritmo sinusal.`,
      distractorAnalysis: 'Muito cobrado em provas: desmistificar a ideia de que sopro mais alto é sempre o mais grave.'
    }
  },
  {
    id: 'cad-a-q09',
    questionNumber: 9,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Semiologia Cardiovascular Comparada',
    topic: 'Quadro Clínico Comparativo: Sobrecarga, Pulsos e Cardiomegalia nas 4 Valvopatias',
    statement: `Um paciente de 54 anos apresenta palpitações e cansaço aos médios esforços. Ao exame físico, chama atenção do médico uma pressão arterial de 165 x 45 mmHg (pressão de pulso marcadamente divergente), pulso arterial carotídeo e radial com ascensão abrupta seguida de colapso rápido (pulso em martelo d'água ou de Corrigan), ictus de VE desviado para o 6º espaço intercostal esquerdo na linha axilar anterior (difuso e hipercinético) e sopro diastólico aspirativo de alta frequência na borda esternal esquerda. A telerradiografia de tórax revela dilatação maciça de ventrículo esquerdo (cardiomegalia acentuada com silhueta em "cor bovis").

Esse conjunto de achados caracteriza, respectivamente, qual valvopatia e qual tipo de sobrecarga miocárdica?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Estenose Aórtica; sobrecarga pressórica concêntrica pura.',
        isCorrect: false,
        explanation: 'Incorreta. A estenose aórtica cursa com PA convergente, pulso parvus et tardus, hipertrofia concêntrica e silhueta cardíaca com índice cardiotorácico frequentemente normal inicialmente.'
      },
      {
        id: 'alt-b',
        text: 'Insuficiência Aórtica Crônica; sobrecarga volumétrica excêntrica acentuada.',
        isCorrect: true,
        explanation: 'Correta. A insuficiência aórtica crônica é a afecção que produz a maior sobrecarga de volume do coração humano. O refluxo contínuo de grande volume da aorta para o ventrículo esquerdo durante a diástole gera dilatação excêntrica extrema (cor bovis). A rápida fuga diastólica para o VE causa colapso da pressão diastólica, enquanto o grande volume ejetado eleva a pressão sistólica (PA divergente), manifestando-se como pulso em martelo d\'água (Corrigan).'
      },
      {
        id: 'alt-c',
        text: 'Estenose Mitral Reumática; sobrecarga volumétrica isolada do átrio esquerdo com VE hipertrofiado.',
        isCorrect: false,
        explanation: 'Incorreta. Na estenose mitral pura, o ventrículo esquerdo tem volume normal ou reduzido, a PA não é divergente e o pulso não é em martelo d\'água.'
      },
      {
        id: 'alt-d',
        text: 'Insuficiência Mitral Crônica; sobrecarga pressórica pura do ventrículo direito com hipertensão pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. Insuficiência mitral crônica causa sobrecarga de volume em VE e AE com sopro holossistólico na axila, e não pulso de Corrigan e sopro diastólico aspirativo com PA divergente.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Insuficiência Aórtica: Sobrecarga Volumétrica, PA Divergente e Pulso de Corrigan',
      clinicalPearl: 'Quadro exuberante de Insuficiência Aórtica: PA Divergente (160x40 mmHg) + Pulso em Martelo d\'Água (Corrigan) + Sopro Diastólico Aspirativo + Dilatação Excêntrica Extrema (Cor Bovis)!',
      detailedExplanation: `• Sobrecarga de Volume na IAo: Durante cada diástole, o ventrículo esquerdo recebe não apenas o fluxo anterógrado normal vindo do átrio esquerdo, mas também um volume maciço regurgitado de volta da aorta. Isso impõe uma sobrecarga volumétrica excêntrica sem precedentes (adição de sarcômeros em série), resultando nos maiores corações observados na anatomia patológica ("cor bovis" ou coração de boi).
• Fisiopatologia da Pressão Divergente e Pulso de Corrigan:
  - Na sístole: Para compensar o refluxo, o VE ejeta um volume sistólico total gigantesco -> eleva bruscamente a pressão sistólica (> 160 mmHg);
  - Na diástole: O sangue reflui desimpedido para o VE -> a pressão arterial diastólica despenca para níveis extremamente baixos (< 50 ou 40 mmHg).
  - O pulso periférico sobe rapidamente pelo alto volume ejetado e sofre colapso diastólico imediato pela regurgitação e pelo esvaziamento periférico rápido, gerando o pulso em martelo d'água (pulso de Corrigan).`,
      distractorAnalysis: 'A contraposição direta entre sobrecarga de volume (IAo com dilatação excêntrica e PA divergente) e sobrecarga de pressão (EAo com hipertrofia concêntrica e PA convergente) é o pilar da prova.'
    }
  },
  {
    id: 'cad-a-q10',
    questionNumber: 10,
    caderno: 'Caderno A (Emergência & UTI)',
    subject: 'Valvopatias & Obstetrícia de Alto Risco',
    topic: 'Descompensação de Estenose Mitral no 3º Trimestre da Gravidez: Apoplexia Pulmonar e Hemoptise',
    statement: `Uma gestante de 26 anos, primigesta, previamente hígida, na 31ª semana de idade gestacional, é trazida às pressas à emergência obstétrica com queixa de sufocação intensa de início súbito, tosse com expectoração de secreção espumosa avermelhada com estrias de sangue vivo e incapacidade absoluta de permanecer deitada (ortopneia a 90 graus). 

Exame físico: Taquipneica (FR = 32 irpm), sudoreica, SatO2 = 88% em ar ambiente, FC = 120 bpm (taquicardia sinusal). 
Ausculta pulmonar: Estertores crepitantes difusos em ambos os hemitórax até ápices. 
Ausculta cardíaca: Primeira bulha fortemente hiperfonética, seguida de ruído de alta frequência na protodiástole e ruflar diastólico em ápice audível no decúbito.

Assinale a opção que identifica a valvopatia de base e a explicação fisiopatológica para a descompensação catastrófica com hemoptise exatamente nessa fase da gravidez:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Insuficiência aórtica aguda; a vasodilatação placentária provoca choque hemodinâmico com rotura de capilares alveolares.',
        isCorrect: false,
        explanation: 'Incorreta. A insuficiência aórtica é geralmente bem tolerada na gravidez porque a queda fisiológica da resistência vascular periférica reduz a fração de regurgitação aórtica.'
      },
      {
        id: 'alt-b',
        text: 'Estenose mitral reumática; o pico de hipervolemia gestacional (aumento de 40-50% do débito e volume plasmático) associado à taquicardia reduz drasticamente o tempo de diástole, elevando criticamente a pressão venocapilar pulmonar e provocando edema agudo de pulmão e rotura de varizes submucosas brônquicas (apoplexia pulmonar).',
        isCorrect: true,
        explanation: 'Correta. A estenose mitral é a valvopatia mais temida na gestação. O pico de aumento volêmico ocorre no 3º trimestre (28ª a 34ª semanas), somado à taquicardia fisiológica que encurta a diástole (único momento em que o AE esvazia). A pressão atrial esquerda e capilar pulmonar disparam (> 30 mmHg), causando extravasamento alveolar maciço e rotura de colaterais venosas submucosas brônquicas sob alta pressão retrógrada, gerando hemoptise (apoplexia pulmonar).'
      },
      {
        id: 'alt-c',
        text: 'Cardiomiopatia periparto; decorre de necrose inflamatória induzida pela prolactina gerando falência sistólica isolada do VE.',
        isCorrect: false,
        explanation: 'Incorreta. A cardiomiopatia periparto surge no último mês ou no pós-parto, com VE dilatado e hipocinético, e não apresenta B1 hiperfonética ou ruflar diastólico.'
      },
      {
        id: 'alt-d',
        text: 'Estenose aórtica senil; o aumento da pressão arterial sistólica sobrecarrega as artérias brônquicas provocando tosse hemoptoica.',
        isCorrect: false,
        explanation: 'Incorreta. Estenose aórtica senil ocorre em idosos calcificados e a ausculta seria de sopro ejetivo em diamante na base, e não ruflar diastólico com B1 hiperfonética.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Estenose Mitral na Gravidez: O Gatilho do 3º Trimestre e a Apoplexia Pulmonar',
      clinicalPearl: 'Emergência cardiológica obstétrica clássica: Gestante no 3º trimestre com edema agudo de pulmão, escarro hemoptoico (apoplexia pulmonar) e ausculta com B1 hiperfonética e ruflar diastólico = ESTENOSE MITRAL REUMÁTICA DESCOMPENSADA PELA HIPERVOLEMIA E TAQUICARDIA GESTACIONAIS!',
      detailedExplanation: `• Adaptações Cardiovasculares da Gestação:
  1. O volume plasmático e o débito cardíaco aumentam progressivamente em 40% a 50%, atingindo o pico entre a 28ª e 34ª semanas de gestação.
  2. Aumento fisiológico da frequência cardíaca de repouso (+ 15 a 20 bpm).
• O Conflito Fisiopatológico na Estenose Mitral:
  - O sangue só consegue passar do átrio esquerdo para o ventrículo esquerdo durante a DIÁSTOLE.
  - A taquicardia gestacional reduz de modo desproporcional o tempo de enchimento diastólico (a sístole tem duração relativamente fixa).
  - Ter que passar 50% a mais de sangue através de um orifício estreito (< 1,5 cm²) em um tempo de diástole encurtado pela taquicardia eleva exponencialmente o gradiente pressórico transvalvar.
• Gênese da Apoplexia Pulmonar e Hemoptise:
  - A pressão retrógrada no átrio esquerdo ultrapassa 25-30 mmHg e atinge os capilares pulmonares, causando transudação alveolar (edema agudo de pulmão com crepitações difusas e escarro espumoso róseo).
  - Ocorre hipertensão severa no sistema venoso brônquico (plexo de anastomose entre as veias pulmonares e as veias ázigos). Pequenas varizes venosas submucosas da árvore traqueobrônquica ingurgitam-se e rompem-se no lúmen brônquico sob a tosse vigorosa, causando hemoptise viva ("apoplexia pulmonar").
• Conduta Farmacológica: Betabloqueadores cardioseletivos (ex: tartarato de metoprolol) para lentificar a FC e reabrir a janela diastólica, diuréticos venosos e oxigenoterapia.`,
      distractorAnalysis: 'Diferenciar valvopatia reumática de cardiomiopatia periparto e embolia pulmonar pela identificação semiológica de B1 hiperfonética e ruflar diastólico.'
    }
  }
];

// =========================================================================
// CADERNO B: CENÁRIOS AMBULATORIAIS, DIAGNÓSTICO DIFERENCIAL & SEMIOLOGIA FINA (10Q)
// =========================================================================
export const VALVOPATHY_QUESTIONS_SET_B: ValvopathyExamQuestion[] = [
  {
    id: 'cad-b-q01',
    questionNumber: 1,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Semiologia Cardiovascular & Ritmo Cardíaco',
    topic: 'Semiogênese de Bulhas: B3 vs. B4 no Ambulatório de Hipertensão',
    statement: `Um médico atende no ambulatório um paciente de 62 anos hipertenso com ritmo sinusal regular ao eletrocardiograma e hipertrofia concêntrica de ventrículo esquerdo ao ecocardiograma. O médico ausculta um som telediastólico de baixa tonalidade antes de B1 (B4). Duas semanas depois, o mesmo paciente retorna apresentando palpitações agudas e o ECG revela Fibrilação Atrial com resposta ventricular de 110 bpm. Ao reexaminá-lo, o médico nota que o som adicional pré-sistólico desapareceu por completo.

A explicação fisiológica para o desaparecimento do som previamente auscultado após a instalação da arritmia é:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A quarta bulha (B4) desapareceu porque ela depende exclusivamente da contração atrial mecânica coordenada no final da diástole; na fibrilação atrial não há sístole atrial organizada.',
        isCorrect: true,
        explanation: 'Correta. B4 é o som produzido pela sístole mecânica vigorosa do átrio empurrando o sangue contra uma câmara ventricular de complacência reduzida. Na fibrilação atrial, as fibras atriais despolarizam de forma caótica e ineficaz, abolindo o "kick" atrial e tornando fisiologicamente impossível a formação de B4.'
      },
      {
        id: 'alt-b',
        text: 'A quarta bulha foi suprimida porque a fibrilação atrial induz dilatação imediata do ventrículo esquerdo anulando a hipertrofia concêntrica.',
        isCorrect: false,
        explanation: 'Incorreta. A hipertrofia concêntrica é estrutural crônica e não desaparece de imediato com a arritmia.'
      },
      {
        id: 'alt-c',
        text: 'O som auscultado era uma terceira bulha (B3) que se deslocou para a protodiástole mascarando a primeira bulha.',
        isCorrect: false,
        explanation: 'Incorreta. B3 é protodiastólica e pode surgir ou persistir na FA; o som pré-sistólico que sumiu era B4.'
      },
      {
        id: 'alt-d',
        text: 'A instalação da fibrilação atrial eleva a pressão aórtica diastólica suprimindo o fechamento da valva mitral.',
        isCorrect: false,
        explanation: 'Incorreta. A pressão aórtica diastólica nada tem a ver com a gênese de B4.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'A Dependência da Sístole Atrial Mecânica para a Gênese de B4',
      clinicalPearl: 'Se há B4 no ritmo sinusal e o paciente entra em FA, a B4 DESAPARECE AUTOMATICAMENTE porque o átrio não contrai mecanicamente!',
      detailedExplanation: `• B4 (galope telediastólico) = Sístole Atrial contra Ventrículo Rígido.
• Como a FA causa fibrilação desorganizada sem sístole mecânica eficaz, nenhum som gerado por contração atrial (B4, reforço pré-sistólico da estenose mitral, onda 'a' jugular) subsiste.`,
      distractorAnalysis: 'Reafirmação do conceito básico testado de forma prática com o mesmo paciente antes e depois do início de FA.'
    }
  },
  {
    id: 'cad-b-q02',
    questionNumber: 2,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Semiologia Cardiovascular',
    topic: 'Diferenciação Semiológica: Sobrecarga de Pressão vs. Volume no Ventrículo Esquerdo',
    statement: `No ambulatório de semiologia clínica, o preceptor solicita a dois alunos que examinem dois pacientes com valvopatias esquerdas e comparem os achados de ictus cordis e pulso arterial:
• Paciente 1: Ictus no 5º EIC na linha hemiclavicular, sustentado, sem dilatação; pulso de ascensão vagarosa e baixa amplitude (parvus et tardus); presença de B4.
• Paciente 2: Ictus deslocado para o 6º EIC na linha axilar anterior, difuso, hipercinético; pulso amplo com ascensão rápida e colapso imediato; presença de B3.

Assinale a opção que identifica, respectivamente, a valvopatia e o padrão de sobrecarga dos Pacientes 1 e 2:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Paciente 1: Insuficiência Aórtica (sobrecarga de volume); Paciente 2: Estenose Aórtica (sobrecarga de pressão).',
        isCorrect: false,
        explanation: 'Incorreta. Inverteu as afecções.'
      },
      {
        id: 'alt-b',
        text: 'Paciente 1: Estenose Aórtica (sobrecarga de pressão com hipertrofia concêntrica); Paciente 2: Insuficiência Aórtica (sobrecarga de volume com dilatação excêntrica).',
        isCorrect: true,
        explanation: 'Correta. Paciente 1 tem pulso parvus tardus, ictus sustentado sem desvio e B4 = Estenose Aórtica (sobrecarga de pressão / hipertrofia concêntrica). Paciente 2 tem ictus desviado e difuso, pulso em martelo d\'água e B3 = Insuficiência Aórtica (sobrecarga de volume / dilatação excêntrica).'
      },
      {
        id: 'alt-c',
        text: 'Paciente 1: Estenose Mitral (sobrecarga de pressão no VE); Paciente 2: Insuficiência Mitral (sobrecarga de pressão pura).',
        isCorrect: false,
        explanation: 'Incorreta. Estenose mitral não causa sobrecarga pressórica no VE (o VE é protegido).'
      },
      {
        id: 'alt-d',
        text: 'Paciente 1: Insuficiência Mitral (sobrecarga de volume); Paciente 2: Estenose Mitral (sobrecarga de volume).',
        isCorrect: false,
        explanation: 'Incorreta. Ambas as atribuições estão erradas.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Estenose Aórtica (Pressão / Concêntrica) vs. Insuficiência Aórtica (Volume / Excêntrica)',
      clinicalPearl: 'Estenose = Pressão -> Hipertrofia concêntrica -> Ictus sustentado e no lugar -> B4 -> Pulso Parvus Tardus. Insuficiência = Volume -> Dilatação excêntrica -> Ictus desviado e difuso -> B3 -> Pulso Martelo d\'água.',
      detailedExplanation: `• A estenose aórtica gera pós-carga elevada (pressão), levando à hipertrofia concêntrica sem aumento inicial da silhueta cardíaca.
• A insuficiência aórtica gera sobrecarga diastólica maciça (volume), dilatando o ventrículo (hipertrofia excêntrica) e desviando o ictus para a esquerda e para baixo.`,
      distractorAnalysis: 'Essencial para a formação clínica: associar o tipo de sobrecarga aos achados de palpação do ictus e pulso carotídeo.'
    }
  },
  {
    id: 'cad-b-q03',
    questionNumber: 3,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Semiologia Cardiovascular',
    topic: 'Semiogênese dos Sopros Mesossistólicos Ejetivos no Adulto e Idoso',
    statement: `Um homem assintomático de 68 anos realiza exame físico de rotina. O médico ausculta um sopro mesossistólico áspero, em formato crescendo-decrescendo (em diamante), audível no 2º espaço intercostal direito (foco aórtico) e na fúrcula esternal, que inicia após o fechamento mitral e termina antes do fechamento aórtico. 

Considerando os dados epidemiológicos da população adulta e a semiologia da via de saída ventricular esquerda, a causa anatômica mais provável desse sopro é:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Esclerose ou estenose da valva aórtica por calcificação degenerativa fibroaterosclerótica.',
        isCorrect: true,
        explanation: 'Correta. No adulto e no idoso, a causa mais frequente de sopro mesossistólico ejetivo na base cardíaca é o processo de calcificação degenerativa senil da valva aórtica (esclerose valvar aórtica e estenose aórtica).'
      },
      {
        id: 'alt-b',
        text: 'Regurgitação da valva mitral com prolapso de cúspide posterior.',
        isCorrect: false,
        explanation: 'Incorreta. O sopro de prolapso mitral é telessistólico precedido de clique mesossistólico no ápice.'
      },
      {
        id: 'alt-c',
        text: 'Estenose congênita infundibular da artéria pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. Estenose pulmonar congênita é rara em idosos de 68 anos e audível no 2º EIC esquerdo.'
      },
      {
        id: 'alt-d',
        text: 'Insuficiência tricúspide com regurgitação sistólica e hipertensão portal.',
        isCorrect: false,
        explanation: 'Incorreta. Insuficiência tricúspide é holossistólica na borda esternal esquerda inferior.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'A Causa Mais Frequente de Sopro Mesossistólico na Base no Adulto: Esclerose/Estenose Aórtica',
      clinicalPearl: 'Sopro mesossistólico ejetivo na base (2º EIC direito) em paciente adulto ou idoso = Pensar imediatamente em ESCLEROSE OU ESTENOSE DA VALVA AÓRTICA (calcificação degenerativa senil ou valva bicúspide)!',
      detailedExplanation: `• O sopro mesossistólico ejetivo origina-se da turbulência na via de saída do VE durante a ejeção.
• No idoso, o espessamento fibrocalcífico da valva aórtica (esclerose aórtica) acomete até 25% da população acima dos 65 anos, sendo o achado auscultatório mais prevalente.`,
      distractorAnalysis: 'Questão conceitual direta que reforça o raciocínio epidemiológico do exame clínico.'
    }
  },
  {
    id: 'cad-b-q04',
    questionNumber: 4,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Gastroenterologia & Oncologia Endócrina',
    topic: 'Cardiopatia Carcinoide: Mecanismo de Acometimento Valvar Direito e Poupança do Coração Esquerdo',
    statement: `Um homem de 53 anos com síndrome carcinoide por tumor de íleo com metástases hepáticas é submetido a ecocardiograma que revela insuficiência tricúspide grave com cúspides espessadas e fixas em posição semiaberta, além de estenose pulmonar. As valvas aórtica e mitral estão completamente normais.

O preceptor indaga ao interno: "Por que as lesões valvares ocorrem no coração direito e não no coração esquerdo neste paciente?"

A resposta correta do interno deve ser:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Porque a serotonina lançada pelas metástases hepáticas atinge a veia cava e o coração direito em alta concentração, mas é degradada pela monoamina oxidase (MAO) durante a passagem pelo leito capilar pulmonar antes de alcançar o coração esquerdo.',
        isCorrect: true,
        explanation: 'Correta. As metástases hepáticas secretam serotonina diretamente na veia cava inferior banhando átrio e ventrículo direitos. A circulação pulmonar possui altíssima atividade de monoamina oxidase (MAO), que inativa e metaboliza a serotonina, protegendo as valvas esquerdas.'
      },
      {
        id: 'alt-b',
        text: 'Porque a pressão mais alta do ventrículo esquerdo impede a aderência de placas de colágeno nas cúspides.',
        isCorrect: false,
        explanation: 'Incorreta. Se a serotonina atingir o lado esquerdo (como no forame oval patente ou tumor brônquico), ela lesa as valvas esquerdas independentemente da pressão.'
      },
      {
        id: 'alt-c',
        text: 'Porque o coração direito possui tecido conectivo de origem ectodérmica sensível à histamina.',
        isCorrect: false,
        explanation: 'Incorreta. A origem embriológica do endocárdio é mesodérmica em ambos os lados.'
      },
      {
        id: 'alt-d',
        text: 'Porque a serotonina é inativada pelo ácido clorídrico no estômago antes de entrar na circulação esquerda.',
        isCorrect: false,
        explanation: 'Incorreta. A secreção das metástases é venosa sistêmica, não gástrica.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'O Filtro Metabólico Pulmonar (MAO) na Cardiopatia Carcinoide',
      clinicalPearl: 'Filtro Pulmonar: A MAO pulmonar inativa a serotonina -> protege valvas esquerdas -> por isso a Cardiopatia Carcinoide acomete Tricúspide e Pulmonar!',
      detailedExplanation: `• Metástases no fígado liberam serotonina diretamente nas veias hepáticas e veia cava inferior.
• O coração direito (tricúspide e pulmonar) recebe o impacto direto da serotonina.
• O endotélio capilar dos pulmões metaboliza a serotonina em 5-HIAA via MAO, de modo que o sangue que chega às cavidades esquerdas é isento do mediador ativo.`,
      distractorAnalysis: 'Reforça o princípio bioquímico e anatômico essencial da síndrome carcinoide.'
    }
  },
  {
    id: 'cad-b-q05',
    questionNumber: 5,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Bioquímica Clínica & Nutrição',
    topic: 'Pelagra Secundária: Desvio do Triptofano para Serotonina e Queda de Niacina (B3)',
    statement: `Um paciente com tumor carcinoide metastático queixa-se de lesões avermelhadas e descamativas nas mãos e pescoço ("Colar de Casal"), além de diarreia persistente e confusão mental com esquecimentos frequentes. O médico diagnostica Pelagra secundária ao tumor neuroendócrino.

A causa molecular dessa deficiência vitamínica decorre de:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Desvio massivo do triptofano dietético para a rota da síntese de serotonina pelas células tumorais, esgotando o substrato necessário para a síntese endógena de Niacina (Vitamina B3).',
        isCorrect: true,
        explanation: 'Correta. O triptofano é a matéria-prima essencial para a produção endógena de Niacina (B3). Quando o tumor sequestra até 70-80% do triptofano para produzir serotonina, cessa a produção de B3, levando à Pelagra (Dermatite, Diarreia, Demência).'
      },
      {
        id: 'alt-b',
        text: 'Inibição seletiva da absorção duodenal de tiamina (Vitamina B1) pelo excesso de gastrina.',
        isCorrect: false,
        explanation: 'Incorreta. A pelagra decorre de carência de Niacina (Vitamina B3), e não de B1.'
      },
      {
        id: 'alt-c',
        text: 'Aumento da excreção urinária de folato mediado pelo fator de necrose tumoral alfa.',
        isCorrect: false,
        explanation: 'Incorreta. Não envolve folato.'
      },
      {
        id: 'alt-d',
        text: 'Deficiência congênita da enzima triptofano pirrolase com acúmulo tóxico de serotonina.',
        isCorrect: false,
        explanation: 'Incorreta. A carência é adquirida pelo sequestro tumoral do triptofano.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Triptofano Sequestrado pelo Carcinoide -> Deficiência de Niacina (B3) -> Pelagra',
      clinicalPearl: 'Pelagra no Carcinoide = Falta de Niacina (B3) porque o tumor roubou o Triptofano para fazer serotonina!',
      detailedExplanation: `• Em condições fisiológicas normais, a maior parte do triptofano é convertida em niacina.
• No carcinoide, o tumor consome o triptofano quase integralmente para síntese de serotonina, gerando hipovitaminose B3 grave.`,
      distractorAnalysis: 'Fixação da relação bioquímica triptofano -> niacina (vitamina B3).'
    }
  },
  {
    id: 'cad-b-q06',
    questionNumber: 6,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Valvopatias & Febre Reumática',
    topic: 'Estenose Mitral Reumática: Ausculta em Ritmo Sinusal vs. Fibrilação Atrial',
    statement: `Uma paciente de 34 anos com estenose mitral reumática comparece para consulta periódica. Enquanto mantinha ritmo sinusal, sua ausculta apresentava:
1. Primeira bulha hiperfonética;
2. Estalido de abertura protodiastólico;
3. Ruflar diastólico em ápice;
4. Reforço pré-sistólico no final da diástole.

Um ano após, a paciente desenvolve Fibrilação Atrial permanente. Qual dos quatro componentes auscultatórios acima listados DESAPARECE OBRIGATORIAMENTE após a instalação da arritmia?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'O estalido de abertura mitral.',
        isCorrect: false,
        explanation: 'Incorreta. O estalido de abertura decorre da parada abrupta da abertura das cúspides na protodiástole e persiste na FA.'
      },
      {
        id: 'alt-b',
        text: 'O reforço pré-sistólico.',
        isCorrect: true,
        explanation: 'Correta. O reforço pré-sistólico é gerado pela sístole mecânica do átrio esquerdo aumentando a velocidade do fluxo através da valva estenosada imediatamente antes de B1. Como a fibrilação atrial suprime a sístole mecânica coordenada do átrio, o reforço pré-sistólico desaparece por completo.'
      },
      {
        id: 'alt-c',
        text: 'A hiperfonese de primeira bulha.',
        isCorrect: false,
        explanation: 'Incorreta. B1 permanece hiperfonética se as cúspides ainda tiverem mobilidade.'
      },
      {
        id: 'alt-d',
        text: 'O ruflar diastólico.',
        isCorrect: false,
        explanation: 'Incorreta. O ruflar diastólico persiste durante a fase de enchimento rápido e passivo.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Estenose Mitral na Fibrilação Atrial: O Desaparecimento do Reforço Pré-Sistólico',
      clinicalPearl: 'Tétrade da Estenose Mitral: B1 hiperfonética + Estalido de abertura + Ruflar diastólico + Reforço pré-sistólico. Na Fibrilação Atrial, O REFORÇO PRÉ-SISTÓLICO SOME porque o átrio não contrai!',
      detailedExplanation: `• O reforço pré-sistólico do ruflar diastólico ocorre na telediástole quando a sístole atrial impulsiona o jato final através do orifício estenosado.
• Ao entrar em Fibrilação Atrial, cessa a contração atrial coordenada e o reforço pré-sistólico desaparece.`,
      distractorAnalysis: 'Conceito clássico de semiologia cardiológica frequentemente cobrado.'
    }
  },
  {
    id: 'cad-b-q07',
    questionNumber: 7,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Valvopatias & Hipertensão Pulmonar',
    topic: 'Sopro de Graham Steell: Regurgitação Pulmonar na Estenose Mitral Grave',
    statement: `Um cardiologista ausculta no segundo espaço intercostal esquerdo (foco pulmonar) de um paciente com estenose mitral grave e hipertensão arterial pulmonar severa um sopro diastólico precoce, suave e aspirativo. O pulso carotídeo é normal, sem divergência pressórica. 

O médico explica aos alunos que esse sopro é decorrente da dilatação do anel da valva pulmonar pela hipertensão pulmonar, denominando-se:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sopro de Graham Steell (insuficiência pulmonar de alta pressão).',
        isCorrect: true,
        explanation: 'Correta. O sopro de Graham Steell é o sopro diastólico aspirativo no foco pulmonar gerado pela incompetência da valva pulmonar secundária à hipertensão arterial pulmonar grave em pacientes com estenose mitral.'
      },
      {
        id: 'alt-b',
        text: 'Sopro de Austin Flint.',
        isCorrect: false,
        explanation: 'Incorreta. Austin Flint é o ruflar apical funcional da insuficiência aórtica severa.'
      },
      {
        id: 'alt-c',
        text: 'Sopro de Carey Coombs.',
        isCorrect: false,
        explanation: 'Incorreta. Carey Coombs é o ruflar apical da cardite reumática aguda.'
      },
      {
        id: 'alt-d',
        text: 'Sopro de Gallavardin.',
        isCorrect: false,
        explanation: 'Incorreta. O fenômeno de Gallavardin é a irradiação musical do sopro de estenose aórtica para o ápice cardíaco.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sopro de Graham Steell: Insuficiência Pulmonar Funcional na Hipertensão Pulmonar Grave',
      clinicalPearl: 'Sopro no 2º EIC esquerdo (foco pulmonar) + Diastólico aspirativo + Hipertensão Pulmonar na Estenose Mitral = SOPRO DE GRAHAM STEELL!',
      detailedExplanation: `• Hipertensão pulmonar severa dilata o tronco pulmonar e o anel valvar pulmonar.
• As cúspides não coaptam na diástole -> refluxo de alta pressão do tronco pulmonar para o ventrículo direito -> Sopro de Graham Steell.`,
      distractorAnalysis: 'Distratores exploram epônimos clássicos da semiologia cardiovascular.'
    }
  },
  {
    id: 'cad-b-q08',
    questionNumber: 8,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Valvopatias & Fisiopatologia',
    topic: 'Hemodinâmica da Síncope na Estenose Aórtica: O Conceito de Débito Fixo',
    statement: `Durante teste ergométrico interrompido precocemente, um paciente com estenose aórtica grave assintomática apresenta queda abrupta da pressão arterial sistólica acompanhada de pré-síncope. 

O mecanismo hemodinâmico que justifica a queda pressórica no esforço é:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Incapacidade de aumentar o débito cardíaco através do orifício aórtico estenosado (débito fixo) enquanto ocorre vasodilatação fisiológica dos leitos musculares periféricos, provocando queda imediata da pressão arterial média sistêmica.',
        isCorrect: true,
        explanation: 'Correta. No esforço, a vasodilatação muscular reduz a resistência vascular periférica; como o coração não consegue aumentar o volume ejetado através da valva aórtica criticamente estenosada, a pressão arterial despenca, gerando hipoperfusão cerebral e síncope.'
      },
      {
        id: 'alt-b',
        text: 'Vasoconstrição aguda do leito cerebral estimulada por hiperativação vagal periférica.',
        isCorrect: false,
        explanation: 'Incorreta. Ocorre hipoperfusão cerebral por queda da PAM sistêmica, e não vasoconstrição cerebral ativa.'
      },
      {
        id: 'alt-c',
        text: 'Ruptura aguda de cordoalhas aórticas induzida pelo aumento de pressão transmural.',
        isCorrect: false,
        explanation: 'Incorreta. A valva aórtica é semilunar e desprovida de cordoalhas tendíneas.'
      },
      {
        id: 'alt-d',
        text: 'Inibição simpática transitória com bloqueio da síntese de adrenalina adrenal.',
        isCorrect: false,
        explanation: 'Incorreta. Há intensa ativação simpática durante o exercício.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'A Fisiopatologia do Débito Fixo na Síncope por Estenose Aórtica',
      clinicalPearl: 'Síncope na Estenose Aórtica = DÉBITO FIXO! Músculo dilata no esforço (cai RVP) e coração não consegue ejetar mais sangue -> PAM cai e o paciente desmaia!',
      detailedExplanation: `• O orifício estenosado impõe limite mecânico fixo ao débito sistólico.
• A vasodilatação periférica reduz a resistência vascular sem que haja aumento compensatório do débito cardíaco, levando ao colapso da pressão de perfusão cerebral.`,
      distractorAnalysis: 'Conceito hemodinâmico de débito fixo é a pedra angular da estenose aórtica sintomática.'
    }
  },
  {
    id: 'cad-b-q09',
    questionNumber: 9,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Semiologia Cardiovascular',
    topic: 'Semiometria da Estenose Aórtica: O Pico Tardio do Sopro Sistólico',
    statement: `Dois pacientes idosos com estenose aórtica realizam avaliação semiológica:
• Paciente X apresenta sopro ejetivo mesossistólico grau 4/6 cujo pico de intensidade ocorre logo no início da sístole (pico precoce);
• Paciente Y apresenta sopro ejetivo mesossistólico grau 2/6 cujo pico de intensidade ocorre no terço final da sístole (pico tardio), com componente aórtico de B2 hipofonético e pulso carotídeo com atraso de ascensão.

Do ponto de vista da gravidade anatômica da estenose valvar, é correto afirmar que:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'O Paciente Y tem maior probabilidade de apresentar estenose aórtica grave do que o Paciente X, pois o pico tardio do sopro sistólico reflete o esvaziamento ventricular excessivamente prolongado através de um orifício criticamente reduzido.',
        isCorrect: true,
        explanation: 'Correta. O pico tardio de intensidade do sopro ejetivo e o atraso do pulso carotídeo são marcadores muito mais fidedignos de gravidade do que a intensidade absoluta (decibéis) do sopro. Em estenoses graves com disfunção de VE, o sopro pode ser suave (grau 2/6) mas com pico tardio.'
      },
      {
        id: 'alt-b',
        text: 'O Paciente X é certamente mais grave porque sopro grau 4/6 com frêmito indica área valvar menor que 0,6 cm².',
        isCorrect: false,
        explanation: 'Incorreta. Sopros intensos podem ocorrer em estenoses moderadas com função ventricular hiperdinâmica.'
      },
      {
        id: 'alt-c',
        text: 'Ambos têm exatamente a mesma gravidade, pois a duração da sístole não se altera em valvopatias.',
        isCorrect: false,
        explanation: 'Incorreta. A ejeção do VE é significativamente prolongada na estenose aórtica grave.'
      },
      {
        id: 'alt-d',
        text: 'O Paciente Y tem estenose leve, pois sopros grau 2/6 nunca correspondem a lesões cirúrgicas.',
        isCorrect: false,
        explanation: 'Incorreta. Pacientes com estenose aórtica grave de baixo fluxo e baixo gradiente frequentemente apresentam sopros suaves.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Pico Tardio vs. Intensidade do Sopro na Avaliação da Estenose Aórtica',
      clinicalPearl: 'Regra de ouro: O PICO TARDIO DO SOPRO e o PULSO PARVUS TARDUS são os verdadeiros marcadores de gravidade, não a altura em decibéis do sopro!',
      detailedExplanation: `• Em orifícios valvares gravemente estenosados, o VE necessita de quase toda a sístole para forçar o sangue para a aorta. O gradiente máximo de velocidade ocorre no final da sístole (pico tardio).
• Pacientes com baixa fração de ejeção geram sopro fraco, mas com pico tardio.`,
      distractorAnalysis: 'Quebra do erro comum de julgar gravidade pela intensidade do sopro.'
    }
  },
  {
    id: 'cad-b-q10',
    questionNumber: 10,
    caderno: 'Caderno B (Ambulatório & Semiologia)',
    subject: 'Valvopatias & Obstetrícia',
    topic: 'Descompensação de Estenose Mitral na Gravidez: O Papel da Taquicardia e do Pico Volêmico',
    statement: `Uma gestante de 25 anos com estenose mitral reumática assintomática antes da gravidez procura o pronto-socorro obstétrico na 30ª semana com tosse, escarro hemoptoico e ortopneia. 

Ao justificar aos familiares por que a descompensação ocorreu subitamente nessa fase da gestação, o médico explica corretamente que:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'No 3º trimestre ocorre o pico fisiológico do aumento do volume sanguíneo (+ 40-50%) e taquicardia gestacional que encurta o tempo de diástole (único momento em que o sangue cruza a valva mitral), elevando criticamente a pressão no átrio esquerdo e capilar pulmonar com rotura de veias brônquicas engurgitadas.',
        isCorrect: true,
        explanation: 'Correta. A combinação de hipervolemia gestacional máxima (28ª-34ª semanas) com taquicardia que encurta o tempo de enchimento diastólico sobrecarrega o átrio esquerdo, causando edema agudo e hemoptise (apoplexia pulmonar por rotura de anastomoses venosas brônquicas).'
      },
      {
        id: 'alt-b',
        text: 'A compressão da veia cava pelo útero grávido reduz a pré-carga aórtica provocando isquemia das cúspides mitrais.',
        isCorrect: false,
        explanation: 'Incorreta. A compressão de cava causa hipotensão supina, não edema pulmonar e hemoptise.'
      },
      {
        id: 'alt-c',
        text: 'A gonadotrofina coriônica humana (hCG) provoca fibrose aguda das cordoalhas mitrais.',
        isCorrect: false,
        explanation: 'Incorreta. O hormônio hCG não tem efeito fibrótico sobre as cordoalhas.'
      },
      {
        id: 'alt-d',
        text: 'O feto consome oxigênio em excesso induzindo vasoconstrição coronariana aguda na mãe.',
        isCorrect: false,
        explanation: 'Incorreta. O mecanismo é puramente hemodinâmico por hipervolemia e taquicardia sobre a valva estenosada.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Estenose Mitral na Gravidez: Hipervolemia + Taquicardia Gestacional = Descompensação',
      clinicalPearl: 'Por que a grávida com Estenose Mitral descompensa no 3º trimestre? Porque o sangue aumenta 50% e o coração acelera (taquicardia), encurtando a diástole! O sangue não consegue passar pela mitral estreita -> Pressão do pulmão explode -> Edema agudo e Hemoptise (apoplexia pulmonar)!',
      detailedExplanation: `• O fluxo transvalvar mitral é 100% diastólico.
• A taquicardia fisiológica encurta seletivamente a fase de diástole.
• Maior volume circulante (+50%) somado a menos tempo de diástole dispara o gradiente transvalvar e a pressão capilar pulmonar, culminando em apoplexia pulmonar com escarro hemoptoico.`,
      distractorAnalysis: 'Integração de fisiologia obstétrica e cardiologia valvular.'
    }
  }
];

// =========================================================================
// TODAS AS 20 QUESTÕES INÉDITAS REUNIDAS
// =========================================================================
export const VALVOPATHY_EXAM_QUESTIONS: ValvopathyExamQuestion[] = [
  ...VALVOPATHY_QUESTIONS_SET_A,
  ...VALVOPATHY_QUESTIONS_SET_B
];

// =========================================================================
// FLASHCARDS DE ALTO RENDIMENTO BASEADOS NOS CONCEITOS DAS FOTOS DA PROVA
// =========================================================================
export const VALVOPATHY_EXAM_FLASHCARDS: Flashcard[] = [
  {
    id: 'valv-fc-01',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'Por que a Quarta Bulha (B4) é ABSOLUTAMENTE IMPOSSÍVEL de ser auscultada em um paciente com Fibrilação Atrial?',
    back: `A Quarta Bulha (B4) é gerada pelo choque mecânico do jato de sangue impulsionado pela SÍSTOLE ATRIAL coordenada contra uma parede ventricular rígida e hipertrofiada (sobrecarga de pressão / disfunção diastólica).

Na Fibrilação Atrial, o miocárdio atrial perde a contração mecânica organizada (apenas fibrila sem gerar sístole efetiva). Logo, é FISIOLOGICAMENTE IMPOSSÍVEL existir contração atrial ou B4 na FA!`,
    clinicalPearl: 'Fibrilação Atrial = Ausência de B4 e desaparecimento do reforço pré-sistólico da estenose mitral.',
    mnemonic: 'FA = Sem sístole Atrial = Sem B4 = Sem reforço pré-sistólico.',
    ankiTags: ['SemiologiaCardiaca', 'Bulhas', 'FibrilacaoAtrial', 'B4', 'Cardiologia'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-02',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'Qual o significado fisiopatológico da Terceira Bulha (B3) e em que momento exato do ciclo cardíaco ela ocorre?',
    back: `A Terceira Bulha (B3) ocorre na PROTODIÁSTOLE, durante a fase de ENCHIMENTO VENTRICULAR RÁPIDO.

Fisiopatologia:
Decorre da súbita desaceleração da coluna de sangue que entra em um ventrículo esquerdo dilatado com complacência alterada, traduzindo:
1. Sobrecarga de VOLUME;
2. Disfunção ventricular SISTÓLICA (queda da fração de ejeção);
3. Elevação acentuada das pressões de enchimento (pressão capilar pulmonar > 20 mmHg).`,
    clinicalPearl: 'B3 = Galope protodiastólico de sobrecarga de VOLUME / disfunção sistólica ("TUM-tá-tá" / Ken-tuc-ky).',
    mnemonic: 'B3 = Volume & Sistólica; B4 = Pressão & Diastólica.',
    ankiTags: ['SemiologiaCardiaca', 'Bulhas', 'InsuficienciaCardiaca', 'B3'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-03',
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    front: 'Quais são os 3 componentes da Tríade clássica da Estenose Aórtica sintomática e qual o pulso arterial característico?',
    back: `Tríade clássica (Mnemônico SAD):
1. Síncope aos esforços (débito cardíaco fixo que não acompanha a vasodilatação muscular);
2. Angina de esforço (hipertrofia concêntrica desproporcional + compressão extravascular das coronárias);
3. Dispneia de esforço (disfunção diastólica e hipertensão venocapilar retrógrada).

Pulso arterial típico:
Pulso PARVUS ET TARDUS (pequena amplitude e ascensão sistólica lenta com pico tardio).`,
    clinicalPearl: 'O surgimento da tríade SAD na Estenose Aórtica marca a transição para doença grave descompensada, indicando troca valvar cirúrgica ou TAVI.',
    mnemonic: 'Tríade SAD: Síncope, Angina, Dispneia.',
    ankiTags: ['Valvopatias', 'EstenoseAortica', 'PulsoParvusTardus', 'Cardiologia'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-04',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'Por que a Síndrome Carcinoide com metástase hepática acomete as valvas do CORAÇÃO DIREITO e poupa o coração esquerdo?',
    back: `1. Acometimento do Coração Direito:
As metástases hepáticas do tumor neuroendócrino liberam serotonina e peptídeos na circulação sistêmica venosa (veias hepáticas -> veia cava inferior), banhando diretamente átrio e ventrículo direitos. A serotonina estimula os receptores 5-HT2B nos miofibroblastos endocárdicos, promovendo depósitos fibrosos que retraem as cúspides das valvas TRICÚSPIDE e PULMONAR (causando IT e IP/EP).

2. Por que o Coração Esquerdo é Poupado?
O leito vascular dos pulmões possui alta atividade da enzima MONOAMINA OXIDASE (MAO), que degrada e inativa a serotonina antes que o sangue alcance o átrio e o ventrículo esquerdos.`,
    clinicalPearl: 'A MAO pulmonar atua como um filtro enzimático que blinda o coração esquerdo da serotonina tumoral!',
    mnemonic: 'Carcinoide = Coração DIREITO (Tricúspide + Pulmonar). Pulmão degrada via MAO.',
    ankiTags: ['Oncologia', 'Carcinoide', 'Tricuspide', 'Pulmonar', 'Cardiologia'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-05',
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia do SNC',
    front: 'Qual a relação fisiopatológica entre o Tumor Carcinoide e o desenvolvimento de Pelagra (Dermatite, Diarreia e Demência)?',
    back: `Em condições fisiológicas normais, apenas 1% do aminoácido essencial TRIPTOFANO é usado para produzir serotonina (99% é destinado à síntese endógena de NIACINA / Vitamina B3 e proteínas).

No tumor carcinoide avançado, as células neoplásicas desviam até 70-80% de todo o triptofano corporal exclusivamente para sintetizar serotonina. 

Sem triptofano disponível, a síntese de niacina (B3) despenca, gerando a clássica tríade da PELAGRA:
1. Dermatite fotossensível (Colar de Casal);
2. Diarreia crônica;
3. Demência e confusão mental.`,
    clinicalPearl: 'Tríade dos 3Ds da Pelagra: Dermatite, Diarreia e Demência por carência de Niacina (B3).',
    mnemonic: 'Pelagra = 3 D\'s: Dermatite, Diarreia e Demência (B3 / Niacina).',
    ankiTags: ['Nutricao', 'Pelagra', 'VitaminaB3', 'Triptofano', 'Carcinoide'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-06',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'O que é o Sopro de Graham Steell e qual a sua correlação com a Estenose Mitral?',
    back: `O Sopro de Graham Steell é um sopro DIASTÓLICO precoce de alta frequência, suave e aspirativo, audível no FOCO PULMONAR (2º espaço intercostal esquerdo).

Fisiopatologia:
A estenose mitral grave causa congestão venocapilar retrógrada e HIPERTENSÃO ARTERIAL PULMONAR severa. A extrema dilatação do tronco e do anel valvar pulmonar gera INSUFICIÊNCIA PULMONAR FUNCIONAL DE ALTA PRESSÃO.

Diferencial com Insuficiência Aórtica:
No Graham Steell, a pressão arterial não é divergente e o pulso periférico é normal ou fino (sem pulso de Corrigan).`,
    clinicalPearl: 'Graham Steell = Sopro diastólico aspirativo no 2º EIC esquerdo por Insuficiência Pulmonar na Hipertensão Pulmonar grave!',
    mnemonic: 'Graham Steell = Pulmonar dilatada por Hipertensão Pulmonar da Mitral.',
    ankiTags: ['Sopros', 'GrahamSteell', 'HipertensaoPulmonar', 'EstenoseMitral'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-07',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'Quais os 4 achados clássicos da ausculta na Estenose Mitral e o que ocorre na Fibrilação Atrial?',
    back: `Tétrade auscultatória clássica da Estenose Mitral:
1. Hiperfonese de B1 (cúspides abertas batem com força no início da sístole);
2. Estalido de abertura mitral protodiastólico (opening snap);
3. Ruflar diastólico em ápice (melhor com campânula em decúbito lateral esquerdo / Pachon);
4. Reforço pré-sistólico telediastólico.

O que acontece na Fibrilação Atrial?
O REFORÇO PRÉ-SISTÓLICO DESAPARECE, pois ele necessitava da sístole mecânica do átrio esquerdo, que é abolida na FA!`,
    clinicalPearl: 'Estenose Mitral em Fibrilação Atrial: B1 hiperfonética + Estalido + Ruflar, MAS SEM REFORÇO PRÉ-SISTÓLICO!',
    mnemonic: 'Tétrade Mitral: B1 alta, Estalido, Ruflar e Reforço (que some na FA).',
    ankiTags: ['EstenoseMitral', 'SemiologiaCardiaca', 'Ausculta', 'FibrilacaoAtrial'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-08',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'Por que pacientes com Estenose Mitral reumática frequentemente descompensam com edema pulmonar e hemoptise no 3º trimestre da gestação?',
    back: `No 3º trimestre da gravidez (28ª a 34ª semanas), ocorrem 2 alterações hemodinâmicas cruciais:
1. Aumento de 40% a 50% na volemia e débito cardíaco;
2. Taquicardia fisiológica gestacional (+ 15 a 20 bpm).

Como o sangue só cruza a mitral durante a DIÁSTOLE, a taquicardia encurta a janela diastólica. Mais sangue precisando passar em menos tempo por uma valva estreita dispara a pressão no átrio esquerdo (> 30 mmHg), causando:
• Transudação alveolar com edema agudo de pulmão;
• Ingurgitamento e rotura de varizes venosas brônquicas sob alta pressão retrógrada -> hemoptise (apoplexia pulmonar).`,
    clinicalPearl: 'Gestante no 3º trimestre com escarro hemoptoico e sopro diastólico = Estenose Mitral descompensada (apoplexia pulmonar).',
    mnemonic: 'Gestação + Estenose Mitral = Volemia alta + Diástole curta = Apoplexia Pulmonar.',
    ankiTags: ['Obstetricia', 'EstenoseMitral', 'Gravidez', 'ApoplexiaPulmonar'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-09',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'Diferencie o tipo de sobrecarga, o pulso periférico e a cardiomegalia da Insuficiência Aórtica vs. Estenose Aórtica.',
    back: `INSUFICIÊNCIA AÓRTICA:
- Sobrecarga: De VOLUME (excêntrica, dilatação maciça de VE = "cor bovis");
- Pulso: Em martelo d'água / Corrigan (ascensão rápida e colapso);
- Pressão Arterial: DIVERGENTE (ex: 160 x 40 mmHg);
- Sopro: Diastólico aspirativo na borda esternal esquerda.

ESTENOSE AÓRTICA:
- Sobrecarga: De PRESSÃO (concêntrica, espessamento da parede com cavidade preservada inicialmente);
- Pulso: Parvus et tardus (pequeno e atrasado);
- Pressão Arterial: CONVERGENTE (ex: 105 x 85 mmHg);
- Sopro: Mesossistólico ejetivo em diamante irradiando para carótidas com B4.`,
    clinicalPearl: 'IAo = Volume + Pulso Corrigan + PA divergente + Cor bovis. EAo = Pressão + Pulso Parvus Tardus + B4.',
    mnemonic: 'IAo = Volume & Divergente; EAo = Pressão & Convergente.',
    ankiTags: ['Valvopatias', 'EstenoseAortica', 'InsuficienciaAortica', 'Semiologia'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  },
  {
    id: 'valv-fc-10',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    front: 'O que caracteriza o sopro e a ausculta da Insuficiência Mitral clássica?',
    back: `Ausculta da Insuficiência Mitral clássica:
1. Sopro Holossistólico (regurgitativo, em platô) audível no ápice (foco mitral), com irradiação clássica para a AXILA esquerda;
2. B1 hipofonética (pela falha de coaptação das cúspides mitrais);
3. Presença de Terceira Bulha (B3) protodiastólica (indicando sobrecarga volumétrica do ventrículo esquerdo pelo esvaziamento do sangue regurgitado);
4. O sopro NÃO se altera significativamente com a respiração, mas aumenta com manobras que elevam a pós-carga (Handgrip / preensão isométrica).`,
    clinicalPearl: 'Sopro holossistólico no ápice com irradiação axilar e B1 hipofonética = Insuficiência Mitral!',
    mnemonic: 'IM = Holossistólico na axila + B1 baixa + B3 de volume.',
    ankiTags: ['InsuficienciaMitral', 'Sopros', 'SemiologiaCardiaca'],
    sm2: {
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 0,
      lapseCount: 0
    }
  }
];

// Backwards-compatible aliases
export const FATEC_EXAM_QUESTIONS = VALVOPATHY_EXAM_QUESTIONS;
export const FATEC_EXAM_FLASHCARDS = VALVOPATHY_EXAM_FLASHCARDS;
export type FatecExamQuestion = ValvopathyExamQuestion;
