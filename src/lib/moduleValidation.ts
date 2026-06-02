import { getCollection } from 'astro:content';
import { moduleNames } from '../config';

const validModules = new Set(moduleNames);

export interface ModuleValidationResult {
  valid: boolean;
  invalidLectures: Array<{ id: string; module: string }>;
  emptyModules: string[];
}

export async function validateModules(): Promise<ModuleValidationResult> {
  const lectures = await getCollection('lectures');
  const invalidLectures: Array<{ id: string; module: string }> = [];

  for (const lecture of lectures) {
    if (!validModules.has(lecture.data.module)) {
      invalidLectures.push({
        id: lecture.id,
        module: lecture.data.module,
      });
    }
  }

  const usedModules = new Set(lectures.map(l => l.data.module));
  const emptyModules = moduleNames.filter(m => !usedModules.has(m));

  return {
    valid: invalidLectures.length === 0,
    invalidLectures,
    emptyModules,
  };
}

export function logModuleWarnings(result: ModuleValidationResult): void {
  if (result.invalidLectures.length > 0) {
    console.warn('\n⚠️  Module validation warnings:\n');

    for (const { id, module } of result.invalidLectures) {
      console.warn(`  Lecture "${id}" uses undefined module: "${module}"`);
      console.warn(`  This lecture will be skipped in module-related features.`);
      console.warn(`  Add to courseModules in src/config.ts to include it.\n`);
    }

    console.warn(`Available modules: ${moduleNames.join(', ')}\n`);
  }

  if (result.emptyModules.length > 0) {
    console.warn(`ℹ️  Modules with no lectures: ${result.emptyModules.join(', ')}\n`);
  }
}

export function isValidModule(module: string): boolean {
  return validModules.has(module);
}
