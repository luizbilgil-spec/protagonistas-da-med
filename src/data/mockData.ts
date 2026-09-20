import { Flashcard, ResidencyQuestion, ClinicalCase, PocketReferenceItem, ForumPost, SmartNotification, UserStats } from '../types';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    front: 'Quais são as raízes, troncos e ramos terminais que compõem o Nervo Mediano no Plexo Braquial?',
    back: 'Origem: Fascículos lateral (C5-C7) e medial (C8-T1). Forma uma letra "Y" na frente da artéria axilar. Ramos motores principais: pronadores, flexores do punho e dedos (exceto flexor ulnar do carpo e metade medial do flexor profundo dos dedos) e músculos tenares.',
    subject: 'Anatomia',
    subspecialty: 'Neuroanatomia',
    clinicalPearl: 'A lesão alta do nervo mediano causa a clássica "mão da bênção papal" na tentativa de fechar o punho.',
    mnemonic: 'L-M: Lateral + Medial = Mediano',
    ankiTags: ['plexo_braquial', 'membro_superior', 'anatomia_cirurgica'],
    sm2: {
      repetitions: 2,
      interval: 4,
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() - 1000 * 3600 * 2).toISOString(), // due today
      totalReviews: 3,
      lapseCount: 0
    }
  },
  {
    id: 'fc-2',
    front: 'Qual o mecanismo de ação dos Inibidores da ECA (ex: Enalapril) e por que provocam tosse seca persistente em ~10-20% dos pacientes?',
    back: 'Inibem a enzima conversora de angiotensina, impedindo a conversão de Angiotensina I em Angiotensina II (potente vasoconstritor e estimulador de aldosterona). A tosse seca ocorre porque a ECA também é responsável pela degradação da Bradicinina e Substância P nos pulmões; sua inibição eleva os níveis pulmonares dessas substâncias pró-inflamatórias e tussígenas.',
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia Cardiovascular',
    clinicalPearl: 'Conduta frente à tosse por IECA: substituir por BRA (ex: Losartana), que bloqueia diretamente os receptores AT1 sem alterar a degradação de bradicinina.',
    mnemonic: 'IECA = Impede Enzima / Causa Bradicinina / Angioedema',
    ankiTags: ['hipertensao', 'ieca', 'cardiologia', 'farmacocinetica'],
    sm2: {
      repetitions: 1,
      interval: 1,
      easeFactor: 2.4,
      nextReviewDate: new Date(Date.now() - 1000 * 3600 * 12).toISOString(), // due today
      totalReviews: 2,
      lapseCount: 0
    }
  },
  {
    id: 'fc-3',
    front: 'Quais vasos compõem o Polígono (Círculo Arterial) de Willis na base do encéfalo?',
    back: '1. Artérias Cerebrais Anteriores (D/E)\n2. Artéria Comunicante Anterior\n3. Artérias Carótidas Internas terminais\n4. Artérias Comunicantes Posteriores (D/E)\n5. Artérias Cerebrais Posteriores (D/E, derivadas da Artéria Basilar).',
    subject: 'Anatomia',
    subspecialty: 'Neuroanatomia',
    clinicalPearl: 'O sítio mais frequente de aneurisma sacular cerebral é a bifurcação da Artéria Comunicante Anterior (~30-35%), seguido da Comunicante Posterior.',
    mnemonic: 'Willis conecta Carótida com Basilar via Comunicantes.',
    ankiTags: ['poligono_willis', 'avc', 'neurocirurgia', 'aneurismas'],
    sm2: {
      repetitions: 3,
      interval: 7,
      easeFactor: 2.6,
      nextReviewDate: new Date(Date.now() + 1000 * 3600 * 48).toISOString(),
      totalReviews: 4,
      lapseCount: 0
    }
  },
  {
    id: 'fc-4',
    front: 'Por que os Aminoglicosídeos (Gentamicina, Amicacina) exigem ajuste rigoroso pela depuração de creatinina (ClCr)? Quais suas duas principais toxicidades?',
    back: 'Mecanismo: Inibem a síntese proteica ligando-se irreversivelmente à subunidade 30S do ribossomo bacteriano (bactericidas). Eliminação: >95% renal por filtração glomerular sem metabolismo prévio. Toxicidades: 1) Nefrotoxicidade (necrose tubular aguda dependente da dose acumulada) e 2) Ototoxicidade vestibular e coclear (frequentemente irreversível).',
    subject: 'Farmacologia',
    subspecialty: 'Antimicrobianos e Quimioterápicos',
    clinicalPearl: 'Uso de dose única diária maximiza o efeito pós-antibiótico (Cmax/MIC) e reduz a captação pelas células do túbulo proximal renal.',
    mnemonic: 'AMINO = Audição e Medula/Rim (Nefro/Oto)',
    ankiTags: ['aminoglicosideos', 'antibioticoterapia', 'nefrotoxicidade'],
    sm2: {
      repetitions: 0,
      interval: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() - 1000 * 3600).toISOString(), // due now
      totalReviews: 1,
      lapseCount: 1
    }
  },
  {
    id: 'fc-5',
    front: 'Quais são as relações anatômicas do Trígono Carotídeo do pescoço e quais estruturas passam em seu interior?',
    back: 'Limites: Ventre superior do Omo-hióideo, ventre posterior do Digástrico e borda anterior do Esternocleidomastóideo. Conteúdo: Bainha carotídea contendo a Artéria Carótida Comum (e bifurcação em interna e externa), Veia Jugular Interna, Nervo Vago (NC X), alça cervical e o Nervo Hipoglosso (NC XII) cruzando superficialmente.',
    subject: 'Anatomia',
    subspecialty: 'Anatomia Cardiovascular',
    clinicalPearl: 'Na abordagem da endarterectomia de carótida, o ramo marginal mandibular do nervo facial e o nervo laríngeo recorrente/superior estão sob risco cirúrgico.',
    mnemonic: 'Bainha Carotídea: V-A-V (Veia lateral, Artéria medial, Vago posterior)',
    ankiTags: ['pescoco', 'trigono_carotideo', 'cirurgia_vascular'],
    sm2: {
      repetitions: 1,
      interval: 2,
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() - 1000 * 3600 * 6).toISOString(),
      totalReviews: 2,
      lapseCount: 0
    }
  },
  {
    id: 'fc-6',
    front: 'Qual a diferença farmacodinâmica entre os bloqueadores beta-1 seletivos (Atenolol, Metoprolol) e os não-seletivos (Propranolol)? Em quem os não-seletivos são formalmente contraindicados?',
    back: 'Beta-1 seletivos (Cardiosseletivos) agem predominantemente nos receptores beta-1 cardíacos (reduzindo inotropismo e cronotropismo). Não-seletivos bloqueiam beta-1 e beta-2 (presentes no músculo liso bronquial e vascular periférico). Contraindicação formal: Asma brônquica e DPOC grave com hiperreatividade brônquica (risco de broncoespasmo fatal mediado por bloqueio beta-2).',
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia Autonômica',
    clinicalPearl: 'Em diabéticos em insulinoterapia, betabloqueadores não-seletivos mascaram os sintomas de alerta simpático da hipoglicemia (taquicardia e tremor), mantendo apenas a sudorese.',
    mnemonic: 'A ao M = B1 seletivos (Atenolol, Bisoprolol, Metoprolol). N ao Z = Não-seletivos (Nadolol, Propranolol, Timolol).',
    ankiTags: ['betabloqueadores', 'farmaco_autonomica', 'asma'],
    sm2: {
      repetitions: 2,
      interval: 5,
      easeFactor: 2.55,
      nextReviewDate: new Date(Date.now() + 1000 * 3600 * 24).toISOString(),
      totalReviews: 3,
      lapseCount: 0
    }
  }
];

export const INITIAL_QUESTIONS: ResidencyQuestion[] = [
  {
    id: 'q-usp-2024-1',
    examBoard: 'USP',
    year: 2024,
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia Cardiovascular',
    difficulty: 'Difícil',
    statement: 'Homem de 62 anos, portador de insuficiência cardíaca com fração de ejeção reduzida (ICFEr 28%), classe funcional NYHA III, em uso otimizado de Enalapril 20mg 12/12h, Carvedilol 25mg 12/12h e Espironolactona 25mg/dia. Encontra-se assintomático em repouso, PA 115x72 mmHg, FC 68 bpm, creatinina 1,1 mg/dL e K+ 4,8 mEq/L. Deseja-se substituir o IECA por Sacubitril/Valsartana visando redução de mortalidade cardiovascular conforme as diretrizes atuais.',
    clinicalContext: 'Qual das seguintes condutas farmacológicas é estritamente obrigatória antes da introdução de Sacubitril/Valsartana?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Suspender a Espironolactona 48 horas antes para prevenir hipercalemia grave.',
        isCorrect: false,
        explanation: 'Incorreta: A espironolactona (antagonista mineralocorticoide) faz parte do quarteto fantástico da ICFEr e deve ser mantida, monitorando eletrólitos.'
      },
      {
        id: 'alt-b',
        text: 'Aguardar um período de washout de no mínimo 36 horas após a última dose de Enalapril.',
        isCorrect: true,
        explanation: 'Correta: O Sacubitril inibe a Neprilisina, que também degrada a bradicinina. A associação simultânea de IECA e inibidor de neprilisina causa acúmulo sinérgico de bradicinina com risco elevadíssimo de angioedema com risco de asfixia. O washout mínimo é de 36h.'
      },
      {
        id: 'alt-c',
        text: 'Iniciar o Sacubitril/Valsartana na mesma tomada que o Enalapril com metade da dose recomendada.',
        isCorrect: false,
        explanation: 'Incorreta: Não se pode sobrepor as tomadas pelo risco dramático de angioedema de via aérea.'
      },
      {
        id: 'alt-d',
        text: 'Realizar teste prévio com Losartana por 7 dias para avaliar tolerabilidade hemodinâmica.',
        isCorrect: false,
        explanation: 'Incorreta: A transição de BRA para Sacubitril/Valsartana não requer 36h de washout, mas a transição de IECA não passa por BRA desnecessariamente.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Roberto Arcuri',
      specialty: 'Cardiologia & Farmacologia Clínica - InCor FMUSP',
      commentary: 'Questão clássica de prova de residência médica com altíssima taxa de erro! O estudo PARADIGM-HF consagrou o Sacubitril/Valsartana (ARNI) na ICFEr. O ponto nevrálgico farmacológico cobrado pela USP é o Washout de 36 horas entre a suspensão do IECA e a primeira dose de ARNI. Se o paciente já usasse BRA (Valsartana, Losartana), não seria necessário o washout de 36 horas, pois BRAs não inibem a degradação enzimática da bradicinina.',
      pearl: 'Washout de 36h: Ocorre EXCLUSIVAMENTE na troca de IECA para ARNI. Troca de BRA para ARNI pode ser imediata.',
      pharmacologicalInsight: 'Mecanismo duplo do ARNI: Bloqueio do receptor AT1 (Valsartana) + Inibição da Neprilisina (Sacubitril), aumentando BNP, ANP e bradicinina (promovendo natriurese, vasodilatação e antifibrose).'
    }
  },
  {
    id: 'q-enare-2024-2',
    examBoard: 'ENARE',
    year: 2024,
    subject: 'Anatomia',
    subspecialty: 'Anatomia Cardiovascular',
    difficulty: 'Médio',
    statement: 'Durante a passagem de cateter venoso central na veia subclávia direita pela punção infraclavicular, um residente introduz a agulha com angulação muito posterior e profunda em direção à cúpula pleural.',
    clinicalContext: 'Qual complicação iatrogênica aguda e qual estrutura anatômica vulnerável localizada imediatamente posterior à veia subclávia estão mais diretamente envolvidas?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Pneumotórax por perfuração da cúpula pleural / ápice pulmonar e punção acidental da artéria subclávia.',
        isCorrect: true,
        explanation: 'Correta: A veia subclávia repousa anteriormente ao músculo escaleno anterior. Imediatamente posterior ao escaleno anterior está a artéria subclávia e o ápice pulmonar/pleura cervical. Angulações posteriores penetram a cúpula pleural (pneumotórax) ou artéria subclávia.'
      },
      {
        id: 'alt-b',
        text: 'Lesão do ducto torácico e quilotórax hipertensivo imediato.',
        isCorrect: false,
        explanation: 'Incorreta: O ducto torácico desemboca no ângulo venoso esquerdo (junção jugulo-subclávia esquerda), não à direita (à direita temos o ducto linfático direito).'
      },
      {
        id: 'alt-c',
        text: 'Secção do nervo vago no interior da bainha carotídea.',
        isCorrect: false,
        explanation: 'Incorreta: A bainha carotídea está no trígono carotídeo cervical, medial e superior ao ponto infraclavicular da subclávia.'
      },
      {
        id: 'alt-d',
        text: 'Perfuração do tronco braquiocefálico venoso com tamponamento cardíaco agudo.',
        isCorrect: false,
        explanation: 'Incorreta: O tronco braquiocefálico venoso é mediastinal mais profundo e o pericárdio não se estende até a região infraclavicular lateral.'
      }
    ],
    professorComment: {
      author: 'Profa. Dra. Mariana Bittencourt',
      specialty: 'Cirurgia do Trauma & Anatomia Topográfica - HC-FMUSP',
      commentary: 'Na punção de subclávia, o ponto de entrada é a transição do terço médio com o terço medial da clavícula, direcionando a ponta da agulha para a fúrcula esternal. A anatomia do opérculo torácico é implacável: de anterior para posterior temos: Clavícula -> Músculo subclávio -> Veia subclávia -> Músculo escaleno anterior (com nervo frênico em sua face anterior) -> Artéria subclávia -> Cúpula pleural.',
      pearl: 'Relação do Escaleno Anterior: A veia subclávia passa ANTERIOR ao escaleno anterior; a artéria subclávia e o plexo braquial passam POSTERIOR ao escaleno anterior.',
      anatomicalCorrelation: 'Em caso de suspeita de pneumotórax pós-punção, radiografia de tórax em expiração forçada ou USG POCUS na beira do leito (ausência de deslizamento pleural) confirma o diagnóstico imediatamente.'
    }
  },
  {
    id: 'q-unifesp-2023-3',
    examBoard: 'UNIFESP',
    year: 2023,
    subject: 'Farmacologia',
    subspecialty: 'Farmacologia do SNC',
    difficulty: 'Médio',
    statement: 'Paciente jovem é admitida no pronto-socorro com quadro de depressão respiratória profunda (FR = 6 irpm), miose puntiforme bilateral ("pupilas em cabeça de alfinete"), cianose perioral e rebaixamento do nível de consciência (Escala de Coma de Glasgow 6). Amigos relatam uso recreativo de substância desconhecida em festa universitária.',
    clinicalContext: 'Qual o diagnóstico farmacológico mais provável, qual o antídoto específico imediato e qual a sua farmacocinética crítica a ser vigiada?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Intoxicação por Benzodiazepínicos; Flumazenil; meia-vida longa que dispensa observação posterior.',
        isCorrect: false,
        explanation: 'Incorreta: Benzodiazepínicos causam depressão respiratória mais branda (a menos que associados a álcool) e as pupilas são geralmente de diâmetro intermediário ou normais, não miose puntiforme.'
      },
      {
        id: 'alt-b',
        text: 'Intoxicação por Opioides; Naloxona; meia-vida curta (30-90 min), podendo haver ressedação com opioides de longa ação.',
        isCorrect: true,
        explanation: 'Correta: A tríade clássica de overdose de opioides é: coma + depressão respiratória + miose. O antagonista competitivo específico é a Naloxona (IV/IM/Intranasal). A meia-vida da naloxona é de cerca de 30 a 90 minutos, enquanto muitos opioides (morfina, metadona, fentanil) duram muito mais, exigindo doses repetidas ou infusão contínua para evitar nova parada respiratória.'
      },
      {
        id: 'alt-c',
        text: 'Síndrome anticolinérgica; Fisostigmina; risco de broncoconstrição e sialorreia.',
        isCorrect: false,
        explanation: 'Incorreta: A síndrome anticolinérgica causa midríase ("cego como uma toupeira"), pele quente e seca, taquicardia e delírio agitado.'
      },
      {
        id: 'alt-d',
        text: 'Intoxicação por Barbitúricos; Bicarbonato de sódio para alcalinização urinária; sem necessidade de via aérea avançada.',
        isCorrect: false,
        explanation: 'Incorreta: Embora barbitúricos deprimam o SNC, a tríade com miose puntiforme responde dramaticamente ao teste terapêutico com naloxona.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Camilo Albuquerque',
      specialty: 'Medicina de Emergência e Toxicologia - EPM/UNIFESP',
      commentary: 'A síndrome opioide é figurinha carimbada em 100% das bancas de residência médica de SP. A armadilha clássica da questão é a farmacocinética da Naloxona: ao reverter o paciente com 0,4 a 2mg de Naloxona IV, o paciente acorda subitamente (muitas vezes em síndrome de abstinência aguda). Porém, se o médico der alta ou relaxar a vigilância, quando a Naloxona decair em 45 minutos, o paciente volta a parar!',
      pearl: 'Tríade do Opioide: Rebaixamento neurológico + Bradipneia + Miose puntiforme. Antídoto: Naloxona.',
      pharmacologicalInsight: 'Naloxona é um antagonista puro dos receptores opioides mu (MOR), kappa (KOR) e delta (DOR), deslocando competitivamente o agonista.'
    }
  },
  {
    id: 'q-sus-sp-2024-4',
    examBoard: 'SUS-SP',
    year: 2024,
    subject: 'Anatomia',
    subspecialty: 'Anatomia do Aparelho Locomotor',
    difficulty: 'Difícil',
    statement: 'Um motociclista de 24 anos sofre fratura diafisária no terço médio do úmero direito após colisão lateral. Ao exame ortopédico no pronto-socorro, constata-se incapacidade completa de realizar a extensão do punho ("mão caída" ou "em gota") e dos dedos na articulação metacarpofalângica, associada a perda sensitiva no dorso da primeira comissura interdigital.',
    clinicalContext: 'Qual estrutura nervosa foi lesada e por qual acidente anatômico do úmero ela transita?',
    alternatives: [
      {
        id: 'alt-a',
        text: 'Nervo Radial, no sulco do nervo radial (goteira de torção) na face posterior da diáfise umeral.',
        isCorrect: true,
        explanation: 'Correta: O nervo radial cursa no sulco do nervo radial na face posterior da diáfise do úmero junto com a artéria braquial profunda. Fraturas diafisárias de úmero frequentemente comprimem ou laceram o nervo radial, gerando paresia dos extensores do punho e dedos ("mão caída").'
      },
      {
        id: 'alt-b',
        text: 'Nervo Ulnar, no sulco retroepicondilar medial.',
        isCorrect: false,
        explanation: 'Incorreta: O nervo ulnar passa atrás do epicôndilo medial e sua lesão causa a "mão em garra" ulnar (afetando 4º e 5º quirodáctilos).'
      },
      {
        id: 'alt-c',
        text: 'Nervo Mediano, que perfura a membrana interóssea do antebraço.',
        isCorrect: false,
        explanation: 'Incorreta: O nervo mediano desce anteromedialmente ao úmero e inerva flexores/pronadores, não os extensores.'
      },
      {
        id: 'alt-d',
        text: 'Nervo Axilar, que contorna o colo cirúrgico do úmero.',
        isCorrect: false,
        explanation: 'Incorreta: O nervo axilar contorna o colo cirúrgico do úmero (junto com a artéria circunflexa posterior do úmero) e inerva o deltoide e redondo menor, sem inervar o antebraço.'
      }
    ],
    professorComment: {
      author: 'Prof. Dr. Vinícius Sampaio',
      specialty: 'Ortopedia e Traumatologia & Anatomia Cirúrgica - IOT HCFMUSP',
      commentary: 'Essa questão é um clássico perpétuo: "Fratura de terço médio de úmero = lesão de nervo radial = mão caída". Guarde a topografia umeral:\n1. Colo cirúrgico do úmero: Nervo Axilar\n2. Diáfise do úmero: Nervo Radial\n3. Epicôndilo medial do úmero: Nervo Ulnar\n4. Fratura supracondiliana na infância: Nervo Interósseo Anterior / Mediano.',
      pearl: 'Mão Caída = Nervo Radial (extensores do punho e dedos denervados).',
      anatomicalCorrelation: 'O nervo radial perfura o septo intermuscular lateral a cerca de 8 a 10 cm acima do epicôndilo lateral, entrando no compartimento anterior do braço.'
    }
  }
];

export const INITIAL_CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-1',
    title: 'Crise Hipertensiva com Dissecção Aguda de Aorta',
    patientProfile: 'Homem, 56 anos, pardo, engenheiro civil, tabagista e hipertenso prévio com adesão irregular ao tratamento.',
    chiefComplaint: 'Dor torácica súbita, excruciante ("em facada" ou "rasgando"), que se irradia para o dorso e interescapular há 45 minutos.',
    setting: 'Pronto-Socorro',
    subjectFocus: 'Misto',
    stages: [
      {
        id: 1,
        title: 'Estágio 1: Avaliação Inicial e Exame Físico',
        description: 'Paciente pálido, sudoreico e extremamente agitado pela dor.',
        patientVitals: {
          pa: '210x120 mmHg (MSD) vs 165x90 mmHg (MSE)',
          fc: '118 bpm',
          fr: '24 irpm',
          satO2: '96% em ar ambiente',
          temp: '36.5 ºC'
        },
        physicalExam: 'Ausculta cardíaca: sopro diastólico aspirativo em foco aórtico (3+/6+). Ausculta pulmonar: murmúrio vesicular presente sem estertores. Pulsos periféricos: pulso radial esquerdo nitidamente diminuído em relação ao direito.',
        labAndImaging: 'ECG: Taquicardia sinusal, sem supra de ST. RX de Tórax rápido: alargamento do mediastino superior (>8cm).',
        options: [
          {
            id: 'c1-opt-1',
            action: 'Iniciar Nitroprussiato de Sódio isolado imediatamente para trazer a PA sistólica abaixo de 120 mmHg.',
            isOptimal: false,
            consequence: 'Erro farmacológico grave! Vasodilatador arterial puro isolado causa taquicardia reflexa e aumento da dP/dt (força de cisalhamento da onda de pulso sobre a parede aórtica), podendo romper a falsa luz da aorta!',
            pharmaNote: 'Nunca use vasodilatador isolado em dissecção aórtica sem prévio bloqueio beta-adrenérgico.'
          },
          {
            id: 'c1-opt-2',
            action: 'Administrar Esmolol ou Labetalol IV primeiro (almejando FC < 60 bpm) e, em seguida, associar Nitroprussiato de Sódio para PA sistólica entre 100-120 mmHg.',
            isOptimal: true,
            consequence: 'Excelente! A prioridade é controlar o dP/dt com betabloqueador de ação rápida e ultracurta (Esmolol) para proteger a camada íntima/média da aorta, seguido de nitroprussiato.',
            pharmaNote: 'Esmolol tem meia-vida de apenas 9 minutos (metabolizado por esterases eritrocitárias), permitindo titulação segura.',
            anatomyNote: 'A assimetria pressórica (>20 mmHg entre membros) indica acometimento da aorta ascendente/arco aórtico próximo à emergência do tronco braquiocefálico ou subclávia esquerda (Stanford A).'
          },
          {
            id: 'c1-opt-3',
            action: 'Prescrever Morfina IV e aguardar Tomografia Computadorizada antes de qualquer medicação anti-hipertensiva.',
            isOptimal: false,
            consequence: 'Atraso inaceitável. O paciente mantém estresse hemodinâmico extremo com alto risco de rotura aórtica e tamponamento cardíaco durante o transporte para a tomografia.',
            pharmaNote: 'O controle pressórico deve ser iniciado imediatamente na sala vermelha.'
          }
        ]
      },
      {
        id: 2,
        title: 'Estágio 2: Definição Diagnóstica e Conduta Cirúrgica',
        description: 'Após estabilização farmacológica da FC (58 bpm) e PA (110x70 mmHg), a Angiotomografia de Aorta confirma dissecção aguda acometendo a aorta ascendente (Tipo A de Stanford) com extensão até a raiz aórtica e derrame pericárdico leve.',
        options: [
          {
            id: 'c2-opt-1',
            action: 'Encaminhar para cirurgia cardiovascular de emergência (troca da aorta ascendente ± reimplante de coronárias).',
            isOptimal: true,
            consequence: 'Conduta perfeita! Dissecção de aorta ascendente (Stanford A) tem mortalidade de 1-2% por hora nas primeiras 48h se tratada clinicamente; cirurgia aberta de emergência é a única abordagem salvadora de vida.',
            anatomyNote: 'A aorta ascendente situa-se intrapericárdica; sua ruptura leva a tamponamento cardíaco agudo por hemopericárdio e colapso diastólico das câmaras direitas.'
          },
          {
            id: 'c2-opt-2',
            action: 'Manter apenas tratamento clínico medicamentoso na UTI com betabloqueadores contínuos.',
            isOptimal: false,
            consequence: 'Mortalidade excede 50% em 48h. Tratamento exclusivamente clínico só é aceito em Stanford B não complicada.',
            pharmaNote: 'Tratamento clínico exclusivo é reservado a dissecções restritas à aorta descendente (Stanford B) sem isquemia de órgãos-alvo.'
          }
        ]
      }
    ],
    summaryConclusion: 'Caso exemplar de Dissecção Aguda de Aorta Tipo A de Stanford. Demonstra a regra de ouro farmacológica: betabloqueador antes de vasodilatador para controlar o dP/dt e a anatomia da raiz aórtica e valva aórtica.',
    keyLearningPoints: [
      'Dissecção de Aorta: Betabloqueador SEMPRE antes de vasodilatador.',
      'Alvo hemodinâmico: FC < 60 bpm e PAS entre 100 e 120 mmHg.',
      'Stanford A = Cirurgia de Emergência (risco de tamponamento e infarto coronariano).',
      'Assimetria de pulsos = dissecção do arco aórtico com comprometimento dos troncos supra-aórticos.'
    ]
  },
  {
    id: 'case-2',
    title: 'Anafilaxia Grave Durante Indução Anestésica',
    patientProfile: 'Mulher, 32 anos, admitida para colecistectomia videolaparoscópica eletiva, sem alergias conhecidas relatadas.',
    chiefComplaint: 'Dois minutos após a infusão de Atracúrio (bloqueador neuromuscular) e Cefazolina, desenvolve broncoespasmo severo e colapso circulatório.',
    setting: 'UTI',
    subjectFocus: 'Farmacologia',
    stages: [
      {
        id: 1,
        title: 'Estágio 1: Reconhecimento do Choque Anafilático',
        description: 'O ventilador mecânico dispara alarme de pico de pressão inspiratória (>45 cmH2O). Ausculta com sibilos difusos e ausência de expansibilidade torácica.',
        patientVitals: {
          pa: '50x20 mmHg',
          fc: '144 bpm',
          fr: 'Ventilação mecânica difícil',
          satO2: '78%',
          temp: '36.5°C'
        },
        options: [
          {
            id: 'c2-opt-1',
            action: 'Administrar Epinefrina (Adrenalina) 0,5 mg IM no vasto lateral da coxa ou 50-100 mcg IV titulada em bólus.',
            isOptimal: true,
            consequence: 'Salvação imediata! A Epinefrina é a única droga modificadora de desfecho em anafilaxia, agindo em receptores alfa-1 (vasoconstrição e aumento da PA), beta-1 (inotropismo) e beta-2 (broncodilatação e estabilização de mastócitos).',
            pharmaNote: 'Corticoides e anti-histamínicos têm início de ação tardio (>2-4 horas) e nunca devem atrasar a Adrenalina.'
          },
          {
            id: 'c2-opt-2',
            action: 'Administrar Hidrocortisona 500mg IV e Prometazina 25mg IM.',
            isOptimal: false,
            consequence: 'Grave equívoco! Enquanto a hidrocortisona demora horas para agir na transcrição gênica celular, a paciente evolui para parada cardiorrespiratória por hipóxia e choque refratário.',
            pharmaNote: 'Adrenalina é a primeira, segunda e terceira droga na anafilaxia aguda.'
          }
        ]
      }
    ],
    summaryConclusion: 'Caso de choque anafilático perioperatório por bloqueador neuromuscular/antibiótico. Reforça o papel prioritário absoluto da Adrenalina.',
    keyLearningPoints: [
      'Adrenalina precoce reverte broncoespasmo e colapso vascular periférico.',
      'Sítio anatômico para injeção IM: Vasto Lateral da Coxa (absorção mais rápida que glúteo ou deltoide).',
      'Bloqueadores neuromusculares são os agentes anestésicos mais implicados em anafilaxia mediada por IgE.'
    ]
  }
];

export const INITIAL_POCKET_GUIDE: PocketReferenceItem[] = [
  {
    id: 'pg-1',
    title: 'Adrenalina (Epinefrina) na PCR e Choque Anafilático',
    category: 'Drogas de Emergência',
    content: 'Agonista adrenérgico alfa e beta potente. Na PCR: vasopressor de escolha. Na Anafilaxia: reverte vasodilatação e broncoconstrição.',
    dosages: 'PCR: 1 mg IV/IO a cada 3-5 minutos (1 ampola 1:1000 pura ou diluída em 9ml AD).\nAnafilaxia: 0,3 a 0,5 mg IM (puro 1:1000) na face anterolateral da coxa a cada 5-15 min conforme resposta.\nChoque Séptico/Cardiogênico: infusão 0,05 a 0,5 mcg/kg/min.',
    contraindications: 'Sem contraindicações absolutas no cenário de PCR e anafilaxia grave.',
    dangerZones: 'Extravasamento periférico causa necrose tecidual isquêmica grave por vasoconstrição alfa-1 extrema.'
  },
  {
    id: 'pg-2',
    title: 'Marcos Anatômicos da Punção Lombar (L3-L4 / L4-L5)',
    category: 'Marcos Anatômicos de Procedimento',
    content: 'Acesso ao espaço subaracnóideo para coleta de líquor ou raquianestesia.',
    landmarks: [
      'Linha de Tuffier (cristas ilíacas ântero-superiores / póstero-superiores) cruza o processo espinhoso de L4 ou espaço L4-L5.',
      'A medula espinhal no adulto termina tipicamente no nível de L1-L2 (cone medular).',
      'A punção entre L3-L4 ou L4-L5 evita trauma medular, encontrando apenas as raízes da cauda equina banhadas pelo LCR.'
    ],
    dangerZones: 'Camadas transpassadas: Pele -> Tecido celular subcutâneo -> Ligamento supraespinal -> Ligamento interespinal -> Ligamento amarelo ("plop" característico) -> Espaço epidural -> Dura-máter e aracnoide.'
  },
  {
    id: 'pg-3',
    title: 'Atropina na Bradicardia Sinusal Sintomática',
    category: 'Drogas de Emergência',
    content: 'Antagonista muscarínico competitivo que bloqueia o tônus vagal no nó sinoatrial e atrioventricular.',
    dosages: 'Bradicardia instável: 1,0 mg IV em bólus rápido a cada 3 a 5 minutos, até a dose máxima acumulada de 3,0 mg.',
    dangerZones: 'Doses menores que 0,5 mg podem causar bradicardia paradoxal por bloqueio pré-sináptico transitório de receptores inibitórios M1 centrais ou estimulação vagal inicial.'
  },
  {
    id: 'pg-4',
    title: 'Marcos da Toracocentese e Drenagem Torácica em Selo d’Água',
    category: 'Marcos Anatômicos de Procedimento',
    content: 'Trígono de segurança para dreno de tórax e descompressão torácica de emergência.',
    landmarks: [
      'Trígono de Segurança: Borda anterior do grande dorsal, borda lateral do peitoral maior e linha mamilar/5º espaço intercostal.',
      'Ponto de inserção da agulha: SEMPRE na BORDA SUPERIOR da costela inferior.',
      'Justificativa anatômica: O feixe vasculonervoso intercostal (Veia, Artéria e Nervo - VAN) corre imediatamente na borda INFERIOR de cada costela.'
    ],
    dangerZones: 'Inserir a agulha na borda inferior da costela pode lacerar a artéria intercostal, causando hemotórax maciço iatrogênico.'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'fp-1',
    title: 'Dúvida anatômica: Nervo Laríngeo Recorrente na Tireoidectomia Total',
    author: 'Dra. Beatriz Mendes',
    authorRole: 'Residente R2',
    date: 'Ontem às 21:15',
    category: 'Anatomia',
    content: 'Colegas, durante cirurgia de tireoide, qual a melhor relação anatômica de referência para localizar o nervo laríngeo recorrente junto à artéria tireóidea inferior e ao tubérculo de Zuckerkandl? Já vi diferentes descrições nos livros.',
    upvotes: 18,
    answers: [
      {
        id: 'ans-1',
        author: 'Prof. Dr. Henrique Fontes',
        authorRole: 'Médico Preceptor - Cirurgia de Cabeça e Pescoço',
        date: 'Ontem às 22:40',
        text: 'Excelente questão! O nervo laríngeo recorrente ascende no sulco traqueoesofágico. À direita, ele é mais oblíquo e tem relação variável cruzando anterior, posterior ou entre os ramos da artéria tireóidea inferior. À esquerda, por ser mais vertical, é mais frequentemente posterior à artéria. O tubérculo de Zuckerkandl serve como uma seta: o nervo passa medial e profundamente a ele em mais de 93% dos casos!',
        isVerifiedExpert: true,
        upvotes: 24
      }
    ]
  },
  {
    id: 'fp-2',
    title: 'Uso de Betabloqueadores na Intoxicação por Cocaína: Mito ou Fato?',
    author: 'Lucas Silveira',
    authorRole: 'Estudante',
    date: 'Há 2 dias',
    category: 'Farmacologia',
    content: 'Aprendemos que o uso de Propranolol ou Betabloqueador não-seletivo em dor torácica pós-cocaína é contraindicado pelo risco de estimulação alfa sem oposição. Isso ainda é cobrado nas provas de residência de 2024?',
    upvotes: 31,
    answers: [
      {
        id: 'ans-2',
        author: 'Dra. Camila Nogueira',
        authorRole: 'Especialista Convidado - Toxicologia Clínica',
        date: 'Há 2 dias',
        text: 'Sim, continua sendo cobrado com muito rigor! A cocaína bloqueia a recaptação de noradrenalina e dopamina. Se você bloqueia apenas os receptores beta-2 (que vasodilatam a coronária), a noradrenalina livre estimulará intensamente os receptores alfa-1 coronarianos sem oposição, provocando vasoespasmo coronariano grave, elevação descontrolada da PA e infarto agudo do miocárdio. A droga de primeira linha são os Benzodiazepínicos (Diazepam/Midazolam), associados a Nitratos.',
        isVerifiedExpert: true,
        upvotes: 42
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: SmartNotification[] = [
  {
    id: 'notif-1',
    title: '🧠 4 Flashcards Pendentes de Revisão (SM-2)',
    message: 'Sua curva de retenção calculou revisões prioritárias hoje para Plexo Braquial e Farmacologia dos IECA.',
    type: 'review_due',
    timestamp: 'Hoje, 08:00',
    isRead: false,
    actionRoute: 'flashcards'
  },
  {
    id: 'notif-2',
    title: '🏥 Dica de Plantão: Ajuste Renal de Antimicrobianos',
    message: 'Lembre-se: em pacientes em terapia intensiva com ClCr < 30 mL/min, aminoglicosídeos e vancomicina exigem monitorização por nível sérico basal.',
    type: 'clinical_pearl',
    timestamp: 'Hoje, 11:30',
    isRead: false,
    actionRoute: 'pocket'
  },
  {
    id: 'notif-3',
    title: '🔥 Sequência de 7 Dias de Estudos Ativa!',
    message: 'Parabéns! Você manteve a meta diária durante toda a última semana. Seu rendimento subiu 14% nas questões de Farmacologia.',
    type: 'streak_alert',
    timestamp: 'Ontem, 20:00',
    isRead: true,
    actionRoute: 'analytics'
  }
];

export const INITIAL_USER_STATS: UserStats = {
  streakDays: 7,
  totalCardsReviewed: 148,
  cardsMastered: 86,
  totalQuestionsAnswered: 74,
  totalQuestionsCorrect: 58,
  simulatedExamsCompleted: 5,
  averageScorePercent: 78.4,
  studyTimeMinutesToday: 45,
  dailyGoalCards: 30,
  dailyGoalQuestions: 15,
  dailyGoalStudyMinutes: 60,
  dailyQuestionsToday: 11,
  dailyGoalType: 'both',
  lastStudyDate: new Date().toISOString()
};
