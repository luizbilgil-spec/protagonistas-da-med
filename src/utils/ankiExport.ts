import { Flashcard } from '../types';

/**
 * Generates an Anki-compatible TSV text file content
 * Following Anki's standard import directives:
 * #separator:tab
 * #html:true
 * #tags column:3
 */
export function exportToAnkiFormat(cards: Flashcard[], deckName: string = 'Protagonistas da Med'): string {
  const header = [
    `#separator:tab`,
    `#html:true`,
    `#tags column:3`,
    `#deck:${deckName}`,
    `#notetype:Basic (and reversed card)`,
  ].join('\n');

  const lines = cards.map((card) => {
    // Sanitize and format front and back
    const frontFormatted = card.front.replace(/\t/g, ' ').replace(/\n/g, '<br>');
    const backFormatted = [
      card.back.replace(/\t/g, ' ').replace(/\n/g, '<br>'),
      card.clinicalPearl ? `<hr><div style="font-size:0.9em;color:#0d9488;"><strong>💎 Pérola de Residência:</strong> ${card.clinicalPearl.replace(/\n/g, ' ')}</div>` : '',
      card.mnemonic ? `<div style="font-size:0.85em;color:#6366f1;"><strong>🧠 Mnemônico:</strong> ${card.mnemonic}</div>` : '',
    ].filter(Boolean).join('<br>');

    const tags = [
      card.subject.toLowerCase().replace(/\s+/g, '_'),
      card.subspecialty.toLowerCase().replace(/\s+/g, '_'),
      ...card.ankiTags,
      'protagonistas_da_med'
    ].join(' ');

    return `${frontFormatted}\t${backFormatted}\t${tags}`;
  });

  return `${header}\n${lines.join('\n')}`;
}

/**
 * Triggers a browser download of the generated Anki file
 */
export function downloadAnkiDeck(cards: Flashcard[], fileName: string = 'ProtagonistasDaMed_Deck_Anki.txt'): void {
  const content = exportToAnkiFormat(cards);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Parses user uploaded Anki text/csv export to import into SynapseMed
 */
export function parseAnkiImportText(text: string): Partial<Flashcard>[] {
  const lines = text.split('\n');
  const importedCards: Partial<Flashcard>[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check if tab-separated or semicolon/comma
    let parts = trimmed.split('\t');
    if (parts.length < 2) {
      parts = trimmed.split(';');
    }

    if (parts.length >= 2) {
      const front = parts[0].replace(/<br\s*[\/]?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
      const back = parts[1].replace(/<br\s*[\/]?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
      const tags = parts[2] ? parts[2].split(/\s+/).filter(Boolean) : ['importado_anki'];

      if (front && back) {
        importedCards.push({
          front,
          back,
          subject: tags.some(t => t.includes('farma')) ? 'Farmacologia' : 'Anatomia',
          subspecialty: 'Farmacologia do SNC',
          clinicalPearl: 'Cartão importado via integração Anki.',
          ankiTags: tags,
        });
      }
    }
  }

  return importedCards;
}
