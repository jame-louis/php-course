export interface AISettings {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  model: string;
  apiUrl: string;
  enabled: boolean;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'anthropic',
  apiKey: '',
  model: 'claude-sonnet-4-6',
  apiUrl: '',
  enabled: false,
};

const STORAGE_KEY = 'ai-tutor-settings';

export function getAISettings(): AISettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAISettings(settings: Partial<AISettings>): void {
  if (typeof window === 'undefined') return;
  const current = getAISettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearAISettings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function isAIConfigured(): boolean {
  const settings = getAISettings();
  return settings.enabled && settings.apiKey.length > 0;
}

export const PROVIDER_MODELS: Record<string, string[]> = {
  anthropic: [
    'claude-opus-4-7',
    'claude-sonnet-4-6',
    'claude-haiku-4-5-20251001',
  ],
  openai: [
    'gpt-4o',
    'gpt-4o-mini',
    'o3',
    'o4-mini',
  ],
  custom: [],
};

export function getModelDisplayName(model: string): string {
  const names: Record<string, string> = {
    'claude-opus-4-7': 'Claude Opus 4.7',
    'claude-sonnet-4-6': 'Claude Sonnet 4.6',
    'claude-haiku-4-5-20251001': 'Claude Haiku 4.5',
    'gpt-4o': 'GPT-4o',
    'gpt-4o-mini': 'GPT-4o Mini',
    'o3': 'o3',
    'o4-mini': 'o4-mini',
  };
  return names[model] || model;
}
