const STORAGE_KEY = 'course-progress';

interface ProgressData {
  completed: string[];
  timestamps: Record<string, number>;
}

function getData(): ProgressData {
  if (typeof localStorage === 'undefined') {
    return { completed: [], timestamps: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ProgressData;
    }
  } catch {
    // ignore parse errors
  }
  return { completed: [], timestamps: {} };
}

function saveData(data: ProgressData): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isCompleted(slug: string): boolean {
  return getData().completed.includes(slug);
}

export function markComplete(slug: string): void {
  const data = getData();
  if (!data.completed.includes(slug)) {
    data.completed.push(slug);
    data.timestamps[slug] = Date.now();
    saveData(data);
  }
}

export function markIncomplete(slug: string): void {
  const data = getData();
  data.completed = data.completed.filter(s => s !== slug);
  delete data.timestamps[slug];
  saveData(data);
}

export function toggleComplete(slug: string): boolean {
  if (isCompleted(slug)) {
    markIncomplete(slug);
    return false;
  }
  markComplete(slug);
  return true;
}

export function getCompletedCount(): number {
  return getData().completed.length;
}

export function getCompletionPercentage(total: number): number {
  if (total === 0) return 0;
  return Math.round((getCompletedCount() / total) * 100);
}
