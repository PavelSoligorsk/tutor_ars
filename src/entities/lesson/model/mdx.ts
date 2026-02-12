import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { z } from 'zod';

import { GRADES } from '@/entities/grade';

import { slugify } from '@/shared/lib';

const contentDirectory = path.join(process.cwd(), 'content');

const sectionSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const lessonMetaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  grade: z.string().optional(),
  order: z.coerce.number().optional(),
  sections: z.array(sectionSchema).optional(),
});

function extractSectionsFromContent(content: string): { id: string; title: string }[] {
  const sections: { id: string; title: string }[] = [];

  const sectionTagRegex = /<(?:Section|LessonSection)\b([^>]*)>/g;
  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = sectionTagRegex.exec(content))) {
    const attrs = tagMatch[1] ?? '';
    const idMatch = /id\s*=\s*["']([^"']+)["']/.exec(attrs);
    const titleMatch = /title\s*=\s*["']([^"']+)["']/.exec(attrs);

    if (titleMatch?.[1]) {
      const title = titleMatch[1];
      const id = idMatch?.[1] ?? slugify(title);
      sections.push({ id, title });
    }
  }

  if (sections.length > 0) {
    return sections;
  }

  // Fallback: extract H2 headings
  const headingRegex = /^##\s+(.+)$/gm;
  let headingMatch: RegExpExecArray | null;
  while ((headingMatch = headingRegex.exec(content))) {
    const rawTitle = headingMatch[1]?.trim() ?? '';
    if (!rawTitle) {
      continue;
    }
    const title = rawTitle.replace(/[*_`[\]~]/g, '').trim();
    const id = slugify(title);
    sections.push({ id, title });
  }

  return sections;
}

export type LessonMeta = z.infer<typeof lessonMetaSchema>;

export interface LessonContent {
  meta: LessonMeta;
  content: string;
  slug: string;
}

export function getLessonSlugs(grade: string): string[] {
  const gradeDir = path.join(contentDirectory, grade);

  if (!fs.existsSync(gradeDir)) {
    return [];
  }

  return fs
    .readdirSync(gradeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

export function getMDXLesson(grade: string, slug: string): LessonContent | null {
  const filePath = path.join(contentDirectory, grade, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const parsed = lessonMetaSchema.safeParse(data);
  const baseMeta = parsed.success ? parsed.data : {};

  const extracted = extractSectionsFromContent(content);
  const sections = baseMeta.sections ?? (extracted.length > 0 ? extracted : undefined);

  const meta: LessonMeta = { ...baseMeta, ...(sections ? { sections } : {}) };

  return {
    meta,
    content,
    slug,
  };
}

export function getAllMDXLessons(): LessonContent[] {
  const gradeSlugs = [...new Set(GRADES.map((g) => g.slug))];
  const lessons: LessonContent[] = [];

  for (const grade of gradeSlugs) {
    const slugs = getLessonSlugs(grade);

    for (const slug of slugs) {
      const lesson = getMDXLesson(grade, slug);
      if (lesson) {
        lessons.push(lesson);
      }
    }
  }

  return lessons.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0));
}

export function getMDXLessonsByGrade(grade: string): LessonContent[] {
  const slugs = getLessonSlugs(grade);
  const lessons: LessonContent[] = [];

  for (const slug of slugs) {
    const lesson = getMDXLesson(grade, slug);
    if (lesson) {
      lessons.push(lesson);
    }
  }

  return lessons.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0));
}
