import { QuestionAlternative } from '../types';
import { ValvopathyExamQuestion } from './valvopathyEasyExam';

export const VALVOPATHY_HARD_EXAM: ValvopathyExamQuestion[] = [
  {
    id: 'dif-q01',
    questionNumber: 1,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Ecocardiografia Avançada & Hemodinâmica',
    topic: 'Estenose Aórtica de Baixo Fluxo e Baixo Gradiente com Fração de Ejeção Reduzida',
    statement: `Um homem de 73 anos com insuficiência cardíaca crônica apresenta ecocardiograma de repouso com: fração de ejeção do VE de 26%, área valvar aórtica calculada por equação de continuidade de 0,7 cm², gradiente médio transaórtico de apenas 28 mmHg e volume sistólico indexado de 24 mL/m² (baixo fluxo).

Para diferenciar entre Estenose Aórtica Verdadeiramente Grave e Pseudoestenose Aórtica (onde a valva abre mal apenas pela fraqueza contrátil do miocárdio), o paciente é submetido a Ecocardiograma sob Estresse com Dobutamina em baixas doses.

Qual resultado ao estresse farmacológico confirma ESTENOSE AÓRTICA VERDADEIRAMENTE GRAVE com indicação cirúrgica/intervencionista (TAVI)?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Aumento do volume sistólico ≥ 20% (presença de reserva contrátil), com a área valvar aórtica permanecendo fixa ≤ 1,0 cm² e o gradiente médio transaórtico elevando-se para ≥ 40 mmHg.',
        isCorrect: true,
        explanation: 'Correta. Quando o inotrópico eleva o débito cardíaco (aumento do volume sistólico ≥ 20%), a valva anatomicamente calcificada e rígida é incapaz de abrir mais (área continua ≤ 1,0 cm²), forçando o gradiente médio a disparar para mais de 40 mmHg, comprovando estenose aórtica anatômica crítica.'
      },
      {
        id: 'alt-b',
        text: 'Aumento do volume sistólico com aumento proporcional da área valvar para > 1,3 cm² e queda do gradiente médio para < 20 mmHg.',
        isCorrect: false,
        explanation: 'Incorreta. Este padrão define Pseudoestenose Aórtica (a valva é apenas fibroelástica e se abre normalmente quando o VE ganha força contrátil).'
      },
      {
        id: 'alt-c',
        text: 'Queda imediata da fração de ejeção para < 15% com parada respiratória no primeiro minuto de infusão.',
        isCorrect: false,
        explanation: 'Incorreta. Indica falha grave do teste ou toxicidade, não sendo critério diagnóstico de estenose verdadeira.'
      },
      {
        id: 'alt-d',
        text: 'Ausência total de elevação do volume sistólico (< 20%) acompanhada de regressão espontânea da calcificação valvar.',
        isCorrect: false,
        explanation: 'Incorreta. Ausência de aumento de volume sistólico indica ausência de reserva miocárdica contrátil (alto risco cirúrgico), mas calcificação nunca regride.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Eco-Dobutamina na EAo de Baixo Fluxo: Critérios de Estenose Verdadeira vs. Pseudoestenose',
      clinicalPearl: 'Estenose Aórtica Verdadeira no Eco-Dobutamina: Reserva contrátil presente (+20% no volume sistólico) + Área valvar continua ESTREITA (≤ 1,0 cm²) + Gradiente médio EXPLODE para cima (≥ 40 mmHg)!',
      detailedExplanation: 'Na pseudoestenose aórtica, o aumento do volume de ejeção empurra as cúspides flexíveis, fazendo a área calculada subir para > 1,2 cm² com pouca elevação de gradiente. Na estenose aórtica verdadeira grave, o orifício é uma fenda calcificada pétrea: mais fluxo empurrado através do mesmo buraco estreito dispara o gradiente pressórico.',
      distractorAnalysis: 'Distratores invertem as respostas da dobutamina ou confundem com pseudoestenose valvar.'
    }
  },
  {
    id: 'dif-q02',
    questionNumber: 2,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Gastroenterologia & Hematologia Cardiovascular',
    topic: 'Síndrome de Heyde: Mecanismo Molecular da Deficiência Adquirida do Fator de von Willebrand',
    statement: `Um paciente de 78 anos com estenose aórtica calcificada grave e sopro mesossistólico com pico tardio é internado com episódios recidivantes de hemorragia digestiva baixa secundária a angiodisplasias sangrantes no cólon ascendente (Síndrome de Heyde).

Qual é o mecanismo molecular subjacente que liga a estenose aórtica calcificada à coagulopatia e ao sangramento nas angiodisplasias gastrointestinais?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A passagem forçada do sangue sob elevadíssimo estresse de cisalhamento (shear stress) através do orifício aórtico estenosado desenrola os multímeros de alto peso molecular do Fator de von Willebrand (FvW), tornando-os vulneráveis à clivagem proteolítica excessiva pela enzima ADAMTS13 e gerando Síndrome de von Willebrand Adquirida tipo 2A.',
        isCorrect: true,
        explanation: 'Correta. A Síndrome de Heyde é caracterizada por estenose aórtica + angiodisplasia gastrointestinal. O estresse de cisalhamento patológico no jato aórtico estira os multímeros grandes de FvW, permitindo que a metaloprotease ADAMTS13 os degrade rapidamente. Sem os multímeros de alto peso molecular, a hemostasia primária em vasos frágeis mucosos falha, provocando sangramento.'
      },
      {
        id: 'alt-b',
        text: 'A estenose aórtica causa hipotensão crônica na artéria mesentérica inferior gerando necrose transmural isquêmica com perfuração cólica.',
        isCorrect: false,
        explanation: 'Incorreta. Trata-se de sangramento mucoso por angiodisplasia e coagulopatia, não colite isquêmica transmural.'
      },
      {
        id: 'alt-c',
        text: 'As placas de cálcio da valva embolizam diariamente para as artérias gástricas esquerdas destruindo a submucosa.',
        isCorrect: false,
        explanation: 'Incorreta. A causa hemostática comprovada é a degradação dos multímeros de vWF, curada pela troca valvar.'
      },
      {
        id: 'alt-d',
        text: 'Ocorre destruição autoimune de fibrinogênio por anticorpos cruzados induzidos pela bactéria Enterococcus faecalis.',
        isCorrect: false,
        explanation: 'Incorreta. Não há consumo autoimune de fibrinogênio na síndrome de Heyde.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Síndrome de Heyde: Estresse de Cisalhamento na Valva Cliva o Fator de von Willebrand via ADAMTS13',
      clinicalPearl: 'Síndrome de Heyde = Estenose Aórtica Grave + Sangramento por Angiodisplasia Intestinal! Cura milagrosa: A substituição cirúrgica ou transcateter da valva aórtica (TAVI) restaura os multímeros de vWF e cessa o sangramento digestivo!',
      detailedExplanation: 'Sob estresse de cisalhamento normal, os multímeros de FvW permanecem em conformação globular protegida. O gradiente pressórico extremo e a turbulência da estenose aórtica forçam o desdobramento da molécula, expondo o domínio A2 à clivagem pela enzima ADAMTS13, reduzindo drasticamente os multímeros hemostaticamente ativos.',
      distractorAnalysis: 'Distratores tentam justificar o sangramento por microembolia de cálcio ou isquemia mesentérica.'
    }
  },
  {
    id: 'dif-q03',
    questionNumber: 3,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Emergências Cardiovasculares',
    topic: 'Insuficiência Aórtica Aguda Grave vs. Crônica: O Paradoxo dos Sinais Periféricos',
    statement: `Um paciente de 42 anos dá entrada em choque cardiogênico e edema agudo de pulmão fulminante horas após dissecção aguda de aorta tipo Stanford A com avulsão de cúspide e Insuficiência Aórtica Aguda maciça.

Ao examiná-lo, o médico estranha a AUSÊNCIA COMPLETA dos sinais clássicos descritos nos compêndios de semiologia para insuficiência aórtica (sem pressão arterial amplamente divergente, sem pulso em martelo d'água de Corrigan e sem sinal de Musset).

Qual é a justificativa hemodinâmica para a ausência de pressão divergente e ausência de sinais periféricos hiperdinâmicos na Insuficiência Aórtica AGUDA?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Como o ventrículo esquerdo tem volume normal e baixa complacência prévia, a regurgitação súbita eleva a pressão diastólica final do VE (PDFVE) a níveis catastróficos quase iguais aos da aorta, encurtando o gradiente diastólico, provocando fechamento prematuro da valva mitral, taquicardia extrema e baixo volume sistólico ejetado para a periferia.',
        isCorrect: true,
        explanation: 'Correta. Na IAo aguda, o VE não teve tempo de se dilatar (complacência normal rígida). O sangue regurgitado eleva a PDFVE vertiginosamente para 40-50 mmHg em segundos, equalizando a pressão com a aorta na diástole. Isso impede a queda extrema da PAD na raiz aórtica, mata o volume ejetado anterógrado e apaga todos os sinais hiperdinâmicos periféricos.'
      },
      {
        id: 'alt-b',
        text: 'Porque os sinais periféricos só aparecem se a dissecção se estender até a artéria femoral profunda.',
        isCorrect: false,
        explanation: 'Incorreta. Os sinais periféricos clássicos são próprios do regime crônico de remodelamento excêntrico maciço de VE.'
      },
      {
        id: 'alt-c',
        text: 'Porque na insuficiência aórtica aguda a valva tricúspide compensa o refluxo dilatando o átrio direito.',
        isCorrect: false,
        explanation: 'Incorreta. A valva tricúspide não tem comunicação hemodinâmica direta para compensar a IAo aguda.'
      },
      {
        id: 'alt-d',
        text: 'Porque o sopro da IAo aguda é holossistólico em diamante e não permite que a diástole ocorra.',
        isCorrect: false,
        explanation: 'Incorreta. O sopro da IAo aguda é diastólico curto, suave e precoce, pois o gradiente se extingue rapidamente.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Insuficiência Aórtica Aguda: Choque sem Sinais Hiperdinâmicos Periféricos',
      clinicalPearl: 'Armadilha Fatal de UTI: Insuficiência Aórtica AGUDA NÃO TEM pulso de Corrigan, NÃO TEM PA divergente e tem sopro DIASTÓLICO CURTO e suave! O VE rígido sofre explosão de pressão diastólica -> fecha a mitral na diástole e gera edema agudo!',
      detailedExplanation: 'Na IAo crônica, o VE dilatado comporta 300 mL de volume sob baixa pressão, permitindo volume sistólico gigante (PAS alta) e esvaziamento diastólico (PAD baixa). Na IAo aguda, o VE de 90 mL atinge 50 mmHg de pressão diastólica em milissegundos: a B1 fica abafada ou inaudível (fechamento prematuro da mitral) e o paciente colapsa em choque de baixo débito.',
      distractorAnalysis: 'Questão de altíssima relevância que separa o conhecimento superficial da fisiopatologia real de terapia intensiva.'
    }
  },
  {
    id: 'dif-q04',
    questionNumber: 4,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Semiologia em Terapia Intensiva & Infarto',
    topic: 'Morfologia do Sopro na Insuficiência Mitral Aguda por Rotura Papilar',
    statement: `No 4º dia pós-infarto agudo do miocárdio de parede inferior, um paciente de 61 anos desenvolve subitamente dispneia sufocante, estertoração difusa bilateral e choque cardiogênico por rotura do músculo papilar póstero-medial com Insuficiência Mitral Aguda maciça.

Diferente do sopro holossistólico em platô de alta frequência típico da insuficiência mitral crônica, qual é o padrão acústico do sopro auscultado nessa emergência de Insuficiência Mitral AGUDA?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Sopro mesossistólico precoce em decrescendo (protomesossistólico), suave e de baixa frequência, terminando antes de B2, devido à rápida equalização das pressões sistólicas entre o VE e o átrio esquerdo não complacente que desenvolve ondas "v" gigantes.',
        isCorrect: true,
        explanation: 'Correta. Na IM aguda, o átrio esquerdo é pequeno e rígido. O refluxo maciço sob pressão sistólica gera uma onda "v" monstruosa no AE (ex: 60-80 mmHg). No meio da sístole, a pressão no AE se equaliza com a do VE, extinguindo o gradiente pressórico transvalvar antes do final da sístole. O sopro é curto, decrescente e pode ser quase inaudível!'
      },
      {
        id: 'alt-b',
        text: 'Sopro holossistólico em platô grau 6/6 com frêmito palpável irradiando para o occipício.',
        isCorrect: false,
        explanation: 'Incorreta. Este perfil exuberante é próprio de lesões crônicas com grande gradiente sistólico mantido.'
      },
      {
        id: 'alt-c',
        text: 'Sopro contínuo em maquinaria que aumenta na inspiração profunda.',
        isCorrect: false,
        explanation: 'Incorreta. Sopros contínuos não ocorrem na rotura de músculo papilar.'
      },
      {
        id: 'alt-d',
        text: 'Ruflar telediastólico com reforço pré-sistólico no 2º EICD.',
        isCorrect: false,
        explanation: 'Incorreta. Descreve estenose mitral com ritmo sinusal.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Insuficiência Mitral Aguda: Sopro Precoce em Decrescendo por Onda "v" Gigante',
      clinicalPearl: 'Na UTI: Insuficiência Mitral Aguda NÃO tem sopro holossistólico clássico! O sopro é precoce e decrescente (protomesossistólico) porque a onda "v" gigante no átrio esquerdo equaliza as pressões com o VE na telessístole!',
      detailedExplanation: 'Como a pressão atrial esquerda atinge 70 mmHg no meio da sístole, o gradiente VE-AE colapsa rapidamente no final da contração ventricular. Por isso o sopro decresce e cessa bem antes de B2. O examinador inexperiente pode não valorizar o sopro suave e retardar a indicação cirúrgica salvadora de vida.',
      distractorAnalysis: 'Distratores descrevem o sopro holossistólico em platô clássico da insuficiência mitral crônica.'
    }
  },
  {
    id: 'dif-q05',
    questionNumber: 5,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Semiologia Cardiovascular Avançada',
    topic: 'Galope de Somação e o Impacto do Desencadeamento de Fibrilação Atrial',
    statement: `Um paciente de 69 anos com insuficiência cardíaca e hipertensão grave desenvolve taquicardia sinusal com frequência cardíaca de 130 bpm. À ausculta cardíaca, o examinador detecta um ruído diastólico estrondoso único no meio da diástole: um clássico Galope de Somação (onde a fase de enchimento rápido - B3 - e a fase da sístole atrial - B4 - coincidem no tempo devido ao extremo encurtamento da diástole).

Minutos depois, o monitor cardíaco registra a deflagração súbita de Fibrilação Atrial com a mesma frequência ventricular média de 130 bpm.

O que ocorre fisiologicamente com o Galope de Somação quando o paciente transita para Fibrilação Atrial?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'O galope de somação é desfeito e reverte para um galope protodiastólico puro por B3 isolada, pois o componente de B4 desaparece imediatamente pela ausência de contração mecânica atrial coordenada na fibrilação atrial.',
        isCorrect: true,
        explanation: 'Correta. O galope de somação exige a sobreposição temporal de B3 + B4. Na fibrilação atrial não existe sístole atrial; portanto, o componente B4 é extinto da equação. O som que persiste no início do enchimento diastólico é a B3 isolada.'
      },
      {
        id: 'alt-b',
        text: 'O galope de somação intensifica-se em amplitude porque a B4 dobra de intensidade na arritmia atrial.',
        isCorrect: false,
        explanation: 'Incorreta. B4 é abolida, não intensificada.'
      },
      {
        id: 'alt-c',
        text: 'A B3 desaparece e o galope torna-se puramente telediastólico por B4 isolada.',
        isCorrect: false,
        explanation: 'Incorreta. Quem desaparece é a B4; a B3 persiste.'
      },
      {
        id: 'alt-d',
        text: 'O som se transforma em um clique de abertura da valva tricúspide com sopro contínuo.',
        isCorrect: false,
        explanation: 'Incorreta. Não há geração de clique tricúspide ou sopro contínuo por fibrilação atrial.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Galope de Somação (B3+B4) na FA: Perda de B4 e Persistência de B3 Isolada',
      clinicalPearl: 'Galope de Somação = B3 + B4 fundidas na taquicardia sinusal. Se entrar em Fibrilação Atrial, a B4 é deletada e sobra apenas a B3 (galope protodiastólico ventricular)!',
      detailedExplanation: 'Na taquicardia severa em ritmo sinusal, a sístole mecânica do átrio é antecipada para cima da fase de enchimento rápido ventricular. Os dois ruídos se fundem em um ruído mais alto que a B1 ou B2 (galope de somação). Ao surgir a FA, a perda da onda P e da sístole atrial remove o "tijolo" do B4.',
      distractorAnalysis: 'Confere se o estudante domina a mecânica de superposição de bulhas na taquicardia e o papel da contração atrial.'
    }
  },
  {
    id: 'dif-q06',
    questionNumber: 6,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Anestesiologia & Oncologia Endócrina',
    topic: 'Crise Carcinoide Intraoperatória e Conduta Farmacológica Específica',
    statement: `Um paciente de 55 anos com cardiopatia carcinoide grave (insuficiência tricúspide e estenose pulmonar) é submetido a indução anestésica para ressecção de metástases hepáticas. Durante a intubação e manipulação cirúrgica, desenvolve subitamente hipotensão refratária profunda (PA 60x30 mmHg), broncoespasmo severo com sibilos generalizados e rubor eritematoso difuso no tronco (Crise Carcinoide Intraoperatória).

Qual é a conduta farmacológica específica de escolha e qual classe de fármacos vasoativos convencionais DEVE SER EVITADA por risco de piora paradoxal?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Administração imediata de Octreotida intravenosa em bolus e infusão contínua; DEVEM SER EVITADOS agonistas beta-adrenérgicos (como adrenalina e isoprenalina), pois a estimulação dos receptores beta das células tumorais deflagra liberação maciça adicional de serotonina e calicreína pela neoplasia.',
        isCorrect: true,
        explanation: 'Correta. A crise carcinoide é mediada por tempestade de serotonina, bradicinina e histamina. A octreotida (análogo da somatostatina) inibe diretamente a secreção neuroendócrina pelas células tumorais. Catecolaminas beta-agonistas estimulam receptores tumorais e amplificam catastroficamente a crise vasodilatadora.'
      },
      {
        id: 'alt-b',
        text: 'Infundir 5 mg de adrenalina em bolus e administrar aspirina em alta dose.',
        isCorrect: false,
        explanation: 'Incorreta. Adrenalina em altas doses dispara mais liberação de mediadores no tumor carcinoide.'
      },
      {
        id: 'alt-c',
        text: 'Administrar vitamina B3 pura em infusão rápida como vasodilatador.',
        isCorrect: false,
        explanation: 'Incorreta. A niacina pioraria o flushing e a vasodilatação periférica na vigência de choque.'
      },
      {
        id: 'alt-d',
        text: 'Prescrever sulfato de morfina em infusão rápida associado a betabloqueador ultra-rápido.',
        isCorrect: false,
        explanation: 'Incorreta. Morfina induz liberação de histamina, agravando a broncoconstrição e hipotensão.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Crise Carcinoide no Centro Cirúrgico: Octreotida na Veia e Proibição de Beta-Agonistas',
      clinicalPearl: 'Crise Carcinoide = Infusão imediata de OCTREOTIDA! Nunca faça Adrenalina/Isoprenalina (estimulam receptores tumorais e inflamam ainda mais a tempestade de serotonina e cininas)!',
      detailedExplanation: 'A octreotida se liga aos receptores de somatostatina subtipo 2 (SSTR2) presentes nas células neuroendócrinas, bloqueando a exocitose de grânulos contendo serotonina, calicreína, substância P e prostaglandinas. Se for necessário suporte vasopressor, deve-se usar agonistas alfa puros (fenilefrina ou noradrenalina em baixas doses associada a vasopressina).',
      distractorAnalysis: 'Distratores indicam terapias usuais de anafilaxia que são contraindicadas na crise carcinoide.'
    }
  },
  {
    id: 'dif-q07',
    questionNumber: 7,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Hemodinâmica Invasiva & Fisiologia Cardiovascular',
    topic: 'Equação de Gorlin e o Impacto da Taquicardia na Estenose Mitral',
    statement: `A clássica Equação de Gorlin estabelece que a Área Valvar Mitral (AVM) é inversamente proporcional à raiz quadrada do gradiente pressórico diastólico médio transvalvar (ΔP) e ao tempo total de enchimento diastólico por minuto (DFP = Duração do Período de Enchimento Diastólico x FC):
AVM = Fluxo Diastólico / [ C x √(ΔP) x DFP ]

Com base na fórmula hemodinâmica de Gorlin, por que um aumento modesto na frequência cardíaca (por exemplo, de 70 para 115 bpm) provoca uma elevação desproporcional e quadrática na pressão capilar pulmonar de uma paciente com estenose mitral grave?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Porque o aumento da FC encurta desproporcionalmente a diástole em relação à sístole; como o mesmo débito cardíaco precisa atravessar a valva estenosada em um tempo diastólico por minuto drasticamente reduzido, a taxa de fluxo diastólico instantâneo se eleva, exigindo que o gradiente pressórico (ΔP) aumente com o quadrado do fluxo para vencer a resistência fixa.',
        isCorrect: true,
        explanation: 'Correta. Para manter o débito constante com uma janela diastólica encurtada em mais de 50%, a velocidade e a taxa de fluxo instantâneo precisam dobrar. Como o gradiente ΔP na equação de Gorlin depende do quadrado do fluxo (ΔP ∝ Fluxo²), o gradiente transvalvar e a pressão atrial esquerda quadruplicam, precipitando edema alveolar pulmonar fulminante.'
      },
      {
        id: 'alt-b',
        text: 'Porque a taquicardia fecha a artéria pulmonar por vasoconstrição endotélica direta.',
        isCorrect: false,
        explanation: 'Incorreta. A taquicardia não fecha a artéria pulmonar mecanicamente.'
      },
      {
        id: 'alt-c',
        text: 'Porque a constante de Gorlin C torna-se negativa em frequências maiores que 100 bpm.',
        isCorrect: false,
        explanation: 'Incorreta. A constante de Gorlin é um coeficiente empírico fixo da geometria valvar.'
      },
      {
        id: 'alt-d',
        text: 'Porque na taquicardia o sangue inverte seu sentido e passa a fluir do ventrículo para o átrio durante a diástole.',
        isCorrect: false,
        explanation: 'Incorreta. O fluxo diastólico atrioventricular é sempre anterógrado do átrio para o ventrículo.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Equação de Gorlin: A Relação Quadrática entre Frequência Cardíaca e Gradiente Transmitral',
      clinicalPearl: 'Fisiologia Pura de UTI: O gradiente na estenose mitral sobe com o QUADRADO da taxa de fluxo diastólico! Taquicardia encurta a diástole -> dobra a taxa de fluxo instantâneo -> QUADRUPLICA o gradiente e inunda os pulmões!',
      detailedExplanation: 'A sístole tem duração relativamente estável (cerca de 0,25 a 0,30s). A diástole, no entanto, absorve todo o encurtamento do ciclo cardíaco na taquicardia. A 70 bpm o tempo diastólico é cerca de 35 segundos por minuto; a 120 bpm cai para menos de 15 segundos por minuto. Passar o mesmo volume de sangue em menos da metade do tempo através de uma valva estenosada exige pressões atriais monstruosas.',
      distractorAnalysis: 'Distratores apresentam propostas matemáticas absurdas sobre a constante de Gorlin.'
    }
  },
  {
    id: 'dif-q08',
    questionNumber: 8,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Cardiologia Obstétrica & Anestesiologia',
    topic: 'Manejo Hemodinâmico do Trabalho de Parto na Estenose Mitral',
    statement: `Uma gestante de 24 anos com estenose mitral reumática grave (área valvar de 0,9 cm²) entra em trabalho de parto na 38ª semana. A equipe multidisciplinar precisa planejar a via de parto, a analgesia e a condução do segundo estágio (expulsivo).

Qual é a estratégia obstétrico-hemodinâmica recomendada pelas diretrizes mundiais de cardiopatia na gravidez para esta paciente?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Parto vaginal com analgesia peridural contínua precoce (para atenuar a dor e taquicardia simpática), abreviação ativa do período expulsivo com fórceps de alívio ou vácuo-extrator (evitando manobras de Valsalva prolongadas e a sobrecarga volêmica subsequente) e monitorização hemodinâmica rigorosa.',
        isCorrect: true,
        explanation: 'Correta. O parto vaginal assistido sob analgesia peridural lenta é a via de escolha (menor perda volêmica e menor risco infeccioso que a cesárea). Os puxos maternos ativos (Valsalva) elevam abruptamente o retorno venoso após o relaxamento; usar fórceps de alívio poupa o coração materno desse estresse hemodinâmico.'
      },
      {
        id: 'alt-b',
        text: 'Cesariana de emergência sob raquianestesia em dose máxima com infusão de 3.000 mL de soro fisiológico rápido.',
        isCorrect: false,
        explanation: 'Incorreta. A raquianestesia maciça rápida causa vasodilatação súbita com hipotensão severa seguida de descompensação por hiperidratação.'
      },
      {
        id: 'alt-c',
        text: 'Parto em ambiente domiciliar sem anestesia, estimulando manobras de Valsalva sustentadas por mais de 3 minutos contínuos.',
        isCorrect: false,
        explanation: 'Incorreta. Prática com letalidade materno-fetal inaceitável.'
      },
      {
        id: 'alt-d',
        text: 'Anestesia geral imediata com intubação traqueal e hiperventilação mecânica com PEEP zero.',
        isCorrect: false,
        explanation: 'Incorreta. A anestesia geral com intubação induz pico hipertensivo/taquicárdico perigoso na laringoscopia.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Parto na Estenose Mitral Grave: Peridural Lenta + Parto Vaginal com Fórceps de Alívio',
      clinicalPearl: 'Diretriz de Cardiopatia na Gravidez: Parto Vaginal com peridural contínua e fórceps de alívio (evita os esforços de puxo materno que causam autotransfusão venosa uterina maciça no VE)!',
      detailedExplanation: 'Cada contração uterina injeta 300 a 500 mL de sangue na circulação sistêmica materna ("autotransfusão"). As manobras de Valsalva durante os puxos bloqueiam o retorno venoso e, ao soltar o ar, provocam uma inundação volumétrica no átrio esquerdo. O fórceps abrevia o expulsivo sem exigir esforço materno exaustivo.',
      distractorAnalysis: 'Distratores sugerem cesariana rotineira com raquianestesia brusca ou hiper-hidratação que precipitam choque ou edema pulmonar.'
    }
  },
  {
    id: 'dif-q09',
    questionNumber: 9,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Semiologia Cardiovascular & Fonocardiografia Fina',
    topic: 'Desdobramento Paradoxal (Invertido) da Segunda Bulha (B2)',
    statement: `Na ausculta cardíaca de um paciente com estenose aórtica severa de via de saída calcificada, o médico constata o fenômeno do Desdobramento Paradoxal (ou Invertido) da Segunda Bulha (B2).

Como se comporta o intervalo entre os componentes aórtico (A2) e pulmonar (P2) de B2 durante as fases da respiração nesse paciente?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A segunda bulha é desdobrada na expiração (com P2 ocorrendo ANTES de A2 devido ao atraso da ejeção de VE); durante a inspiração profunda, o atraso fisiológico de P2 faz com que este se sobreponha ao A2 atrasado, unificando a B2 em som único.',
        isCorrect: true,
        explanation: 'Correta. No desdobramento paradoxal, o fechamento aórtico (A2) está patologicamente atrasado pelo esvaziamento prolongado do VE através da estenose, ocorrendo DEPOIS de P2. Na expiração, ouve-se P2-A2 desdobrado. Na inspiração, o aumento do retorno venoso ao VD atrasa fisiologicamente o P2, fazendo P2 se chocar no tempo de A2, fundindo a bulha em som único (daí o nome "paradoxal").'
      },
      {
        id: 'alt-b',
        text: 'A segunda bulha desdobra-se amplamente apenas durante a inspiração profunda com A2 sempre precedendo P2.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o desdobramento fisiológico normal de B2.'
      },
      {
        id: 'alt-c',
        text: 'A segunda bulha permanece com intervalo fixo invariável em sístole e diástole sem qualquer influência inspiratória.',
        isCorrect: false,
        explanation: 'Incorreta. Este é o desdobramento fixo de B2, clássico da Comunicação Interatrial (CIA).'
      },
      {
        id: 'alt-d',
        text: 'A segunda bulha desaparece completamente na expiração e reaparece como estalido tricúspide.',
        isCorrect: false,
        explanation: 'Incorreta. B2 não desaparece completamente na expiração normal.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Desdobramento Paradoxal de B2: Desdobra na Expiração e Funde na Inspiração',
      clinicalPearl: 'Desdobramento Paradoxal de B2 (Estenose Aórtica Severa / Bloqueio de Ramo Esquerdo): Ouve-se DOIS sons na EXPIRAÇÃO e UM som único na INSPIRAÇÃO! É o inverso do fisiológico!',
      detailedExplanation: 'Normal: A2 precede P2; na inspiração o atraso de P2 alarga o intervalo (desdobramento fisiológico). Paradoxal: A2 ocorre depois de P2 (ordem P2-A2). Ao inspirar, P2 atrasa e caminha em direção ao A2 que já estava atrasado, eliminando o intervalo entre eles e gerando bulha única.',
      distractorAnalysis: 'Distratores descrevem o desdobramento fisiológico e o desdobramento fixo da CIA.'
    }
  },
  {
    id: 'dif-q10',
    questionNumber: 10,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Bioquímica Clínica & Farmacologia Oncológica',
    topic: 'Metabolismo Tumoral de Triptofano: Diferença entre Pelagra Primária e Secundária ao Carcinoide',
    statement: `Um paciente com tumor carcinoide metastático em progressão desenvolve Pelagra secundária. Apesar de receber dieta com teor calórico-proteico normal enriquecida em triptofano, ele mantém manifestações de dermatite fotossensível grave e diarreia secretória refratária.

Qual é a razão bioquímica para a ineficácia do simples aumento da ingestão de triptofano na dieta sem o bloqueio da secreção tumoral?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Porque a enzima Triptofano 5-Hidroxilase (TPH1) superexpressa na imensa massa de células tumorais possui afinidade extraordinária e desvia avidamente até 70% a 80% de todo o novo triptofano absorvido para a síntese acelerada de serotonina, agravando a síndrome carcinoide sem repor adequadamente a síntese de Niacina.',
        isCorrect: true,
        explanation: 'Correta. No tumor carcinoide, a suplementação isolada de triptofano atua como "combustível para o fogo tumoral": as células neoplásicas captam o aminoácido suplementar para sintetizar ainda mais serotonina, piorando o flushing, a diarreia e a fibrose valvar cardíaca. O tratamento requer reposição direta de Niacina/Nicotinamida (já sintetizada) associada à inibição somatostatinérgica (octreotida).'
      },
      {
        id: 'alt-b',
        text: 'Porque o triptofano é destruído pelo suco gástrico na presença de metástases hepáticas.',
        isCorrect: false,
        explanation: 'Incorreta. O triptofano é absorvido normalmente no intestino delgado.'
      },
      {
        id: 'alt-c',
        text: 'Porque a niacina é convertida em ácido sulfúrico pelo fígado no paciente com carcinoide.',
        isCorrect: false,
        explanation: 'Incorreta. A niacina é convertida em NAD/NADP por vias normais de piridina.'
      },
      {
        id: 'alt-d',
        text: 'Porque as bactérias colônicas digerem a niacina impedindo sua passagem aos enterócitos.',
        isCorrect: false,
        explanation: 'Incorreta. O defeito não é digestão bacteriana e sim o sequestro metabólico neoplásico.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Triptofano no Carcinoide: Sequestro Tumoral que Alimenta a Tempestade de Serotonina',
      clinicalPearl: 'Peróla Metabólica: No carcinoide, NÃO basta dar triptofano! Dar triptofano alimenta o tumor para fazer mais serotonina! Deve-se administrar diretamente a NIACINA / NICOTINAMIDA pronta e bloquear o tumor com OCTREOTIDA!',
      detailedExplanation: 'Em humanos saudáveis, são necessários 60 mg de triptofano alimentar para produzir 1 mg de niacina. Quando o tumor sequestra todo o substrato disponível, a via da quinurenina é abandonada. Repor nicotinamida oral diretamente contorna a via do triptofano e resolve a pelagra sem estimular a produção de serotonina pelo tumor.',
      distractorAnalysis: 'Distratores supõem destruição digestiva inespecífica ou conversões ácidas impossíveis.'
    }
  },
  {
    id: 'dif-q11',
    questionNumber: 11,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Semiologia Cardiovascular',
    topic: 'Fenômeno de Gallavardin na Estenose Aórtica do Idoso',
    statement: `Um homem de 82 anos com estenose aórtica fibrocalcificada crítica apresenta um sopro rude e áspero no 2º EICD que se irradia para as carótidas. Simultaneamente, o médico ausculta no ápice cardíaco (foco mitral) um sopro musical, puro e de alta frequência, que poderia ser facilmente confundido com Insuficiência Mitral por um examinador desatento (Fenômeno de Gallavardin).

Qual característica auscultatória permite confirmar que o sopro musical no ápice decorre do Fenômeno de Gallavardin e NÃO de uma insuficiência mitral orgânica verdadeira concomitante?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'O sopro musical apical preserva o formato mesossistólico em diamante (crescendo-decrescendo) com B1 nítida e ausência de irradiação para a axila esquerda; além disso, ele varia de intensidade batimento a batimento após extrassístoles (reforçando após a pausa compensatória), ao contrário da insuficiência mitral.',
        isCorrect: true,
        explanation: 'Correta. O Fenômeno de Gallavardin é a dissociação acústica da estenose aórtica: os componentes graves e ásperos ficam na base, enquanto as frequências puras e harmônicas se propagam para o ápice. No ápice, ele continua sendo um sopro ejetivo em diamante, não apaga B1, não irradia para axila e aumenta após pausa pós-extrassistólica.'
      },
      {
        id: 'alt-b',
        text: 'O sopro apical do fenômeno de Gallavardin é sempre diastólico aspirativo e surge apenas na apneia inspiratória.',
        isCorrect: false,
        explanation: 'Incorreta. Gallavardin é puramente sistólico ejetivo.'
      },
      {
        id: 'alt-c',
        text: 'O sopro de Gallavardin apaga totalmente a primeira bulha (B1) e invade a fase protodiastólica.',
        isCorrect: false,
        explanation: 'Incorreta. Gallavardin respeita B1 e termina antes do fechamento valvar A2.'
      },
      {
        id: 'alt-d',
        text: 'O fenômeno de Gallavardin ocorre apenas em pacientes portadores de prótese mecânica mitral.',
        isCorrect: false,
        explanation: 'Incorreta. Ocorre tipicamente em valvas nativas fibrocalcificadas de idosos.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Fenômeno de Gallavardin: A Dissociação Acústica da Estenose Aórtica no Ápice',
      clinicalPearl: 'Fenômeno de Gallavardin = Sopro da Estenose Aórtica auscultado no ápice com timbre musical e agudo! Não confunda com Insuficiência Mitral: Gallavardin tem formato em diamante, B1 normal e NÃO irradia para a axila!',
      detailedExplanation: 'Descrito por Louis Gallavardin em 1925. As frequências acústicas de baixa tonalidade (vibrações da parede aórtica e turbulência) irradiam para a base e pescoço. Já as altas frequências sonoras geradas pela vibração dos folhetos calcificados são conduzidas pelo miocárdio ventricular esquerdo até o ápice.',
      distractorAnalysis: 'Distratores confundem cronologia de sopros ou afirmam que é sopro de prótese mecânica.'
    }
  },
  {
    id: 'dif-q12',
    questionNumber: 12,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Ecocardiografia de Emergência',
    topic: 'Fechamento Prematuro da Valva Mitral na Insuficiência Aórtica Aguda',
    statement: `Em um paciente vítima de trauma torácico fechado com rotura de cúspide aórtica e insuficiência aórtica aguda fulminante, o ecocardiografista registra no Modo-M e Doppler o fechamento prematuro da valva mitral durante a média e telessístole (muito antes do início da sístole ventricular do complexo QRS do ECG).

Qual é o significado clínico e a indicação condutual desse achado ecocardiográfico específico?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Indica elevação catastrófica imediata da pressão diastólica final do VE (PDFVE) superando a pressão atrial esquerda já na diástole; é um sinal de extrema gravidade que exige intervenção cirúrgica emergencial imediata para substituição valvar.',
        isCorrect: true,
        explanation: 'Correta. Quando a PDFVE ultrapassa a pressão do AE antes mesmo de o ventrículo contrair, a valva mitral é forçada a se fechar em plena diástole. Isso protege temporariamente o leito capilar pulmonar de pressões ainda maiores, mas indica colapso iminente do débito cardíaco e choque irreversível se a cirurgia não for imediata.'
      },
      {
        id: 'alt-b',
        text: 'Indica estenose mitral reumática concomitante sem qualquer indicação cirúrgica.',
        isCorrect: false,
        explanation: 'Incorreta. É uma resposta mecânica ao influxo maciço retrógrado aórtico em cavidade ventricular não dilatada.'
      },
      {
        id: 'alt-c',
        text: 'Confirma que a valva aórtica está íntegra e que o problema é puramente pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. O fechamento prematuro é sinal específico de IAo aguda severa.'
      },
      {
        id: 'alt-d',
        text: 'Recomenda tratamento clínico conservador exclusivo com betabloqueadores por 6 meses.',
        isCorrect: false,
        explanation: 'Incorreta. O tratamento é cirurgia cardíaca de emergência de altíssima prioridade.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Fechamento Prematuro da Mitral: O Alerta Vermelho Cirúrgico da IAo Aguda',
      clinicalPearl: 'Ecocardiograma da IAo Aguda: Fechamento Prematuro da Valva Mitral no Modo-M = A pressão no VE superou o átrio esquerdo na diástole! Indicação cirúrgica de emergência absoluta!',
      detailedExplanation: 'Em condições normais, a mitral só fecha com o início da sístole ventricular (vetor elétrico QRS e contração isovolumétrica). Na IAo aguda grave, a torrente de sangue que vaza da aorta na diástole enche o ventrículo rígido tão rápido que a pressão atinge 35-45 mmHg na fase média da diástole, empurrando as cúspides mitrais fechadas contra o fluxo de entrada.',
      distractorAnalysis: 'Distratores sugerem condutas conservadoras ou diagnósticos reumatológicos crônicos.'
    }
  },
  {
    id: 'dif-q13',
    questionNumber: 13,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Hemodinâmica & Ritmo Cardíaco',
    topic: 'Queda do Débito Cardíaco pela Perda do "Kick" Atrial em Ventrículos Rígidos',
    statement: `Um paciente de 76 anos com estenose aórtica grave calcificada e acentuada hipertrofia concêntrica do ventrículo esquerdo (espessura septal de 16 mm) mantinha fração de ejeção preservada e classe funcional II estável. Subitamente, deflagra Fibrilação Atrial com resposta ventricular controlada a 85 bpm. Imediatamente após a perda do ritmo sinusal, o paciente entra em choque hemodinâmico e congestão pulmonar grave.

Por que a perda da sístole atrial (perda do "kick" atrial) na FA causa uma queda tão catastrófica no débito cardíaco de pacientes com hipertrofia concêntrica severa, mesmo sem taquicardia excessiva?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Porque o ventrículo hipertrofiado concêntrico possui complacência diastólica severamente deprimida; em corações normais a contração atrial contribui com 15% a 20% do volume diastólico final, mas em ventrículos espessados e rígidos o "kick" atrial é responsável por até 35% a 40% de todo o enchimento ventricular esquerdo.',
        isCorrect: true,
        explanation: 'Correta. A parede rígida do VE hipertrofiado oferece enorme resistência elástica ao enchimento passivo inicial. Ele depende vitalmente da contração atrial enérgica no final da diástole para "empurrar" o volume final necessário para estirar as fibras miocárdicas (mecanismo de Frank-Starling). Sem sístole atrial, o volume diastólico final desaba e o débito cardíaco entra em colapso.'
      },
      {
        id: 'alt-b',
        text: 'Porque a fibrilação atrial dissolve os sarcômeros de miofilamentos de actina em menos de 10 segundos.',
        isCorrect: false,
        explanation: 'Incorreta. A perda é puramente mecânico-hemodinâmica de pré-carga, não necrose ou proteólise instantânea.'
      },
      {
        id: 'alt-c',
        text: 'Porque as coronárias só recebem sangue durante a sístole atrial.',
        isCorrect: false,
        explanation: 'Incorreta. A perfusão coronariana depende da pressão aórtica na diástole ventricular.'
      },
      {
        id: 'alt-d',
        text: 'Porque a fibrilação atrial bloqueia a abertura das valvas pulmonar e aórtica.',
        isCorrect: false,
        explanation: 'Incorreta. A abertura semilunar continua na ejeção ventricular.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'O Kick Atrial no Ventrículo Rígido: Até 40% do Débito Cardíaco em Risco na FA',
      clinicalPearl: 'Por que paciente com Estenose Aórtica / Hipertrofia colapsa na Fibrilação Atrial? Porque o ventrículo rígido precisa da sístole atrial para encher até 40% do seu volume! Perdeu a onda P = Perdeu o débito!',
      detailedExplanation: 'Na curva de complacência pressão-volume, o VE espessado opera na porção vertical da curva. A entrada passiva do sangue não atinge a pré-carga adequada. O "chute" atrial pressuriza a câmara imediatamente antes da sístole sem expor os capilares pulmonares a pressões elevadas durante toda a diástole. Ao perder esse mecanismo, a descompensação é fulminante.',
      distractorAnalysis: 'Distratores sugerem lise proteica ou mecanismos anatômicos fantasiosos.'
    }
  },
  {
    id: 'dif-q14',
    questionNumber: 14,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Doppler Ecocardiográfico & Hipertensão Pulmonar',
    topic: 'Diferenciação Fina do Sopro de Graham Steell vs. Regurgitação Pulmonar Fisiológica/Idiopática',
    statement: `Ao avaliar o refluxo da valva pulmonar ao ecocardiograma com Doppler contínuo:
• O Sopro de Graham Steell (regurgitação pulmonar secundária à hipertensão arterial pulmonar severa) apresenta um perfil de fluxo com velocidade de pico de regurgitação inicial de 4,2 m/s e curva de desaceleração lenta e sustentada por toda a diástole.
• A regurgitação pulmonar benigna de baixa pressão (idiopática de pressão normal) apresenta velocidade de pico de apenas 1,4 m/s e curva em domo com rápida equalização protodiastólica.

Como essa diferença na velocidade de pico do jato regurgitante é explicada pela equação simplificada de Bernoulli (ΔP = 4v²)?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Na hipertensão pulmonar (Graham Steell), a pressão diastólica na artéria pulmonar atinge 50-70 mmHg, gerando um gradiente pressórico transvalvar diastólico muito alto (ΔP = 4 x 4,2² ≈ 70 mmHg), resultando em jato regurgitante de altíssima velocidade e sopro aspirativo de alta frequência ao estetoscópio.',
        isCorrect: true,
        explanation: 'Correta. Conforme a equação simplificada de Bernoulli modificada (ΔP = 4v²), a velocidade da corrente fluida reflete o gradiente de pressão entre as câmaras. Na HAP severa, a pressão diastólica da artéria pulmonar é enorme em relação ao VD (gradiente de 50-70 mmHg), gerando jato a mais de 4 m/s de alta frequência sonora (sopro de Graham Steell).'
      },
      {
        id: 'alt-b',
        text: 'A equação de Bernoulli só se aplica para a valva aórtica, sendo nula na circulação pulmonar.',
        isCorrect: false,
        explanation: 'Incorreta. O princípio físico de Bernoulli rege qualquer orifício restritivo com gradiente de pressão.'
      },
      {
        id: 'alt-c',
        text: 'A baixa velocidade do refluxo idiopático ocorre porque o ventrículo direito contrai durante a diástole.',
        isCorrect: false,
        explanation: 'Incorreta. O ventrículo relaxa na diástole; a baixa velocidade reflete baixa pressão na artéria pulmonar (8-12 mmHg).'
      },
      {
        id: 'alt-d',
        text: 'A velocidade de 4,2 m/s decorre do refluxo exclusivo da veia cava superior para o pulmão.',
        isCorrect: false,
        explanation: 'Incorreta. O jato de Graham Steell reflui da artéria pulmonar de volta para o ventrículo direito.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Física do Graham Steell: A Equação de Bernoulli Aplicada à Hipertensão Pulmonar',
      clinicalPearl: 'Por que o Sopro de Graham Steell é de alta frequência e aspirativo? Porque a pressão na artéria pulmonar na HAP é tão alta (50-70 mmHg) que o sangue vaza a mais de 4 metros por segundo!',
      detailedExplanation: 'Na insuficiência pulmonar normal/benigna, a pressão na artéria pulmonar na diástole é de 8 a 10 mmHg; a velocidade do jato é baixa (< 1,5 m/s) e inaudível ou de frequência muito baixa. Quando a estenose mitral causa hipertensão pulmonar fixa, a PAD da artéria pulmonar sobe para níveis sistêmicos, produzindo o jato de alta energia sonora.',
      distractorAnalysis: 'Distratores negam a aplicabilidade de Bernoulli na artéria pulmonar.'
    }
  },
  {
    id: 'dif-q15',
    questionNumber: 15,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Farmacologia Cardiovascular & Valvopatias',
    topic: 'Risco dos Vasodilatadores Arteriais na Estenose Mitral Pura sem Disfunção de VE',
    statement: `Um médico prescreve acidentalmente altas doses de um potente vasodilatador venoso e arterial (dinitrato de isossorbida associado a anlodipino) para um paciente com estenose mitral reumática pura isolada e área valvar de 0,8 cm². Horas depois, o paciente é transferido à UTI em colapso circulatório, oligúrico e em choque hipotensivo.

Qual é a explicação fisiopatológica para a intolerância grave aos vasodilatadores na estenose mitral pura?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A venodilatação sequestra o sangue nos leitos venosos periféricos e derruba criticamente o retorno venoso (pré-carga); na estenose mitral, uma pressão atrial esquerda elevada é o único motor que consegue forçar o sangue através do orifício estenosado para encher o VE; secar a pré-carga esvazia a cavidade ventricular esquerda e colapsa o débito cardíaco.',
        isCorrect: true,
        explanation: 'Correta. Na estenose mitral, a pós-carga do VE é normal ou baixa. O obstáculo está a montante (no enchimento). A única coisa que faz o sangue atravessar o orifício de 0,8 cm² é a alta pressão hidrostática a montante no átrio esquerdo. Vasodilatadores venosos reduzem a pré-carga, diminuem o volume atrial esquerdo e eliminam a pressão de perfusão transvalvar, colapsando o débito cardíaco sistêmico.'
      },
      {
        id: 'alt-b',
        text: 'Porque os nitratos estimulam o crescimento tumoral de miofibroblastos na valva aórtica.',
        isCorrect: false,
        explanation: 'Incorreta. Nitratos não causam proliferação celular neoplásica em valvas.'
      },
      {
        id: 'alt-c',
        text: 'Porque o anlodipino antagoniza a monoamina oxidase pulmonar aumentando os níveis de serotonina.',
        isCorrect: false,
        explanation: 'Incorreta. Bloqueadores de canais de cálcio não têm efeito farmacológico inibitório sobre a MAO-A.'
      },
      {
        id: 'alt-d',
        text: 'Porque os vasodilatadores invertem a circulação coronariana para dentro do estômago.',
        isCorrect: false,
        explanation: 'Incorreta. Não existe desvio de fluxo coronariano para o trato digestivo.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Vasodilatadores na Estenose Mitral: O Perigo Mortal de Secar a Pré-Carga Atrial',
      clinicalPearl: 'Alerta Farmacológico: NUNCA use vasodilatadores potentes na Estenose Mitral pura! O ventrículo esquerdo precisa da pré-carga sob pressão para se encher através do orifício estenosado!',
      detailedExplanation: 'Diferente da Insuficiência Aórtica ou Insuficiência Mitral (onde vasodilatadores reduzem a pós-carga e diminuem a fração regurgitante, sendo benéficos), na Estenose Mitral o VE já tem pós-carga normal ou reduzida. Reduzir a pré-carga "seca" o ventrículo e gera choque hipodinâmico grave.',
      distractorAnalysis: 'Distratores sugerem mecanismos biológicos inexistentes de toxicidade valvar.'
    }
  },
  {
    id: 'dif-q16',
    questionNumber: 16,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Farmacologia Molecular & Toxicologia Valvar',
    topic: 'Receptores 5-HT2B e Valvopatias Medicamentosas que Mimetizam o Carcinoide',
    statement: `No passado, medicamentos como os anorexígenos fenfluramina e dexfenfluramina, o antiparkinsoniano pergolida e a cabergolina em altas doses foram associados ao desenvolvimento de valvopatia fibrocalcificante com retração de cúspides idêntica à observada na cardiopatia carcinoide.

Qual é o receptor molecular compartilhado que, quando ativado cronicamente pela serotonina neoplásica ou por esses fármacos agonistas, deflagra essa lesão valvar proliferativa?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Receptor de serotonina 5-HT2B presente nas células intersticiais valvulares (VICs), cuja ativação crônica estimula a via intracelular Gq / fosfolipase C / quinases MAP e induz a diferenciação em miofibroblastos com deposição aberrante de colágeno e glicosaminoglicanos.',
        isCorrect: true,
        explanation: 'Correta. O receptor 5-HT2B é expresso abundantemente nas células intersticiais valvares humanas. A estimulação sustentada desse receptor (seja por excesso de serotonina do carcinoide, seja por afinidade de drogas como fenfluramina e ergotamínicos) ativa a cascata mitogênica mitocondrial, provocando fibrose valvar idêntica.'
      },
      {
        id: 'alt-b',
        text: 'Receptor adrenérgico beta-3 acoplado à proteína Gs inibitória.',
        isCorrect: false,
        explanation: 'Incorreta. O receptor beta-3 está no tecido adiposo e miocárdio ventricular, sem ligação com a fibrose valvar do tipo carcinoide.'
      },
      {
        id: 'alt-c',
        text: 'Receptor de dopamina D2 das células justaglomerulares renais.',
        isCorrect: false,
        explanation: 'Incorreta. Receptores D2 regulam prolactina e vias dopaminérgicas do SNC.'
      },
      {
        id: 'alt-d',
        text: 'Receptor de histamina H2 gástrico.',
        isCorrect: false,
        explanation: 'Incorreta. Receptores H2 controlam a secreção ácida gástrica.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'O Receptor 5-HT2B: O Gatilho Molecular da Fibrose Valvar no Carcinoide e por Drogas',
      clinicalPearl: 'O receptor 5-HT2B é a chave de prova: Ativação crônica de 5-HT2B nas valvas cardíacas = Proliferação de miofibroblastos e retração valvar rígida (tanto na Cardiopatia Carcinoide quanto por drogas como Fenfluramina)!',
      detailedExplanation: 'A descoberta do envolvimento do receptor 5-HT2B levou à retirada mundial de fármacos anorexígenos da classe "Fen-Phen" nos anos 1990 e à recomendação de ecocardiograma periódico em pacientes em uso de cabergolina em doses altas para doença de Parkinson.',
      distractorAnalysis: 'Distratores listam outros receptores farmacológicos não relacionados com a gênese da fibrose valvar.'
    }
  },
  {
    id: 'dif-q17',
    questionNumber: 17,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Pneumologia & Semiologia Cardiovascular',
    topic: 'As Quatro Formas Clínicas de Hemoptise na Estenose Mitral Reumática',
    statement: `A estenose mitral grave é uma das causas cardiovasculares clássicas de hemoptise. A literatura médica categoriza quatro mecanismos clínicos distintos para o sangramento das vias aéreas nessa doença:
1. Apoplexia Pulmonar.
2. Escarro róseo hemoptoico espumoso.
3. Escarro com estrias de sangue recorrente ("bronquite congestiva").
4. Hemoptise com dor pleurítica súbita.

Qual é a correlação anátomo-fisiopatológica correta para a "Apoplexia Pulmonar"?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'Rotura súbita de varizes venosas submucosas brônquicas dilatadas sob altíssima pressão retrógrada (comunicação entre as veias pulmonares e as veias brônquicas do sistema ázigo), provocando hemorragia maciça de sangue vivo.',
        isCorrect: true,
        explanation: 'Correta. Na hipertensão venocapilar crônica severa da estenose mitral, as veias brônquicas submucosas dilatam-se enormemente para desviar o sangue para o sistema ázigo. Um aumento súbito na pressão atrial esquerda (esforço, coito, gestação) rompe essas varizes brônquicas, gerando sangramento vivo volumoso (apoplexia pulmonar).'
      },
      {
        id: 'alt-b',
        text: 'Destruição infecciosa cavitária por Mycobacterium tuberculosis resistente.',
        isCorrect: false,
        explanation: 'Incorreta. A tuberculose é infecciosa, enquanto a apoplexia da estenose mitral é hemodinâmica vascular.'
      },
      {
        id: 'alt-c',
        text: 'Ruptura de aneurisma da artéria aorta torácica descendente diretamente na traqueia.',
        isCorrect: false,
        explanation: 'Incorreta. Isso é uma fístula aortobrônquica traumática/aneurismática, não complicação da estenose mitral.'
      },
      {
        id: 'alt-d',
        text: 'Erosão da artéria pulmonar principal por fungo Aspergillus fumigatus.',
        isCorrect: false,
        explanation: 'Incorreta. Descreve bola fúngica/aspergiloma invasivo.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Apoplexia Pulmonar na Estenose Mitral: A Rotura de Varizes Venosas Brônquicas',
      clinicalPearl: 'Apoplexia Pulmonar = Sangue vermelho vivo em grande quantidade na Estenose Mitral causado pela rotura de VARIZES VENOSAS BRÔNQUICAS sob alta pressão!',
      detailedExplanation: 'As quatro formas de hemoptise na EM são: 1) Apoplexia pulmonar (varizes brônquicas rompidas); 2) Edema pulmonar alveolar (transudação com hemácias - escarro rosado espumoso); 3) Bronquite congestiva crônica (estrias hemoptoicas em idosos); 4) Tromboembolismo pulmonar com infarto (dor pleurítica e escarro hemático por estase nas veias dos membros inferiores ou cavidades direitas).',
      distractorAnalysis: 'Distratores associam a causas infecciosas primárias como BK ou fístulas vasculares aórticas.'
    }
  },
  {
    id: 'dif-q18',
    questionNumber: 18,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Anatomia Coronariana & Infarto Agudo do Miocárdio',
    topic: 'Vulnerabilidade Anatômica do Músculo Papilar Póstero-Medial à Rotura no IAM',
    statement: `No infarto agudo do miocárdio, a rotura isquêmica do músculo papilar póstero-medial da valva mitral ocorre com frequência 6 a 12 vezes maior do que a rotura do músculo papilar ântero-lateral.

Qual é a base anatômica vascular responsável por essa marcada diferença na vulnerabilidade isquêmica entre os dois músculos papilares do ventrículo esquerdo?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'O músculo papilar póstero-medial possui suprimento sanguíneo coronariano único e exclusivo proveniente de um único vaso (a artéria descendente posterior, ramo da coronária direita ou da circunflexa); enquanto o papilar ântero-lateral possui suprimento vascular dual redundante da artéria descendente anterior e da circunflexa.',
        isCorrect: true,
        explanation: 'Correta. O músculo papilar ântero-lateral recebe suprimento arterial duplo (DA + Cx), tolerando melhor a oclusão de um único vaso. Já o papilar póstero-medial depende de um leito único (a artéria descendente posterior). Se a coronária direita oclui no IAM inferior, ele sofre necrose isquêmica transmural isolada com alto risco de transecção/rotura de corpo ou cabeça papilar.'
      },
      {
        id: 'alt-b',
        text: 'O músculo papilar póstero-medial não possui capilares sanguíneos, dependendo da difusão direta de oxigênio do pericárdio.',
        isCorrect: false,
        explanation: 'Incorreta. Todos os músculos papilares são ricamente vascularizados por artérias coronárias profundas.'
      },
      {
        id: 'alt-c',
        text: 'O músculo papilar ântero-lateral é composto exclusivamente por cartilagem hialina avascular.',
        isCorrect: false,
        explanation: 'Incorreta. Músculos papilares são estruturas miocárdicas estriadas contráteis.'
      },
      {
        id: 'alt-d',
        text: 'O músculo póstero-medial contrai na diástole e relaxa na sístole, gerando isquemia por contração paradoxal.',
        isCorrect: false,
        explanation: 'Incorreta. Todos os músculos papilares contraem na sístole para tracionar as cordoalhas e impedir o prolapso das cúspides mitrais.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Vulnerabilidade do Músculo Papilar: Suprimento Único (Póstero-Medial) vs. Suprimento Dual (Ântero-Lateral)',
      clinicalPearl: 'Pergunta Clássica de Prova de Título: O músculo papilar póstero-medial rompe 10 vezes mais no infarto porque tem irrigação de vaso ÚNICO (Artéria Descendente Posterior)! O ântero-lateral tem proteção de vaso DUPLO (DA + Cx)!',
      detailedExplanation: 'A rotura do papilar é uma catástrofe mecânica que ocorre tipicamente entre o 2º e o 7º dia pós-IAM (infarto com ou sem supra de ST de parede inferior). O paciente desenvolve edema agudo de pulmão em questão de minutos devido à regurgitação mitral torrencial com folheto livre (flail leaflet).',
      distractorAnalysis: 'Distratores usam conceitos anatômicos absurdos de ausência de capilarização ou tecido cartilaginoso.'
    }
  },
  {
    id: 'dif-q19',
    questionNumber: 19,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Semiologia Cardiovascular & Fisiologia do Esforço',
    topic: 'Comportamento da Pressão Arterial Sistólica no Teste de Esforço na Estenose Aórtica',
    statement: `Em um paciente com estenose aórtica que se declarava estritamente assintomático na consulta, realiza-se um teste ergométrico sob rigorosa vigilância médica em centro terciário para estratificação funcional. Durante o estágio 2 do protocolo de Bruce, o médico observa uma queda de 15 mmHg na Pressão Arterial Sistólica (PAS) em relação aos níveis de repouso, acompanhada de pré-síncope.

Qual é o significado prognóstico e a conduta imediata para esse achado no teste ergométrico?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A queda ou ausência de ascensão da PAS ao esforço indica exaustão hemodinâmica com débito cardíaco fixo superado pela vasodilatação periférica; desmascara estenose aórtica grave com sintomas ocultos (paciente pseudo-assintomático) e constitui indicação cirúrgica classe I de substituição valvar.',
        isCorrect: true,
        explanation: 'Correta. O teste ergométrico no paciente com estenose aórtica grave aparentemente assintomático serve justamente para identificar aqueles que adaptaram o estilo de vida sedentário para evitar sintomas. Se a PAS cair ou não subir pelo menos 20 mmHg no esforço, o teste é imediatamente positivo para disfunção hemodinâmica grave, indicando cirurgia (Classe I nas diretrizes AHA/SBC/ESC).'
      },
      {
        id: 'alt-b',
        text: 'A queda da PAS é uma resposta vasodilatadora fisiológica saudável, permitindo liberar o paciente para maratonas.',
        isCorrect: false,
        explanation: 'Incorreta. A resposta fisiológica normal ao esforço é a elevação substancial da PAS.'
      },
      {
        id: 'alt-c',
        text: 'Indica apenas ansiedade reativa e deve-se repetir o exame com carga dobrada no mesmo dia.',
        isCorrect: false,
        explanation: 'Incorreta. Conduta perigosa de altíssimo risco de parada cardiorrespiratória.'
      },
      {
        id: 'alt-d',
        text: 'Demonstra que a valva aórtica abriu completamente e o gradiente transaórtico caiu a zero.',
        isCorrect: false,
        explanation: 'Incorreta. A valva continua estenosada e o gradiente atinge valores alarmantes.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Queda da PAS no Teste Ergométrico: O Alerta Cirúrgico na Estenose Aórtica Oculta',
      clinicalPearl: 'No paciente com Estenose Aórtica que diz "não sinto nada", o teste de esforço serve para tirar a dúvida: se a pressão cair ou não subir durante o exercício = O teste é POSITIVO e o paciente tem indicação FORMAL DE CIRURGIA!',
      detailedExplanation: 'Conforme as diretrizes mundiais, a queda da pressão arterial sistólica abaixo da linha de base ou o desenvolvimento de sintomas no teste ergométrico confirma que a valvopatia ultrapassou os mecanismos de compensação, estando associada a uma taxa de morte súbita de mais de 50% em 2 anos se não operada.',
      distractorAnalysis: 'Distratores sugerem que a hipotensão de esforço é benigna ou liberam para exercícios de alto impacto.'
    }
  },
  {
    id: 'dif-q20',
    questionNumber: 20,
    difficulty: 'dificil',
    difficultyLabel: 'Difícil',
    subject: 'Emergências Clínicas & Toxicologia',
    topic: 'Diagnóstico Diferencial: Pelagra por Carcinoide vs. Encefalopatia de Wernicke em Alcoólatras',
    statement: `Um homem de 53 anos com histórico de perda ponderal e diarreia é trazido confuso e desorientado ao pronto-socorro. O médico assistente suspeita de carência vitamínica do complexo B. 

Qual elemento semiológico do exame físico neurológico e dermatológico permite diferenciar com segurança a Encefalopatia de Wernicke (deficiência de Tiamina / Vitamina B1) da Pelagra (deficiência de Niacina / Vitamina B3 secundária ao tumor carcinoide)?`,
    alternatives: [
      {
        id: 'alt-a',
        text: 'A Encefalopatia de Wernicke caracteriza-se classicamente pela tríade neurológica de oftalmoplegia/paresia do VI par (com nistagmo), ataxia de marcha e confusão mental aguda SEM lesões cutâneas fotossensíveis; enquanto a Pelagra apresenta o Colar de Casal fotossensível com dermatite descamativa e diarreia crônica acompanhando a demência (tríade dos 3 Ds).',
        isCorrect: true,
        explanation: 'Correta. Wernicke = Oftalmoplegia (nistagmo, paralisia de olhar conjugado) + Ataxia de marcha + Confusão mental (sem dermatite/diarreia). Pelagra = 3 Ds: Dermatite em áreas fotoexpostas (Colar de Casal) + Diarreia crônica + Demência (sem a oftalmoplegia típica de VI par da carência de B1).'
      },
      {
        id: 'alt-b',
        text: 'A Encefalopatia de Wernicke manifesta-se sempre por cegueira congênita total e calvície universal.',
        isCorrect: false,
        explanation: 'Incorreta. Não cursa com calvície universal ou cegueira congênita.'
      },
      {
        id: 'alt-c',
        text: 'A Pelagra é acompanhada de convulsões tetânicas com sinal de Chvostek em 100% dos pacientes.',
        isCorrect: false,
        explanation: 'Incorreta. Sinal de Chvostek e tetania são causados por hipocalcemia aguda.'
      },
      {
        id: 'alt-d',
        text: 'Ambas as doenças são rigorosamente indistinguíveis clinicamente, pois ambas afetam exclusivamente a valva mitral.',
        isCorrect: false,
        explanation: 'Incorreta. Wernicke e Pelagra possuem manifestações clínicas distintas e nem toda deficiência de B1 afeta a valva mitral.'
      }
    ],
    professorCorrection: {
      correctOptionId: 'alt-a',
      summaryTitle: 'Diferencial Neurológico: Wernicke (B1 / Oftalmoplegia e Ataxia) vs. Pelagra (B3 / Colar de Casal e Diarreia)',
      clinicalPearl: 'Diagnóstico Diferencial Clínico: Encefalopatia de Wernicke (B1) = Tríade Neurológica (Oftalmoplegia + Ataxia + Confusão). Pelagra (B3) = Tríade dos 3 Ds (Dermatite / Colar de Casal + Diarreia + Demência)!',
      detailedExplanation: 'A administração inadvertida de glicose intravenosa sem tiamina em pacientes com deficiência de B1 precipita a encefalopatia de Wernicke aguda. Já a pelagra decorrente do tumor carcinoide responde à suplementação de nicotinamida oral/parenteral, reversão das lesões de pele fotossensíveis e melhora da função cognitiva.',
      distractorAnalysis: 'Distratores utilizam sinais clínicos de hipocalcemia (Chvostek) ou afirmam impossibilidade de distinção.'
    }
  }
];
