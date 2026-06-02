import { getCollection, type CollectionEntry } from 'astro:content';

export interface GraphNode {
  id: string;
  name: string;
  label: string;
  module: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export async function generateConceptGraph(): Promise<GraphData> {
  const lectures = await getCollection('lectures', (entry) => !entry.data.draft);

  // Sort by lecture number
  const sortedLectures = lectures.sort((a, b) =>
    a.data.lectureNumber - b.data.lectureNumber
  );

  const nodes: GraphNode[] = sortedLectures.map((lecture) => ({
    id: lecture.slug,
    name: lecture.data.title,
    label: String(lecture.data.lectureNumber),
    module: lecture.data.module,
  }));

  const links: GraphLink[] = [];
  const nodeIds = new Set(nodes.map((n) => n.id));

  // Create links from prerequisites
  for (const lecture of sortedLectures) {
    const prereqs = lecture.data.prerequisites || [];

    for (const prereqSlug of prereqs) {
      // Only add link if both nodes exist
      if (nodeIds.has(prereqSlug)) {
        links.push({
          source: prereqSlug,
          target: lecture.slug,
        });
      }
    }
  }

  // Also create implicit sequential links within same module
  // if no explicit prerequisite is set
  const lecturesByModule = new Map<string, CollectionEntry<'lectures'>[]>();
  for (const lecture of sortedLectures) {
    const module = lecture.data.module;
    if (!lecturesByModule.has(module)) {
      lecturesByModule.set(module, []);
    }
    lecturesByModule.get(module)!.push(lecture);
  }

  // Add implicit links between consecutive lectures in same module
  for (const [, moduleLectures] of lecturesByModule) {
    for (let i = 1; i < moduleLectures.length; i++) {
      const prev = moduleLectures[i - 1];
      const curr = moduleLectures[i];

      // Only add if no explicit link exists
      const hasExplicitLink = links.some(
        (l) => l.source === prev.slug && l.target === curr.slug
      );

      if (!hasExplicitLink) {
        links.push({
          source: prev.slug,
          target: curr.slug,
        });
      }
    }
  }

  return { nodes, links };
}

export async function getTagGraph(): Promise<GraphData> {
  const lectures = await getCollection('lectures', (entry) => !entry.data.draft);

  // Collect all tags and their associated lectures
  const tagMap = new Map<string, Set<string>>();
  const nodeMap = new Map<string, GraphNode>();

  for (const lecture of lectures) {
    const tags = lecture.data.tags || [];

    // Add lecture as node
    nodeMap.set(lecture.slug, {
      id: lecture.slug,
      name: lecture.data.title,
      label: String(lecture.data.lectureNumber),
      module: lecture.data.module,
    });

    // Map tags to lectures
    for (const tag of tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, new Set());
      }
      tagMap.get(tag)!.add(lecture.slug);
    }
  }

  // Add tags as nodes
  const tagNodes: GraphNode[] = [];
  for (const [tag, lectureIds] of tagMap) {
    const tagId = `tag-${tag}`;
    tagNodes.push({
      id: tagId,
      name: tag,
      label: tag,
      module: 'tag',
    });

    // Create links from tag to lectures
    for (const lectureId of lectureIds) {
      nodeMap.set(tagId, tagNodes[tagNodes.length - 1]);
    }
  }

  const nodes = [...nodeMap.values()];

  // Create links: tag -> lecture
  const links: GraphLink[] = [];
  for (const [tag, lectureIds] of tagMap) {
    const tagId = `tag-${tag}`;
    for (const lectureId of lectureIds) {
      links.push({
        source: tagId,
        target: lectureId,
      });
    }
  }

  return { nodes, links };
}
