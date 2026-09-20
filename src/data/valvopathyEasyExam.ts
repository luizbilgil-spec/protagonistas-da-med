import { QuestionAlternative } from '../types';

export interface ValvopathyExamQuestion {
  id: string;
  questionNumber: number;
  difficulty: 'facil' | 'media' | 'dificil';
  difficultyLabel: 'Fácil' | 'Média' | 'Difícil';
  subject: string;
  topic: string;
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

export const VALVOPATHY_EASY_EXAM: ValvopathyExamQuestion[] = [
  {
    id: 'facil-q01',
    questionNumber: 1,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Fisiopatologia e Cronologia da Quarta Bulha (B4)',
    statement: 'A quarta bulha cardíaca (B4) é um som de baixa frequência auscultado no final da diástole (telediástole ou pré-sístole). Qual é o mecanismo fisiológico responsável pela produção de B4?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Contração vigorosa do miocárdio atrial (sístole atrial) impulsionando o sangue contra um ventrículo com complacência reduzida e hipertrofiado.',
        isCorrect: true,
        explanation: 'Correta. B4 é o ruído telediastólico gerado pelo "kick" atrial: a contração ativa do átrio empurra o sangue contra a parede ventricular rígida e pouco complacente.'
      },
      {
        id: 'alt-b',
        text: 'Desaceleração súbita do sangue durante a fase protodiastólica de enchimento ventricular rápido.',
        isCorrect: false,
        explanation: 'Incorreta. Essa é a definição fisiológica da terceira bulha (B3).'
      },
      {
        id: 'alt-c',
        text: 'Fechamento tardio das cúspides da valva pulmonar durante a inspiração profunda.',
        isCorrect: false,
        explanation: 'Incorreta. Isso descreve o desdobramento fisiológico de B2.'
      },
      {
        id: 'alt-d',
        text: 'Abertura rápida sob alta pressão das cúspides espessadas da valva mitral.',
        isCorrect: false,
        explanation: 'Incorreta. Trata-se do estalido de abertura mitral.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Gênese da Quarta Bulha (B4): Sístole Atrial contra Ventrículo Rígido',
      clinicalPearl: 'B4 = som pré-sistólico/telediastólico gerado pela sístole mecânica do átrio ejetando contra uma câmara ventricular espessa e rígida.',
      detailedExplanation: 'A B4 surge imediatamente antes da B1. Quando a parede ventricular se torna hipertrofiada (como na HAS e na estenose aórtica), ela perde complacência. O enchimento passivo inicial é insuficiente, de modo que o átrio precisa contrair com força máxima. O impacto do fluxo sanguíneo desacelerado bruscamente na parede rígida gera a B4.',
      distractorAnalysis: 'Distratores clássicos confundem B4 (sístole atrial / telediástole) com B3 (enchimento rápido / protodiástole) ou estalidos de abertura.'
    }
  },
  {
    id: 'facil-q02',
    questionNumber: 2,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular & Ritmo Cardíaco',
    topic: 'Impossibilidade de B4 na Fibrilação Atrial',
    statement: 'Em um paciente portador de Fibrilação Atrial crônica, por que é fisiologicamente impossível a ausculta de uma Quarta Bulha (B4)?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Porque a frequência cardíaca na fibrilação atrial é sempre baixa demais para gerar sons diastólicos adicionais.',
        isCorrect: false,
        explanation: 'Incorreta. A frequência ventricular na FA varia amplamente e isso não impede sons de enchimento rápido como B3.'
      },
      {
        id: 'alt-b',
        text: 'Porque a gênese de B4 depende da contração mecânica coordenada do átrio (sístole atrial); na fibrilação atrial não existe sístole mecânica atrial organizada.',
        isCorrect: true,
        explanation: 'Correta. B4 requer o impacto mecânico da sístole atrial telediastólica. Como na fibrilação atrial as fibras despolarizam caoticamente e o átrio apenas trepida sem contração de câmara, B4 é nula.'
      },
      {
        id: 'alt-c',
        text: 'Porque na fibrilação atrial a valva aórtica permanece permanentemente fechada.',
        isCorrect: false,
        explanation: 'Incorreta. A valva aórtica abre normalmente a cada sístole ventricular ejetiva.'
      },
      {
        id: 'alt-d',
        text: 'Porque a fibrilação atrial anula imediatamente a hipertrofia ventricular esquerda.',
        isCorrect: false,
        explanation: 'Incorreta. A hipertrofia concêntrica é uma alteração estrutural crônica e não regride com o surgimento da arritmia.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Fibrilação Atrial e Quarta Bulha: Incompatibilidade Fisiológica Absoluta',
      clinicalPearl: 'Regra de Ouro: Na presença de Fibrilação Atrial, NUNCA pode existir Quarta Bulha (B4), pois não há sístole atrial coordenada!',
      detailedExplanation: 'Na FA, a perda da contração atrial coordenada suprime o "kick" atrial. Sem o choque mecânico do sangue propulsionado pelo átrio contra o ventrículo rígido no final da diástole, B4 é impossível. O galope que pode ocorrer na FA é o galope por B3.',
      distractorAnalysis: 'Qualquer opção afirmando que B4 pode ser ouvida na FA está conceitualmente errada.'
    }
  },
  {
    id: 'facil-q03',
    questionNumber: 3,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Fisiopatologia da Terceira Bulha (B3)',
    statement: 'A terceira bulha cardíaca (B3) é um ruído protodiastólico de baixa frequência. Em pacientes adultos com insuficiência cardíaca, a B3 é classicamente indicativa de:',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sobrecarga de volume com dilatação ventricular e elevação das pressões de enchimento durante a fase de enchimento ventricular rápido.',
        isCorrect: true,
        explanation: 'Correta. A B3 surge na protodiástole, logo após a abertura das atrioventriculares, quando grande volume de sangue entra rapidamente no ventrículo complacente e dilatado sob alta pressão atrial.'
      },
      {
        id: 'alt-b',
        text: 'Sobrecarga de pressão pura com miocárdio hipertrofiado e sem qualquer retenção volêmica.',
        isCorrect: false,
        explanation: 'Incorreta. Sobrecarga de pressão pura em miocárdio rígido gera B4, não B3.'
      },
      {
        id: 'alt-c',
        text: 'Fechamento prematuro das valvas semilunares aórtica e pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. O fechamento semilunar produz B2.'
      },
      {
        id: 'alt-d',
        text: 'Estenose congênita calcificada do anel valvar tricúspide.',
        isCorrect: false,
        explanation: 'Incorreta. B3 é um som de enchimento rápido ventricular esquerdo ou direito, não estenose.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'B3: Marco de Sobrecarga de Volume e Enchimento Rápido Protodiastólico',
      clinicalPearl: 'B3 = Protodiástole = Enchimento rápido = Sobrecarga de volume = Ventrículo dilatado / Insuficiência Cardíaca descompensada.',
      detailedExplanation: 'Cerca de 0,12 a 0,18 segundos após B2, o sangue atrial invade o ventrículo complacente. A desaceleração súbita dessa coluna de volume gera vibrações nas paredes e músculos papilares, gerando o galope ventricular de B3.',
      distractorAnalysis: 'Distratores associam erroneamente B3 a sobrecarga de pressão e estenose.'
    }
  },
  {
    id: 'facil-q04',
    questionNumber: 4,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Valvopatias & Semiologia',
    topic: 'Características Auscultatórias da Estenose Aórtica',
    statement: 'Qual é o formato fonocardiográfico e a irradiação típica do sopro auscultado no foco aórtico (2º EICD) em um paciente com estenose aórtica clássica?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sopro mesossistólico em diamante (crescendo-decrescendo), ejetivo, com irradiação clássica para os vasos da base do pescoço (artérias carótidas).',
        isCorrect: true,
        explanation: 'Correta. A ejeção sistólica através do orifício estreito aórtico produz sopro ejetivo em diamante (crescendo-decrescendo) que se propaga na direção do fluxo arterial ascendente até as carótidas.'
      },
      {
        id: 'alt-b',
        text: 'Sopro holossistólico em platô de alta frequência com irradiação exclusiva para a axila esquerda.',
        isCorrect: false,
        explanation: 'Incorreta. Essa é a descrição clássica da insuficiência mitral.'
      },
      {
        id: 'alt-c',
        text: 'Sopro diastólico em decrescendo suave aspirativo com irradiação para o apêndice xifoide.',
        isCorrect: false,
        explanation: 'Incorreta. Esse é o sopro da insuficiência aórtica.'
      },
      {
        id: 'alt-d',
        text: 'Sopro contínuo em maquinaria audível durante sístole e diástole na região infraclavicular esquerda.',
        isCorrect: false,
        explanation: 'Incorreta. Trata-se do sopro contínuo da persistência do canal arterial (PCA).'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sopro da Estenose Aórtica: Mesossistólico em Diamante com Irradiação Carotídea',
      clinicalPearl: 'Estenose Aórtica = Sopro mesossistólico ejetivo em diamante (crescendo-decrescendo) no 2º EICD com frêmito e irradiação para carótidas!',
      detailedExplanation: 'O sopro começa após B1 (após a abertura da valva aórtica), atinge a intensidade máxima no meio da sístole e decresce antes de A2 (fechamento aórtico). A irradiação carotídea reflete o jato turbulento anterógrado.',
      distractorAnalysis: 'Diferenciar o sopro em diamante da EAo do sopro holossistólico em platô da IM e do sopro aspirativo diastólico da IAo.'
    }
  },
  {
    id: 'facil-q05',
    questionNumber: 5,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Pulso Arterial Periférico da Estenose Aórtica',
    statement: 'Qual é a denominação e o padrão propedêutico do pulso arterial carotídeo característico da estenose aórtica clinicamente importante?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Pulso parvus et tardus (pequeno em amplitude e com ascensão lenta e atrasada).',
        isCorrect: true,
        explanation: 'Correta. A barreira anatômica fixa e rígida da valva aórtica atrasa o esvaziamento do VE e atenua a pressão de pulso, resultando em uma onda de pulso pequena (parvus) e tardia (tardus).'
      },
      {
        id: 'alt-b',
        text: 'Pulso em martelo d\'água ou de Corrigan (amplo, de ascensão célere e colapso imediato).',
        isCorrect: false,
        explanation: 'Incorreta. É o pulso da insuficiência aórtica severa.'
      },
      {
        id: 'alt-c',
        text: 'Pulso paradoxal de Kussmaul (queda de mais de 10 mmHg na PAS durante a inspiração).',
        isCorrect: false,
        explanation: 'Incorreta. É típico do tamponamento cardíaco e constrição pericárdica.'
      },
      {
        id: 'alt-d',
        text: 'Pulso bisfiriens com duplo pico sistólico em amplitude alternada.',
        isCorrect: false,
        explanation: 'Incorreta. Encontrado na dupla lesão aórtica ou cardiomiopatia hipertrófica.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Pulso Parvus et Tardus: Marca Registrada da Estenose Aórtica',
      clinicalPearl: 'Parvus = baixa amplitude; Tardus = ascensão vagarosa. É o pulso carotídeo clássico da estenose aórtica!',
      detailedExplanation: 'Como a valva aórtica tem área severamente reduzida, o VE demora mais tempo para impulsionar o volume sistólico na aorta ascendente. O pico de pressão na artéria carótida é atingido tardiamente na sístole.',
      distractorAnalysis: 'Distratores colocam pulsos de outras condições como Corrigan (IAo) e paradoxal (tamponamento).'
    }
  },
  {
    id: 'facil-q06',
    questionNumber: 6,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Fisiopatologia Cardiovascular',
    topic: 'Padrão de Sobrecarga e Remodelamento na Estenose Aórtica',
    statement: 'A estenose aórtica impõe ao ventrículo esquerdo um regime crônico de qual tipo de sobrecarga hemodinâmica e resulta em qual padrão de remodelamento miocárdico?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sobrecarga de pressão, resultando em hipertrofia concêntrica do ventrículo esquerdo com aumento da espessura parietal.',
        isCorrect: true,
        explanation: 'Correta. O obstáculo à ejeção eleva a pós-carga (sobrecarga de pressão). A resposta adaptativa é a adição de sarcômeros em paralelo (hipertrofia concêntrica) para diminuir o estresse parietal conforme a Lei de Laplace.'
      },
      {
        id: 'alt-b',
        text: 'Sobrecarga de volume pura, resultando em dilatação excêntrica com paredes miocárdicas adelgaçadas.',
        isCorrect: false,
        explanation: 'Incorreta. Sobrecarga de volume excêntrica ocorre nas insuficiências valvares (IAo e IM).'
      },
      {
        id: 'alt-c',
        text: 'Sobrecarga diastólica isolada do átrio direito com hipotrofia de ventrículo esquerdo.',
        isCorrect: false,
        explanation: 'Incorreta. A EAo afeta diretamente o ventrículo esquerdo.'
      },
      {
        id: 'alt-d',
        text: 'Isquemia transmural aguda sem qualquer hipertrofia de miócitos.',
        isCorrect: false,
        explanation: 'Incorreta. A hipertrofia concêntrica é o marco adaptativo da sobrecarga de pressão crônica.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Estenose Aórtica: Sobrecarga de Pressão e Hipertrofia Concêntrica',
      clinicalPearl: 'Estenose = Sobrecarga de Pressão = Hipertrofia Concêntrica (sarcômeros em paralelo). Insuficiência = Sobrecarga de Volume = Dilatação Excêntrica (sarcômeros em série).',
      detailedExplanation: 'Conforme a Lei de Laplace (Tensão = Pressão x Raio / 2x Espessura), para compensar o aumento da pressão intracavitária e manter a tensão parietal normal, o ventrículo aumenta a espessura da parede, gerando hipertrofia concêntrica.',
      distractorAnalysis: 'Cobrança fundamental que diferencia sobrecarga de pressão de sobrecarga de volume.'
    }
  },
  {
    id: 'facil-q07',
    questionNumber: 7,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Pressão Arterial Divergente na Insuficiência Aórtica Crônica',
    statement: 'Ao aferir a pressão arterial de um paciente com insuficiência aórtica crônica importante, o médico constata 170 x 40 mmHg. Qual é a denominação e o motivo hemodinâmico desse achado?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Pressão arterial convergente, devida ao estreitamento da via de saída do ventrículo esquerdo.',
        isCorrect: false,
        explanation: 'Incorreta. Pressão convergente (ex: 100 x 80 mmHg) ocorre na estenose aórtica e tamponamento.'
      },
      {
        id: 'alt-b',
        text: 'Pressão arterial divergente (pressão de pulso ampla), causada pelo grande volume sistólico ejetado elevando a sistólica e pelo refluxo maciço de sangue para o VE na diástole derrubando a diastólica.',
        isCorrect: true,
        explanation: 'Correta. Na IAo, o ventrículo ejeta um volume sistólico total enorme elevando a PAS; na diástole, o sangue foge da aorta de volta para o VE e para a periferia, fazendo a PAD cair drasticamente (< 50 mmHg).'
      },
      {
        id: 'alt-c',
        text: 'Hipotensão essencial idiopática secundária à disautonomia periférica.',
        isCorrect: false,
        explanation: 'Incorreta. A PAD baixa decorre do refluxo valvar diastólico, não de neuropatia autonômica.'
      },
      {
        id: 'alt-d',
        text: 'Hipertensão arterial sistêmica primária resistente com estenose de artéria renal.',
        isCorrect: false,
        explanation: 'Incorreta. A HAS primária eleva tanto a PAS quanto a PAD (ex: 170 x 105 mmHg).'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Pressão Divergente da Insuficiência Aórtica: Sistólica Alta e Diastólica Baixa',
      clinicalPearl: 'IAo = PA Divergente (ex: 160x40 mmHg) por alto volume ejetado e escape retrógrado diastólico para o VE.',
      detailedExplanation: 'A pressão de pulso (PAS - PAD) é amplamente alargada (> 80-100 mmHg). Isso gera múltiplos sinais periféricos hiperdinâmicos clássicos (sinal de Musset, Dança das Carótidas, pulso de Corrigan, sinal de Quincke).',
      distractorAnalysis: 'Lembrar: Estenose Aórtica = Pressão CONVERGENTE; Insuficiência Aórtica = Pressão DIVERGENTE.'
    }
  },
  {
    id: 'facil-q08',
    questionNumber: 8,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Pulso em Martelo d\'Água (Corrigan) na Insuficiência Aórtica',
    statement: 'O pulso arterial periférico que se eleva com rapidez extrema na sístole e sofre colapso abrupto e súbito na diástole na insuficiência aórtica é denominado:',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Pulso parvus et tardus.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o pulso da estenose aórtica.'
      },
      {
        id: 'alt-b',
        text: 'Pulso em martelo d\'água ou pulso de Corrigan.',
        isCorrect: true,
        explanation: 'Correta. O pulso de Corrigan (martelo d\'água ou celer et altus) reflete a rápida onda de ejeção do hipervolume sistólico seguida de colapso diastólico imediato pelo refluxo aórtico.'
      },
      {
        id: 'alt-c',
        text: 'Pulso filiforme e imperceptível.',
        isCorrect: false,
        explanation: 'Incorreta. Típico do choque circulatório grave.'
      },
      {
        id: 'alt-d',
        text: 'Pulso bigeminado induzido por extrassístoles atriais frequentes.',
        isCorrect: false,
        explanation: 'Incorreta. É um padrão rítmico elétrico, não valvar regurgitante.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-b',
      summaryTitle: 'Pulso de Corrigan (Martelo d\'Água): Ascensão Rápida e Colapso Diastólico',
      clinicalPearl: 'Pulso de Corrigan = Martelo d\'água = Insuficiência Aórtica grave. Ao palpar o pulso radial elevando o braço do paciente, a sensação de impacto e colapso se torna ainda mais evidente!',
      detailedExplanation: 'O epônimo homenageia Sir Dominic Corrigan (1832). A rápida transmissão da onda sistólica com enchimento rápido das artérias e o esvaziamento bidirecional na diástole criam essa dinâmica tátil única.',
      distractorAnalysis: 'Parvus et tardus pertence à estenose; Corrigan pertence à insuficiência.'
    }
  },
  {
    id: 'facil-q09',
    questionNumber: 9,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Características do Sopro da Insuficiência Aórtica',
    statement: 'Qual é o momento do ciclo cardíaco e a característica acústica do sopro fundamental da insuficiência aórtica crônica?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sopro diastólico precoce, aspirativo, em decrescendo, de alta frequência, mais bem audível no foco aórtico acessório (3º EICE) com o paciente sentado e inclinado para a frente.',
        isCorrect: true,
        explanation: 'Correta. O sopro da IAo inicia-se imediatamente após o componente A2 da segunda bulha (quando a pressão na aorta excede a do VE no relaxamento isovolumétrico) e decresce conforme o gradiente diminui. É aspirativo e de alta frequência.'
      },
      {
        id: 'alt-b',
        text: 'Sopro mesossistólico em diamante ejetivo com frêmito no ápice.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o sopro da estenose aórtica.'
      },
      {
        id: 'alt-c',
        text: 'Sopro contínuo em maquinismo com reforço teleassistólico.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o sopro da persistência do canal arterial.'
      },
      {
        id: 'alt-d',
        text: 'Ruflar telediastólico com reforço pré-sistólico no 2º EICD.',
        isCorrect: false,
        explanation: 'Incorreta. Ruflar com reforço pré-sistólico ocorre no ápice na estenose mitral com ritmo sinusal.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sopro da Insuficiência Aórtica: Diastólico Precoce Aspirativo em Decrescendo',
      clinicalPearl: 'Manobra semiológica para IAo: Paciente sentado, inclinado para a frente, em expiração forçada, auscultando a borda esternal esquerda com o diafragma!',
      detailedExplanation: 'Por ser de alta frequência, o sopro aspirativo da IAo é captado preferencialmente com o diafragma firmemente apoiado contra a parede torácica. O início é protodiastólico imediato e tem formato decrescente.',
      distractorAnalysis: 'Distratores misturam fases do ciclo (sístole vs diástole) e timbres (ejetivo vs aspirativo).'
    }
  },
  {
    id: 'facil-q10',
    questionNumber: 10,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Anatomia Patológica & Valvopatias',
    topic: 'Definição e Fisiopatologia de "Cor Bovis"',
    statement: 'A expressão anátomo-clínica "cor bovis" (coração de boi) é classicamente atribuída à cardiomegalia maciça observada em qual condição patológica?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Insuficiência Aórtica crônica grave com sobrecarga volumétrica excêntrica extrema do ventrículo esquerdo.',
        isCorrect: true,
        explanation: 'Correta. A regurgitação crônica contínua de grandes volumes de volta para a cavidade ventricular gera a maior sobrecarga de volume conhecida em cardiologia, resultando na formação de corações gigantescos ("cor bovis"), que podem pesar mais de 1.000 gramas.'
      },
      {
        id: 'alt-b',
        text: 'Estenose Aórtica pura com cavidade ventricular esquerda diminuída.',
        isCorrect: false,
        explanation: 'Incorreta. A estenose aórtica causa espessamento de parede (hipertrofia concêntrica) sem grande aumento da silhueta cardíaca nas fases iniciais.'
      },
      {
        id: 'alt-c',
        text: 'Estenose Mitral congênita pura sem comprometimento do ventrículo direito.',
        isCorrect: false,
        explanation: 'Incorreta. Na EM pura o ventrículo esquerdo é de tamanho normal ou pequeno.'
      },
      {
        id: 'alt-d',
        text: 'Prolapso de valva tricúspide com ritmo sinusal preservado.',
        isCorrect: false,
        explanation: 'Incorreta. Prolapso tricúspide leve não causa dilatação global extrema do coração.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Cor Bovis: A Dilatação Excêntrica Extrema da Insuficiência Aórtica',
      clinicalPearl: 'Cor Bovis = Coração de Boi = Insuficiência Aórtica grave crônica com dilatação excêntrica maciça por sobrecarga de volume!',
      detailedExplanation: 'Na IAo crônica, o VE recebe o débito pulmonar normal somado à fração regurgitante aórtica a cada batimento (volume diastólico final pode passar de 300 ml). Os sarcômeros se replicam em série, dilatando brutalmente a cavidade ventricular.',
      distractorAnalysis: 'Distratores associam cor bovis a estenose pura ou valvopatias direitas.'
    }
  },
  {
    id: 'facil-q11',
    questionNumber: 11,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Tétrade Auscultatória da Estenose Mitral',
    statement: 'Quais são os três achados auscultatórios fundamentais que compõem a semiologia clássica da estenose mitral reumática no foco mitral em paciente com ritmo sinusal?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Primeira bulha (B1) hiperfonética, estalido de abertura mitral protodiastólico e ruflar diastólico em ápice.',
        isCorrect: true,
        explanation: 'Correta. A rigidez e espessamento das cúspides mitrais mantêm a valva aberta até o início da sístole (B1 hiperfonética); a abertura sob alta pressão atrial gera o estalido de abertura; o fluxo turbulento atrioventricular produz o ruflar diastólico com reforço pré-sistólico.'
      },
      {
        id: 'alt-b',
        text: 'B1 hipofonética, clique mesossistólico e sopro holossistólico em platô irradiando para a axila.',
        isCorrect: false,
        explanation: 'Incorreta. Isso caracteriza o prolapso de valva mitral com insuficiência mitral.'
      },
      {
        id: 'alt-c',
        text: 'Sopro mesossistólico em diamante, pulso parvus et tardus e quarta bulha.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o conjunto típico da estenose aórtica.'
      },
      {
        id: 'alt-d',
        text: 'Sopro contínuo em maquinaria com desdobramento fixo de B2.',
        isCorrect: false,
        explanation: 'Incorreta. Sopro de Gibson com desdobramento fixo de B2 sugere CIA / PCA.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Ausculta da Estenose Mitral: B1 Hiperfonética + Estalido de Abertura + Ruflar Diastólico',
      clinicalPearl: 'Tétrade da Estenose Mitral no ápice: B1 hiperfonética + Estalido de Abertura + Ruflar Diastólico + Reforço Pré-Sistólico (se ritmo sinusal)!',
      detailedExplanation: 'O estalido de abertura ocorre logo após B2 (na protodiástole). Quanto mais próximo de B2 estiver o estalido, mais grave é a estenose mitral (pressão atrial esquerda mais alta abre a valva mais precocemente).',
      distractorAnalysis: 'Distratores confundem estenose mitral com prolapso mitral ou estenose aórtica.'
    }
  },
  {
    id: 'facil-q12',
    questionNumber: 12,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Técnicas Semiológicas',
    topic: 'Posição de Pachon para Ausculta da Valva Mitral',
    statement: 'Para melhor auscultar os ruídos de baixa frequência da estenose mitral (como o ruflar diastólico), qual é o posicionamento do paciente e o acessório do estetoscópio recomendados?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Decúbito lateral esquerdo (posição de Pachon), aplicando suavemente a campânula do estetoscópio sobre o ictus cordis (ápice).',
        isCorrect: true,
        explanation: 'Correta. O decúbito lateral esquerdo (manobra de Pachon) aproxima o ápice do ventrículo esquerdo da parede torácica anterior. A campânula é o componente ideal para captar sons de baixa tonalidade como o ruflar diastólico.'
      },
      {
        id: 'alt-b',
        text: 'Posição supina plana com os membros inferiores elevados a 90 graus usando diafragma rígido.',
        isCorrect: false,
        explanation: 'Incorreta. O ruflar diastólico é som grave e requer campânula em decúbito lateral esquerdo.'
      },
      {
        id: 'alt-c',
        text: 'Posição sentada com o tronco fletido para a frente auscultando o 2º EICD com o diafragma.',
        isCorrect: false,
        explanation: 'Incorreta. Essa posição é ideal para o sopro da insuficiência aórtica na base.'
      },
      {
        id: 'alt-d',
        text: 'Decúbito ventral em apneia inspiratória com campânula no apêndice xifoide.',
        isCorrect: false,
        explanation: 'Incorreta. Essa posição não é utilizada na semiologia cardíaca rotineira.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Manobra de Pachon: Decúbito Lateral Esquerdo e Campânula no Ápice',
      clinicalPearl: 'Posição de Pachon = Paciente em decúbito lateral esquerdo. Excelente para auscultar estenose mitral (ruflar), B3 e B4 no ápice!',
      detailedExplanation: 'Ao colocar o paciente em decúbito lateral esquerdo, o coração sofre rotação horária e a ponta do VE se apoia contra a parede costal no 5º espaço intercostal. Como o ruflar é de frequência muito baixa (som grave), o diafragma pode filtrá-lo; usa-se a campânula sem exercer pressão excessiva.',
      distractorAnalysis: 'Distratores invertem o acessório (diafragma vs campânula) ou a postura (fletido para a frente é para foco aórtico).'
    }
  },
  {
    id: 'facil-q13',
    questionNumber: 13,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular & Fibrilação Atrial',
    topic: 'Reforço Pré-Sistólico na Estenose Mitral com Fibrilação Atrial',
    statement: 'Em um paciente com estenose mitral que se encontrava em ritmo sinusal e desenvolve Fibrilação Atrial, qual componente do ruflar diastólico é imediatamente perdido?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'O reforço pré-sistólico do sopro.',
        isCorrect: true,
        explanation: 'Correta. O reforço pré-sistólico é o aumento final de intensidade do ruflar decorrente da sístole atrial mecânica ejetando o fluxo final sob pressão através da mitral estenosada. Com a fibrilação atrial, não há sístole atrial e o reforço pré-sistólico desaparece.'
      },
      {
        id: 'alt-b',
        text: 'O estalido de abertura valvar mitral.',
        isCorrect: false,
        explanation: 'Incorreta. O estalido de abertura ocorre na protodiástole e independe da sístole atrial, permanecendo presente na FA.'
      },
      {
        id: 'alt-c',
        text: 'A segunda bulha cardíaca (B2).',
        isCorrect: false,
        explanation: 'Incorreta. B2 é o fechamento das semilunares e permanece intacta.'
      },
      {
        id: 'alt-d',
        text: 'A presença do ruflar protodiastólico inicial.',
        isCorrect: false,
        explanation: 'Incorreta. O ruflar inicial decorre do enchimento rápido passivo e continua presente.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Estenose Mitral na FA: Desaparecimento do Reforço Pré-Sistólico',
      clinicalPearl: 'A sístole atrial produz dois eventos audíveis: a Quarta Bulha (B4) e o Reforço Pré-Sistólico da estenose mitral. Se o paciente entra em FA, AMBOS somem!',
      detailedExplanation: 'O reforço pré-sistólico (ou telediastólico) ocorre quando o átrio contrai no final da diástole para esvaziar o volume remanescente. Na fibrilação atrial, o átrio não contrai de forma unificada; portanto, o ruflar se torna decrescente puro ao longo da diástole, sem reforço no final.',
      distractorAnalysis: 'Estalido de abertura é protodiastólico (abertura passiva), B2 é semilunar; apenas o reforço pré-sistólico depende da sístole mecânica atrial.'
    }
  },
  {
    id: 'facil-q14',
    questionNumber: 14,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Sopro da Insuficiência Mitral Crônica',
    statement: 'Qual é o padrão fonocardiográfico, o foco de maior intensidade e a irradiação clássica do sopro da insuficiência mitral orgânica crônica?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sopro holossistólico em platô de alta frequência, mais intenso no foco mitral (ápice), com irradiação característica para a axila esquerda.',
        isCorrect: true,
        explanation: 'Correta. A regurgitação mitral dura toda a sístole (desde o fechamento de B1 até após o fechamento aórtico), gerando um sopro uniforme (em platô / holossistólico) no ápice com propagação axial para a axila.'
      },
      {
        id: 'alt-b',
        text: 'Sopro mesossistólico em diamante no 2º EICD com irradiação para a fúrcula esternal.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o sopro da estenose aórtica.'
      },
      {
        id: 'alt-c',
        text: 'Sopro diastólico em decrescendo suave no foco tricúspide com sinal de Rivero-Carvallo positivo.',
        isCorrect: false,
        explanation: 'Incorreta. Refere-se a valvopatia tricúspide ou pulmonar.'
      },
      {
        id: 'alt-d',
        text: 'Sopro contínuo restrito ao foco pulmonar que desaparece na sístole.',
        isCorrect: false,
        explanation: 'Incorreta. Sopros contínuos cobrem sístole e diástole.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Insuficiência Mitral: Sopro Holossistólico no Ápice com Irradiação para Axila',
      clinicalPearl: 'Insuficiência Mitral = Sopro holossistólico em platô no foco mitral com irradiação para a AXILA esquerda e B1 frequentemente hipofonética.',
      detailedExplanation: 'Como a pressão no VE supera a do AE durante toda a sístole (da fase isovolumétrica até o relaxamento isovolumétrico), o refluxo através do orifício incompetente é contínuo e uniforme, englobando e apagando frequentemente a B1.',
      distractorAnalysis: 'Distratores clássicos misturam formatos (em diamante vs em platô) e rotas de irradiação (carótida vs axila).'
    }
  },
  {
    id: 'facil-q15',
    questionNumber: 15,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Semiologia Cardiovascular & Hipertensão Pulmonar',
    topic: 'Definição e Fisiopatologia do Sopro de Graham Steell',
    statement: 'O Sopro de Graham Steell é um sopro diastólico precoce de alta frequência audível no foco pulmonar (2º EICE). Qual é a causa desse sopro em pacientes com estenose mitral crônica avançada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Regurgitação funcional da valva pulmonar decorrente da severa dilatação do tronco da artéria pulmonar provocada por hipertensão arterial pulmonar.',
        isCorrect: true,
        explanation: 'Correta. A estenose mitral grave causa hipertensão pulmonar retrógrada crônica. O tronco da artéria pulmonar e o anel valvar pulmonar se dilatam tanto que as cúspides pulmonares normais não coaptam na diástole, permitindo um jato regurgitante de alta pressão (Sopro de Graham Steell).'
      },
      {
        id: 'alt-b',
        text: 'Estenose congênita do infundíbulo ventricular direito.',
        isCorrect: false,
        explanation: 'Incorreta. O sopro da estenose infundibular é sistólico ejetivo.'
      },
      {
        id: 'alt-c',
        text: 'Rotura aguda de cordoalha da valva tricúspide por endocardite bacteriana.',
        isCorrect: false,
        explanation: 'Incorreta. Rotura de cordoalha tricúspide gera insuficiência tricúspide holossistólica no 4º EICE.'
      },
      {
        id: 'alt-d',
        text: 'Presença de comunicação interatrial com fluxo maciço esquerda-direita.',
        isCorrect: false,
        explanation: 'Incorreta. CIA gera sopro ejetivo sistólico por hiperfluxo pulmonar e desdobramento fixo de B2.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sopro de Graham Steell: Insuficiência Pulmonar por Hipertensão Pulmonar',
      clinicalPearl: 'Sopro de Graham Steell = Sopro diastólico precoce aspirativo no foco pulmonar (2º EICE) provocado pela dilatação do anel pulmonar na hipertensão pulmonar grave secundária à estenose mitral!',
      detailedExplanation: 'Descrito por Arthur Graham Steell em 1888. Ocorre em pacientes com estenose mitral de longa data que desenvolveram hipertensão arterial pulmonar severa (PSAP > 60-80 mmHg). O refluxo através da valva pulmonar anatomicamente normal, mas anularmente dilatada, gera esse sopro aspirativo.',
      distractorAnalysis: 'Muito cobrado em provas como diagnóstico diferencial de sopro diastólico precoce (Graham Steell na pulmonar vs sopro de IAo na aórtica).'
    }
  },
  {
    id: 'facil-q16',
    questionNumber: 16,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Oncologia & Cardiologia',
    topic: 'Valvas Acometidas na Cardiopatia Carcinoide Clássica',
    statement: 'Na síndrome carcinoide decorrente de tumor neuroendócrino com metástases hepáticas, quais valvas cardíacas sofrem o acometimento fibrótico característico da cardiopatia carcinoide?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Valva tricúspide e valva pulmonar (valvas do coração direito).',
        isCorrect: true,
        explanation: 'Correta. A síndrome carcinoide afeta primariamente as valvas direitas (coração direito: tricúspide e pulmonar), gerando retração, espessamento fibroso e disfunção (principalmente insuficiência tricúspide e estenose/insuficiência pulmonar).'
      },
      {
        id: 'alt-b',
        text: 'Valva mitral e valva aórtica (valvas do coração esquerdo) de forma exclusiva.',
        isCorrect: false,
        explanation: 'Incorreta. As valvas esquerdas são tipicamente poupadas devido à inativação pulmonar da serotonina.'
      },
      {
        id: 'alt-c',
        text: 'Apenas a valva aórtica bicuspide congênita.',
        isCorrect: false,
        explanation: 'Incorreta. A etiologia da bivalvulação aórtica é congênita embriológica, sem relação com carcinoide.'
      },
      {
        id: 'alt-d',
        text: 'Nenhuma valva é acometida, ocorrendo apenas miocardite inflamatória difusa.',
        isCorrect: false,
        explanation: 'Incorreta. A lesão endocárdica valvar é a marca registrada da cardiopatia carcinoide.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Cardiopatia Carcinoide: Acometimento Clássico das Valvas Direitas (Tricúspide e Pulmonar)',
      clinicalPearl: 'Coração Carcinoide = Valva Tricúspide + Valva Pulmonar (Coração Direito)! O lado esquerdo é protegido!',
      detailedExplanation: 'As placas carcinoides ricas em miofibroblastos e colágeno se depositam no endocárdio do átrio e ventrículo direitos, bem como nas cúspides das valvas tricúspide e pulmonar, levando à retração e imobilização das válvulas.',
      distractorAnalysis: 'Distratores apontam acometimento de câmaras esquerdas ou negam lesão valvar.'
    }
  },
  {
    id: 'facil-q17',
    questionNumber: 17,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Fisiopatologia & Farmacologia',
    topic: 'Proteção das Valvas Esquerdas na Cardiopatia Carcinoide',
    statement: 'Por qual mecanismo bioquímico e anatômico as valvas do coração esquerdo (mitral e aórtica) são tipicamente poupadas na cardiopatia carcinoide clássica?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'A serotonina liberada pelas metástases hepáticas na circulação venosa sistêmica é captada e inativada pela enzima monoamina oxidase (MAO) nos capilares pulmonares antes de alcançar as cavidades esquerdas.',
        isCorrect: true,
        explanation: 'Correta. O leito vascular pulmonar possui alta densidade de transportadores de serotonina e enzima monoamina oxidase (MAO-A), degradando mais de 80% a 90% da serotonina em 5-HIAA durante a primeira passagem pelos pulmões, blindando o coração esquerdo.'
      },
      {
        id: 'alt-b',
        text: 'O miocárdio esquerdo não possui receptores celulares para aminas biogênicas.',
        isCorrect: false,
        explanation: 'Incorreta. As cúspides esquerdas possuem os mesmos receptores 5-HT2B e sofrem fibrose se houver shunt direita-esquerda.'
      },
      {
        id: 'alt-c',
        text: 'A pressão arterial sistêmica inativa mecanicamente a serotonina circulante.',
        isCorrect: false,
        explanation: 'Incorreta. A pressão mecânica não inativa substâncias químicas circulantes.'
      },
      {
        id: 'alt-d',
        text: 'O fígado degrada 100% das substâncias antes que elas atinjam a veia cava inferior.',
        isCorrect: false,
        explanation: 'Incorreta. Quando há metástases hepáticas, o sangue drena das metástases direto para a cava sem depuração portal.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'O Filtro Pulmonar de MAO na Proteção do Coração Esquerdo',
      clinicalPearl: 'Filtro Pulmonar: A circulação pulmonar metaboliza a serotonina via MAO! Por isso, o coração esquerdo não sofre na síndrome carcinoide comum.',
      detailedExplanation: 'A serotonina chega das veias hepáticas -> VCI -> coração direito (lesando tricúspide e pulmonar). Ao passar pelos pulmões, a MAO endotelial metaboliza a serotonina em ácido 5-hidroxi-indolacético (5-HIAA, inativo). O sangue chega no átrio e ventrículo esquerdos desprovido de serotonina livre.',
      distractorAnalysis: 'Questão conceitual fundamental da clínica médica sobre o metabolismo de aminas nos pulmões.'
    }
  },
  {
    id: 'facil-q18',
    questionNumber: 18,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Bioquímica Clínica & Nutrição',
    topic: 'Tríade dos Três Ds da Pelagra',
    statement: 'A Pelagra clássica, uma síndrome de carência nutricional que pode surgir como complicação metabólica do tumor carcinoide avançado, é caracterizada pela tríade clínica dos:',
    alternatives: [
      {
        id: 'alt-a',
        text: '3 Ds: Dermatite (lesões eritematodescamativas fotossensíveis como o "Colar de Casal"), Diarreia e Demência (confusão mental/encefalopatia).',
        isCorrect: true,
        explanation: 'Correta. A Pelagra manifesta-se classicamente pelos 3 Ds: Dermatite fotossensível em áreas expostas à luz (Colar de Casal e dorso das mãos), Diarreia crônica e Demência com encefalopatia e alucinações (e se não tratada, Morte - 4º D).'
      },
      {
        id: 'alt-b',
        text: '3 Hs: Hemiplegia, Hemartrose e Hepatomegalia congestiva dolorosa.',
        isCorrect: false,
        explanation: 'Incorreta. Não formam a tríade da pelagra.'
      },
      {
        id: 'alt-c',
        text: '3 Ts: Tremores de repouso, Taquicardia paroxística e Trombocitose reativa.',
        isCorrect: false,
        explanation: 'Incorreta. São sinais neurológicos/cardiovasculares inespecíficos.'
      },
      {
        id: 'alt-d',
        text: '3 Ps: Polifagia, Polidipsia e Poliúria diabética.',
        isCorrect: false,
        explanation: 'Incorreta. Essa é a clássica tríade do Diabetes Mellitus descompensado.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'A Tríade dos Três Ds da Pelagra: Dermatite, Diarreia e Demência',
      clinicalPearl: 'Mnemônico Universal: Pelagra = 3 Ds -> Dermatite (Colar de Casal) + Diarreia + Demência (e Morte se não tratada).',
      detailedExplanation: 'O tecido epitelial e o sistema nervoso central demandam alta taxa de renovação celular e respiração mitocondrial dependente de NAD/NADP (sintetizados a partir da niacina). A falta de B3 gera dermatite em áreas expostas ao sol, diarreia por má absorção enterocitária e declínio cognitivo por disfunção neuronal.',
      distractorAnalysis: 'Distratores usam outras tríades médicas famosas (ex: 3 Ps do diabetes).'
    }
  },
  {
    id: 'facil-q19',
    questionNumber: 19,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Bioquímica Clínica & Síndrome Carcinoide',
    topic: 'Vitamina Deficiente e Desvio Metabólico de Triptofano',
    statement: 'Em pacientes com tumor carcinoide avançado que desenvolvem Pelagra secundária, qual é a vitamina que se torna criticamente deficiente e qual aminoácido é sequestrado pelas células tumorais?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Deficiência de Niacina (Vitamina B3), resultante do desvio massivo do aminoácido essencial Triptofano para a síntese neoplásica de serotonina.',
        isCorrect: true,
        explanation: 'Correta. O triptofano é precursor tanto da serotonina quanto da niacina (Vitamina B3 / NAD). As células do tumor carcinoide hiperativam a rota da serotonina consumindo até 70-80% de todo o triptofano corporal, esgotando a matéria-prima para produção endógena de niacina (B3).'
      },
      {
        id: 'alt-b',
        text: 'Deficiência de Vitamina C (ácido ascórbico), decorrente do consumo de lisina pelas células cancerígenas.',
        isCorrect: false,
        explanation: 'Incorreta. Deficiência de Vitamina C causa escorbuto.'
      },
      {
        id: 'alt-c',
        text: 'Deficiência de Tiamina (Vitamina B1), por consumo tumoral de fenilalanina.',
        isCorrect: false,
        explanation: 'Incorreta. Deficiência de B1 causa beribéri e síndrome de Wernicke-Korsakoff.'
      },
      {
        id: 'alt-d',
        text: 'Deficiência de Vitamina D3 (colecalciferol), por desvio da rota do colesterol para histamina.',
        isCorrect: false,
        explanation: 'Incorreta. Deficiência de Vitamina D causa raquitismo e osteomalácia.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Bioquímica da Pelagra no Carcinoide: Triptofano desviado para Serotonina esgota a Niacina (B3)',
      clinicalPearl: 'Fórmula bioquímica da pelagra secundária: Tumor Carcinoide consome TRIPTOFANO para fazer SEROTONINA -> Sem triptofano livre, não se produz NIACINA (Vitamina B3) -> Pelagra!',
      detailedExplanation: 'Em humanos normais, 99% do triptofano dietético vai para a via quinurenina-niacina e síntese proteica; apenas 1% vai para serotonina. No carcinoide, a triptofano hidroxilase do tumor canaliza quase todo o aminoácido para produzir serotonina, colapsando a via da niacina.',
      distractorAnalysis: 'A associação triptofano -> niacina (B3) -> pelagra é uma das perguntas favoritas em provas de bioquímica e clínica médica.'
    }
  },
  {
    id: 'facil-q20',
    questionNumber: 20,
    difficulty: 'facil',
    difficultyLabel: 'Fácil',
    subject: 'Cardiologia & Obstetrícia',
    topic: 'Fisiopatologia da Descompensação de Estenose Mitral na Gravidez',
    statement: 'Por que pacientes portadoras de estenose mitral reumática assintomáticas frequentemente descompensam com edema agudo de pulmão e tosse com hemoptise no terceiro trimestre da gestação?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Devido ao pico do aumento fisiológico da volemia (40% a 50% de expansão de volume) e à taquicardia gestacional que encurta o tempo de diástole necessário para o esvaziamento do átrio esquerdo.',
        isCorrect: true,
        explanation: 'Correta. No 3º trimestre (28ª a 34ª semanas), o volume sanguíneo e o débito cardíaco atingem o ápice (+40-50%). A taquicardia fisiológica encurta a diástole. Como o sangue só atravessa a mitral na diástole, um fluxo muito maior precisa passar por uma valva estreita em menos tempo, gerando hipertensão capilar pulmonar extrema com edema e hemoptise (apoplexia pulmonar).'
      },
      {
        id: 'alt-b',
        text: 'Porque o útero gravídico comprime as artérias pulmonares impedindo a oxigenação fetal.',
        isCorrect: false,
        explanation: 'Incorreta. O útero comprime a veia cava inferior e aorta abdominal, não as artérias pulmonares.'
      },
      {
        id: 'alt-c',
        text: 'Porque a placenta produz serotonina em excesso destruindo a valva mitral.',
        isCorrect: false,
        explanation: 'Incorreta. A placenta não produz serotonina para destruir a valva mitral.'
      },
      {
        id: 'alt-d',
        text: 'Porque na gravidez a pressão arterial sistêmica sobe para níveis malignos com fechamento permanente da valva aórtica.',
        isCorrect: false,
        explanation: 'Incorreta. A PA na gravidez fisiológica tende a cair no 1º e 2º trimestres e normalizar no 3º.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Estenose Mitral na Gestação: O Perigo da Volemia Alta e da Diástole Encurtada',
      clinicalPearl: 'Fórmula da descompensação na gravidez: +50% de volume de sangue + taquicardia (diástole mais curta) através de uma valva mitral fechada = Hipertensão pulmonar súbita, Edema Agudo e Hemoptise (apoplexia pulmonar)!',
      detailedExplanation: 'O sangue cruza a mitral exclusivamente na diástole. Na taquicardia, a duração da sístole varia pouco, mas a diástole é severamente encurtada. Com menor tempo de enchimento e maior volume circulante, a pressão atrial esquerda atinge níveis alarmantes (> 25-35 mmHg), transmitindo-se retrogradamente aos capilares alveolares e veias brônquicas.',
      distractorAnalysis: 'Distratores apresentam mecanismos mecânicos absurdos que não condizem com a fisiologia materno-fetal.'
    }
  }
];
