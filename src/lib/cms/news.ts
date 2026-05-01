import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import type { News, NewsInput } from "@/types/cms";

const COLLECTION = "news";

export async function getNews(): Promise<News[]> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .orderBy("publishedAt", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as News);
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as News;
}

export async function upsertNews(
  slug: string,
  input: NewsInput,
): Promise<void> {
  const now = new Date().toISOString();
  const ref = adminDb.collection(COLLECTION).doc(slug);
  const existing = await ref.get();
  await ref.set({
    ...input,
    createdAt: existing.exists ? existing.data()!.createdAt : now,
    updatedAt: now,
  });
}

export async function deleteNews(slug: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).delete();
}
