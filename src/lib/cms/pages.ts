import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import type {
  AboutPage,
  AboutPageInput,
  HomePage,
  HomePageInput,
  ServicesPage,
  ServicesPageInput,
} from "@/types/cms";

const PAGES = "pages";

export async function getAboutPage(): Promise<AboutPage | null> {
  const doc = await adminDb.collection(PAGES).doc("about").get();
  if (!doc.exists) return null;
  return doc.data() as AboutPage;
}

export async function upsertAboutPage(input: AboutPageInput): Promise<void> {
  await adminDb
    .collection(PAGES)
    .doc("about")
    .set({ ...input, updatedAt: new Date().toISOString() });
}

export async function getHomePage(): Promise<HomePage | null> {
  const doc = await adminDb.collection(PAGES).doc("home").get();
  if (!doc.exists) return null;
  return doc.data() as HomePage;
}

export async function upsertHomePage(input: HomePageInput): Promise<void> {
  await adminDb
    .collection(PAGES)
    .doc("home")
    .set({ ...input, updatedAt: new Date().toISOString() });
}

export async function getServicesPage(): Promise<ServicesPage | null> {
  const doc = await adminDb.collection(PAGES).doc("services").get();
  if (!doc.exists) return null;
  return doc.data() as ServicesPage;
}

export async function upsertServicesPage(
  input: ServicesPageInput,
): Promise<void> {
  await adminDb
    .collection(PAGES)
    .doc("services")
    .set({ ...input, updatedAt: new Date().toISOString() });
}
