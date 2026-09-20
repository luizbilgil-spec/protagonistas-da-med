import { ResidencyQuestion, Flashcard, ClinicalCase, CardioTopicMeta, CardioTopicId } from '../types';

export const CARDIO_TOPICS: CardioTopicMeta[] = [
  {
    id: 'dac',
    title: 'Doença Arterial Coronariana (DAC)',
    shortDesc: 'Angina estável, SCA com e sem supra de ST, anatomia coronária, antiagregação dupla e revascularização.',
    keyConcepts: ['SCA CSST vs SSST', 'Tempo Porta-Balão (<90-120min)', 'AAS + Ticagrelor/Clopidogrel', 'Escores TIMI & GRACE', 'Anatomia: DA, CD e CX'],
    iconName: 'Activity',
    questionCount: 4
  },
  {
    id: 'disseccao',
    title: 'Dissecção de Aorta',
    shortDesc: 'Classificação de Stanford (A vs B), dor torácica rasgante, assimetria de pulsos, controle de dP/dt e cirurgia de urgência.',
    keyConcepts: ['Stanford A (Cirúrgica) vs B (Clínica)', 'Esmolol/Labetalol ANTES de Nitroprussiato', 'Meta FC < 60 bpm e PAS 100-120', 'Angio-TC vs ETE'],
    iconName: 'Split',
    questionCount: 3
  },
  {
    id: 'miocardite',
    title: 'Miocardite',
    shortDesc: 'Processo inflamatório miocárdico pós-viral, mimetizador de infarto com coronárias normais, critérios de Lake Louise na RNM e choque cardiogênico.',
    keyConcepts: ['Etiologia viral (Coxsackie, Parvovírus B19)', 'Realce tardio meso/epicárdico na RNM', 'Troponina elevada + Cateterismo normal', 'Biópsia endomiocárdica em casos fulminantes'],
    iconName: 'Flame',
    questionCount: 3
  },
  {
    id: 'aneurisma',
    title: 'Aneurisma de Aorta',
    shortDesc: 'Aneurisma de aorta abdominal (AAA) e torácica (AAT), fatores de risco, rastreio com USG e indicações cirúrgicas formais.',
    keyConcepts: ['Rastreio USG: homens 65-75a tabagistas', 'Indicação AAA: ≥5,5cm (homens) / ≥5,0cm (mulheres)', 'Expansão > 1cm/ano ou sintomático', 'Marfan e valva bicúspide no AAT'],
    iconName: 'ShieldAlert',
    questionCount: 3
  },
  {
    id: 'hipertensao',
    title: 'Hipertensão Arterial Sistêmica (HAS)',
    shortDesc: 'Diagnóstico por MAPA/MRPA, metas pressóricas, terapia combinada de 1ª linha, urgência vs emergência e causas secundárias.',
    keyConcepts: ['Metas: <130/80 mmHg em alto risco', '1ª Linha: IECA/BRA + BCC + Tiazídico', 'Emergência (lesão de órgão-alvo) vs Urgência', 'Hiperaldosteronismo primário e Estenose de Artéria Renal'],
    iconName: 'Gauge',
    questionCount: 4
  },
  {
    id: 'valvopatias',
    title: 'Valvopatias',
    shortDesc: 'Estenose aórtica (tríade SAD, sopro em diamante), insuficiência aórtica (Corrigan, Musset), estenose mitral e insuficiência mitral.',
    keyConcepts: ['Estenose Aórtica: Tríade SAD (Síncope, Angina, Dispneia)', 'Insuficiência Aórtica: Pulso martelo d\'água / Pressão divergente', 'Estenose Mitral: Estalido de abertura + ruflar diastólico', 'Insuficiência Mitral: Sopro holossistólico em ápice irradiando para axila'],
    iconName: 'HeartHandshake',
    questionCount: 3
  }
];

export interface CardioExamQuestion extends ResidencyQuestion {
  cardioTopic: CardioTopicId;
  cardioTopicName: string;
}

export const CARDIO_20_QUESTIONS: CardioExamQuestion[] = [
  // ==========================================
  // 1. DOENÇA ARTERIAL CORONARIANA (4 QUESTÕES)
  // ==========================================
  {
    id: 'cardio-q1',
    examBoard: 'USP',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'dac',
    cardioTopicName: 'Doença Arterial Coronariana',
    statement: 'Um homem de 58 anos, hipertenso e diabético, chega à sala de emergência com dor precordial opressiva de forte intensidade iniciada há 70 minutos, com irradiação para mandíbula e membro superior esquerdo, acompanhada de sudorese fria. O eletrocardiograma (ECG) realizado em 7 minutos revela supradesnivelamento do segmento ST de 3,5 mm em DII, DIII e aVF, com infradesnivelamento recíproco em DI e aVL. O hospital possui serviço de hemodinâmica ativo 24 horas disponível para início imediato.',
    clinicalContext: 'Considerando as diretrizes vigentes da Sociedade Brasileira de Cardiologia (SBC) e American Heart Association (AHA), qual a conduta terapêutica antitrombótica e a estratégia de reperfusão de escolha para este paciente?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'AAS 200-300 mg mastigado + Ticagrelor 180 mg (ou Clopidogrel 600 mg) + Heparina não fracionada IV + encaminhamento imediato para Angioplastia Coronária Primária (meta tempo porta-balão ≤ 90 min).',
        isCorrect: true,
        explanation: 'Correta: Trata-se de IAM com supra de ST (SCA CSST) de parede inferior (DII, DIII, aVF - território da Artéria Coronária Direita). A conduta padrão-ouro em centro com hemodinâmica disponível é a Angioplastia Primária com tempo porta-balão ≤ 90 minutos. A antiagregação plaquetária dupla (AAS mastigado + inibidor do receptor P2Y12 de preferência Ticagrelor 180 mg) associada à anticoagulação parenteral imediata (HNF ou Enoxaparina) é mandatória.'
      },
      {
        id: 'alt-b',
        text: 'Realizar trombólise química imediata com Alteplase (rtPA) na sala de emergência e transferir para cateterismo somente se houver falha de reperfusão após 180 minutos.',
        isCorrect: false,
        explanation: 'Incorreta: Quando o hospital dispõe de serviço de hemodinâmica ativo e o tempo porta-balão previsto é < 120 minutos (e idealmente ≤ 90 min), a intervenção coronária percutânea (ICP) primária é superior à trombólise em redução de mortalidade, reinfarto e hemorragia intracraniana.'
      },
      {
        id: 'alt-c',
        text: 'Administrar Nitroglicerina sublingual e Morfina IV antes do ECG complementar de derivações direitas (V3R e V4R), pois a dor inferior é sempre de coronária circunflexa.',
        isCorrect: false,
        explanation: 'Incorreta: No infarto de parede inferior, o acometimento de ventrículo direito (VD) ocorre em cerca de 30-50% dos casos. É MANDATÓRIO rodar V3R e V4R ANTES de administrar nitratos ou morfina, pois nitratos reduzem a pré-carga e provocam colapso hemodinâmico grave e choque em infarto de VD.'
      },
      {
        id: 'alt-d',
        text: 'Prescrever monoterapia com AAS 100 mg e aguardar o resultado da curva de Troponina ultrassensível em 1 e 3 horas para confirmar a indicação de intervenção.',
        isCorrect: false,
        explanation: 'Incorreta: No IAM com supradesnivelamento de ST, o diagnóstico é imediato pelo ECG. NUNCA se deve esperar resultado de troponina ou marcadores de necrose miocárdica para abrir a artéria culpada.'
      },
      {
        id: 'alt-e',
        text: 'Indicar cirurgia de revascularização miocárdica de urgência como primeira escolha para todos os infartos inferiores com infradesnivelamento recíproco.',
        isCorrect: false,
        explanation: 'Incorreta: A ICP primária com implante de stent farmacológico é o método de reperfusão inicial padrão; cirurgia aberta fica reservada para choque cardiogênico com anatomia desfavorável, complicações mecânicas agudas ou falha de ICP.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Cardiologia Intervencionista & Terapia Intensiva - InCor HCFMUSP',
      commentary: 'Questão primordial de sala de emergência cobrada em todas as bancas. Guarde os marcos temporais: ECG em até 10 minutos da chegada; Porta-Balão ≤ 90 min em hospital com hemodinâmica (ou ≤ 120 min se transferido de outro serviço); Porta-Agulha ≤ 30 min se optar por trombolítico. Além disso, a terapia antiplaquetária dupla com AAS + Ticagrelor (preferível ao clopidogrel no estudo PLATO por reduzir mortalidade global) é o pilar farmacológico absoluto.',
      pearl: 'Infarto Inferior (DII, DIII, aVF): SEMPRE solicite V3R e V4R para excluir infarto de Ventrículo Direito. Se VD acometido: Nitrato e Diurético são PROIBIDOS (dependência crítica de pré-carga).',
      anatomicalCorrelation: 'A artéria coronária direita (ACD) irriga a parede inferior do VE (via artéria descendente posterior na dominância direita em 85-90% dos indivíduos), o nó sinusal (60%) e o nó AV (90%). Por isso, infartos inferiores frequentemente cursam com bradicardia sinusal e BAV.',
      pharmacologicalInsight: 'Ticagrelor é um inibidor reversível e de ação direta sobre o receptor P2Y12 plaquetário (não é pró-fármaco, diferente do clopidogrel que necessita de biotransformação hepática via CYP2C19).'
    }
  },
  {
    id: 'cardio-q2',
    examBoard: 'ENARE',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'dac',
    cardioTopicName: 'Doença Arterial Coronariana',
    statement: 'Mulher de 66 anos, hipertensa e tabagista de 40 maços-ano, procura unidade de pronto atendimento relatando episódios repetidos de aperto retroesternal aos mínimos esforços nas últimas 48 horas, com piora progressiva em repouso. O ECG de admissão mostra inversão dinâmica e simétrica de onda T de 2 mm em V2 a V5, sem elevação do segmento ST. A troponina I ultrassensível inicial veio elevada (128 ng/L, valor de referência < 14 ng/L). Pressão arterial 150/95 mmHg, FC 84 bpm, ausculta pulmonar limpa.',
    clinicalContext: 'Qual a correta estratificação de risco segundo os escores recomendados (TIMI e GRACE) e a estratégia invasiva indicada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Estratégia conservadora com teste ergométrico ambulatorial após 1 semana de dupla antiagregação e estatina.',
        isCorrect: false,
        explanation: 'Incorreta: Paciente com IAM sem supra de ST (troponina positiva + alterações dinâmicas de repolarização) tem alto risco isquêmico. O teste ergométrico é contraindicado na fase aguda de SCA não estabilizada.'
      },
      {
        id: 'alt-b',
        text: 'Paciente de alto risco isquêmico (troponina positiva e alterações dinâmicas de ST/T); está indicada estratégia invasiva precoce com cineangiocoronariografia em até 24 horas.',
        isCorrect: true,
        explanation: 'Correta: Trata-se de IAM sem supra de ST (SCA SSST) classificado como Alto Risco devido à elevação de troponina miocárdica e alterações dinâmicas do segmento ST/T. Pelas diretrizes da SBC e ESC, pacientes de alto risco (escore GRACE > 140 ou troponina positiva) devem ser submetidos à estratégia invasiva precoce com cateterismo em até 24 horas.'
      },
      {
        id: 'alt-c',
        text: 'Estratégia invasiva de emergência imediata (< 2 horas) está indicada apenas se houvesse supradesnivelamento transitório em aVR associado a bloqueio de ramo esquerdo novo.',
        isCorrect: false,
        explanation: 'Incorreta: A estratégia invasiva imediata (<2h) é indicada na SCA SSST em caso de muito alto risco: instabilidade hemodinâmica, choque cardiogênico, dor refratária ao tratamento clínico máximo, arritmias ventriculares malignas ou insuficiência cardíaca aguda.'
      },
      {
        id: 'alt-d',
        text: 'Administrar fibrinolítico (Tenecteplase) nas primeiras 12 horas, pois a troponina positiva comprova oclusão coronariana total aguda.',
        isCorrect: false,
        explanation: 'Incorreta: Trombolíticos são FORMALMENTE CONTRAINDICADOS na SCA sem supradesnivelamento de ST. Estudos demonstraram que fibrinolíticos em SCA SSST aumentam o risco hemorrágico e mortalidade sem benefício de reperfusão.'
      },
      {
        id: 'alt-e',
        text: 'Suspender a prescrição de betabloqueadores e estatinas até a realização de angiotomografia computadorizada de coronárias ambulatorial.',
        isCorrect: false,
        explanation: 'Incorreta: Betabloqueadores orais (se ausência de sinais de IC aguda/broncoespasmo) e estatinas de alta potência (Atorvastatina 80 mg ou Rosuvastatina 40 mg) devem ser iniciados imediatamente na admissão.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Camila Meirelles',
      specialty: 'Cardiologia Clínica - InCor FMUSP',
      commentary: 'Na SCA sem supra (angina instável vs IAMSSST), a chave da prova é a divisão em Muito Alto Risco (CATE < 2h: choque, arritmia fatal, dor refratária), Alto Risco (CATE < 24h: troponina +, GRACE > 140, alterações dinâmicas de ST/T) e Baixo Risco (estratégia não invasiva ou CATE eletivo). E lembre-se: TROMBOLÍTICO NUNCA É USADO EM SCA SEM SUPRA!',
      pearl: 'SCA sem supra + Troponina positiva = Alto Risco = Cateterismo nas primeiras 24 horas.',
      pharmacologicalInsight: 'A atorvastatina em dose máxima (80 mg) na fase aguda do infarto possui efeito pleiotrópico imediato: melhora da função endotelial, inibição de metaloproteinases e estabilização da placa aterosclerótica vulnerável.'
    }
  },
  {
    id: 'cardio-q3',
    examBoard: 'UNIFESP',
    year: 2023,
    subject: 'Cirurgia',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'dac',
    cardioTopicName: 'Doença Arterial Coronariana',
    statement: 'Homem de 62 anos, portador de diabetes mellitus insulino-dependente de longa data e clearance de creatinina de 48 mL/min, é submetido a cineangiocoronariografia por angina classe funcional III refratária à terapia medicamentosa otimizada. O laudo demonstra: lesão obstrutiva de 85% no Tronco da Coronária Esquerda (TCE) não protegido, lesão de 90% no terço proximal da Artéria Descendente Anterior (ADA), lesão de 80% na Artéria Circunflexa e oclusão crônica da Artéria Coronária Direita. O cálculo do Escore SYNTAX revelou valor de 38.',
    clinicalContext: 'Segundo os grandes ensaios clínicos (ex: SYNTAX, FREEDOM) e diretrizes atuais, qual a modalidade de revascularização com maior benefício em sobrevida e menor taxa de novos eventos para este paciente?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Cirurgia de Revascularização Miocárdica (CRM) com enxertos arteriais (especialmente Artéria Torácica Interna / Mamária Esquerda para ADA).',
        isCorrect: true,
        explanation: 'Correta: Paciente diabético, acometimento trivascular com lesão de Tronco de Coronária Esquerda (TCE) e escore SYNTAX elevado (≥ 33, alto risco anatômico para angioplastia). A Cirurgia de Revascularização Miocárdica (CABG) é classe I de recomendação e comprovadamente confere menor mortalidade e menor taxa de nova revascularização em comparação com a angioplastia por stent nesse cenário.'
      },
      {
        id: 'alt-b',
        text: 'Angioplastia percutânea com múltiplos stents farmacológicos, pois o diabetes e a insuficiência renal contraindicam a circulação extracorpórea.',
        isCorrect: false,
        explanation: 'Incorreta: O estudo FREEDOM demonstrou superioridade incontestável da cirurgia sobre a angioplastia em diabéticos com doença multivascular em redução de mortalidade e infarto.'
      },
      {
        id: 'alt-c',
        text: 'Tratamento exclusivamente clínico com adição de Ranolazina e Ivabradina, visto que lesões de TCE têm mortalidade cirúrgica proibitiva acima de 50%.',
        isCorrect: false,
        explanation: 'Incorreta: A revascularização é mandatória em lesões críticas de TCE (>50%) com sintomas refratários; a mortalidade da cirurgia eletiva é em torno de 1-3%.'
      },
      {
        id: 'alt-d',
        text: 'Angioplastia percutânea apenas com balão sem stent na lesão de TCE para evitar trombose tardia do stent.',
        isCorrect: false,
        explanation: 'Incorreta: Angioplastia com balão isolado em TCE tem risco intolerável de dissecção aguda e reoclusão catastrófica.'
      },
      {
        id: 'alt-e',
        text: 'Transplante cardíaco imediato, pois a presença de doença arterial coronariana em paciente diabético inviabiliza anastomoses vasculares cirúrgicas.',
        isCorrect: false,
        explanation: 'Incorreta: A anatomia é perfeitamente abordável por CRM cirúrgica padrão.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Vinícius Sampaio',
      specialty: 'Cirurgia Cardiovascular - Hospital São Paulo / EPM-UNIFESP',
      commentary: 'Indicações clássicas de Cirurgia de Revascularização Miocárdica (CRM) na prova de Residência: 1) Lesão de Tronco de Coronária Esquerda ≥ 50%; 2) Doença trivascular ou bi-vascular com acometimento da DA proximal, especialmente se diabético ou disfunção ventricular esquerda; 3) Escore SYNTAX > 32.',
      pearl: 'O enxerto padrão-ouro é a Artéria Mamária Interna Esquerda (LIMA) anastomosada na Artéria Descendente Anterior (ADA), com patência superior a 90-95% em 10 anos.',
      anatomicalCorrelation: 'A artéria torácica interna esquerda corre cerca de 1 a 1,5 cm paralela à borda lateral do esterno, emergindo da primeira porção da artéria subclávia esquerda.'
    }
  },
  {
    id: 'cardio-q4',
    examBoard: 'SUS-SP',
    year: 2024,
    subject: 'Anatomia',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'dac',
    cardioTopicName: 'Doença Arterial Coronariana',
    statement: 'Durante a evolução de um infarto agudo do miocárdio no quarto dia pós-evento, um paciente de 65 anos evolui subitamente com dispneia aguda paroxística, estertoração crepitante até ápices pulmonares, hipotensão (PA 80x50 mmHg) e surgimento de novo sopro holossistólico em ápice com irradiação axilar. O ecocardiograma à beira do leito confirma rotura completa de músculo papilar e insuficiência mitral aguda maciça.',
    clinicalContext: 'Qual o músculo papilar mais vulnerável à necrose isquêmica por possuir suprimento arterial exclusivo de um único vaso e qual artéria coronariana é a sua responsável anatômica?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Músculo papilar posteromedial, suprido exclusivamente pela artéria descendente posterior (ramo da coronária direita na grande maioria).',
        isCorrect: true,
        explanation: 'Correta: Anatomia cirúrgica crucial! O músculo papilar anterolateral possui suprimento arterial DUPLO (ramos diagonais da Artéria Descendente Anterior e ramos marginais obtusos da Artéria Circunflexa). Já o músculo papilar posteromedial possui suprimento arterial ÚNICO, dependendo exclusivamente da Artéria Descendente Posterior (ramo da Coronária Direita). Por isso, infartos de parede inferior são os grandes causadores de rotura de papilar e edema agudo pulmonar por insuficiência mitral aguda.'
      },
      {
        id: 'alt-b',
        text: 'Músculo papilar anterolateral, irrigado unicamente pelo tronco da coronária esquerda.',
        isCorrect: false,
        explanation: 'Incorreta: O músculo anterolateral possui dupla circulação (DA + Circunflexa), sendo muito mais resistente à necrose isquêmica e rotura.'
      },
      {
        id: 'alt-c',
        text: 'Músculos pectíneos do átrio direito, irrigados pela artéria do nó sinoatrial.',
        isCorrect: false,
        explanation: 'Incorreta: Músculos pectíneos situam-se na parede atrial, não sustentam cordoalhas da valva mitral.'
      },
      {
        id: 'alt-d',
        text: 'Músculo papilar septal do ventrículo direito, suprido pela artéria coronária esquerda circunflexa.',
        isCorrect: false,
        explanation: 'Incorreta: O papilar septal pertence à valva tricúspide no ventrículo direito e sua ruptura não causa insuficiência mitral.'
      },
      {
        id: 'alt-e',
        text: 'Trabécula septomarginal (banda moderadora), suprida pela artéria marginal direita.',
        isCorrect: false,
        explanation: 'Incorreta: A banda moderadora conduz o ramo direito do feixe de His no ventrículo direito, não é músculo papilar da valva mitral.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Mariana Bittencourt',
      specialty: 'Anatomia Topográfica & Cirurgia Cardíaca - HC-FMUSP',
      commentary: 'Essa questão é cobrada sistematicamente em provas de título e residência médica de Cirurgia e Clínica. O músculo papilar póstero-medial é o elo fraco da valva mitral pela vascularização terminal única pela artéria descendente posterior (DP). A rotura do músculo papilar é uma emergência cirúrgica catastrófica com indicação imediata de cirurgia para troca ou plastia valvar mitral e suporte hemodinâmico com balão intra-aórtico (BIA).',
      pearl: 'Papilar Póstero-Medial = Irrigação ÚNICA pela Coronária Direita (Descendente Posterior). Papilar Ântero-Lateral = Irrigação DUPLA (DA + CX).',
      anatomicalCorrelation: 'A valva mitral possui dois folhetos (anterior e posterior) conectados pelas cordoalhas tendíneas aos dois músculos papilares do ventrículo esquerdo.'
    }
  },

  // ==========================================
  // 2. DISSECÇÃO DE AORTA (3 QUESTÕES)
  // ==========================================
  {
    id: 'cardio-q5',
    examBoard: 'USP',
    year: 2024,
    subject: 'Cirurgia',
    subspecialty: 'Emergências e Toxicologia',
    difficulty: 'Difícil',
    cardioTopic: 'disseccao',
    cardioTopicName: 'Dissecção de Aorta',
    statement: 'Um homem de 54 anos dá entrada na sala de emergência levado pelo SAMU com queixa de dor torácica retroesternal de início súbito, com intensidade 10/10, descrita como "em facada e rasgando", que migrou para a região dorsal interescapular e abdome superior. Ao exame: Glasgow 15, PA em membro superior direito = 210/115 mmHg; PA em membro superior esquerdo = 135/80 mmHg. Ausculta cardíaca revela sopro diastólico aspirativo no 3º espaço intercostal esquerdo (foco aórtico acessório). A radiografia de tórax evidencia mediastino com largura de 9,5 cm.',
    clinicalContext: 'Qual a classificação de Stanford mais provável para esta dissecção aórtica e a conduta definitiva imediata indicada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Classificação Stanford A; transferência imediata para cirurgia cardiovascular de emergência com substituição da aorta ascendente.',
        isCorrect: true,
        explanation: 'Correta: A presença de dor retroesternal associada a sopro novo de insuficiência aórtica aguda (por delaminação retrógrada e dilatação do anel aórtico) e assimetria de pulsos/pressão arterial entre os membros superiores denota envolvimento da aorta ascendente e/ou arco aórtico. Pela classificação de Stanford, todo acometimento da aorta ascendente é definido como Tipo A. A mortalidade é de aproximadamente 1-2% por hora nas primeiras 48h sem cirurgia; portanto, intervenção cirúrgica aberta de emergência é mandatória.'
      },
      {
        id: 'alt-b',
        text: 'Classificação Stanford B; internação em UTI para tratamento clínico medicamentoso exclusivo com vasodilatadores orais.',
        isCorrect: false,
        explanation: 'Incorreta: Stanford B envolve apenas a aorta descendente distal à artéria subclávia esquerda. A presença de sopro aórtico diastólico e assimetria em braços comprova acometimento proximal (Stanford A).'
      },
      {
        id: 'alt-c',
        text: 'Classificação DeBakey III; realizar punção pericárdica profilática de emergência antes do diagnóstico por imagem.',
        isCorrect: false,
        explanation: 'Incorreta: DeBakey III afeta a aorta descendente. Além disso, punção pericárdica às cegas na dissecção de aorta é contraindicada pelo risco de descomprimir o hematoma pericárdico e causar hemorragia exsangüinante imediata.'
      },
      {
        id: 'alt-d',
        text: 'Administrar imediatamente trombolítico venoso (Tenecteplase) sob suspeita de IAM com supra de ST não detectado.',
        isCorrect: false,
        explanation: 'Incorreta: Erro fatal clássico! Trombolisar um paciente com dissecção de aorta causa morte imediata por tamponamento cardíaco ou hemotórax maciço.'
      },
      {
        id: 'alt-e',
        text: 'Realizar angioplastia coronária percutânea na artéria coronária circunflexa com stent recoberto.',
        isCorrect: false,
        explanation: 'Incorreta: A patologia primária é a rotura intimal da aorta ascendente, exigindo cirurgia cardíaca aberta para troca da aorta ascendente (± tubo valvulado ou reimplante de coronárias).'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Cirurgia Cardiovascular & Terapia Intensiva - InCor FMUSP',
      commentary: 'Classificação de Stanford: Stanford A = compromete a Aorta Ascendente (independente de onde começou ou terminou) -> CIRURGIA DE EMERGÊNCIA! Stanford B = restrito à Aorta Descendente (distal à emergência da subclávia esquerda) -> TRATAMENTO CLÍNICO INICIAL (a menos que haja complicações como isquemia visceral, rotura ou dor intratável).',
      pearl: 'Stanford A = Ascendente = Aberta (Cirurgia de Emergência). Stanford B = Baixa / Braço / Boa evolução clínica.',
      anatomicalCorrelation: 'A aorta ascendente está contida dentro do saco pericárdico fibroso. Se a delaminação externa romper a adventícia na aorta ascendente, o sangue verte diretamente para o pericárdio, gerando tamponamento cardíaco agudo fulminante.'
    }
  },
  {
    id: 'cardio-q6',
    examBoard: 'UNICAMP',
    year: 2024,
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'disseccao',
    cardioTopicName: 'Dissecção de Aorta',
    statement: 'Um paciente de 60 anos com suspeita clínica de Dissecção Aguda de Aorta Stanford B encontra-se na sala vermelha com PA de 215/120 mmHg e frequência cardíaca de 105 bpm. O residente de plantão decide iniciar Nitroprussiato de Sódio em bomba de infusão contínua como droga isolada para normalizar rapidamente a pressão arterial.',
    clinicalContext: 'Qual o grave erro fisiopatológico e farmacodinâmico cometido pelo residente e qual a sequência farmacológica correta preconizada pelas diretrizes?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'O nitroprussiato isolado induz vasodilatação arteriolar súbita com taquicardia reflexa e aumento da dP/dt (força de ejeção e cisalhamento), acelerando a delaminação aórtica; a conduta correta é administrar Betabloqueador IV (Esmolol ou Labetalol) ANTES do vasodilatador, almejando FC < 60 bpm e PAS 100-120 mmHg.',
        isCorrect: true,
        explanation: 'Correta: Regra de ouro da emergência médica! O fator determinante na propagação da delaminação da íntima/média da aorta é a taxa de aumento da pressão com o tempo (dP/dt), ditada pela contratilidade miocárdica e frequência cardíaca. Vasodilatadores diretos arteriais (nitroprussiato, hidralazina) provocam estimulação simpática reflexa com aumento do inotropismo e taquicardia, o que eleva a dP/dt e pode romper a falsa luz! Por isso, o betabloqueador deve SEMPRE preceder o nitroprussiato.'
      },
      {
        id: 'alt-b',
        text: 'O nitroprussiato de sódio é um bloqueador beta-adrenérgico direto que causa bradicardia excessiva e assistolia se usado em dose cheia.',
        isCorrect: false,
        explanation: 'Incorreta: O nitroprussiato é um potente doador de óxido nítrico com efeito vasodilatador arterial e venoso puro, sem qualquer ação bloqueadora beta.'
      },
      {
        id: 'alt-c',
        text: 'A meta pressórica na dissecção aórtica é manter a PAS acima de 160 mmHg para evitar hipoperfusão renal e coronária.',
        isCorrect: false,
        explanation: 'Incorreta: A meta na dissecção aguda de aorta é o controle estrito da pressão arterial, com PAS entre 100 e 120 mmHg (ou a menor PA tolerada sem isquemia cerebral/renal).'
      },
      {
        id: 'alt-d',
        text: 'Deveria ter sido administrada Atropina em bólus associada a adrenalina para manter a frequência cardíaca acima de 100 bpm e garantir o débito sistólico.',
        isCorrect: false,
        explanation: 'Incorreta: Taquicardia na dissecção aórtica é catastrófica, pois cada sístole rápida impulsiona o flap de dissecção adiante.'
      },
      {
        id: 'alt-e',
        text: 'O fármaco de primeira escolha para substituir o nitroprussiato isolado é o Diltiazem por via oral, sem necessidade de via venosa.',
        isCorrect: false,
        explanation: 'Incorreta: Na emergência aguda de dissecção de aorta, a medicação deve ser estritamente intravenosa e titulável minuto a minuto (ex: Esmolol em infusão contínua com meia-vida de 9 minutos).'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Camilo Albuquerque',
      specialty: 'Farmacologia & Medicina de Emergência - EPM/UNIFESP',
      commentary: 'Não há questão de emergência mais clássica em bancas de residência: "Betabloqueador ANTES do Vasodilatador na Dissecção de Aorta". Se você abrir o nitroprussiato primeiro, a queda de PA dispara o reflexo barorreceptor, o coração entra em taquicardia hipercontrátil, o dP/dt sobe e a aorta se rompe na frente da equipe!',
      pearl: 'Fórmula da estabilização na Dissecção: 1º Esmolol/Labetalol (FC < 60 bpm) -> 2º Nitroprussiato se PAS persistir > 120 mmHg.',
      pharmacologicalInsight: 'Esmolol é um antagonista seletivo beta-1 de ultracurta duração (meia-vida ~9 minutos) hidrolisado por esterases no citoplasma das hemácias, o que permite interromper rapidamente seu efeito caso haja hipotensão ou intolerância.'
    }
  },
  {
    id: 'cardio-q7',
    examBoard: 'UFRJ',
    year: 2023,
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'disseccao',
    cardioTopicName: 'Dissecção de Aorta',
    statement: 'Um paciente de 68 anos hipertenso admitido com dor torácica rasgante e dissecção aórtica aguda comprovada queixa-se de dor abdominal difusa em cólica desproporcional ao exame físico, acompanhada de acidose metabólica com hiperlactatemia progressiva (lactato sérico de 5,8 mmol/L). O abdome encontra-se discretamente distendido, com descompressão brusca negativa.',
    clinicalContext: 'Qual vaso arterial originado da aorta abdominal foi ocluído pelo hematoma dissecante e qual complicação com risco iminente de morte está em curso?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Artéria Mesentérica Superior com isquemia mesentérica aguda e necrose de alças do intestino delgado e cólon direito.',
        isCorrect: true,
        explanation: 'Correta: A propagação da falsa luz aórtica caudalmente pode obstruir orifícios de ramos vitais da aorta abdominal (má perfusão / isquemia de órgãos-alvo). A oclusão da artéria mesentérica superior (que irriga do duodeno distal até os dois terços proximais do cólon transverso) causa isquemia mesentérica aguda, cuja apresentação clássica é dor abdominal intensa desproporcional aos achados do exame físico com acidose lática por sofrimento de alça intestinal. Trata-se de Stanford B complicada, indicando intervenção cirúrgica/endovascular de urgência (TEVAR).'
      },
      {
        id: 'alt-b',
        text: 'Tronco celíaco com perfuração esofágica distal espontânea (Síndrome de Boerhaave).',
        isCorrect: false,
        explanation: 'Incorreta: A Síndrome de Boerhaave é a rotura do esôfago por vômitos incoercíveis, não complicação vascular da dissecção.'
      },
      {
        id: 'alt-c',
        text: 'Artéria Renal esquerda com cólica nefrética reflexa e retenção urinária mecânica baixa.',
        isCorrect: false,
        explanation: 'Incorreta: Oclusão de artéria renal cursa com insuficiência renal oligúrica e hipertensão refratária por liberação maciça de renina, não dor mesentérica com acidose metabólica grave.'
      },
      {
        id: 'alt-d',
        text: 'Artéria Ilíaca interna direita com trombose hemorroidária externa aguda.',
        isCorrect: false,
        explanation: 'Incorreta: Não gera hiperlactatemia sistêmica ou sofrimento de alças.'
      },
      {
        id: 'alt-e',
        text: 'Veia Porta com hipertensão portal pré-hepática e sangramento por varizes gástricas.',
        isCorrect: false,
        explanation: 'Incorreta: A dissecção aórtica envolve a parede arterial sistêmica, não o sistema venoso portal.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Mariana Bittencourt',
      specialty: 'Cirurgia Vascular - UFRJ',
      commentary: 'As complicações isquêmicas da dissecção aórtica ocorrem por oclusão de ramos arteriais principais (síndrome de má perfusão): 1) Coronárias (geralmente coronária direita -> IAM inferior); 2) Carótidas / Tronco Braquiocefálico (AVC / coma); 3) Artérias Renais (insuficiência renal aguda anúrica); 4) Artéria Mesentérica Superior (isquemia intestinal grave); 5) Artérias Ilíacas / Femorais (isquemia aguda de membro inferior). Na Stanford B, a má perfusão converte a indicação de tratamento clínico em indicação cirúrgica/endovascular!',
      pearl: 'Stanford B complicada = Dor refratária, expansão rápida (>1cm/ano), rotura aórtica ou MÁ PERFUSÃO (renal, mesentérica, cerebral ou de membros) -> Indicação de intervenção (TEVAR).',
      anatomicalCorrelation: 'A artéria mesentérica superior origina-se da face anterior da aorta abdominal cerca de 1 a 2 cm abaixo do tronco celíaco, no nível vertebral de L1.'
    }
  },

  // ==========================================
  // 3. MIOCARDITE (3 QUESTÕES)
  // ==========================================
  {
    id: 'cardio-q8',
    examBoard: 'ENARE',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'miocardite',
    cardioTopicName: 'Miocardite',
    statement: 'Um jovem de 23 anos, previamente hígido e sem fatores de risco cardiovascular, procura o pronto-socorro com dor torácica precordial em queimação há 24 horas, que piora à inspiração profunda e ao decúbito dorsal e melhora ao inclinar o tórax para a frente. Relata quadro febril associado a odinofagia, mialgia difusa e tosse seca há 10 dias. Ao ECG: supradesnivelamento difuso do segmento ST com concavidade superior em quase todas as derivações (DI, DII, DIII, aVF, V2-V6) e infradesnivelamento do segmento PR em DII. A dosagem de troponina ultrassensível está marcadamente elevada (2.450 ng/L). É encaminhado à cineangiocoronariografia, que demonstra artérias coronárias anatômicas, normais e totalmente isentas de lesões ateroscleróticas ou trombos.',
    clinicalContext: 'Qual o diagnóstico mais provável e a etiologia etiopatogênica mais comum associada a este quadro?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Miopericardite aguda; etiologia viral (enterovírus como Coxsackievírus B, parvovírus B19, adenovírus ou herpesvírus humano 6).',
        isCorrect: true,
        explanation: 'Correta: Trata-se do clássico quadro de miopericardite aguda pós-viral em paciente jovem: síndrome gripal/viral prévia, dor pleurítica atípica que alivia na posição genupeitoral (posição de prece maometana), ECG com supra de ST côncavo e difuso com infra de PR (sinal precoce de pericardite), elevação pronunciada de troponina (denotando envolvimento inflamatório miocárdico concomitante) e cateterismo com coronárias normais. A etiologia mais frequente no Brasil e no mundo é a infecção viral prévia por enterovírus (Coxsackie B), Parvovírus B19 ou vírus respiratórios.'
      },
      {
        id: 'alt-b',
        text: 'Infarto com supradesnivelamento de ST por espasmo da artéria descendente anterior (Angina de Prinzmetal) decorrente de uso agudo de cocaína.',
        isCorrect: false,
        explanation: 'Incorreta: O supra de ST da pericardite/miocardite é difuso com concavidade voltada para cima e infra de PR, sem imagem em espelho clássica, além do antecedente viral evidente.'
      },
      {
        id: 'alt-c',
        text: 'Dissecção espontânea de artéria coronária (SCAD) tratada com angioplastia e stent farmacológico imediato.',
        isCorrect: false,
        explanation: 'Incorreta: O cateterismo comprovou coronárias totalmente normais, descartando dissecção de artéria coronária.'
      },
      {
        id: 'alt-d',
        text: 'Cardiopatia chagásica crônica na forma dilatada com aneurisma de ponta roto.',
        isCorrect: false,
        explanation: 'Incorreta: Chagas crônica cursa com disfunção biventricular progressiva em idosos/meia-idade com bloqueio de ramo direito e BDAC no ECG, não com miocardite viral aguda em jovem.'
      },
      {
        id: 'alt-e',
        text: 'Endocardite infecciosa aguda da valva pulmonar por Staphylococcus aureus com abscesso septal.',
        isCorrect: false,
        explanation: 'Incorreta: Não há sopro valvar novo, vegetações, hemoculturas ou estigmas periféricos de endocardite.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Cardiologia Clínica - InCor FMUSP',
      commentary: 'O cenário "dor torácica de paciente jovem + troponina estourada + cateterismo normal" é a marca registrada da Miocardite/Miopericardite nas provas de Residência. Preste atenção no ECG: o supra do infarto é convexo ("em dorso de carpa") e localizado em um território coronariano; o supra da pericardite é côncavo ("em sorriso"), difuso e acompanhado de infradesnível de PR.',
      pearl: 'Tríade de Miopericardite: Quadro viral prévio + Supra côncavo difuso com infra de PR + Troponina alta com coronárias lisas no CATE.',
      pharmacologicalInsight: 'O tratamento de suporte na miopericardite leve inclui repouso, AINEs (como Ibuprofeno) e Colchicina (que inibe a polimerização de microtúbulos nos neutrófilos, reduzindo recidivas).'
    }
  },
  {
    id: 'cardio-q9',
    examBoard: 'USP',
    year: 2023,
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'miocardite',
    cardioTopicName: 'Miocardite',
    statement: 'Um homem de 31 anos com suspeita de miocardite aguda após infecção respiratória realiza Ressonância Magnética Cardíaca (RMC) para confirmação diagnóstica e avaliação prognóstica. O exame demonstra fração de ejeção do VE de 48%, aumento do sinal ponderado em T2 indicando edema miocárdico e presença de realce tardio com gadolínio.',
    clinicalContext: 'De acordo com os Critérios de Lake Louise atualizados para o diagnóstico de miocardite por RMC, qual o padrão topográfico e transmural típico do realce tardio com gadolínio na miocardite que o diferencia do infarto isquêmico?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Realce tardio de distribuição não isquêmica, acometendo o mesocárdio e a camada subepicárdica, poupando a camada subendocárdica e sem correlação com território coronariano específico.',
        isCorrect: true,
        explanation: 'Correta: Padrão-ouro conceitual! No infarto isquêmico por oclusão de artéria coronária, a necrose se inicia na camada SUBENDOCÁRDICA (a mais vulnerável à hipóxia) e avança em direção ao epicárdio (padrão transmural ou subendocárdico respeitando a distribuição de uma artéria coronária). Na miocardite inflamatória, a agressão imunocelular poupa o subendocárdio e acomete caracteristicamente a camada SUBEPICÁRDICA e o MESOCÁRDIO, frequentemente em parede lateral ou septal, sem correlação com a irrigação de um vaso específico.'
      },
      {
        id: 'alt-b',
        text: 'Realce tardio estritamente subendocárdico transmural limitado ao território anatômico da artéria descendente anterior.',
        isCorrect: false,
        explanation: 'Incorreta: Esse é o padrão clássico do infarto agudo isquêmico por oclusão coronariana.'
      },
      {
        id: 'alt-c',
        text: 'Ausência total de realce com gadolínio e ausência de edema em T2 em todas as fases da doença.',
        isCorrect: false,
        explanation: 'Incorreta: Os critérios de Lake Louise exigem exatamente a presença de pelo menos um critério baseado em T2 (edema) e um critério baseado em T1/realce tardio para confirmar miocardite.'
      },
      {
        id: 'alt-d',
        text: 'Realce restrito à valva mitral com calcificação dos folhetos anteriores e posteriores.',
        isCorrect: false,
        explanation: 'Incorreta: Descreve doença valvar reumática ou degenerativa, não inflamação do miocárdio.'
      },
      {
        id: 'alt-e',
        text: 'Depósito circunferencial exclusivo no endocárdio do ventrículo direito com adelgaçamento da parede livre (doença de Uhl).',
        isCorrect: false,
        explanation: 'Incorreta: Anomalia congênita rara do VD, sem relação com miocardite.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Camila Meirelles',
      specialty: 'Cardiologia & Imagem Cardiovascular - InCor FMUSP',
      commentary: 'Os Critérios de Lake Louise para Ressonância Cardíaca na Miocardite são altamente cobrados na prova da USP. Guarde a diferença visual: 1) Isquemia (IAM) = Começa no Subendocárdio e segue a artéria culpada; 2) Inflamação (Miocardite) = Acomete Subepicárdio e Mesocárdio, poupando o subendocárdio e não respeitando fronteiras coronarianas.',
      pearl: 'Realce Tardio na RMC: Subepicárdico / Mesocárdico = Miocardite. Subendocárdico / Transmural por território vascular = Infarto Isquêmico.',
      anatomicalCorrelation: 'A microcirculação coronariana penetra do epicárdio para o endocárdio; a tensão intramiocárdica é máxima no subendocárdio, tornando-o o primeiro a sofrer na isquemia obstrutiva.'
    }
  },
  {
    id: 'cardio-q10',
    examBoard: 'UNIFESP',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Emergências e Toxicologia',
    difficulty: 'Difícil',
    cardioTopic: 'miocardite',
    cardioTopicName: 'Miocardite',
    statement: 'Mulher de 28 anos é internada em choque cardiogênico refratário 4 dias após quadro febril com mialgia. Apresenta PAS 68x40 mmHg em uso de doses elevadas de Noradrenalina e Dobutamina, lactato 6,5 mmol/L, anúria e ecocardiograma com hipocinesia difusa acentuada e Fração de Ejeção do VE de 18%. O ECG revela Bloqueio Atrioventricular Total (BAVT) e salvas de taquicardia ventricular não sustentada.',
    clinicalContext: 'Tratando-se de provável Miocardite Fulminante (incluindo hipótese de Miocardite de Células Gigantes ou eosinofílica), qual o procedimento diagnóstico padrão-ouro invasivo e a indicação de suporte mecânico hemodinâmico imediato?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Realizar Biópsia Endomiocárdica (BEM) de ventrículo direito para elucidação histopatológica e instalar suporte circulatório mecânico temporário (como ECMO venoarterial ou dispositivo de assistência ventricular tipo Impella).',
        isCorrect: true,
        explanation: 'Correta: Na miocardite fulminante com choque cardiogênico refratário a inotrópicos e vasopressores, arritmias ventriculares graves ou BAVT, as diretrizes internacionais e da SBC indicam formalmente: 1) Suporte circulatório mecânico precoce (ECMO venoarterial / VA-ECMO ou Impella) como ponte para recuperação miocárdica ou transplante; 2) Biópsia Endomiocárdica (classe I nesse contexto), pois a identificação de miocardite de células gigantes, eosinofílica necrotizante ou sarcoidose exige imunossupressão agressiva e imediata que muda radicalmente o prognóstico.'
      },
      {
        id: 'alt-b',
        text: 'Aguardar resposta clínica à elevação da dose de noradrenalina por mais 48 horas antes de considerar suporte mecânico, visto que a biópsia é proscrita.',
        isCorrect: false,
        explanation: 'Incorreta: Atrasar o suporte mecânico leva a disfunção orgânica múltipla e óbito. A biópsia é classe I nesta indicação específica.'
      },
      {
        id: 'alt-c',
        text: 'Indicar pericardiocentese de urgência e passagem de marcapasso transcutâneo apenas, mantendo a paciente em enfermaria comum.',
        isCorrect: false,
        explanation: 'Incorreta: O paciente está em choque cardiogênico gravíssimo refratário em UTI.'
      },
      {
        id: 'alt-d',
        text: 'Iniciar antibioticoterapia com Vancomicina e Meropenem em bólus e contraindicar qualquer tipo de suporte mecânico pelo risco de bacteremia.',
        isCorrect: false,
        explanation: 'Incorreta: O quadro não é de sepse bacteriana primária, mas de choque cardiogênico fulminante por inflamação miocárdica.'
      },
      {
        id: 'alt-e',
        text: 'Prescrever diltiazem em infusão contínua para desacelerar o ritmo ventricular da paciente.',
        isCorrect: false,
        explanation: 'Incorreta: Bloqueador de canal de cálcio deprime ainda mais o miocárdio e precipita parada em assistolia num paciente com FE 18% e choque cardiogênico.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Insuficiência Cardíaca Avançada & Transplante - InCor HCFMUSP',
      commentary: 'Indicação precisa de Biópsia Endomiocárdica (BEM) em provas: Miocardite com choque cardiogênico inexplicado ou IC aguda rapidamente progressiva (< 2 semanas) associada a dilatação do VE, BAVT ou arritmias ventriculares malignas refratárias. Nesses casos, a BEM identifica etiologias específicas como a Miocardite de Células Gigantes, que responde a imunossupressores em altas doses.',
      pearl: 'Choque cardiogênico refratário pós-viral = ECMO Veno-Arterial + Biópsia Endomiocárdica imediata.',
      pharmacologicalInsight: 'Na miocardite de células gigantes comprovada por biópsia, o esquema imunossupressor clássico inclui pulsoterapia com Metilprednisolona associada a Ciclosporina/Tacrolimo.'
    }
  },

  // ==========================================
  // 4. ANEURISMA DE AORTA (3 QUESTÕES)
  // ==========================================
  {
    id: 'cardio-q11',
    examBoard: 'SUS-SP',
    year: 2024,
    subject: 'Cirurgia',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'aneurisma',
    cardioTopicName: 'Aneurisma de Aorta',
    statement: 'Homem de 68 anos, tabagista ativo (carga tabágica de 50 maços-ano) e hipertenso, comparece à Unidade Básica de Saúde para consulta de rotina preventiva. Está totalmente assintomático, sem queixas álgicas. Ao exame físico: abdome indolor, onde se palpa massa pulsátil e expansiva na região periumbilical, de aproximadamente 5 cm de largura transversal.',
    clinicalContext: 'Segundo as diretrizes de Cirurgia Vascular (SBACV, SVS, USPSTF), qual o principal fator de risco modificável para formação e expansão do Aneurisma de Aorta Abdominal (AAA) e qual a recomendação de rastreamento populacional indicada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Tabagismo; ultrassonografia de abdome como rastreamento em homens de 65 a 75 anos com histórico de tabagismo.',
        isCorrect: true,
        explanation: 'Correta: O tabagismo é o mais potente fator de risco independente associado à gênese, crescimento e ruptura do aneurisma de aorta abdominal (risco 5 a 7 vezes maior). As principais diretrizes mundiais (USPSTF, SVS, SBC) recomendam rastreamento com Ultrassonografia de Abdome em homens de 65 a 75 anos que tenham fumado pelo menos 100 cigarros na vida (ou parentes de primeiro grau de portadores de AAA aos 55-60 anos). A USG tem sensibilidade e especificidade próximas de 100% para diagnóstico de AAA.'
      },
      {
        id: 'alt-b',
        text: 'Consumo moderado de álcool; rastreamento obrigatório com ressonância magnética nuclear de corpo inteiro anual a partir dos 40 anos.',
        isCorrect: false,
        explanation: 'Incorreta: O álcool não é o fator primário de risco do AAA e a RNM de corpo inteiro não tem papel de rastreio.'
      },
      {
        id: 'alt-c',
        text: 'Uso crônico de anti-inflamatórios não esteroides; rastreamento por colonoscopia com biópsia vascular a cada 5 anos.',
        isCorrect: false,
        explanation: 'Incorreta: Sem base fisiopatológica; colonoscopia avalia mucosa colorretal, não aorta retroperitoneal.'
      },
      {
        id: 'alt-d',
        text: 'Sedentarismo; rastreamento exclusivo em mulheres na pós-menopausa por dosagem de D-dímero sérico semestral.',
        isCorrect: false,
        explanation: 'Incorreta: O AAA é 4 a 6 vezes mais comum em homens do que em mulheres; D-dímero não é método de rastreamento de aneurisma.'
      },
      {
        id: 'alt-e',
        text: 'Deficiência congênita de vitamina D; rastreamento com radiografia simples de tórax anual.',
        isCorrect: false,
        explanation: 'Incorreta: Radiografia simples de tórax não avalia aorta infrarrenal e a deficiência de vitamina D não é causa primária.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Mariana Bittencourt',
      specialty: 'Cirurgia Vascular & Endovascular - HC-FMUSP',
      commentary: 'Rastreamento de AAA: Homens entre 65 e 75 anos tabagistas ou ex-tabagistas devem fazer USG abdominal de triagem uma vez na vida! Cerca de 90% dos aneurismas de aorta abdominal são INFRARRENAIS (abaixo da emergência das artérias renais), o que facilita muito a correção cirúrgica por prótese endovascular (EVAR).',
      pearl: 'Rastreio de AAA = Homens 65-75 anos com histórico de tabagismo -> Ultrassom de Abdome.',
      anatomicalCorrelation: 'A bifurcação aórtica em artérias ilíacas comuns ocorre no nível da quarta vértebra lombar (L4), correspondendo anatomicamente à altura da cicatriz umbilical.'
    }
  },
  {
    id: 'cardio-q12',
    examBoard: 'USP',
    year: 2024,
    subject: 'Cirurgia',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'aneurisma',
    cardioTopicName: 'Aneurisma de Aorta',
    statement: 'Um homem de 71 anos realiza ultrassonografia de controle para acompanhamento de aneurisma de aorta abdominal fusiforme infrarrenal. O exame anterior de 6 meses atrás mostrava diâmetro de 4,7 cm. O ultrassom atual revela diâmetro aórtico máximo de 5,6 cm, confirmado por Angiotomografia computadorizada de aorta, sem evidência de dissecção ou trombos móveis. O paciente permanece assintomático, com PA controlada e exames laboratoriais normais.',
    clinicalContext: 'Considerando os critérios clássicos de indicação de correção cirúrgica do Aneurisma de Aorta Abdominal infrarrenal em pacientes assintomáticos, qual a conduta adequada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Indicação formal de correção cirúrgica (aberta ou endovascular/EVAR), preenchendo critérios por diâmetro aórtico ≥ 5,5 cm e por taxa de crescimento rápido (> 0,5 cm em 6 meses).',
        isCorrect: true,
        explanation: 'Correta: Critérios de indicação cirúrgica no AAA assintomático: 1) Diâmetro ≥ 5,5 cm em homens (ou ≥ 5,0 cm em mulheres); 2) Crescimento rápido: expansão > 0,5 cm em 6 meses ou > 1,0 cm em 12 meses; 3) Aneurismas saculares (maior risco de rotura em diâmetros menores); 4) Sintomáticos (dor lombar/abdominal, compressão de estruturas, embolização). O paciente preenche dois critérios simultâneos (5,6 cm e crescimento de 0,9 cm em 6 meses).'
      },
      {
        id: 'alt-b',
        text: 'Manter vigilância ultrassonográfica anual, pois a intervenção só se justifica se o diâmetro ultrapassar 7,0 cm em pacientes assintomáticos.',
        isCorrect: false,
        explanation: 'Incorreta: Aos 5,5 cm, a curva de risco de ruptura anual sobe exponencialmente (de ~1-3% para >10-15%/ano aos 6cm), superando o risco do procedimento eletivo.'
      },
      {
        id: 'alt-c',
        text: 'Iniciar monoterapia com Varfarina para evitar trombose mural do aneurisma e reavaliar em 2 anos.',
        isCorrect: false,
        explanation: 'Incorreta: Anticoagulação não impede expansão do aneurisma e, em caso de fissura ou rotura, aumenta drasticamente a mortalidade exsangüinante.'
      },
      {
        id: 'alt-d',
        text: 'Indicar apenas embolização percutânea profilática dos ramos das artérias lombares sem colocação de endoprótese.',
        isCorrect: false,
        explanation: 'Incorreta: Não trata a fraqueza parietal aórtica nem previne a rotura da parede aórtica.'
      },
      {
        id: 'alt-e',
        text: 'Realizar laparotomia exploradora imediata na sala de emergência como se fosse abdome agudo cirúrgico perfurativo.',
        isCorrect: false,
        explanation: 'Incorreta: O paciente é assintomático e estável; a cirurgia deve ser planejada eletivamente (definindo a viabilidade de técnica endovascular EVAR vs enxerto cirúrgico convencional).'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Mariana Bittencourt',
      specialty: 'Cirurgia Vascular - HC-FMUSP',
      commentary: 'Números sagrados do AAA que caem em prova: 1) Diâmetro de corte cirúrgico: ≥ 5,5 cm (Homens) e ≥ 5,0 cm (Mulheres); 2) Taxa de expansão cirúrgica: > 0,5 cm em 6 meses ou > 1 cm em 1 ano; 3) Se o aneurisma for sintomático (dor lombar, sopro, massa dolorosa) -> OPERA INDEPENDENTE DO TAMANHO!',
      pearl: 'AAA: ≥ 5,5 cm ou cresceu > 0,5 cm em 6 meses = CIRURGIA (Eletiva programada com EVAR ou cirurgia aberta).',
      anatomicalCorrelation: 'A técnica endovascular (EVAR) requer um colo aórtico proximal saudável (comprimento adequado abaixo das artérias renais sem angulação extrema) para a correta ancoragem e vedação da endoprótese.'
    }
  },
  {
    id: 'cardio-q13',
    examBoard: 'ENARE',
    year: 2023,
    subject: 'Cirurgia',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'aneurisma',
    cardioTopicName: 'Aneurisma de Aorta',
    statement: 'Um jovem de 24 anos, magro, com 1,98 m de altura, envergadura superior à altura, hiperextensibilidade articular, palato em ogiva, deformidade torácica em pectus excavatum e subluxação de cristalino, realiza ecocardiograma transtorácico de rotina que revela ectasia anuloaórtica e dilatação fusiforme da raiz e aorta ascendente medindo 5,1 cm de diâmetro.',
    clinicalContext: 'Qual a síndrome genética subjacente e qual o limiar de intervenção cirúrgica na aorta ascendente para este grupo de pacientes?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Síndrome de Marfan (mutação no gene da Fibrilina-1 / FBN1); a intervenção cirúrgica profilática da aorta ascendente é indicada com diâmetro ≥ 5,0 cm (ou até ≥ 4,5 cm se houver história familiar de dissecção precoce ou crescimento rápido).',
        isCorrect: true,
        explanation: 'Correta: O biotipo marfanoide típico (aracnodactilia, subluxação de cristalino, pectus excavatum, frouxidão ligamentar) deve-se à mutação no gene FBN1 que codifica a Fibrilina-1, gerando fraqueza da túnica média com necrose cística da média aórtica. Por terem um risco muito superior de dissecção aguda de aorta Tipo A mesmo em diâmetros menores, a indicação de intervenção cirúrgica na aorta ascendente em pacientes com Síndrome de Marfan ocorre a partir de ≥ 5,0 cm (ou ≥ 4,5 cm na presença de fatores de alto risco), antecipando-se ao limiar padrão de 5,5 cm da população geral.'
      },
      {
        id: 'alt-b',
        text: 'Síndrome de Turner; o tratamento consiste apenas em reposição estrogênica sem nunca indicar cirurgia aórtica.',
        isCorrect: false,
        explanation: 'Incorreta: Turner cursa com cariótipo 45,X0 em mulheres com baixa estatura e coarctação de aorta.'
      },
      {
        id: 'alt-c',
        text: 'Síndrome de Down; o defeito aórtico é benigno e não evolui para dissecção aórtica.',
        isCorrect: false,
        explanation: 'Incorreta: Trissomia do 21 cursa com defeito do septo atrioventricular (DSAV), não fenótipo marfanoide.'
      },
      {
        id: 'alt-d',
        text: 'Acondroplasia; a aorta ascendente é normal e a alteração descrita representa artefato ecocardiográfico.',
        isCorrect: false,
        explanation: 'Incorreta: Acondroplasia cursa com baixa estatura desproporcionada por mutação no FGFR3.'
      },
      {
        id: 'alt-e',
        text: 'Doença de Kawasaki infantil; o aneurisma resulta de arterite coronariana necrosante que regride sem cirurgia.',
        isCorrect: false,
        explanation: 'Incorreta: Kawasaki acomete crianças com febre prolongada e gera aneurismas coronarianos, não ectasia aórtica marfanoide.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Vinícius Sampaio',
      specialty: 'Cirurgia Cardiovascular - Hospital São Paulo',
      commentary: 'Na Síndrome de Marfan, a principal causa de mortalidade precoce é a dissecção aórtica tipo A. A fraqueza da túnica média por defeito da fibrilina-1 torna a parede aórtica extremamente complacente e frágil. Por isso, as diretrizes da SBC, AHA e ESC baixam a régua da cirurgia: na população comum com aneurisma de aorta ascendente a cirurgia é indicada aos 5,5 cm; no Marfan, o corte cai para ≥ 5,0 cm (ou 4,5 cm se houver história de dissecção familiar ou crescimento >3mm/ano).',
      pearl: 'Aneurisma de Aorta Ascendente: População geral = ≥ 5,5 cm; Síndrome de Marfan = ≥ 5,0 cm (ou ≥ 4,5 cm com fatores de risco).',
      anatomicalCorrelation: 'A cirurgia de eleição na ectasia anuloaórtica de Marfan é a cirurgia de David (reimplante valvar aórtico preservador da valva nativa em tubo de Dacron) ou a cirurgia de Bentall-De Bono (troca por tubo valvulado mecânico/biológico com reimplante de coronárias).'
    }
  },

  // ==========================================
  // 5. HIPERTENSÃO ARTERIAL SISTÊMICA (4 QUESTÕES)
  // ==========================================
  {
    id: 'cardio-q14',
    examBoard: 'USP',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'hipertensao',
    cardioTopicName: 'Hipertensão Arterial Sistêmica',
    statement: 'Um homem de 52 anos, assintomático, comparece ao ambulatório para avaliação clínica. Na primeira consulta, a pressão arterial (PA) média aferida com técnica correta foi de 146/92 mmHg. Duas semanas depois, em nova consulta, a PA foi de 144/94 mmHg. Ele realiza Monitorização Ambulatorial da Pressão Arterial de 24 horas (MAPA), cujo laudo demonstra: PA média de 24 horas = 136/86 mmHg; PA média na vigília = 142/90 mmHg; PA média no sono = 126/78 mmHg. O paciente não possui histórico prévio de diabetes ou eventos cardiovasculares.',
    clinicalContext: 'De acordo com as Diretrizes Brasileiras de Hipertensão Arterial da SBC e ACC/AHA, qual o diagnóstico e a meta pressórica recomendada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Hipertensão Arterial Estágio 1 confirmada pelo consultório e pela MAPA (vigília ≥ 135/85 mmHg ou 24h ≥ 130/80 mmHg); a meta terapêutica recomendada é PA < 130/80 mmHg.',
        isCorrect: true,
        explanation: 'Correta: Diagnóstico impecável! A HAS em consultório é definida por PA sustentada ≥ 140 e/ou ≥ 90 mmHg em duas ou mais consultas. Pela MAPA de 24h, os pontos de corte diagnósticos de hipertensão são: Média de 24 horas ≥ 130/80 mmHg; Média na vigília ≥ 135/85 mmHg; Média no sono ≥ 120/70 mmHg. O paciente preencheu os critérios em todos os períodos. Pelas diretrizes mais recentes (SBC 2020/2021 e AHA 2017), a meta terapêutica geral para a maioria dos adultos (especialmente com risco cardiovascular aumentado) é PA < 130/80 mmHg.'
      },
      {
        id: 'alt-b',
        text: 'Normotensão com Efeito do Avental Branco, dispensando qualquer intervenção terapêutica ou acompanhamento.',
        isCorrect: false,
        explanation: 'Incorreta: Na Hipertensão do Avental Branco, a PA no consultório é alta, mas a MAPA/MRPA fora do consultório é estritamente NORMAL. Aqui, a MAPA foi claramente anormal (136/86 nas 24h e 142/90 na vigília).'
      },
      {
        id: 'alt-c',
        text: 'Hipertensão Mascarada, pois a pressão noturna teve queda fisiológica normal (descenso noturno presente).',
        isCorrect: false,
        explanation: 'Incorreta: Hipertensão mascarada é o oposto: PA normal no consultório e alta fora dele (na MAPA/MRPA).'
      },
      {
        id: 'alt-d',
        text: 'Pré-hipertensão apenas; a medicação só deve ser prescrita se a pressão sistólica ultrapassar 180 mmHg.',
        isCorrect: false,
        explanation: 'Incorreta: Estágio 1 com PA sustentada ≥ 140/90 mmHg exige mudanças de estilo de vida e terapia medicamentosa se alto/médio risco ou não controle.'
      },
      {
        id: 'alt-e',
        text: 'A meta pressórica para indivíduos acima de 50 anos é manter a PA sistólica entre 150 e 160 mmHg para proteger a perfusão carotídea.',
        isCorrect: false,
        explanation: 'Incorreta: Metas permissivas aumentam mortalidade cardiovascular, AVC e insuficiência renal (comprovado no estudo SPRINT).'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Hipertensão & Cardiologia Clínica - InCor FMUSP',
      commentary: 'Valores de corte da MAPA para diagnóstico de Hipertensão Arterial (decore para a prova): 1) Média de 24 horas: ≥ 130/80 mmHg; 2) Média da Vigília: ≥ 135/85 mmHg; 3) Média do Sono: ≥ 120/70 mmHg. Qualquer um desses valores alterados fecha o diagnóstico de hipertensão verdadeira fora do consultório!',
      pearl: 'MAPA Diagnóstica de HAS: 24h ≥ 130/80 mmHg | Vigília ≥ 135/85 mmHg | Sono ≥ 120/70 mmHg.',
      pharmacologicalInsight: 'Descenso noturno normal é a queda de 10% a 20% da PA durante o sono em relação à vigília. A perda do descenso noturno (atenuação ou descenso reverso) é forte marcador de dano vascular e apneia obstrutiva do sono.'
    }
  },
  {
    id: 'cardio-q15',
    examBoard: 'ENARE',
    year: 2024,
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'hipertensao',
    cardioTopicName: 'Hipertensão Arterial Sistêmica',
    statement: 'Uma paciente de 59 anos, obesa, sedentária, com diagnóstico recente de Hipertensão Arterial Estágio 2 (PA média de consultório 168/102 mmHg em três ocasiões distintas) e risco cardiovascular moderado-alto, vem para início do tratamento farmacológico.',
    clinicalContext: 'Qual a estratégia farmacoterapêutica inicial de primeira linha recomendada pelas diretrizes e qual combinação de classes é FORMALMENTE CONTRAINDICADA pelo risco aumentado de eventos adversos graves?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Iniciar combinação de dois fármacos de primeira linha em doses baixas (ex: IECA ou BRA associado a Bloqueador de Canal de Cálcio ou Diurético Tiazídico); a associação simultânea de IECA + BRA é formalmente contraindicada.',
        isCorrect: true,
        explanation: 'Correta: Pelas diretrizes da SBC, AHA e ESC: no estágio 2 de hipertensão (PA ≥ 160/100 mmHg) ou pacientes de alto risco, a conduta de primeira linha é a COMBINAÇÃO INICIAL DE DOIS FÁRMACOS de classes diferentes de primeira linha (IECA/BRA + BCC di-hidropiridínico como anlodipino OU Diurético Tiazídico como clortalidona/indapamida). Por outro lado, a combinação simultânea de IECA + BRA é FORMALMENTE CONTRAINDICADA (estudos ONTARGET e ALTITUDE mostraram ausência de benefício adicional e aumento drástico de hipercalemia, hipotensão grave e insuficiência renal aguda).'
      },
      {
        id: 'alt-b',
        text: 'Prescrever monoterapia com Propranolol e associar Atenolol se não atingir a meta em 6 meses.',
        isCorrect: false,
        explanation: 'Incorreta: Betabloqueadores não são fármacos de primeira linha para hipertensão não complicada e combinar dois betabloqueadores é um erro crasso.'
      },
      {
        id: 'alt-c',
        text: 'Associar Enalapril + Losartana como primeira escolha, pois o duplo bloqueio do sistema renina-angiotensina-aldosterona é sinérgico e seguro.',
        isCorrect: false,
        explanation: 'Incorreta: Duplo bloqueio de SRAA (IECA + BRA ou Inibidor direto de renina) é contraindicado pelo risco de falência renal e hipercalemia letal.'
      },
      {
        id: 'alt-d',
        text: 'Monoterapia com Clonidina oral em dose alta como droga de primeira escolha para todas as mulheres hipertensas.',
        isCorrect: false,
        explanation: 'Incorreta: Clonidina é agonista alfa-2 de ação central, droga de 3ª/4ª linha com efeitos adversos como boca seca, sedação e hipertensão de rebote na suspensão.'
      },
      {
        id: 'alt-e',
        text: 'Iniciar apenas ansiolítico (Diazepam) e liberar a paciente sem anti-hipertensivo.',
        isCorrect: false,
        explanation: 'Incorreta: HAS estágio 2 (168/102 mmHg) é doença crônica vascular que exige fármacos anti-hipertensivos comprovados.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Camilo Albuquerque',
      specialty: 'Farmacologia Clínica - UNIFESP',
      commentary: 'As três classes de primeira linha da Hipertensão são: 1) Bloqueadores do SRAA (IECA ou BRA); 2) Bloqueadores dos Canais de Cálcio di-hidropiridínicos (Anlodipino); 3) Diuréticos Tiazídicos (Clortalidona, Indapamida, Hidroclorotiazida). Em estágio 2, NUNCA inicie monoterapia: inicie a dupla em um único comprimido para melhor adesão! E nunca junte IECA com BRA!',
      pearl: 'HAS Estágio 2: Dupla combinação inicial de 1ª linha (IECA/BRA + BCC ou Tiazídico). Proibido: IECA + BRA juntos.',
      pharmacologicalInsight: 'A associação de IECA/BRA com anlodipino reduz a incidência de edema maleolar (efeito colateral do anlodipino), pois o bloqueador do SRAA promove venodilatação pós-capilar, reduzindo a pressão hidrostática capilar gerada pela vasodilatação pré-capilar do BCC.'
    }
  },
  {
    id: 'cardio-q16',
    examBoard: 'UNIFESP',
    year: 2023,
    subject: 'Clínica Médica',
    subspecialty: 'Emergências e Toxicologia',
    difficulty: 'Difícil',
    cardioTopic: 'hipertensao',
    cardioTopicName: 'Hipertensão Arterial Sistêmica',
    statement: 'Um homem de 50 anos, portador de hipertensão de difícil controle e histórico de interrupção medicamentosa, é trazido ao pronto-socorro com confusão mental, cefaleia holocraniana intensa em pressão, vômitos em jato, turvação visual bilateral e sonolência. Ao exame físico: PA = 230/130 mmHg, FC 88 bpm. Fundo de olho revela edema de papila bilateral com exsudatos algodonosos e hemorragias em chama de vela. Tomografia computadorizada de crânio descarta hemorragia intracraniana aguda.',
    clinicalContext: 'Qual o diagnóstico sindrômico exato, a droga intravenosa de escolha imediata e a velocidade de redução pressórica recomendada na primeira hora de tratamento?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Emergência Hipertensiva (Encefalopatia Hipertensiva com retinopatia maligna); droga de escolha: Nitroprussiato de Sódio IV em infusão contínua; meta de redução da Pressão Arterial Média (PAM) de 20% a 25% na primeira hora.',
        isCorrect: true,
        explanation: 'Correta: Trata-se de uma verdadeira Emergência Hipertensiva: elevação crítica da PA (geralmente PAD > 120 mmHg) associada a Lesão Aguda de Órgão-Alvo progressiva (neste caso, Encefalopatia Hipertensiva com edema de papila por perda da autorregulação do fluxo sanguíneo cerebral e edema vasogênico). A droga de escolha é o Nitroprussiato de Sódio IV titulado em bomba de infusão. Regra de redução de emergência hipertensiva: redução gradual da PAM de no máximo 20% a 25% nas primeiras 1 a 2 horas (almejando cerca de 160/100-110 mmHg nas 2 a 6 horas seguintes), para evitar hipoperfusão cerebral e coronariana isquêmica!'
      },
      {
        id: 'alt-b',
        text: 'Urgência Hipertensiva; administrar Captopril 25 mg sublingual e liberar o paciente para domicílio com receita de ansiolítico.',
        isCorrect: false,
        explanation: 'Incorreta: A presença de edema de papila e confusão mental comprova lesão aguda de órgão-alvo; isso é EMERGÊNCIA hipertensiva, exigindo UTI e droga venosa.'
      },
      {
        id: 'alt-c',
        text: 'Emergência Hipertensiva; normalizar imediatamente a PA para 120/80 mmHg nos primeiros 15 minutos com bólus de hidralazina IV.',
        isCorrect: false,
        explanation: 'Incorreta: Queda abrupta da PA para níveis normais na encefalopatia hipertensiva desloca a curva de autorregulação cerebral para a zona isquêmica, gerando infarto cerebral watershed (isquemia de fronteira vascular) e cegueira cortical.'
      },
      {
        id: 'alt-d',
        text: 'Acidente Vascular Cerebral Isquêmico extenso; trombolisar imediatamente com Alteplase mesmo com PA de 230/130 mmHg.',
        isCorrect: false,
        explanation: 'Incorreta: Para trombólise no AVCi, a PA deve ser reduzida abaixo de 185/110 mmHg ANTES de infundir o trombolítico pelo risco de transformação hemorrágica maciça.'
      },
      {
        id: 'alt-e',
        text: 'Crise de Pânico com Síndrome de Hiperventilação; realizar reinalação em saco plástico sem qualquer anti-hipertensivo.',
        isCorrect: false,
        explanation: 'Incorreta: Edema de papila e hemorragias em chama de vela são achados físicos anatômicos de retinopatia hipertensiva estágio IV (maligna).'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Camilo Albuquerque',
      specialty: 'Medicina de Emergência - UNIFESP',
      commentary: 'Diferença capital entre Urgência e Emergência Hipertensiva: 1) Urgência = PA muito alta (≥180/120) SEM lesão aguda de órgão-alvo -> Drogas orais (Captopril, Anlodipino, Clonidina), redução em 24-48h; 2) Emergência = PA muito alta COM lesão aguda de órgão-alvo (encefalopatia, EAP, IAM, dissecção, eclâmpsia) -> UTI, droga IV titulável (Nitroprussiato, Nitroglicerina, Labetalol), redução da PAM em 20-25% na 1ª hora (exceto na dissecção que baixa para PAS 100-120 em 20 min).',
      pearl: 'Encefalopatia Hipertensiva = EMERGÊNCIA -> Nitroprussiato IV em UTI com redução da PAM de 20-25% na primeira hora.',
      pharmacologicalInsight: 'No uso prolongado de Nitroprussiato de Sódio (> 48-72h) ou em altas doses (> 2 mcg/kg/min) especialmente em nefropatas, deve-se monitorar intoxicação por tiocianato e cianeto (acidose lática, confusão mental e instabilidade).'
    }
  },
  {
    id: 'cardio-q17',
    examBoard: 'USP',
    year: 2023,
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'hipertensao',
    cardioTopicName: 'Hipertensão Arterial Sistêmica',
    statement: 'Mulher de 44 anos com diagnóstico de Hipertensão Arterial Resistente (em uso regular de doses máximas de Enalapril, Anlodipino e Clortalidona, mantendo PA de 164/98 mmHg). Nos exames laboratoriais de rotina, constata-se: Potássio sérico de 2,9 mEq/L (VR: 3,5 a 5,0 mEq/L), Sódio 144 mEq/L, Creatinina 0,8 mg/dL e gasometria venosa demonstrando alcalose metabólica.',
    clinicalContext: 'Qual a principal causa secundária endócrina de hipertensão a ser investigada neste cenário e qual o exame inicial de triagem laboratorial preconizado?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Hiperaldosteronismo Primário (Síndrome de Conn ou hiperplasia adrenal bilateral); dosagem matinal da relação Aldosterona Plasmática / Atividade de Renina Plasmática (relação PAC/PRA).',
        isCorrect: true,
        explanation: 'Correta: O quadro de Hipertensão Resistente associada a hipocalemia espontânea ou facilmente induzida por tiazídicos e alcalose metabólica é a apresentação clássica de Hiperaldosteronismo Primário (excesso autônomo de aldosterona no córtex adrenal). A aldosterona age nas células principais do túbulo coletor renal (ativando os canais ENaC e a bomba Na+/K+ ATPase), reabsorvendo sódio e secretando potássio e prótons H+ na urina. O teste de triagem padrão-ouro recomendado por todas as diretrizes é a relação Aldosterona Plasmática (ng/dL) / Atividade de Renina Plasmática (ng/mL/h) [relação PAC/PRA > 20-30].'
      },
      {
        id: 'alt-b',
        text: 'Feocromocitoma produtor de epinefrina; teste de estímulo com Clonidina e dosagem de TSH.',
        isCorrect: false,
        explanation: 'Incorreta: Feocromocitoma cursa com a tríade cefaleia em salvas + sudorese profusa + taquicardia/palpitações, e o rastreio é feito com metanefrinas livres plasmáticas ou urinárias fracionadas.'
      },
      {
        id: 'alt-c',
        text: 'Hipotireoidismo primário subclínico; cintilografia de tireoide com iodo-131.',
        isCorrect: false,
        explanation: 'Incorreta: Hipotireoidismo causa hipertensão diastólica leve com retenção hídrica, mas não hipocalemia com alcalose metabólica.'
      },
      {
        id: 'alt-d',
        text: 'Coarctação da Aorta torácica; dosagem de renina na veia cava inferior e ecocardiograma fetal.',
        isCorrect: false,
        explanation: 'Incorreta: Coarctação causa hipertensão em membros superiores com pulsos femorais fracos ou ausentes em jovens, sem hipocalemia primária.'
      },
      {
        id: 'alt-e',
        text: 'Síndrome de Liddle; tratamento com espironolactona em altas doses.',
        isCorrect: false,
        explanation: 'Incorreta: Na Síndrome de Liddle tanto a renina quanto a aldosterona são extremamente BAIXAS (pseudohiperaldosteronismo por mutação ativadora do canal ENaC) e não responde a antagonistas da aldosterona (responde a Amilorida).'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Hipertensão Arterial & Nefrologia Clínica - HCFMUSP',
      commentary: 'Hipertensão Resistente (não controlada com 3 classes incluindo diurético ou controlada apenas com 4 ou mais) exige investigação de causas secundárias: 1) Apneia Obstrutiva do Sono (a mais frequente); 2) Hiperaldosteronismo Primário (rastreio: relação aldosterona/renina > 30); 3) Doença Renovascular (estenose de artéria renal por displasia fibromuscular em mulheres jovens ou aterosclerose em idosos).',
      pearl: 'HAS Resistente + Hipocalemia + Alcalose Metabólica = HIPERALDOSTERONISMO PRIMÁRIO -> Relação Aldosterona / Renina.',
      pharmacologicalInsight: 'O 4º fármaco a ser adicionado na Hipertensão Resistente (estudo PATHWAY-2) é a Espironolactona (antagonista do receptor mineralocorticoide), que bloqueia a ação excessiva da aldosterona.'
    }
  },

  // ==========================================
  // 6. VALVOPATIAS (3 QUESTÕES)
  // ==========================================
  {
    id: 'cardio-q18',
    examBoard: 'USP',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'valvopatias',
    cardioTopicName: 'Valvopatias',
    statement: 'Um homem de 74 anos procura o ambulatório de cardiologia relatando episódios recentes de tontura e síncope ao subir escadas, associados a dor precordial aos esforços e dispneia para esforços moderados. Ao exame físico: pulso carotídeo de ascensão lenta e pequena amplitude (pulso parvus et tardus), ictus cordis sustentado e desviado para a esquerda. À ausculta cardíaca: sopro mesossistólico áspero em diamante (em crescendo-decrescendo) no segundo espaço intercostal direito (foco aórtico), que se irradia bilateralmente para as artérias carótidas, com B2 hipofonética.',
    clinicalContext: 'Qual a valvopatia em questão, os três sintomas clássicos que compõem sua história natural sintomática e o tratamento definitivo indicado?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Estenose Aórtica grave; a tríade clássica de sintomas é Composta por Angina, Síncope e Dispneia (tríade SAD); o tratamento definitivo é a substituição da valva aórtica (cirurgia convencional ou TAVI / implante percutâneo).',
        isCorrect: true,
        explanation: 'Correta: Quadro clínico clássico e incontestável de Estenose Aórtica (EAo) grave e sintomática. O sopro mesossistólico em diamante no foco aórtico com irradiação carotídea, associado ao pulso parvus et tardus e B2 hipofonética, é a marca registrada do estreitamento da via de saída aórtica. A tríade de sintomas clássica da história natural é o mnemônico "SAD": Síncope (sobrevida média ~3 anos), Angina (~5 anos) e Dispneia/Insuficiência Cardíaca (~2 anos). O surgimento de sintomas indica intervenção valvar imediata (troca valvar cirúrgica ou TAVI), pois o tratamento medicamentoso não altera a sobrevida.'
      },
      {
        id: 'alt-b',
        text: 'Insuficiência Mitral grave; tríade de hemoptise, disfagia e rouquidão; tratamento exclusivo com digitálicos e repouso.',
        isCorrect: false,
        explanation: 'Incorreta: A insuficiência mitral cursa com sopro holossistólico em foco mitral irradiando para a axila, sem irradiação carotídea ou pulso parvus et tardus.'
      },
      {
        id: 'alt-c',
        text: 'Estenose Mitral grave de etiologia reumática; tríade de pulso em martelo d\'água, sopro de Austin Flint e cianose periférica.',
        isCorrect: false,
        explanation: 'Incorreta: Estenose mitral cursa com sopro diastólico (ruflar) com estalido de abertura em ápice e pulso normal ou filiforme.'
      },
      {
        id: 'alt-d',
        text: 'Coarctação da Aorta com hipertrofia isolada de ventrículo direito; tratamento com vasodilatadores em altas doses.',
        isCorrect: false,
        explanation: 'Incorreta: Coarctação gera sopro interescapular dorsal com assimetria de pulsos entre membros superiores e inferiores.'
      },
      {
        id: 'alt-e',
        text: 'Prolapso da Valva Tricúspide com insuficiência tricúspide maciça; tratamento com transplante pulmonar isolado.',
        isCorrect: false,
        explanation: 'Incorreta: O sopro tricúspide aumenta com a inspiração (manobra de Rivero-Carvallo) e se localiza na borda esternal esquerda inferior.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Valvopatias & Hemodinâmica - InCor HCFMUSP',
      commentary: 'Estenose Aórtica (EAo) é a valvopatia mais comum do idoso no mundo ocidental (calcificação degenerativa senil em > 70 anos ou valva aórtica bicúspide em < 65 anos). Guarde os critérios ecocardiográficos de EAo grave: Área valvar < 1,0 cm² (ou indexada < 0,6 cm²/m²), gradiente médio de pressão transvalvar > 40 mmHg e velocidade de pico do jato aórtico > 4,0 m/s.',
      pearl: 'Estenose Aórtica Sintomática: Mnemônico "SAD" (Síncope, Angina, Dispneia) + Pulso parvus et tardus + Sopro mesossistólico carotídeo = Intervenção Valvar (TAVI ou Cirurgia).',
      anatomicalCorrelation: 'A valva aórtica normal é tricúspide (cúspides coronariana direita, coronariana esquerda e não-coronariana). A abertura reduzida gera jato turbulento em alta velocidade na raiz da aorta ascendente, provocando a clássica dilatação pós-estenótica da aorta.'
    }
  },
  {
    id: 'cardio-q19',
    examBoard: 'ENARE',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Médio',
    cardioTopic: 'valvopatias',
    cardioTopicName: 'Valvopatias',
    statement: 'Um homem de 48 anos com história de endocardite infecciosa prévia é avaliado no ambulatório com queixa de palpitações e fadiga aos esforços. Ao exame físico geral, chama a atenção: pressão arterial divergente de 160/45 mmHg; pulso radial com ascensão rápida e colapso abrupto (pulso em martelo d\'água ou pulso de Corrigan); pulsação rítmica visível do leito ungueal à compressão leve da lâmina ungueal (sinal de Quincke); e oscilação rítmica da cabeça sincrônica aos batimentos cardíacos (sinal de Musset). À ausculta: sopro diastólico de alta frequência, aspirativo, mais audível na borda esternal esquerda (3º e 4º EIC) com o paciente sentado e inclinado para a frente em expiração mantida.',
    clinicalContext: 'Qual a valvopatia associada a este exuberante conjunto de sinais semiológicos periféricos de hipercinética vascular?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Insuficiência Aórtica (IAo) crônica grave.',
        isCorrect: true,
        explanation: 'Correta: Caso clássico e inesquecível de Insuficiência Aórtica (IAo) crônica grave. Na IAo, durante a diástole, o sangue regurgita da aorta para o ventrículo esquerdo através da valva incompetente. Isso gera: 1) Aumento do volume sistólico ejetado na sístole subsequente (elevando a pressão sistólica); 2) Queda dramática da pressão aórtica na diástole por refluxo do sangue e escoamento periférico (reduzindo a pressão diastólica para valores < 50-60 mmHg). O resultado é uma enorme PRESSÃO DE PULSO DIVERGENTE (160x45 mmHg), que desencadeia todos os sinais periféricos hiperdinâmicos clássicos da semiologia médica: Pulso de Corrigan (martelo d\'água), Sinal de Quincke (pulsação ungueal), Sinal de Musset (balanço cefálico), Sinal de Müller (pulsação da úvula) e Sinal de Traube/Duroziez.'
      },
      {
        id: 'alt-b',
        text: 'Estenose Pulmonar congênita grave com shunt direita-esquerda pelo forame oval patente.',
        isCorrect: false,
        explanation: 'Incorreta: Estenose pulmonar não altera a pressão de pulso aórtica e gera sopro sistólico em foco pulmonar.'
      },
      {
        id: 'alt-c',
        text: 'Insuficiência Tricúspide secundária a hipertensão pulmonar primária.',
        isCorrect: false,
        explanation: 'Incorreta: Insuficiência tricúspide gera refluxo para o átrio direito com onda V gigante no pulso venoso jugular e refluxo hepatojugular, sem pulso em martelo d\'água.'
      },
      {
        id: 'alt-d',
        text: 'Cardiomiopatia Hipertrófica obstrutiva com gradiente intraventricular basal.',
        isCorrect: false,
        explanation: 'Incorreta: Cardiomiopatia hipertrófica cursa com pulso bisferiens e sopro mesossistólico que AUMENTA com manobra de Valsalva, sem pressão de pulso divergente de 160x45.'
      },
      {
        id: 'alt-e',
        text: 'Mixoma atrial esquerdo com obstrução dinâmica da valva mitral.',
        isCorrect: false,
        explanation: 'Incorreta: O mixoma gera o característico "tumor plop" no ápice cardíaco com sintomas posturais, sem os estigmas periféricos de hipercinética da IAo.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Camila Meirelles',
      specialty: 'Cardiologia Clínica & Semiologia - InCor FMUSP',
      commentary: 'A Insuficiência Aórtica crônica é o paraíso dos epônimos semiológicos em provas de residência médica! Guarde a fisiopatologia: Sobrecarga volumétrica do VE + Regurgitação diastólica = Pressão de pulso muito ampla (PA divergente). Todos os sinais (Corrigan, Quincke, Musset, Müller, Duroziez) derivam unicamente da rápida expansão e colapso das artérias periféricas.',
      pearl: 'PA divergente (ex: 160x40 mmHg) + Pulso em martelo d\'água (Corrigan) + Sinal de Quincke = INSUFICIÊNCIA AÓRTICA.',
      anatomicalCorrelation: 'Na IAo crônica, o VE sofre hipertrofia excêntrica compensatória maciça, com aumento dos diâmetros diastólico e sistólico (cor bovis). Critério cirúrgico em assintomático: Diâmetro Sistólico Final do VE > 50 mm (ou > 25 mm/m²) ou FE ≤ 50%.'
    }
  },
  {
    id: 'cardio-q20',
    examBoard: 'UNICAMP',
    year: 2024,
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Difícil',
    cardioTopic: 'valvopatias',
    cardioTopicName: 'Valvopatias',
    statement: 'Uma mulher de 38 anos, natural do interior da Bahia, com história de febre reumática na infância tratada irregularmente, é atendida no ambulatório com dispneia progressiva nos últimos 6 meses (atualmente aos esforços habituais - classe funcional II da NYHA) e palpitações esporádicas. Ao exame: rubor malar característico (fácies mitral). À ausculta cardíaca no ápice: primeira bulha (B1) hiperfonética, estalido de abertura valvar precoce na protodiástole seguido por um sopro em ruflar diastólico de baixa frequência com reforço pré-sistólico. O ECG revela ritmo de Fibrilação Atrial (ausência de ondas P e intervalos R-R irregulares).',
    clinicalContext: 'Qual a valvopatia reumática primária, qual a razão hemodinâmica da perda do reforço pré-sistólico na presença de Fibrilação Atrial e qual a profilaxia antibiótica secundária mandatória?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Estenose Mitral reumática; o reforço pré-sistólico do ruflar desaparece porque depende da contração atrial ativa (sístole atrial), a qual é abolida na Fibrilação Atrial; a profilaxia secundária deve ser feita com Penicilina G Benzatina 1.200.000 UI intramuscular a cada 21 dias até os 40 anos de idade (ou para o resto da vida se alto risco de exposição/lesão valvar grave).',
        isCorrect: true,
        explanation: 'Correta: Questão brilhante integrando semiologia, eletrocardiograma e profilaxia de febre reumática! A estenose mitral é a valvopatia reumática mais comum e quase exclusivamente de etiologia reumática no Brasil. A semiologia clássica é a tríade de Duroziez: B1 hiperfonética + estalido de abertura + ruflar diastólico com reforço pré-sistólico. O reforço pré-sistólico do sopro ocorre exatamente durante a contração atrial que força o sangue residual através da valva estenosada; logo, se o paciente entra em Fibrilação Atrial (perda mecânica e elétrica da sístole atrial), O REFORÇO PRÉ-SISTÓLICO DESAPARECE! Pela diretriz brasileira de Febre Reumática, em pacientes com valvopatia estabelecida, a profilaxia secundária com Penicilina Benzatina a cada 21 dias deve ser mantida até os 40 anos de idade ou por toda a vida nos casos graves.'
      },
      {
        id: 'alt-b',
        text: 'Insuficiência Mitral aguda por endocardite fúngica; a contração ventricular é suprimida pela fibrilação atrial; profilaxia com azitromicina oral em dose única diária por 6 meses.',
        isCorrect: false,
        explanation: 'Incorreta: A ausculta descrita é tipicamente diastólica estenótica (ruflar), não sopro holossistólico de insuficiência mitral.'
      },
      {
        id: 'alt-c',
        text: 'Estenose Tricúspide associada à Síndrome Carcinoide; profilaxia primária com vancomicina venosa a cada 12 horas.',
        isCorrect: false,
        explanation: 'Incorreta: A síndrome carcinoide afeta câmaras direitas (valva tricúspide e pulmonar) sem relação com febre reumática ou fácies mitral.'
      },
      {
        id: 'alt-d',
        text: 'Estenose Aórtica congênita; a fibrilação atrial restaura o fluxo transaórtico sem risco tromboembólico; profilaxia dispensada.',
        isCorrect: false,
        explanation: 'Incorreta: A estenose mitral com FA tem altíssimo risco cardioembólico (trombos no apêndice atrial esquerdo) e indicação absoluta de anticoagulação com varfarina (AVK com meta de INR 2-3).'
      },
      {
        id: 'alt-e',
        text: 'Defeito do septo interatrial tipo ostium secundum; o ruflar decorre de hiperfluxo na valva aórtica; não requer antibióticos.',
        isCorrect: false,
        explanation: 'Incorreta: CIA cursa com desdobramento fixo e amplo de B2 em foco pulmonar sem estalido de abertura mitral.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Camila Meirelles',
      specialty: 'Cardiologia Clínica & Doença Valvar Reumática - InCor FMUSP',
      commentary: 'Três pontos de ouro sobre Estenose Mitral: 1) Ausculta: B1 hiperfonética + estalido de abertura + ruflar diastólico em ápice. 2) Se entrar em Fibrilação Atrial (muito frequente pelo aumento do átrio esquerdo): o reforço pré-sistólico DESAPARECE e o paciente descompensa rapidamente (perda do enchimento ventricular diastólico por taquiarritmia). 3) Anticoagulação na Estenose Mitral moderada a grave com FA é OBRIGATORIAMENTE com Antagonista da Vitamina K (Varfarina, INR 2-3). DOACs (Apixabana, Rivaroxabana) NÃO são aprovados na estenose mitral reumática moderada/grave!',
      pearl: 'Estenose Mitral: Ruflar diastólico com estalido. Em Fibrilação Atrial, o reforço pré-sistólico some! Anticoagulação OBRIGATÓRIA = Varfarina (não usar DOACs).',
      anatomicalCorrelation: 'A dilatação maciça do átrio esquerdo na estenose mitral pode comprimir o nervo laríngeo recorrente esquerdo contra a artéria pulmonar e o arco aórtico, causando rouquidão crônica (Síndrome de Ortner).'
    }
  }
];

// High-Yield Comparative Matrix for the 6 topics
export interface DiagnosticComparison {
  title: string;
  category: string;
  columns: string[];
  rows: {
    feature: string;
    col1: string;
    col2: string;
    col3?: string;
    col4?: string;
  }[];
  pearl: string;
}

export const CARDIO_COMPARISON_MATRICES: DiagnosticComparison[] = [
  {
    title: 'Dissecção Aguda de Aorta vs Síndrome Coronariana Aguda (SCA) vs Miocardite',
    category: 'Diagnóstico Diferencial da Dor Torácica Aguda',
    columns: ['Parâmetro', 'Dissecção Aguda de Aorta', 'SCA com Supra de ST (IAM)', 'Miocardite Aguda'],
    rows: [
      {
        feature: 'Característica da Dor',
        col1: 'Súbita, intensidade máxima no início (10/10), "rasgante / facada", migra para o dorso/interescapular.',
        col2: 'Opressiva em aperto / queimação, irradiação para MSE/mandíbula, associada a náusea e sudorese fria.',
        col3: 'Em pontada/queimação, piora na inspiração profunda e decúbito; alivia ao inclinar o tórax para a frente (prece).'
      },
      {
        feature: 'Histórico & Pródromos',
        col1: 'Hipertensão descontrolada grave, Marfan, valva aórtica bicúspide, coarctação.',
        col2: 'Fatores de risco ateroscleróticos clássicos (tabagismo, DM, dislipidemia, idade > 50a).',
        col3: 'Jovem previamente hígido com pródromo viral respiratório ou gastrointestinal 1 a 2 semanas antes.'
      },
      {
        feature: 'Achados no ECG',
        col1: 'Geralmente normal ou sobrecarga de VE (pode ter supra inferior se ocluir óstio da coronária direita).',
        col2: 'Supradesnivelamento do segmento ST CONVEXO em derivações contíguas com imagem em espelho.',
        col3: 'Supradesnivelamento do segmento ST CÔNCAVO e DIFUSO, acompanhado de infradesnível de PR.'
      },
      {
        feature: 'Curva Enzimática (Troponina)',
        col1: 'Geralmente normal ou discretamente elevada (exceto se delaminar óstio coronariano).',
        col2: 'Curva típica de ascensão e queda em plateau compatível com necrose isquêmica.',
        col3: 'Elevação acentuada e desproporcional com CATE demonstrando artérias coronárias normais.'
      },
      {
        feature: 'Exame Padrão-Ouro',
        col1: 'Angio-TC de Aorta (se estável) ou Ecocardiograma Transesofágico (se instável).',
        col2: 'Cineangiocoronariografia imediata (CATE) com cateterismo cardíaco.',
        col3: 'Ressonância Magnética Cardíaca (Critérios de Lake Louise: realce tardio meso/epicárdico).'
      },
      {
        feature: 'Conduta Primária de Emergência',
        col1: 'Controle de dP/dt: Betabloqueador IV (Esmolol) ANTES de Nitroprussiato. Tipo A: Cirurgia imediata.',
        col2: 'Dupla antiagregação (AAS + Ticagrelor) + Anticoagulação + Reperfusão imediata (Porta-Balão ≤ 90 min).',
        col3: 'Suporte hemodinâmico, repouso, AINEs/Colchicina em miopericardite leve; ECMO/BEM se fulminante.'
      },
      {
        feature: 'ERRO FATAL a Evitar',
        col1: 'Dar trombolítico ou vasodilatador puro isolado (rompe a falsa luz).',
        col2: 'Atrasar a reperfusão esperando resultado de troponina.',
        col3: 'Prescrever anti-inflamatórios em dose alta se houver disfunção ventricular grave sem pericardite.'
      }
    ],
    pearl: 'Betabloqueador ANTES de vasodilatador na dissecção. Trombolítico é PROIBIDO na dissecção!'
  },
  {
    title: 'As Quatro Grandes Valvopatias Esquematizadas',
    category: 'Semiologia e Condutas Valvares',
    columns: ['Valvopatia', 'Foco & Característica do Sopro', 'Irradiação', 'Achados de Pulso e PA', 'Critério / Conduta Cirúrgica'],
    rows: [
      {
        feature: 'Estenose Aórtica (EAo)',
        col1: 'Mesossistólico áspero em diamante (crescendo-decrescendo) no foco aórtico (2º EIC direito); B2 hipofonética.',
        col2: 'Irradia bilateralmente para as artérias carótidas.',
        col3: 'Pulso parvus et tardus (lento e pequena amplitude). Pressão de pulso estreita.',
        col4: 'Tríade "SAD" (Síncope, Angina, Dispneia) ou Área valvar < 1,0 cm² ou FE < 50% -> Troca valvar ou TAVI.'
      },
      {
        feature: 'Insuficiência Aórtica (IAo)',
        col1: 'Diastólico aspirativo de alta frequência em borda esternal esquerda (3º/4º EIC) com tórax inclinado.',
        col2: 'Irradiação para o ápice (sopro funcional de Austin Flint em casos graves).',
        col3: 'Pulso em martelo d\'água / Corrigan. Pressão de pulso muito ampla / divergente (ex: 160x40 mmHg).',
        col4: 'Sintomas ou FE ≤ 50% ou Diâmetro Sistólico Final do VE > 50 mm -> Cirurgia de troca valvar aórtica.'
      },
      {
        feature: 'Estenose Mitral (EM)',
        col1: 'Diastólico em ruflar de baixa frequência em foco mitral (ápice) com B1 hiperfonética e estalido de abertura.',
        col2: 'Geralmente restrito ao ápice (decúbito lateral esquerdo - Pachon).',
        col3: 'Pulso normal ou pequeno. Perda do reforço pré-sistólico se houver Fibrilação Atrial.',
        col4: 'Área valvar < 1,5 cm² sintomática -> Valvoplastia Mitral por Balão Percutânea (escore de Wilkins ≤ 8).'
      },
      {
        feature: 'Insuficiência Mitral (IM)',
        col1: 'Holossistólico regurgitativo em foco mitral (ápice); presença de B3 protodiastólica por hiperfluxo.',
        col2: 'Irradia caracteristicamente para a axila esquerda.',
        col3: 'Ictus de VE hiperdinâmico e desviado para baixo e esquerda.',
        col4: 'Sintomas ou FE ≤ 60% ou Diâmetro Sistólico Final VE ≥ 40 mm -> Plastia mitral ou troca valvar.'
      }
    ],
    pearl: 'Sopros sistólicos: Estenose Aórtica e Insuficiência Mitral. Sopros diastólicos: Estenose Mitral e Insuficiência Aórtica.'
  },
  {
    title: 'Aneurisma de Aorta Abdominal (AAA) vs Aneurisma de Aorta Torácica (AAT)',
    category: 'Cirurgia Vascular e Critérios de Intervenção',
    columns: ['Parâmetro', 'Aneurisma de Aorta Abdominal (AAA)', 'Aneurisma de Aorta Torácica (AAT)'],
    rows: [
      {
        feature: 'Topografia Mais Frequente',
        col1: 'Infrarrenal (> 90% dos casos, entre as artérias renais e a bifurcação ilíaca).',
        col2: 'Aorta Ascendente (60%), seguido por Aorta Descendente (35%) e Arco Aórtico (< 10%).'
      },
      {
        feature: 'Fatores de Risco Primários',
        col1: 'Tabagismo (principal fator modificável), idade > 65 anos, sexo masculino (4:1), aterosclerose.',
        col2: 'Hipertensão crônica, Síndromes genéticas (Marfan, Ehlers-Danlos, Loeys-Dietz), valva bicúspide.'
      },
      {
        feature: 'Rastreio Populacional Recomendado',
        col1: 'Ultrassonografia de abdome em homens de 65 a 75 anos com histórico de tabagismo.',
        col2: 'Ecocardiograma / Angio-TC em parentes de 1º grau de Marfan ou valva bicúspide; sem rastreio geral.'
      },
      {
        feature: 'Diâmetro de Indicação Cirúrgica Eletiva',
        col1: '≥ 5,5 cm em homens | ≥ 5,0 cm em mulheres | Taxa de expansão > 0,5 cm/6 meses ou > 1,0 cm/ano.',
        col2: 'Aorta Ascendente: ≥ 5,5 cm no geral | ≥ 5,0 cm em Marfan | Aorta Descendente: ≥ 5,5-6,0 cm.'
      },
      {
        feature: 'Técnica de Reparo Principal',
        col1: 'Reparo Endovascular (EVAR) com endoprótese bifurcada ou Cirurgia Aberta com enxerto de Dacron.',
        col2: 'Cirurgia de Bentall-De Bono / Cirurgia de David (ascendente) ou TEVAR endovascular (descendente).'
      }
    ],
    pearl: 'AAA: operamos com ≥ 5,5 cm ou se dor/expansão rápida. AAT em Marfan: operamos com ≥ 5,0 cm.'
  },
  {
    title: 'Crise Hipertensiva: Emergência vs Urgência vs Pseudocrise',
    category: 'Abordagem na Sala de Emergência',
    columns: ['Característica', 'Emergência Hipertensiva', 'Urgência Hipertensiva', 'Pseudocrise Hipertensiva'],
    rows: [
      {
        feature: 'Nível Pressórico',
        col1: 'Muito elevado (geralmente PAD > 120 mmHg e PAS > 180-220 mmHg).',
        col2: 'Elevado (geralmente PAD ≥ 120 mmHg e PAS ≥ 180 mmHg).',
        col3: 'Elevado temporariamente em resposta a dor, ansiedade, pânico ou estresse agudo.'
      },
      {
        feature: 'Lesão Aguda de Órgão-Alvo',
        col1: 'PRESENTE e ativa (Encefalopatia, IAM, EAP, Dissecção, AVC, Eclâmpsia).',
        col2: 'AUSENTE (sem sintomas de falência orgânica aguda).',
        col3: 'AUSENTE (sintomas atribuíveis a estresse emocional ou cefaleia tensional).'
      },
      {
        feature: 'Ambiente de Atendimento',
        col1: 'Sala Vermelha / UTI com monitorização contínua e linha arterial.',
        col2: 'Observação no Pronto-Socorro por algumas horas.',
        col3: 'Ambulatório / Acolhimento em sala de medicação simples.'
      },
      {
        feature: 'Via de Administração Farmacológica',
        col1: 'Estritamente INTRAVENOSA em bomba contínua (Nitroprussiato, Nitroglicerina, Labetalol).',
        col2: 'VIA ORAL com drogas de ação intermediária (Captopril, Anlodipino, Clonidina).',
        col3: 'Tratar a CAUSA BASE (analgésico, ansiolítico, repouso em ambiente calmo).'
      },
      {
        feature: 'Meta de Redução de PA',
        col1: 'Redução da PAM em 20% a 25% na primeira hora (exceto na dissecção que exige PAS 100-120 em 20 min).',
        col2: 'Redução gradual em 24 a 48 horas (meta < 160/100 mmHg).',
        col3: 'Redução espontânea após controle da dor e da ansiedade.'
      }
    ],
    pearl: 'Lesão aguda de órgão-alvo define EMERGÊNCIA. Sem lesão = URGÊNCIA (tratar com comprimido via oral, não precisa de nitroprussiato na veia!).'
  }
];

// High-Yield Flashcards for the 6 topics (SM-2 Ready)
export const CARDIO_TOPIC_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-cardio-1',
    front: 'DAC: Qual o tempo porta-balão recomendado no IAM com supra de ST e qual a terapia antiplaquetária dupla inicial?',
    back: 'Tempo porta-balão ≤ 90 minutos em centro com hemodinâmica (ou ≤ 120 min se transferido). Terapia antiplaquetária dupla imediata: AAS 200-300 mg mastigado + Inibidor P2Y12 (Ticagrelor 180 mg ataque ou Clopidogrel 600 mg) associado a anticoagulação parenteral (HNF ou Enoxaparina).',
    subject: 'Clínica Médica',
    subspecialty: 'Farmacologia Cardiovascular',
    clinicalPearl: 'Ticagrelor é preferível ao clopidogrel no estudo PLATO por reduzir mortalidade global e cardiovascular em SCA.',
    mnemonic: 'Porta-balão: 90 minutos | Porta-agulha (trombolítico): 30 minutos',
    ankiTags: ['Cardio::DAC', 'IAM_CSST', 'Farmaco_Cardio'],
    sm2: {
      repetitions: 1,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 1,
      lapseCount: 0
    }
  },
  {
    id: 'fc-cardio-2',
    front: 'DISSECÇÃO DE AORTA: Qual a regra farmacológica de ouro sobre o controle pressórico e inotrópico no atendimento inicial?',
    back: 'Betabloqueador IV (Esmolol ou Labetalol) SEMPRE ANTES de vasodilatadores diretos (Nitroprussiato de Sódio)! Meta: FC < 60 bpm e PAS entre 100 e 120 mmHg. Justificativa: vasodilatador isolado gera taquicardia reflexa e aumento da dP/dt (força de cisalhamento da onda de pulso), propagando a delaminação aórtica.',
    subject: 'Farmacologia',
    subspecialty: 'Emergências e Toxicologia',
    clinicalPearl: 'Stanford A = Aorta Ascendente -> Cirurgia de emergência imediata. Stanford B = Descendente -> Tratamento clínico intensivo inicial (se não complicada).',
    mnemonic: 'BETA antes de NITRO (Controle o dP/dt primeiro!)',
    ankiTags: ['Cardio::Disseccao', 'Emergencias', 'Cirurgia_Vascular'],
    sm2: {
      repetitions: 2,
      interval: 3,
      easeFactor: 2.6,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 2,
      lapseCount: 0
    }
  },
  {
    id: 'fc-cardio-3',
    front: 'MIOCARDITE: Quais as características clássicas na Ressonância Magnética Cardíaca (Critérios de Lake Louise) que a diferenciam do Infarto?',
    back: 'Na Miocardite, o realce tardio com gadolínio é de padrão NÃO ISQUÊMICO: acomete a camada subepicárdica e o mesocárdio, poupando a camada subendocárdica e sem respeitar fronteiras coronarianas. Já no infarto isquêmico, o realce é sempre SUBENDOCÁRDICO ou transmural, estritamente restrito ao território da artéria ocluída.',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    clinicalPearl: 'Jovem com dor torácica + troponina estourada + cateterismo sem lesão = pensar em Miocardite aguda!',
    mnemonic: 'Miocardite = Mesocárdio / Subepicárdio | Infarto = Subendocárdio',
    ankiTags: ['Cardio::Miocardite', 'Ressonancia_Cardiaca', 'Diagnostico_Diferencial'],
    sm2: {
      repetitions: 1,
      interval: 2,
      easeFactor: 2.4,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 1,
      lapseCount: 0
    }
  },
  {
    id: 'fc-cardio-4',
    front: 'ANEURISMA DE AORTA: Quais os critérios cirúrgicos formais para o Aneurisma de Aorta Abdominal (AAA) assintomático?',
    back: '1) Diâmetro ≥ 5,5 cm em homens (ou ≥ 5,0 cm em mulheres);\n2) Taxa de expansão rápida: > 0,5 cm em 6 meses ou > 1,0 cm em 1 ano;\n3) Morfologia sacular (alto risco de rotura mesmo em tamanhos menores);\n4) Qualquer sintoma atribuível (dor lombar/abdominal nova, sopro, embolização periférica).',
    subject: 'Cirurgia',
    subspecialty: 'Anatomia Cardiovascular',
    clinicalPearl: 'Rastreamento com USG abdominal: indicado para homens de 65 a 75 anos com histórico de tabagismo.',
    mnemonic: '5,5 cm no Homem | 5,0 cm na Mulher | > 0,5 cm em 6 meses',
    ankiTags: ['Cardio::Aneurisma', 'Cirurgia_Vascular', 'Rastreio'],
    sm2: {
      repetitions: 2,
      interval: 4,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 2,
      lapseCount: 0
    }
  },
  {
    id: 'fc-cardio-5',
    front: 'HIPERTENSÃO: Quais as classes de fármacos de 1ª linha na HAS e qual associação de duas drogas é FORMALMENTE PROIBIDA?',
    back: '1ª Linha: 1) IECA ou BRA; 2) Bloqueador de Canal de Cálcio di-hidropiridínico (Anlodipino); 3) Diurético Tiazídico (Clortalidona/Indapamida). Em estágio 2, inicia-se combinação de 2 drogas de 1ª linha. Associação PROIBIDA: IECA + BRA (risco dramático de insuficiência renal aguda, hipercalemia grave e ausência de benefício cardiovascular).',
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia Cardiovascular',
    clinicalPearl: 'Meta pressórica na maioria dos adultos: PA < 130/80 mmHg.',
    mnemonic: 'Trio de Ouro: IECA/BRA + BCC + Tiazídico. NUNCA IECA com BRA!',
    ankiTags: ['Cardio::Hipertensao', 'Farmacologia', 'Diretrizes'],
    sm2: {
      repetitions: 3,
      interval: 6,
      easeFactor: 2.6,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 3,
      lapseCount: 0
    }
  },
  {
    id: 'fc-cardio-6',
    front: 'VALVOPATIAS: Quais os achados semiológicos cardinais da Estenose Aórtica grave e da Insuficiência Aórtica grave?',
    back: 'Estenose Aórtica: Sopro mesossistólico em diamante no foco aórtico irradiando para as carótidas + Pulso parvus et tardus + B2 hipofonética + Tríade SAD (Síncope, Angina, Dispneia).\nInsuficiência Aórtica: Sopro diastólico aspirativo em borda esternal esquerda + PA muito divergente (ex: 160x40 mmHg) + Pulso em martelo d\'água (Corrigan) + Sinal de Quincke e Musset.',
    subject: 'Clínica Médica',
    subspecialty: 'Anatomia Cardiovascular',
    clinicalPearl: 'Na Estenose Mitral reumática em Fibrilação Atrial, o reforço pré-sistólico do ruflar diastólico desaparece completamente pela ausência de contração atrial.',
    mnemonic: 'EAo: SAD + Parvus et tardus | IAo: Corrigan + PA divergente',
    ankiTags: ['Cardio::Valvopatias', 'Semiologia', 'Sopros'],
    sm2: {
      repetitions: 2,
      interval: 4,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      totalReviews: 2,
      lapseCount: 0
    }
  }
];

// Quick Quiz Questions (True or False / Rapid Fire)
export interface QuickConceptQuiz {
  id: string;
  topic: CardioTopicId;
  question: string;
  isTrue: boolean;
  explanation: string;
}

export const CARDIO_QUICK_QUIZ: QuickConceptQuiz[] = [
  {
    id: 'qq-1',
    topic: 'dac',
    question: 'No infarto agudo com supradesnivelamento de ST, o médico deve aguardar a curva de troponina de 1 e 3 horas antes de encaminhar o paciente para a hemodinâmica.',
    isTrue: false,
    explanation: 'FALSO! No IAM com supra de ST, o diagnóstico é imediato pelo ECG. Esperar troponina atrasa a reperfusão e causa perda irreversível de miocárdio.'
  },
  {
    id: 'qq-2',
    topic: 'disseccao',
    question: 'Em um paciente com dissecção de aorta e pressão de 210/120 mmHg, a primeira medicação deve ser um betabloqueador venoso para desacelerar a frequência cardíaca abaixo de 60 bpm antes de iniciar vasodilatadores diretos.',
    isTrue: true,
    explanation: 'VERDADEIRO! O betabloqueador reduz a contratilidade e o dP/dt miocárdico, protegendo a íntima aórtica antes que o vasodilatador direto provoque taquicardia reflexa.'
  },
  {
    id: 'qq-3',
    topic: 'miocardite',
    question: 'O padrão de realce tardio com gadolínio na miocardite é predominantemente subendocárdico, respeitando estritamente o território anatômico de uma artéria coronária.',
    isTrue: false,
    explanation: 'FALSO! O realce subendocárdico por território vascular é a marca registrada do INFARTO isquêmico. Na Miocardite, o realce acomete o mesocárdio e subepicárdio, poupando o subendocárdio.'
  },
  {
    id: 'qq-4',
    topic: 'aneurisma',
    question: 'Um homem tabagista de 70 anos com Aneurisma de Aorta Abdominal assintomático medindo 5,7 cm tem indicação formal de correção cirúrgica programada.',
    isTrue: true,
    explanation: 'VERDADEIRO! O diâmetro de corte para cirurgia em homens assintomáticos é ≥ 5,5 cm, pois acima desse valor o risco de rotura anual supera o risco cirúrgico.'
  },
  {
    id: 'qq-5',
    topic: 'hipertensao',
    question: 'A combinação simultânea de IECA (ex: Enalapril) com BRA (ex: Losartana) é amplamente recomendada por potencializar a nefroproteção sem aumentar efeitos adversos.',
    isTrue: false,
    explanation: 'FALSO! A associação IECA + BRA é formalmente contraindicada. Estudos clínicos comprovaram aumento expressivo de insuficiência renal aguda e hipercalemia letal sem nenhum benefício cardiovascular adicional.'
  },
  {
    id: 'qq-6',
    topic: 'valvopatias',
    question: 'Na estenose aórtica grave sintomática, os pacientes apresentam classicamente pulso parvus et tardus e sopro mesossistólico em diamante que se irradia para as carótidas.',
    isTrue: true,
    explanation: 'VERDADEIRO! O estreitamento da valva aórtica gera ejeção prolongada de baixa amplitude (parvus et tardus) e sopro em diamante com irradiação carotídea caraterística.'
  }
];
