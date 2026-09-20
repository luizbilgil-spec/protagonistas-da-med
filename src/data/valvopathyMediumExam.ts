import { QuestionAlternative } from '../types';
import { ValvopathyExamQuestion } from './valvopathyEasyExam';

export const VALVOPATHY_MEDIUM_EXAM: ValvopathyExamQuestion[] = [
  {
    id: 'med-q01',
    questionNumber: 1,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Cardiovascular & Ritmo Cardíaco',
    topic: 'Identificação de Erro Semiológico: B4 e Fibrilação Atrial',
    statement: `Um homem de 68 anos com hipertensão arterial sistêmica de longa data é admitido no pronto-socorro com palpitações rápidas e tontura. O eletrocardiograma demonstra Fibrilação Atrial (FA) aguda com resposta ventricular média de 140 bpm, sem ondas P discerníveis e com intervalos RR irregulares.

O residente que atendeu o caso registrou na evolução clínica: "Ausculta cardíaca em ritmo de fibrilação atrial taquicárdica com bulhas arrítmicas normofonéticas e nítida Quarta Bulha (B4) em ápice decorrente da hipertensão crônica".

Ao avaliar essa anotação, o preceptor de cardiologia deve assinalar que a conduta semiológica do residente foi:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Incorreta, pois a gênese da B4 depende obrigatoriamente da sístole atrial mecânica ativa; na vigência de fibrilação atrial o miocárdio atrial despolariza de forma desorganizada sem sístole coordenada, tornando a presença de B4 fisicamente impossível.',
        isCorrect: true,
        explanation: 'Correta. B4 é o som da contração ativa do átrio empurrando o sangue contra a parede rígida do ventrículo. Na FA não há sístole atrial organizada; logo, não existe B4.'
      },
      {
        id: 'alt-b',
        text: 'Correta, pois a hipertrofia ventricular esquerda crônica garante a produção contínua de B4 independentemente do ritmo cardíaco subjacente.',
        isCorrect: false,
        explanation: 'Incorreta. A hipertrofia confere a rigidez, mas o motor do som é o impacto mecânico da sístole atrial que não existe na FA.'
      },
      {
        id: 'alt-c',
        text: 'Correta, desde que a B4 seja auscultada com o diafragma do estetoscópio e o paciente em decúbito ventral.',
        isCorrect: false,
        explanation: 'Incorreta. B4 é som de baixa frequência (auscultada com campânula) e independe de manobras se o ritmo for FA.'
      },
      {
        id: 'alt-d',
        text: 'Incorreta, apenas porque a B4 na FA só pode ser ouvida se a frequência cardíaca for menor que 50 bpm.',
        isCorrect: false,
        explanation: 'Incorreta. Não existe B4 na FA em nenhuma frequência cardíaca.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Erro Semiológico Crucial: Anotar B4 em Ritmo de Fibrilação Atrial',
      clinicalPearl: 'Anotar B4 em paciente com Fibrilação Atrial é erro clássico em provas práticas de clínica médica: sem onda P / sístole atrial no ECG = SEM B4 na ausculta!',
      detailedExplanation: 'A sístole atrial contribui com 20-30% do enchimento diastólico final do ventrículo esquerdo (o chamado "kick" atrial). Quando a câmara ventricular é rígida, esse jato mecânico final faz a parede vibrar, produzindo a B4. Se o ritmo é de Fibrilação Atrial, o átrio apenas trepida microscopicamente; não há contração organizada de câmara e, portanto, B4 é absolutamente impossível.',
      distractorAnalysis: 'Distratores tentam confundir a rigidez estrutural prévia com a necessidade fisiológica imediata da sístole atrial para a gênese do som.'
    }
  },
  {
    id: 'med-q02',
    questionNumber: 2,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Cardiovascular',
    topic: 'Diferenciação entre B3 Fisiológica e B3 Patológica',
    statement: `Um atleta universitário de 21 anos, corredor de maratona, apresenta ao exame físico uma Terceira Bulha (B3) protodiastólica suave em ápice, assintomático e com fração de ejeção normal. Por outro lado, um paciente de 62 anos com miocardiopatia dilatada pós-infarto e fração de ejeção de 28% também apresenta B3 nítida (galope ventricular protodiastólico) acompanhada de estertores pulmonares.

Qual é a diferença fisiopatológica fundamental entre a B3 fisiológica do jovem atleta e a B3 patológica do paciente em insuficiência cardíaca?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'No jovem atleta, a B3 decorre do enchimento rápido em um ventrículo altamente elástico e complacente com pressões atriais normais; no paciente com IC, resulta do impacto de grande volume ejetado sob alta pressão atrial esquerda contra um ventrículo dilatado e com complacência deprimida.',
        isCorrect: true,
        explanation: 'Correta. No jovem saudável/atleta a complacência é excelente e o relaxamento é supranormal; na IC a B3 é patológica porque reflete sobrecarga volumétrica associada a pressões atriais esquerdas perigosamente elevadas.'
      },
      {
        id: 'alt-b',
        text: 'No atleta a B3 é telediastólica e ocorre após a onda P do ECG, enquanto na IC ela ocorre antes da abertura das valvas semilunares.',
        isCorrect: false,
        explanation: 'Incorreta. B3 é sempre protodiastólica precoce (logo após B2), nunca telediastólica.'
      },
      {
        id: 'alt-c',
        text: 'A B3 do atleta se origina do fechamento da valva mitral, ao passo que a B3 da IC se origina da estenose funcional aórtica.',
        isCorrect: false,
        explanation: 'Incorreta. Fechamento mitral gera B1, não B3.'
      },
      {
        id: 'alt-d',
        text: 'Não existe qualquer diferença mecânica, sendo ambos considerados portadores de cardiopatia estrutural grave.',
        isCorrect: false,
        explanation: 'Incorreta. B3 em menores de 35-40 anos e atletas é variante normal frequente.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'B3: Fisiológica (Alta Complacência) vs. Patológica (Alta Pressão de Enchimento)',
      clinicalPearl: 'B3 em jovem assintomático (<30-40 anos) = fisiológica (ventrículo complacente e ávido por volume). B3 em adulto com mais de 40 anos e dispneia = galope patológico de disfunção e sobrecarga de volume ventricular!',
      detailedExplanation: 'Ambas ocorrem no mesmo momento do ciclo cardíaco (protodiástole, na fase de enchimento rápido). No jovem/atleta, o relaxamento ativo rápido puxa o sangue para uma câmara muito elástica. No doente com IC, o átrio esquerdo está sob altíssima pressão hidrostática (> 20 mmHg) descarregando bruscamente em um ventrículo que atinge o limite elástico com estresse parietal elevado.',
      distractorAnalysis: 'Distratores erram a cronologia no ciclo cardíaco ou negam a existência de B3 fisiológica benigna.'
    }
  },
  {
    id: 'med-q03',
    questionNumber: 3,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Diagnóstico Diferencial em Valvopatias',
    topic: 'Esclerose Valvar Aórtica vs. Estenose Aórtica Significativa no Idoso',
    statement: `Um homem de 74 anos assintomático realiza avaliação pré-operatória. À ausculta cardíaca, constata-se sopro mesossistólico ejetivo grau 2/6 no 2º EICD. O médico assistente precisa diferenciar se o achado representa uma Esclerose Aórtica benigna ou uma Estenose Aórtica anatomicamente importante.

Qual conjunto de achados do exame físico afasta estenose importante e confirma apenas Esclerose Aórtica fibrocalcífica benigna?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Pulsos carotídeos com ascensão rápida e amplitude normal (sem parvus et tardus), pico do sopro precoce no início da sístole e segundo componente da segunda bulha (A2) bem audível e preservado.',
        isCorrect: true,
        explanation: 'Correta. Na esclerose aórtica (espessamento sem gradiente pressórico significativo), não há barreira hemodinâmica ao fluxo: o pulso carotídeo é normal, o sopro tem pico precoce e o fechamento da valva (A2) é nítido.'
      },
      {
        id: 'alt-b',
        text: 'Presença de pulso parvus et tardus, desdobramento paradoxal de B2 e quarta bulha audível em ápice.',
        isCorrect: false,
        explanation: 'Incorreta. Este conjunto confirma estenose aórtica severa com repercussão hemodinâmica.'
      },
      {
        id: 'alt-c',
        text: 'Sopro com pico tardio no final da sístole e ausência completa de componente aórtico da segunda bulha.',
        isCorrect: false,
        explanation: 'Incorreta. O pico tardio e A2 inaudível são marcadores de estenose crítica calcificada.'
      },
      {
        id: 'alt-d',
        text: 'Pressão arterial amplamente divergente com pulso de Corrigan e sopro diastólico aspirativo.',
        isCorrect: false,
        explanation: 'Incorreta. Descreve insuficiência aórtica grave, não esclerose.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Esclerose Aórtica vs. Estenose Aórtica: O Valor Semiológico do Pulso e de A2',
      clinicalPearl: 'Esclerose Aórtica: Sopro mesossistólico com pulso carotídeo NORMAL, pico PRECOCE e A2 PRESERVADO. Se houver pulso parvus/tardus ou A2 apagado = Estenose Aórtica verdadeira!',
      detailedExplanation: 'A esclerose aórtica acomete até 30% dos idosos > 65 anos. O espessamento e calcificação focal das cúspides geram turbulência mecânica (sopro sistólico), porém sem redução crítica da área valvar (área > 1,5 cm²) e sem gerar gradiente transvalvar expressivo. Assim, a dinâmica do pulso e o componente A2 permanecem normais.',
      distractorAnalysis: 'Distratores listam os marcadores de gravidade da estenose aórtica severa.'
    }
  },
  {
    id: 'med-q04',
    questionNumber: 4,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Fisiopatologia Cardiovascular',
    topic: 'Fisiopatologia da Angina na Estenose Aórtica sem Obstrução Coronariana',
    statement: `Um paciente de 64 anos com estenose aórtica importante (área valvar de 0,7 cm² e gradiente médio de 52 mmHg) apresenta angina típica durante esforços moderados. Ele é submetido a coronariografia invasiva, que demonstra artérias coronárias epicárdicas completamente limpas e isentas de placas ateroscleróticas obstrutivas.

Qual é a explicação fisiopatológica para a ocorrência de angina de peito nesse paciente com estenose aórtica pura e coronárias normais?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Desbalanço crítico entre a oferta e o consumo de oxigênio miocárdico: o aumento maciço do consumo de O2 (por grande massa hipertrófica e elevadíssima tensão sistólica parietal) associado à compressão mecânica dos capilares intramiocárdicos e encurtamento do tempo de perfusão diastólica.',
        isCorrect: true,
        explanation: 'Correta. A hipertrofia concêntrica severa e a alta pressão sistólica do VE elevam brutalmente a demanda metabólica de O2. Ao mesmo tempo, a alta pressão diastólica final comprime os vasos subendocárdicos e diminui a pressão de perfusão coronariana, causando isquemia subendocárdica mesmo com coronárias pérvias.'
      },
      {
        id: 'alt-b',
        text: 'A estenose aórtica secreta trombomodulina sistêmica que dissolve as plaquetas coronarianas.',
        isCorrect: false,
        explanation: 'Incorreta. A valva calcificada não secreta substâncias antiplaquetárias.'
      },
      {
        id: 'alt-c',
        text: 'Ocorre vasoespasmo reflexo constante da artéria descendente anterior desencadeado pelo nervo frênico.',
        isCorrect: false,
        explanation: 'Incorreta. Não há vasoespasmo reflexo mediado por nervo frênico.'
      },
      {
        id: 'alt-d',
        text: 'A pressão intracavitária ventricular esquerda na diástole torna-se negativa, invertendo o fluxo da coronária direita.',
        isCorrect: false,
        explanation: 'Incorreta. A pressão diastólica no VE na EAo grave é anormalmente elevada, nunca negativa.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Angina na Estenose Aórtica: Isquemia Miocárdica com Coronárias Normais',
      clinicalPearl: '50% dos pacientes com Estenose Aórtica e angina possuem coronárias anatômicas totalmente normais! Causa: consumo gigantesco de O2 pela massa hipertrófica + perfusão coronariana subendocárdica estrangulada.',
      detailedExplanation: 'A perfusão coronariana ocorre quase que exclusivamente na diástole (Pressão de Perfusão Coronariana = PAD aórtica - PDFVE). Na EAo grave, a PDFVE está muito alta e a PAD da raiz aórtica é normal/baixa; logo, o gradiente de perfusão coronariana cai dramaticamente, colapsando os vasos do subendocárdio.',
      distractorAnalysis: 'Distratores propõem explicações mecânicas ou humorais sem base na fisiologia cardiovascular.'
    }
  },
  {
    id: 'med-q05',
    questionNumber: 5,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Fisiopatologia Cardiovascular',
    topic: 'Fisiopatologia da Síncope aos Esforços na Estenose Aórtica',
    statement: `Um idoso de 71 anos com estenose aórtica grave relata episódios recorrentes de pré-síncope e síncope desencadeados exatamente ao acelerar o passo ou subir rampas íngremes.

Qual é o mecanismo hemodinâmico primário responsável pela síncope desencadeada por esforço físico na estenose aórtica?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Incapacidade do ventrículo esquerdo de elevar o débito cardíaco através do orifício valvar estenosado fixo diante da vasodilatação muscular periférica induzida pelo exercício, gerando colapso agudo da pressão arterial sistêmica e hipoperfusão cerebral.',
        isCorrect: true,
        explanation: 'Correta. Durante o exercício, a musculatura esquelética sofre potente vasodilatação metabólica. Em indivíduos normais, o débito cardíaco aumenta 3 a 5 vezes para manter a PA. Na EAo o débito cardíaco é fixo; a vasodilatação periférica sem aumento proporcional de fluxo derruba a PA sistêmica abruptamente, levando à síncope cerebral.'
      },
      {
        id: 'alt-b',
        text: 'Fechamento espástico agudo da valva mitral decorrente do influxo de ácido lático dos membros inferiores.',
        isCorrect: false,
        explanation: 'Incorreta. A valva mitral não sofre espasmo por lactato muscular.'
      },
      {
        id: 'alt-c',
        text: 'Aumento súbito da filtração glomerular que drena o volume plasmático para a bexiga em minutos.',
        isCorrect: false,
        explanation: 'Incorreta. O esforço físico redistribui o fluxo e diminui a filtração renal.'
      },
      {
        id: 'alt-d',
        text: 'Hipotensão postural pura provocada pela gravidade estática sem qualquer relação com a resistência vascular.',
        isCorrect: false,
        explanation: 'Incorreta. Trata-se de síncope induzida pelo exercício ativo (vasodilatação muscular periférica).'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Síncope na Estenose Aórtica: Débito Fixo vs. Vasodilatação Periférica do Esforço',
      clinicalPearl: 'Fórmula da Síncope de Esforço na EAo: Débito Cardíaco Fixo + Vasodilatação Muscular Maciça = Queda Livre da Pressão Arterial -> Isquemia Cerebral Imediata!',
      detailedExplanation: 'Conforme a equação PA = Débito Cardíaco x Resistência Vascular Periférica (RVP). No esforço muscular, a RVP cai drasticamente. Como a valva estenosada impede o aumento do volume de ejeção, o produto DC x RVP desaba. Adicionalmente, mecanorreceptores de VE sob pressão extrema disparam o reflexo de Bezold-Jarisch paradoxal.',
      distractorAnalysis: 'Distratores misturam hipotensão postural ortostática comum com a síncope de esforço de alto risco da EAo.'
    }
  },
  {
    id: 'med-q06',
    questionNumber: 6,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Cardiovascular',
    topic: 'Pico Tardio vs. Intensidade Sonora na Estenose Aórtica',
    statement: `Dois pacientes com estenose aórtica são avaliados no ambulatório:
• Paciente X: Sopro mesossistólico ruidoso grau 4/6, com pico de intensidade no terço inicial da sístole e pulso carotídeo com boa amplitude.
• Paciente Y: Sopro suave grau 2/6, com pico de intensidade muito tardio no terço final da sístole, pulso carotídeo parvus et tardus marcante e A2 quase inaudível.

Em relação à gravidade anatômica da estenose aórtica, o que o preceptor deve explicar aos estudantes?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'O Paciente Y tem estenose aórtica consideravelmente mais grave do que o Paciente X, pois o pico tardio do sopro e o atraso do pulso são os indicadores mais confiáveis de área valvar crítica, ao passo que a intensidade sonora decai quando a disfunção ventricular reduz o fluxo transvalvar.',
        isCorrect: true,
        explanation: 'Correta. Quanto mais grave a estenose, mais tempo o VE leva para ejetar o sangue, deslocando o pico do sopro para o final da sístole. Se o VE começa a falhar (baixo fluxo / baixo gradiente), o sopro torna-se silencioso (grau 1-2/6), mas mantém o pico tardio!'
      },
      {
        id: 'alt-b',
        text: 'O Paciente X tem estenose mais grave porque a intensidade do sopro em decibéis (grau 4/6) é o parâmetro isolado determinante de cirurgia valvar.',
        isCorrect: false,
        explanation: 'Incorreta. A intensidade em decibéis depende do fluxo e espessura do tórax; na falência do VE com estenose crítica o sopro pode ser muito suave.'
      },
      {
        id: 'alt-c',
        text: 'Ambos possuem exatamente a mesma gravidade, pois a presença de sopro em qualquer intensidade define área < 0,5 cm².',
        isCorrect: false,
        explanation: 'Incorreta. A presença isolada de sopro não quantifica área valvar.'
      },
      {
        id: 'alt-d',
        text: 'O Paciente Y apresenta apenas sopro funcional inocente, pois sopros grau 2/6 nunca correspondem a lesões graves.',
        isCorrect: false,
        explanation: 'Incorreta. A estenose aórtica grave de baixo fluxo/baixo gradiente cursa com sopros discretos.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Pico Tardio do Sopro: O Verdadeiro Marcador Semiológico de Gravidade na EAo',
      clinicalPearl: 'Não se engane com o volume do sopro! Estenose Aórtica grave com VE cansado tem sopro BAIXO (grau 1-2/6), mas o PICO É TARDIO e o pulso é PARVUS ET TARDUS!',
      detailedExplanation: 'Na estenose aórtica leve, o VE ejeta com facilidade e o pico é precoce. Na estenose crítica, a ejeção é prolongada e arrastada até o final da sístole (pico tardio). Quando a fração de ejeção cai, o volume ejetado por segundo diminui, reduzindo o ruído acústico, configurando a temida estenose de baixo fluxo e baixo gradiente.',
      distractorAnalysis: 'Distratores apoiam-se no mito errôneo de que sopro mais alto é sempre doença mais grave.'
    }
  },
  {
    id: 'med-q07',
    questionNumber: 7,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Diagnóstico Diferencial em Valvopatias',
    topic: 'Sopro de Austin Flint na Insuficiência Aórtica Grave',
    statement: `Um paciente de 48 anos com insuficiência aórtica crônica importante apresenta, além do sopro diastólico aspirativo no foco aórtico acessório, um ruflar mesodiastólico de baixa frequência auscultado no ápice cardíaco (foco mitral), simulando estenose mitral.

Qual é a denominação epônima desse sopro apical e qual é o seu mecanismo hemodinâmico?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sopro de Austin Flint; decorre do impacto mecânico do jato regurgitante aórtico colidindo contra o folheto anterior da valva mitral, provocando seu fechamento prematuro e gerando estenose mitral funcional relativa.',
        isCorrect: true,
        explanation: 'Correta. O jato da IAo atinge a face ventricular do folheto anterior da mitral, empurrando-o em direção ao átrio e restringindo a abertura mitral durante a diástole. Isso gera turbulência do fluxo atrioventricular (ruflar de Austin Flint) sem haver estenose mitral reumática verdadeira.'
      },
      {
        id: 'alt-b',
        text: 'Sopro de Carey Coombs; decorre da cardite reumática ativa com espessamento verrucoso da valva tricúspide.',
        isCorrect: false,
        explanation: 'Incorreta. O sopro de Carey Coombs ocorre na febre reumática aguda por valvulite mitral.'
      },
      {
        id: 'alt-c',
        text: 'Sopro de Graham Steell; decorre de hipertensão na artéria subclávia esquerda.',
        isCorrect: false,
        explanation: 'Incorreta. Graham Steell é na artéria pulmonar por hipertensão pulmonar.'
      },
      {
        id: 'alt-d',
        text: 'Sopro de Still; sopro inocente da infância sem repercussão hemodinâmica.',
        isCorrect: false,
        explanation: 'Incorreta. O sopro de Still é sistólico vibratório inocente de crianças.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sopro de Austin Flint: Estenose Mitral Funcional por Jato de Regurgitação Aórtica',
      clinicalPearl: 'Ruflar no ápice com Insuficiência Aórtica = Sopro de Austin Flint! Diferencia-se da estenose mitral verdadeira pela AUSÊNCIA de B1 hiperfonética e AUSÊNCIA de estalido de abertura.',
      detailedExplanation: 'Descrito pelo médico norte-americano Austin Flint em 1862. O jato de refluxo aórtico retrógrado atinge a cúspide anterior da mitral em plena diástole, criando um estreitamento funcional do orifício atrioventricular enquanto o sangue normal entra do átrio esquerdo.',
      distractorAnalysis: 'Distratores usam outros sopros clássicos com epônimos como Carey Coombs (febre reumática aguda) e Graham Steell (hipertensão pulmonar).'
    }
  },
  {
    id: 'med-q08',
    questionNumber: 8,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Cardiovascular Avançada',
    topic: 'Sinais Periféricos Hiperdinâmicos da Insuficiência Aórtica',
    statement: `Durante o exame físico de um paciente com insuficiência aórtica grave de longa data, o médico observa:
1. Movimento oscilatório rítmico da cabeça sincronizado com os batimentos cardíacos.
2. Pulsações capilares visíveis alternando palidez e rubor na polpa ungueal sob leve compressão.
3. Duplo sopro audível sobre a artéria femoral ao comprimir a campânula do estetoscópio.

Esses sinais semiológicos correspondem, respectivamente, a:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sinal de Musset, Sinal de Quincke e Sinal de Duroziez.',
        isCorrect: true,
        explanation: 'Correta. Movimento da cabeça = Sinal de de Musset; pulsação capilar no leito ungueal = Sinal de Quincke; duplo sopro femoral sistodiastólico à compressão = Sinal de Duroziez. Todos decorrem da ampla pressão de pulso hiperdinâmica da IAo grave.'
      },
      {
        id: 'alt-b',
        text: 'Sinal de Kussmaul, Sinal de Rivero-Carvallo e Sinal de Osler.',
        isCorrect: false,
        explanation: 'Incorreta. Kussmaul é turgência jugular na inspiração; Rivero-Carvallo é aumento do sopro na inspiração; Osler é pseudo-hipertensão com artéria calcificada rígida.'
      },
      {
        id: 'alt-c',
        text: 'Sinal de Homans, Sinal de Cullen e Sinal de Grey Turner.',
        isCorrect: false,
        explanation: 'Incorreta. Homans é TVP; Cullen e Grey Turner são equimoses de pancreatite necro-hemorrágica.'
      },
      {
        id: 'alt-d',
        text: 'Sinal de Corrigan, Sinal de Trousseau e Sinal de Chvostek.',
        isCorrect: false,
        explanation: 'Incorreta. Trousseau e Chvostek são sinais de hipocalcemia / tetania.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sinais Periféricos da IAo: Musset (Cabeça), Quincke (Unhas) e Duroziez (Femoral)',
      clinicalPearl: 'Tríade periférica clássica da IAo: Musset (cabeça que balança), Quincke (pulsação no leito ungueal) e Duroziez (duplo sopro na artéria femoral)!',
      detailedExplanation: 'A transmissão da onda de pulso de altíssima amplitude (sistólica de 160-180 mmHg) seguida de queda diastólica para 30-40 mmHg faz com que praticamente todo o leito vascular periférico palpite visivelmente, permitindo diagnósticos semiológicos clássicos à beira do leito.',
      distractorAnalysis: 'Distratores misturam epônimos vasculares com sinais clínicos gastrointestinais, endocrinológicos e pneumológicos.'
    }
  },
  {
    id: 'med-q09',
    questionNumber: 9,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Cardiovascular',
    topic: 'Manobra de Rivero-Carvallo: Diferenciação de Sopros Sistólicos',
    statement: `Um paciente apresenta sopro holossistólico regurgitativo de intensidade moderada audível na borda esternal esquerda baixa e no ápice. O examinador solicita que o paciente realize uma inspiração profunda sustentada (Manobra de Rivero-Carvallo) e observa que a intensidade do sopro aumenta significativamente durante a inspiração.

Esse comportamento inspiratório confirma que a valvopatia primária é uma:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Insuficiência Tricúspide; a pressão intratorácica negativa durante a inspiração atrai maior retorno venoso sistêmico para o átrio e ventrículo direitos, aumentando o volume ejetado e a turbulência regurgitante através da valva tricúspide (Sinal de Rivero-Carvallo positivo).',
        isCorrect: true,
        explanation: 'Correta. O Sinal de Rivero-Carvallo positivo (aumento do sopro na inspiração) é a marca registrada dos sopros originados nas câmaras direitas (insuficiência tricúspide e estenose pulmonar). Os sopros esquerdos (como a insuficiência mitral) diminuem ou não mudam com a inspiração.'
      },
      {
        id: 'alt-b',
        text: 'Insuficiência Mitral orgânica pura com rotura de músculo papilar posterior.',
        isCorrect: false,
        explanation: 'Incorreta. Os sopros do coração esquerdo diminuem durante a inspiração porque a trama pulmonar expandida retém volume no leito pulmonar, reduzindo o retorno venoso ao átrio esquerdo.'
      },
      {
        id: 'alt-c',
        text: 'Estenose Aórtica calcificada de via de saída.',
        isCorrect: false,
        explanation: 'Incorreta. A estenose aórtica é esquerda e tem sopro ejetivo mesossistólico, não holossistólico que aumenta com inspiração.'
      },
      {
        id: 'alt-d',
        text: 'Comunicação interventricular com shunt direita-esquerda por síndrome de Eisenmenger.',
        isCorrect: false,
        explanation: 'Incorreta. Na síndrome de Eisenmenger a CIV perde o sopro clássico pela equalização das pressões ventriculares.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Manobra de Rivero-Carvallo: Inspiração Aumenta Sopros do Coração Direito',
      clinicalPearl: 'Rivero-Carvallo Positivo = Sopros do Coração DIREITO (Tricúspide e Pulmonar aumentam na INSPIRAÇÃO por aumento do retorno venoso sistêmico). Sopros do coração ESQUERDO não aumentam!',
      detailedExplanation: 'Na inspiração profunda, o diafragma desce e gera pressão negativa no tórax. Isso "suga" mais sangue das veias cavas para o átrio e ventrículo direitos. Mais sangue fluindo pelo orifício tricúspide incompetente gera mais turbulência acústica e intensifica o sopro.',
      distractorAnalysis: 'Conceito clássico indispensável para diferenciar sopro apical de insuficiência mitral de sopro paraxifoideo de insuficiência tricúspide.'
    }
  },
  {
    id: 'med-q10',
    questionNumber: 10,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Cardiovascular Fina',
    topic: 'Intervalo B2-Estalido de Abertura na Estenose Mitral',
    statement: `Na avaliação auscultatória de um paciente com estenose mitral reumática, o médico ausculta o Estalido de Abertura (EA) logo após a segunda bulha (B2). Medindo em fonocardiograma o intervalo temporal entre B2 e o estalido de abertura (intervalo B2-EA):

Qual é a correlação semiológica entre a duração do intervalo B2-EA e a gravidade hemodinâmica da estenose mitral?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Quanto MAIS CURTO for o intervalo B2-EA (estalido mais próximo de B2), MAIS GRAVE é a estenose mitral, porque pressões atriais esquerdas muito elevadas forçam a abertura das cúspides mais precocemente na protodiástole.',
        isCorrect: true,
        explanation: 'Correta. A valva mitral abre no momento em que a pressão do VE em relaxamento cai abaixo da pressão do AE. Se o AE está sob pressão extrema (ex: 28 mmHg na EM crítica), a pressão do VE cruza essa linha muito mais cedo após o fechamento aórtico (B2), encurtando o intervalo B2-EA (< 0,08s).'
      },
      {
        id: 'alt-b',
        text: 'Quanto mais longo for o intervalo B2-EA, mais grave é a estenose mitral, pois a valva demora para abrir por fadiga muscular.',
        isCorrect: false,
        explanation: 'Incorreta. Intervalo longo (B2-EA > 0,11s) significa pressão atrial esquerda baixa, ou seja, estenose mitral leve.'
      },
      {
        id: 'alt-c',
        text: 'O intervalo B2-EA é fixo e imutável em qualquer grau de estenose mitral por ser determinado apenas pela espessura do pericárdio.',
        isCorrect: false,
        explanation: 'Incorreta. O intervalo varia dinamicamente com a pressão hidrostática do átrio esquerdo.'
      },
      {
        id: 'alt-d',
        text: 'O estalido de abertura ocorre sempre antes da B1 e sua distância com B2 não possui correlação clínica.',
        isCorrect: false,
        explanation: 'Incorreta. O estalido é protodiastólico precoce e ocorre logo após B2, muito antes da B1 seguinte.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Intervalo B2-Estalido de Abertura: Proximidade é Sinal de Gravidade na Estenose Mitral',
      clinicalPearl: 'Regra de Ouro da Estenose Mitral: Estalido colado na B2 (intervalo B2-EA curto) = Pressão Atrial Esquerda nas alturas = Estenose Mitral SEVERA!',
      detailedExplanation: 'Na diástole, o relaxamento isovolumétrico do VE dura até a pressão ventricular ficar menor que a atrial. Se a pressão no AE é 10 mmHg (estenose leve), o VE precisa relaxar por mais tempo até 10 mmHg (intervalo B2-EA longo). Se a pressão no AE é 30 mmHg (estenose grave), o VE atinge 30 mmHg muito rapidamente (intervalo B2-EA curto, < 0,08 segundos).',
      distractorAnalysis: 'A pegadinha típica de prova inverte a relação lógica: o aluno desatento pensa que "mais tempo = mais grave", quando na verdade "mais perto = maior pressão no átrio esquerdo = mais grave".'
    }
  },
  {
    id: 'med-q11',
    questionNumber: 11,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Semiologia Geral & Ectoscopia',
    topic: 'Facies Mitral (Rubor Malar Cianótico) na Estenose Mitral Grave',
    statement: `Ao inspecionar a face de uma paciente de 35 anos com estenose mitral reumática grave e hipertensão arterial pulmonar secundária crônica, o médico observa rubor malar com tonalidade arroxeada/cianótica nas bochechas e dorso nasal ("facies mitral").

Qual é o mecanismo fisiopatológico responsável pela facies mitral?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Débito cardíaco crônico criticamente baixo gerando vasoconstrição periférica reflexa com estase venocapilar capilar facial combinada à hipertensão venosa sistêmica crônica e hipoxemia leve.',
        isCorrect: true,
        explanation: 'Correta. A estenose mitral grave restringe o enchimento ventricular e o débito cardíaco. Para manter a perfusão de órgãos vitais, ocorre intensa vasoconstrição periférica nos leitos cutâneos associada à estase na microcirculação facial rica em vênulas, conferindo o rubor malar arroxeado característico.'
      },
      {
        id: 'alt-b',
        text: 'Depósito cutâneo de cristais de colesterol puro decorrente de hiperlipidemia familiar tipo IIa.',
        isCorrect: false,
        explanation: 'Incorreta. Isso descreve xantelasmas perioculares.'
      },
      {
        id: 'alt-c',
        text: 'Infiltração tecidual por imunoglobulina E mediada por picada de ácaros pulmonares.',
        isCorrect: false,
        explanation: 'Incorreta. Não há mecanismo anafilático de ácaros na facies mitral.'
      },
      {
        id: 'alt-d',
        text: 'Acúmulo de serotonina não degradada devido a tumor carcinoide nas glândulas salivares.',
        isCorrect: false,
        explanation: 'Incorreta. A ruborização do carcinoide é episódica (flushing paroxístico), enquanto a facies mitral é perene e arroxeada.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Facies Mitral: O Rubor Malar por Baixo Débito e Congestão Venosa',
      clinicalPearl: 'Facies Mitral (Rubor Malar de Corvisart) = Estenose Mitral grave com baixo débito crônico + vasoconstrição periférica e estase capilar nas bochechas!',
      detailedExplanation: 'Também conhecida como facies de Corvisart. O baixo fluxo sistêmico ativa o sistema simpático, gerando vasoconstrição cutânea facial com dilatação e estase das vênulas malares sob alta pressão retrógrada das cavidades direitas.',
      distractorAnalysis: 'Distratores confundem o sinal com lesões dermatológicas alérgicas, dislipidêmicas ou neoplásicas.'
    }
  },
  {
    id: 'med-q12',
    questionNumber: 12,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Farmacologia Cardiovascular & Valvopatias',
    topic: 'Papel do Controle de Frequência Cardíaca na Estenose Mitral',
    statement: `Uma paciente de 29 anos com estenose mitral reumática moderada (área valvar de 1,3 cm²) queixa-se de dispneia importante sempre que sua frequência cardíaca sobe para mais de 100 bpm ao realizar caminhadas. O cardiologista prescreve um betabloqueador (metoprolol) visando controlar estritamente a frequência cardíaca em repouso e aos esforços.

Por que a redução da frequência cardíaca com betabloqueador melhora tão intensamente os sintomas de congestão pulmonar na estenose mitral?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Porque a bradicardia prolonga o tempo de enchimento diastólico ventricular; como o fluxo atrioventricular ocorre exclusivamente na diástole, uma diástole mais longa permite que o sangue esvazie o átrio esquerdo através da valva estenosada sem necessitar de pressões atriais alarmantes.',
        isCorrect: true,
        explanation: 'Correta. Na taquicardia, o ciclo cardíaco encurta preferencialmente a fase diastólica. Na estenose mitral, uma diástole curta impede o esvaziamento do AE, elevando brutalmente a pressão capilar pulmonar. O betabloqueador prolonga a diástole, diminuindo o gradiente médio transvalvar e aliviando a congestão pulmonar.'
      },
      {
        id: 'alt-b',
        text: 'Porque os betabloqueadores dissolvem quimicamente as placas de cálcio nas cúspides mitrais.',
        isCorrect: false,
        explanation: 'Incorreta. Fármacos não descalcificam ou revertem a fusão comissural mecânica.'
      },
      {
        id: 'alt-c',
        text: 'Porque o metoprolol dilata diretamente o anel fibroso da valva mitral através dos receptores alfa-1.',
        isCorrect: false,
        explanation: 'Incorreta. Betabloqueadores não têm ação de dilatação anatômica valvar.'
      },
      {
        id: 'alt-d',
        text: 'Porque a redução da frequência cardíaca paralisa temporariamente a contração do ventrículo direito.',
        isCorrect: false,
        explanation: 'Incorreta. Não se deseja paralisar o ventrículo direito.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Betabloqueador na Estenose Mitral: O Poder do Prolongamento da Diástole',
      clinicalPearl: 'Estenose Mitral é doença DIÁSTOLE-DEPENDENTE! Quanto menor a FC, maior a diástole, melhor o esvaziamento do átrio esquerdo e MENOR a pressão nos pulmões!',
      detailedExplanation: 'A fórmula de Gorlin demonstra que o fluxo através de uma valva estenosada depende criticamente do tempo de enchimento diastólico por minuto. Se a FC sobe de 70 para 130 bpm, o tempo diastólico disponível cai em mais de 60%, disparando a pressão no átrio esquerdo de 14 para 35 mmHg e deflagrando edema pulmonar agudo.',
      distractorAnalysis: 'Distratores sugerem ações farmacológicas inexistentes de descalcificação ou alteração anatômica.'
    }
  },
  {
    id: 'med-q13',
    questionNumber: 13,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Diagnóstico Diferencial em Valvopatias',
    topic: 'Diferenciação: Sopro de Graham Steell vs. Insuficiência Aórtica',
    statement: `Um paciente com estenose mitral avançada apresenta sopro diastólico aspirativo em decrescendo de alta frequência audível ao longo da borda esternal esquerda. O médico precisa determinar se esse sopro representa uma Insuficiência Aórtica concomitante ou um Sopro de Graham Steell (insuficiência pulmonar secundária à hipertensão pulmonar).

Qual conjunto de achados clínicos favorece fortemente o diagnóstico de Sopro de Graham Steell em detrimento de insuficiência aórtica?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Presença de sinais nítidos de hipertensão pulmonar (hiperfonese marcante de P2, onda "a" gigante no pulso venoso jugular, impulsão sistólica de ventrículo direito) com ausência de pulso de Corrigan ou alargamento da pressão de pulso sistêmica.',
        isCorrect: true,
        explanation: 'Correta. O Sopro de Graham Steell é uma insuficiência pulmonar funcional decorrente de hipertensão arterial pulmonar severa. Portanto, cursa com P2 palpável/hiperfonética e sinais de sobrecarga de VD, sem sinais periféricos hiperdinâmicos aórticos (PA divergente ou pulso de Corrigan).'
      },
      {
        id: 'alt-b',
        text: 'Pressão arterial de 180 x 30 mmHg com dança das carótidas e sinal de Quincke positivo.',
        isCorrect: false,
        explanation: 'Incorreta. Este perfil indica insuficiência aórtica severa de alto fluxo sistêmico.'
      },
      {
        id: 'alt-c',
        text: 'Sopro que diminui completamente com a manobra de Rivero-Carvallo durante a inspiração.',
        isCorrect: false,
        explanation: 'Incorreta. Sopros da valva pulmonar tendem a se manter ou aumentar na inspiração.'
      },
      {
        id: 'alt-d',
        text: 'Presença de ictus de ventrículo esquerdo desviado para a linha axilar anterior no 7º espaço intercostal.',
        isCorrect: false,
        explanation: 'Incorreta. Ictus desviado com dilatação maciça de VE sugere insuficiência aórtica ("cor bovis"), não estenose mitral com Graham Steell.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Graham Steell vs. Insuficiência Aórtica: O Contexto da Hipertensão Pulmonar',
      clinicalPearl: 'Sopro diastólico na borda esternal esquerda com P2 explodindo de alta, turgência jugular e PA sistêmica normal = Graham Steell (Valva Pulmonar)! Se a PA for 170x40 com pulso colapsante = Insuficiência Aórtica!',
      detailedExplanation: 'Ambos os sopros são diastólicos de alta frequência e aspirativos na mesma topografia paraxifoide/esternal. A distinção à beira do leito repousa no exame dos vasos e nas câmaras direitas: Graham Steell é fruto da hipertensão pulmonar, enquanto a IAo gera manifestações periféricas sistêmicas universais.',
      distractorAnalysis: 'Distratores apresentam manifestações hiperdinâmicas clássicas de IAo ou dilatação maciça de VE.'
    }
  },
  {
    id: 'med-q14',
    questionNumber: 14,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Oncologia & Valvopatias',
    topic: 'Achados Ecocardiográficos e Anatômicos na Cardiopatia Carcinoide',
    statement: `Um paciente de 57 anos com diagnóstico de tumor carcinoide ileal com múltiplas metástases hepáticas desenvolve edema de membros inferiores e hepatomegalia pulsátil. O ecocardiograma transtorácico confirma cardiopatia carcinoide clássica.

Qual é a alteração anátomo-funcional típica observada nos folhetos da valva tricúspide nesses pacientes?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Espessamento fibroso difuso, encurtamento e retração dos folhetos valvares com perda da mobilidade, fixando a valva tricúspide em posição semiaberta rígida, resultando em insuficiência tricúspide grave livre.',
        isCorrect: true,
        explanation: 'Correta. As placas carcinoides fibrosas depositadas sobre a face ventricular dos folhetos causam retração das cúspides e fusão com as cordoalhas, "congelando" a valva em posição aberta e gerando insuficiência tricúspide torrencial.'
      },
      {
        id: 'alt-b',
        text: 'Vegetações bacterianas friáveis gigantes com destruição infecciosa do anel valvar.',
        isCorrect: false,
        explanation: 'Incorreta. Vegetações gigantes friáveis são típicas de endocardite infecciosa fúngica ou bacteriana aguda.'
      },
      {
        id: 'alt-c',
        text: 'Prolapso mixomatoso com degeneração elástica e redundância de folhetos em paraquedas.',
        isCorrect: false,
        explanation: 'Incorreta. Essa é a descrição da degeneração mixomatosa fibroelástica (doença de Barlow).'
      },
      {
        id: 'alt-d',
        text: 'Ruptura traumática isolada de músculo papilar do ventrículo esquerdo.',
        isCorrect: false,
        explanation: 'Incorreta. O carcinoide poupa o ventrículo esquerdo e causa fibrose lenta, não ruptura traumática.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Ecocardiograma no Carcinoide: Folhetos Tricúspides Espessados, Rígidos e Retraídos',
      clinicalPearl: 'Valva tricúspide "congelada" em posição semiaberta com insuficiência livre no ecocardiograma de paciente com diarreia crônica e rubor facial = Cardiopatia Carcinoide!',
      detailedExplanation: 'A estimulação crônica dos receptores 5-HT2B pelas altas concentrações de serotonina induz a proliferação descontrolada de miofibroblastos e síntese de matriz extracelular colágena no endocárdio valvular, tornando as válvulas grossas, imóveis e incapazes de coaptar.',
      distractorAnalysis: 'Distratores descrevem endocardite infecciosa, prolapso de Barlow ou rotura traumática.'
    }
  },
  {
    id: 'med-q15',
    questionNumber: 15,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Cardiologia & Patologia Avançada',
    topic: 'Exceções: Acometimento de Valvas Esquerdas na Síndrome Carcinoide',
    statement: `Embora a cardiopatia carcinoide acometa tipicamente de forma isolada as valvas direitas (tricúspide e pulmonar), em cerca de 10% a 15% dos casos pode ocorrer envolvimento das valvas esquerdas (mitral e aórtica).

Em qual das seguintes condições clínicas é esperado o acometimento das valvas do coração esquerdo pelo tumor carcinoide?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Presença de shunt intracardíaco direita-esquerda (como Forame Oval Patente com fluxo invertido) ou tumor carcinoide primário brônquico/pulmonar cujos mediadores drenam diretamente nas veias pulmonares para as câmaras esquerdas sem passar pelo filtro de MAO pulmonar.',
        isCorrect: true,
        explanation: 'Correta. Se o tumor primário for no pulmão (carcinoide brônquico), a serotonina entra nas veias pulmonares e banha o átrio e ventrículo esquerdos antes de qualquer metabolização. Da mesma forma, um forame oval patente (FOP) ou CIA com shunt direita-esquerda desvia o sangue da VCI diretamente para o átrio esquerdo, contornando os capilares pulmonares.'
      },
      {
        id: 'alt-b',
        text: 'Uso profilático de inibidores da bomba de prótons para proteção gástrica.',
        isCorrect: false,
        explanation: 'Incorreta. IBPs não alteram a metabolização da serotonina nem causam shunt.'
      },
      {
        id: 'alt-c',
        text: 'Deficiência congênita de vitamina K no endotélio carotídeo.',
        isCorrect: false,
        explanation: 'Incorreta. Não tem correlação com a fisiopatologia do carcinoide.'
      },
      {
        id: 'alt-d',
        text: 'Hipertensão arterial sistólica isolada no idoso acima de 85 anos.',
        isCorrect: false,
        explanation: 'Incorreta. HAS isolada não direciona serotonina para as valvas esquerdas.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Carcinoide no Lado Esquerdo: Carcinoide Brônquico ou Shunt Direita-Esquerda (FOP)',
      clinicalPearl: 'Pegadinha de alto nível: Quando a Cardiopatia Carcinoide afeta valvas esquerdas (mitral/aórtica)? Apenas quando contorna o filtro pulmonar: 1) Carcinoide Brônquico (origem pulmonar direta) ou 2) Shunt Direita-Esquerda (Forame Oval Patente)!',
      detailedExplanation: 'O filtro de MAO pulmonar só protege as câmaras esquerdas se o sangue for obrigado a atravessar a rede capilar dos alvéolos. Tumores brônquicos drenam diretamente no leito pós-capilar (veias pulmonares), enquanto um shunt interatrial D->E transfere a serotonina venosa sistêmica direto para o átrio esquerdo.',
      distractorAnalysis: 'Questão avançada clássica que testa se o aluno realmente compreende a anatomia vascular e a razão da proteção pulmonar.'
    }
  },
  {
    id: 'med-q16',
    questionNumber: 16,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Diagnóstico Clínico & Propedêutica',
    topic: 'Reconhecimento Clínico do "Colar de Casal" na Pelagra Secundária',
    statement: `Um paciente de 59 anos em investigação de diarreia secretória crônica e rubor facial episódico desenvolve lesões cutâneas eritematosas, hiperqueratóticas, hiperpigmentadas e descamativas distribuídas em colar simétrico ao redor do pescoço e decote anterior do tórax, além do dorso das mãos. Ao exame neurológico, apresenta apatia, lapsos mnêmicos e desorientação temporal.

O achado dermatológico típico no pescoço é conhecido como:`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Colar de Casal (ou Colar de Saint Anthony), patognomônico da dermatite fotossensível da Pelagra (deficiência de Niacina / Vitamina B3).',
        isCorrect: true,
        explanation: 'Correta. O Colar de Casal (descrito por Gaspar Casal em 1735) é a lesão cutânea clássica da pelagra: eritema e hiperpigmentação com descamação e fissuras nas áreas fotoexpostas (decote cervical e pescoço).'
      },
      {
        id: 'alt-b',
        text: 'Sinal de Gottron, característico da dermatomiosite juvenil.',
        isCorrect: false,
        explanation: 'Incorreta. Sinal de Gottron são pápulas violáceas sobre as articulações interfalangianas e metacarpofalangianas.'
      },
      {
        id: 'alt-c',
        text: 'Eritema migratório anular, típico da Doença de Lyme por carrapato.',
        isCorrect: false,
        explanation: 'Incorreta. Eritema migratório é lesão em alvo expansiva após picada de Borrelia burgdorferi.'
      },
      {
        id: 'alt-d',
        text: 'Manchas em "café com leite" associadas a nódulos de Lisch.',
        isCorrect: false,
        explanation: 'Incorreta. Típico da neurofibromatose tipo 1.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Colar de Casal: A Marca Fotossensível da Pelagra',
      clinicalPearl: 'Lesão descamativa hipercrômica em colar ao redor do pescoço em área exposta à luz solar = Colar de Casal = Pelagra (Carência de Niacina/Vitamina B3)!',
      detailedExplanation: 'A pele exposta à radiação ultravioleta necessita de constante síntese e reparo de DNA dependente de NAD/NADP. A carência de niacina impede a reparação celular, gerando inflamação estéril aguda seguida de hiperpigmentação escura, descamação em crostas e ulcerações.',
      distractorAnalysis: 'Distratores listam sinais dermatológicos de outras patologias reumatológicas e infecciosas.'
    }
  },
  {
    id: 'med-q17',
    questionNumber: 17,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Medicina Laboratorial & Oncologia',
    topic: 'Marcador Bioquímico Urinário da Síndrome Carcinoide',
    statement: `Para confirmar laboratorialmente a suspeita de síndrome carcinoide com hipersecreção autônoma de serotonina em um paciente com cardiopatia valvar direita e pelagra, qual é o exame laboratorial urinário de escolha a ser solicitado?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Dosagem de Ácido 5-Hidroxi-Indolacético (5-HIAA) na urina de 24 horas.',
        isCorrect: true,
        explanation: 'Correta. O 5-HIAA é o principal metabólito final inativo resultante da degradação da serotonina pela enzima monoamina oxidase (MAO) e excreção renal. Níveis acentuadamente elevados confirmam produção excessiva e catabolismo maciço de serotonina.'
      },
      {
        id: 'alt-b',
        text: 'Dosagem de ácido vanilmandélico (VMA) urinário para avaliar metanefrinas.',
        isCorrect: false,
        explanation: 'Incorreta. O VMA é metabólito das catecolaminas (adrenalina/noradrenalina), utilizado para feocromocitoma.'
      },
      {
        id: 'alt-c',
        text: 'Dosagem de ácido homogentísico para descartar alcaptonúria.',
        isCorrect: false,
        explanation: 'Incorreta. Alcaptonúria cursa com urina escura e ocronose articular.'
      },
      {
        id: 'alt-d',
        text: 'Clearence de creatinina com fração de excreção de sódio.',
        isCorrect: false,
        explanation: 'Incorreta. Avalia função renal e lesão pré-renal vs NTA, sem especificidade para carcinoide.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: '5-HIAA Urinário de 24 Horas: O Marcador Padrão da Síndrome Carcinoide',
      clinicalPearl: 'Diagnóstico de Síndrome Carcinoide = Dosagem de 5-HIAA (Ácido 5-hidroxi-indolacético) na urina de 24 horas (metabólito da serotonina degradada pela MAO)!',
      detailedExplanation: 'Recomenda-se dieta restritiva por 3 dias antes da coleta (evitando alimentos ricos em serotonina como banana, abacate, nozes, tomate e kiwi) para evitar falsos-positivos. Valores de 5-HIAA > 25 mg/24h são fortemente diagnósticos.',
      distractorAnalysis: 'Distratores associam marcadores de feocromocitoma (VMA) ou erros inatos do metabolismo.'
    }
  },
  {
    id: 'med-q18',
    questionNumber: 18,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Cardiologia & Emergências Obstétricas',
    topic: 'Conduta Farmacológica no Edema Agudo por Estenose Mitral na Gestante',
    statement: `Uma primigesta de 28 anos na 31ª semana de gestação é admitida na UTI obstétrica com edema agudo de pulmão e expectoração rósea hemoptoica. O ecocardiograma de urgência revela estenose mitral reumática grave previamente desconhecida, área valvar de 1,0 cm², ritmo sinusal com frequência cardíaca de 132 bpm e pressão sistólica de artéria pulmonar estimada em 70 mmHg.

Qual é o pilar farmacológico imediato prioritário para estabilizar a hemodinâmica materna sem comprometer a circulação uteroplacentária?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Administração de betabloqueador cardiosseletivo intravenoso ou oral (como metoprolol) para reduzir a frequência cardíaca e prolongar a diástole, associado a diurético de alça em doses tituladas e oxigenoterapia.',
        isCorrect: true,
        explanation: 'Correta. A taquicardia é o vilão na estenose mitral na gestação porque mata o tempo de diástole. Reduzir a FC para 70-80 bpm prolonga a diástole, permitindo que o sangue esvazie o átrio esquerdo através da valva estreita, baixando imediatamente a pressão capilar pulmonar.'
      },
      {
        id: 'alt-b',
        text: 'Infundir 2.000 mL de solução salina a 0,9% rápida para reexpandir a volemia materna.',
        isCorrect: false,
        explanation: 'Incorreta. A hipervolemia piora criticamente o edema agudo de pulmão e a hipertensão capilar.'
      },
      {
        id: 'alt-c',
        text: 'Iniciar nitroprussiato de sódio em altas doses durante 7 dias seguidos.',
        isCorrect: false,
        explanation: 'Incorreta. O nitroprussiato prolongado em gestantes tem alto risco de toxicidade fetal por cianeto/tiocianato.'
      },
      {
        id: 'alt-d',
        text: 'Prescrever atropina intravenosa para acelerar a condução atrioventricular.',
        isCorrect: false,
        explanation: 'Incorreta. Atropina agravaria a taquicardia, precipitando óbito por edema pulmonar intratável.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Manejo da Estenose Mitral Descompensada na Gestação: Betabloqueador para Salvar a Diástole',
      clinicalPearl: 'Na gestante com estenose mitral e edema agudo pulmonar: o objetivo terapêutico número 1 é BAIXAR A FREQUÊNCIA CARDÍACA com Betabloqueador para devolver tempo à diástole!',
      detailedExplanation: 'Com a queda da frequência cardíaca de 130 para 75 bpm, o tempo diastólico dobra. A pressão atrial esquerda cai de imediato e o edema pulmonar e a hemoptise cessam. Diuréticos de alça (furosemida) ajudam a aliviar a congestão, mas devem ser titulados para não colapsar a perfusão da placenta.',
      distractorAnalysis: 'Distratores propõem expansão volêmica desastrosa ou fármacos taquicardizantes/tóxicos.'
    }
  },
  {
    id: 'med-q19',
    questionNumber: 19,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Fisiopatologia & Remodelamento Ventricular',
    topic: 'Remodelamento Excêntrico vs. Concêntrico: Padrão Sarcomérico',
    statement: `Na análise histopatológica do miocárdio de dois pacientes falecidos com valvopatias crônicas:
• Paciente A: Apresentava estenose aórtica severa de longa data.
• Paciente B: Apresentava insuficiência aórtica severa de longa data.

Qual padrão de adição sarcomérica e geometria ventricular esquerda é característico de cada um, respectivamente?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Paciente A: Hipertrofia concêntrica com adição de novos sarcômeros em paralelo; Paciente B: Hipertrofia excêntrica com dilatação cavitária e adição de sarcômeros em série.',
        isCorrect: true,
        explanation: 'Correta. A sobrecarga de pressão (EAo) induz estresse sistólico parietal elevado; a resposta celular é a síntese de miofibrilas e sarcômeros em paralelo (parede espessa, câmara normal/reduzida). A sobrecarga de volume (IAo) estira as fibras na diástole; a resposta celular é a replicação de sarcômeros em série (dilatação da cavidade ventricular).'
      },
      {
        id: 'alt-b',
        text: 'Paciente A: Sarcômeros em série com adelgaçamento de parede; Paciente B: Sarcômeros em paralelo com estenose subvalvar.',
        isCorrect: false,
        explanation: 'Incorreta. Os padrões estão invertidos.'
      },
      {
        id: 'alt-c',
        text: 'Ambos desenvolvem exclusivamente sarcômeros em série com cavidade preservada.',
        isCorrect: false,
        explanation: 'Incorreta. Sobrecarga de pressão e de volume recrutam vias distintas de mecanotransdução.'
      },
      {
        id: 'alt-d',
        text: 'Ambos sofrem apoptose de 100% dos cardiomiócitos sem alteração sarcomérica mensurável.',
        isCorrect: false,
        explanation: 'Incorreta. A hipertrofia adaptativa é marcada por intensa hipertrofia de miócitos.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Sarcômeros em Paralelo (Pressão/Concêntrica) vs. em Série (Volume/Excêntrica)',
      clinicalPearl: 'Sobrecarga de PRESSÃO (Estenose Aórtica) = Sarcômeros em PARALELO = Hipertrofia Concêntrica! Sobrecarga de VOLUME (Insuficiência Aórtica/Mitral) = Sarcômeros em SÉRIE = Hipertrofia Excêntrica!',
      detailedExplanation: 'Conceito histológico fundamental cobrado nos grandes centros: o estresse de tensão sistólica ativa a via da calcineurina-NFAT e cinases que montam filamentos lado a lado (em paralelo). O estresse de estiramento diastólico diastólico adiciona unidades contráteis ponta a ponta (em série), alongando o comprimento dos miócitos.',
      distractorAnalysis: 'Inversões clássicas do tipo de sarcômero (em série vs em paralelo).'
    }
  },
  {
    id: 'med-q20',
    questionNumber: 20,
    difficulty: 'media',
    difficultyLabel: 'Média',
    subject: 'Cardiologia & Segurança Clínica',
    topic: 'Contraindicação Absoluta ao Teste Ergométrico na Estenose Aórtica Sintomática',
    statement: `Um paciente de 67 anos com diagnóstico ecocardiográfico de Estenose Aórtica grave sintomática (relatando angina aos esforços moderados e tonturas ao caminhar) é encaminhado por engano ao setor de métodos gráficos para realizar Teste Ergométrico de esteira convencional.

Qual é a conduta correta do médico examinador e qual é a justificativa de segurança?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Suspender imediatamente o exame, pois a estenose aórtica grave e sintomática é uma contraindicação absoluta formal ao teste ergométrico de esforço, devido ao alto risco de síncope fatal, hipotensão severa por débito fixo, colapso circulatório e parada cardíaca.',
        isCorrect: true,
        explanation: 'Correta. Na presença de sintomas (angina, síncope ou dispneia), submeter o paciente ao estresse físico em esteira acarreta grave risco de hipotensão maligna, isquemia ventricular intratável, fibrilação ventricular e morte súbita na sala de esteira.'
      },
      {
        id: 'alt-b',
        text: 'Realizar o teste até atingir a frequência cardíaca máxima de 100% para comprovar a reserva coronariana.',
        isCorrect: false,
        explanation: 'Incorreta. Prática temerária e proibida pelas diretrizes de cardiologia.'
      },
      {
        id: 'alt-c',
        text: 'Realizar o teste apenas se o paciente tomar previamente 100 mg de sildenafila.',
        isCorrect: false,
        explanation: 'Incorreta. Vasodilatadores arteriais como inibidores de PDE5 são extremamente perigosos na EAo grave e podem provocar colapso hemodinâmico.'
      },
      {
        id: 'alt-d',
        text: 'Substituir por esteira inclinada a 45 graus com carga máxima logo no primeiro minuto.',
        isCorrect: false,
        explanation: 'Incorreta. Carga abrupta causaria choque imediato por vasodilatação sem débito compensatório.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Estenose Aórtica Sintomática: Contraindicação Absoluta ao Teste Ergométrico',
      clinicalPearl: 'Alerta Vermelho: NUNCA realize teste ergométrico de esforço em paciente com Estenose Aórtica Grave SINTOMÁTICA! O débito fixo leva a colapso pressórico e morte súbita!',
      detailedExplanation: 'As diretrizes mundiais de cardiologia (SBC, AHA/ACC, ESC) classificam a EAo importante sintomática como contraindicação absoluta. (Atenção: o teste ergométrico supervisionado só é indicado em pacientes estritamente ASSINTOMÁTICOS para desmascarar falsos assintomáticos, e deve ser interrompido imediatamente à menor queda pressórica).',
      distractorAnalysis: 'Distratores sugerem prosseguir com o exame ou usar vasodilatadores perigosos.'
    }
  }
];
