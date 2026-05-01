import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import type { Project, ProjectInput } from "@/types/cms";

const COLLECTION = "projects";

export async function getProjects(): Promise<Project[]> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Project);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Project;
}

export async function upsertProject(
  slug: string,
  input: ProjectInput,
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

export async function deleteProject(slug: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).delete();
}
