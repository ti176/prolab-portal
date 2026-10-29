export function formatCurrency(value: number): string {
  return (Number(value) || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatBRL(value: number): string {
  return 'R$ ' + (Number(value) || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDateTime(ts: number | string | Date): string {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateShort(ts: number | string | Date): string {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

export function onlyDigits(s: string): string {
  return String(s || '').replace(/\D/g, '');
}

export function maskPhone(v: string): string {
  const d = onlyDigits(v);
  if (!d) return '';
  if (d.length <= 10) {
    return d.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3').trim();
  }
  return d.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3').slice(0, 15).trim();
}

export function maskCEP(v: string): string {
  const d = onlyDigits(v).slice(0, 8);
  if (d.length <= 5) return d;
  return d.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
}

export function normalizeText(s: string): string {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
