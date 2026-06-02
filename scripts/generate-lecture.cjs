#!/usr/bin/env node
/**
 * Generate lecture content and self-checks from _source/lecturexx.md files
 * Usage: node scripts/generate-lecture.js [options] [lecture-number]
 */

const fs = require('fs');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
const isAll = args.includes('--all');
const isDryRun = args.includes('--dry-run');
const isForce = args.includes('--force');
const noSelfChecks = args.includes('--no-selfchecks');
const lectureNum = args.find(arg => /^\d+$/.test(arg));

// Paths
const SOURCE_DIR = path.join(process.cwd(), '_source');
const LECTURES_DIR = path.join(process.cwd(), 'src/content/lectures');
const SELFCHECKS_DIR = path.join(process.cwd(), 'src/content/selfchecks');

// Module assignment rules
const MODULE_RULES = [
  { range: [1, 8], module: '基础入门' },
  { range: [9, 15], module: '核心概念' },
];

// Ensure directories exist
function ensureDirs() {
  if (!fs.existsSync(LECTURES_DIR)) {
    fs.mkdirSync(LECTURES_DIR, { recursive: true });
  }
  if (!fs.existsSync(SELFCHECKS_DIR)) {
    fs.mkdirSync(SELFCHECKS_DIR, { recursive: true });
  }
}

// Extract lecture number from filename
function getLectureNumber(filename) {
  const match = filename.match(/lecture(\d+)\.md/i);
  return match ? parseInt(match[1], 10) : null;
}

// Determine module based on lecture number
function getModule(lectureNum) {
  for (const rule of MODULE_RULES) {
    if (lectureNum >= rule.range[0] && lectureNum <= rule.range[1]) {
      return rule.module;
    }
  }
  return '基础入门';
}

// Determine difficulty based on lecture number
function getDifficulty(lectureNum) {
  if (lectureNum <= 3) return 'beginner';
  if (lectureNum <= 8) return 'intermediate';
  return 'advanced';
}

// Analyze content and extract metadata
function analyzeContent(content, lectureNum) {
  // Extract title from first H1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `第${lectureNum}讲`;

  // Count complexity indicators
  const codeBlocks = (content.match(/```/g) || []).length / 2;
  const tables = (content.match(/\|.*\|/g) || []).length;
  const images = (content.match(/!\[\[/g) || []).length;

  // Generate description from first paragraph (non-heading, non-empty)
  const lines = content.split('\n');
  let description = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!')) {
      description = trimmed.replace(/\[\[.*?\]\]/g, '').replace(/!\[.*?\]\(.*?\)/g, '').trim();
      if (description.length > 10) break;
    }
  }

  // Fallback description
  if (!description || description.length < 10) {
    description = `本讲介绍${title.replace(/PHP|开发|基础|概念/g, '').trim() || '相关'}的核心知识与实战技巧。`;
  }

  // Truncate description to ~80 chars
  if (description.length > 80) {
    description = description.substring(0, 77) + '...';
  }

  // Extract tags from content keywords
  const tags = [];
  if (content.includes('函数')) tags.push('函数');
  if (content.includes('数组')) tags.push('数组');
  if (content.includes('面向对象')) tags.push('面向对象');
  if (content.includes('数据库')) tags.push('数据库');
  if (content.includes('表单')) tags.push('表单');
  if (content.includes('会话')) tags.push('会话');
  if (content.includes('文件')) tags.push('文件操作');
  if (tags.length === 0) tags.push('基础');

  // Check for slides/assignments indicators
  const hasSlides = images > 2 || content.includes('课件') || content.includes('slide');
  const hasAssignment = content.includes('作业') || content.includes('练习') || content.includes('实验');

  // Determine prerequisites based on lecture number
  const prerequisites = [];
  if (lectureNum > 1) prerequisites.push(`lecture${String(lectureNum - 1).padStart(2, '0')}`);

  return {
    title,
    description,
    difficulty: getDifficulty(lectureNum),
    module: getModule(lectureNum),
    tags,
    hasSlides,
    hasAssignment,
    prerequisites,
    codeBlocks,
    tables,
    images,
  };
}

// Clean content for output (fix image references, etc)
function cleanContent(content) {
  // Convert [[...]] image references to standard markdown
  let cleaned = content.replace(/!\[\[([^\]]+)\]\]/g, '![$1](/assets/$1)');

  // Fix PHP code block markers without language
  cleaned = cleaned.replace(/```\s*$/gm, '```php');

  return cleaned;
}

// Generate lecture markdown with frontmatter
function generateLecture(lectureNum, sourceContent, metadata) {
  const slug = `lecture${String(lectureNum).padStart(2, '0')}`;

  const frontmatter = `---
title: ${metadata.title}
lectureNumber: ${lectureNum}
module: '${metadata.module}'
description: '${metadata.description}'
duration: '90分钟'
difficulty: '${metadata.difficulty}'
prerequisites: [${metadata.prerequisites.map(p => `'${p}'`).join(', ')}]
tags: [${metadata.tags.map(t => `'${t}'`).join(', ')}]
hasSlides: ${metadata.hasSlides}
hasAssignment: ${metadata.hasAssignment}
draft: false
---

`;

  return frontmatter + cleanContent(sourceContent);
}

// Generate self-check questions from content
function generateSelfChecks(lectureNum, content, metadata) {
  const selfChecks = [];
  const lines = content.split('\n');

  // Extract sections from headers
  const sections = [];
  let currentSection = null;

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      currentSection = { title: h2Match[1], level: 2, content: [] };
      sections.push(currentSection);
    } else if (h3Match && currentSection) {
      currentSection = { title: h3Match[1], level: 3, content: [] };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.content.push(line);
    }
  }

  // Generate questions from sections
  const questionTypes = [
    { pattern: /什么是|介绍|概述/i, type: 'concept' },
    { pattern: /语法|格式|写法/i, type: 'syntax' },
    { pattern: /函数|方法/i, type: 'function' },
    { pattern: /区别|不同|比较/i, type: 'comparison' },
  ];

  let qIndex = 1;
  for (const section of sections.slice(0, 5)) {
    const title = section.title.replace(/[#*`]/g, '').trim();
    if (!title || title.length < 3) continue;

    // Skip certain sections
    if (title.includes('目标') || title.includes('总结') || title.includes('概述') && title.length < 5) continue;

    // Determine question type
    let qType = 'concept';
    for (const qt of questionTypes) {
      if (qt.pattern.test(title)) {
        qType = qt.type;
        break;
      }
    }

    // Generate question based on type
    let question, answer, explanation;

    switch (qType) {
      case 'syntax':
        question = `${title}的基本语法是什么？`;
        answer = '参考相关文档中的语法格式说明。';
        break;
      case 'function':
        question = `如何使用${title.replace(/函数|方法/g, '')}？`;
        answer = '参考相关函数的定义和参数说明。';
        break;
      case 'comparison':
        question = `${title}的主要区别是什么？`;
        answer = '参考对比表格中的说明。';
        break;
      default:
        question = `什么是${title}？`;
        answer = `${title}是本讲介绍的重要概念，请参考详细说明。`;
    }

    // Try to extract better answer from section content
    const sectionText = section.content.join(' ').trim();
    const codeMatch = sectionText.match(/```php\n([\s\S]*?)```/);
    const listMatch = sectionText.match(/[-*]\s+(.+)/);

    if (codeMatch && qType === 'syntax') {
      answer = `示例代码：\n\`\`\`php\n${codeMatch[1].trim().split('\n')[0]}\n\`\`\``;
    } else if (listMatch && answer.length < 50) {
      answer = listMatch[1].trim().substring(0, 100);
    }

    explanation = `本题考察对"${title}"的理解。${metadata.description}`;

    selfChecks.push({
      slug: `lecture${String(lectureNum).padStart(2, '0')}-q${qIndex}`,
      question,
      answer,
      explanation,
      module: metadata.module,
      tags: [...metadata.tags, qType],
      relatedLectures: [`lecture${String(lectureNum).padStart(2, '0')}`],
    });

    qIndex++;
    if (qIndex > 5) break;
  }

  // If no sections found, generate generic questions
  if (selfChecks.length === 0) {
    selfChecks.push({
      slug: `lecture${String(lectureNum).padStart(2, '0')}-q1`,
      question: `${metadata.title}的核心概念是什么？`,
      answer: '请参考本讲内容中的主要知识点。',
      explanation: `本题考察对${metadata.title}整体内容的理解。`,
      module: metadata.module,
      tags: metadata.tags,
      relatedLectures: [`lecture${String(lectureNum).padStart(2, '0')}`],
    });
  }

  return selfChecks;
}

// Format self-check as markdown
function formatSelfCheck(sc) {
  return `---
question: '${sc.question.replace(/'/g, "\\'")}'
answer: '${sc.answer.replace(/'/g, "\\'").substring(0, 200)}'
explanation: '${sc.explanation.replace(/'/g, "\\'")}'
module: '${sc.module}'
tags: [${sc.tags.map(t => `'${t}'`).join(', ')}]
relatedLectures: [${sc.relatedLectures.map(r => `'${r}'`).join(', ')}]
draft: false
---
`;
}

// Main execution
async function main() {
  console.log('📚 Lecture Content Generator\n');

  // Check source directory
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Get source files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /^lecture\d+\.md$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error('❌ No lecture files found in _source/');
    process.exit(1);
  }

  console.log(`Found ${files.length} source files\n`);

  // Filter by lecture number if specified
  let targetFiles = files;
  if (lectureNum && !isAll) {
    const targetFile = files.find(f => getLectureNumber(f) === parseInt(lectureNum, 10));
    if (!targetFile) {
      console.error(`❌ Lecture ${lectureNum} not found in _source/`);
      process.exit(1);
    }
    targetFiles = [targetFile];
  }

  // Analyze all target files
  const analyses = [];
  for (const file of targetFiles) {
    const num = getLectureNumber(file);
    const content = fs.readFileSync(path.join(SOURCE_DIR, file), 'utf-8');
    const metadata = analyzeContent(content, num);

    const lectureExists = fs.existsSync(path.join(LECTURES_DIR, `lecture${String(num).padStart(2, '0')}.md`));

    analyses.push({
      file,
      num,
      content,
      metadata,
      exists: lectureExists,
    });
  }

  // Display table
  console.log('┌─────────┬─────────────────────────────┬──────────────┬────────────┬─────────┐');
  console.log('│ Lecture │ Title                       │ Module       │ Difficulty │ Status  │');
  console.log('├─────────┼─────────────────────────────┼──────────────┼────────────┼─────────┤');
  for (const a of analyses) {
    const title = a.metadata.title.padEnd(27).substring(0, 27);
    const module = a.metadata.module.padEnd(12).substring(0, 12);
    const diff = a.metadata.difficulty.padEnd(10).substring(0, 10);
    const status = a.exists ? (isForce ? 'OVERWRITE' : 'SKIP') : 'CREATE';
    console.log(`│ ${String(a.num).padStart(2).padEnd(7)} │ ${title} │ ${module} │ ${diff} │ ${status.padEnd(7)} │`);
  }
  console.log('└─────────┴─────────────────────────────┴──────────────┴────────────┴─────────┘');

  if (isDryRun) {
    console.log('\n📝 Dry run - no files will be written\n');
    for (const a of analyses) {
      console.log(`Lecture ${a.num}:`);
      console.log(`  Title: ${a.metadata.title}`);
      console.log(`  Description: ${a.metadata.description}`);
      console.log(`  Tags: ${a.metadata.tags.join(', ')}`);
      console.log(`  Has slides: ${a.metadata.hasSlides}, Has assignment: ${a.metadata.hasAssignment}`);
      console.log();
    }
    return;
  }

  // Confirm before proceeding (only for --all)
  if (isAll) {
    console.log('\n⚠️  Review the above table. Edit metadata if needed before proceeding.');
    console.log('   (In non-interactive mode, proceeding with suggested values)\n');
  }

  // Generate files
  ensureDirs();

  let createdLectures = 0;
  let createdSelfChecks = 0;
  let skipped = 0;

  for (const a of analyses) {
    const lectureSlug = `lecture${String(a.num).padStart(2, '0')}`;
    const lecturePath = path.join(LECTURES_DIR, `${lectureSlug}.md`);

    // Check if exists
    if (a.exists && !isForce) {
      console.log(`⏭️  Skipping ${lectureSlug} (exists, use --force to overwrite)`);
      skipped++;
      continue;
    }

    // Generate lecture
    const lectureContent = generateLecture(a.num, a.content, a.metadata);
    fs.writeFileSync(lecturePath, lectureContent);
    console.log(`✅ Created ${lecturePath}`);
    createdLectures++;

    // Generate self-checks
    if (!noSelfChecks) {
      const selfChecks = generateSelfChecks(a.num, a.content, a.metadata);
      for (const sc of selfChecks) {
        const scPath = path.join(SELFCHECKS_DIR, `${sc.slug}.md`);
        if (!fs.existsSync(scPath) || isForce) {
          fs.writeFileSync(scPath, formatSelfCheck(sc));
          console.log(`   📋 ${sc.slug}`);
          createdSelfChecks++;
        }
      }
    }
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Lectures: ${createdLectures} created, ${skipped} skipped`);
  console.log(`   Self-checks: ${createdSelfChecks} created`);

  if (createdSelfChecks > 0) {
    console.log('\n⚠️  Note: Self-check questions are auto-generated and flagged for review.');
    console.log('   Please review and refine them in src/content/selfchecks/');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
