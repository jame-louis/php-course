import type { AISettings } from './ai-settings';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export interface StreamOptions {
  signal?: AbortSignal;
}

export class AIClient {
  private settings: AISettings;

  constructor(settings: AISettings) {
    this.settings = settings;
  }

  async streamChat(messages: Message[], callbacks: StreamCallbacks, options?: StreamOptions): Promise<void> {
    switch (this.settings.provider) {
      case 'anthropic':
        await this.streamAnthropic(messages, callbacks, options);
        break;
      case 'openai':
        await this.streamOpenAI(messages, callbacks, options);
        break;
      case 'custom':
        await this.streamCustom(messages, callbacks, options);
        break;
      default:
        throw new Error(`Unknown provider: ${this.settings.provider}`);
    }
  }

  private async streamAnthropic(messages: Message[], callbacks: StreamCallbacks, options?: StreamOptions): Promise<void> {
    const url = this.settings.apiUrl || 'https://api.anthropic.com/v1/messages';

    const systemMessage = messages.find(m => m.role === 'system');
    const chatMessages = messages.filter(m => m.role !== 'system');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.settings.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.settings.model,
        max_tokens: 4096,
        stream: true,
        system: systemMessage?.content,
        messages: chatMessages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
      signal: options?.signal,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    await this.handleStream(response, callbacks, 'anthropic');
  }

  private async streamOpenAI(messages: Message[], callbacks: StreamCallbacks, options?: StreamOptions): Promise<void> {
    const url = this.settings.apiUrl || 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.model,
        stream: true,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
      signal: options?.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorText;
      } catch {
        // Use raw error text
      }
      throw new Error(`OpenAI API error: ${errorMessage}`);
    }

    await this.handleStream(response, callbacks, 'openai');
  }

  private async streamCustom(messages: Message[], callbacks: StreamCallbacks, options?: StreamOptions): Promise<void> {
    if (!this.settings.apiUrl) {
      throw new Error('Custom API URL is required');
    }

    // Custom provider - uses OpenAI-compatible format but with custom URL
    const response = await fetch(this.settings.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.model,
        stream: true,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
      signal: options?.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Custom API error: ${errorText}`);
    }

    await this.handleStream(response, callbacks, 'openai');
  }

  private async handleStream(
    response: Response,
    callbacks: StreamCallbacks,
    provider: 'anthropic' | 'openai'
  ): Promise<void> {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';
    let hasError = false;
    let isAborted = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              let content: string | undefined;

              if (provider === 'anthropic') {
                // Handle Anthropic's streaming format - continue on parse errors
                if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                  content = parsed.delta.text;
                }
              } else {
                // OpenAI format - skip chunks that don't have delta content
                content = parsed.choices?.[0]?.delta?.content;
              }

              if (content) {
                callbacks.onChunk(content);
              }
            } catch {
              // Skip malformed chunks and continue streaming
            }
          }
        }
      }
    } catch (error) {
      // Don't treat abort as an error
      if (error instanceof Error && error.name === 'AbortError') {
        isAborted = true;
        return;
      }
      hasError = true;
      callbacks.onError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      reader.releaseLock();
      if (!hasError && !isAborted) {
        callbacks.onComplete();
      }
    }
  }
}
