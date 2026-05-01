import { ContactSection } from "@/components/ContactSection";
import { ServicesPageContent } from "@/components/ServicesPageContent";
import { getServicesPage } from "@/lib/cms/pages";
import { SERVICES_FALLBACK } from "@/lib/cms/services-fallback";

export const revalidate = 60;

export default async function ServicesPage() {
  const fromCms = await getServicesPage();
  const data = fromCms ?? SERVICES_FALLBACK;

  return (
    <div className="flex flex-col w-full">
      <ServicesPageContent data={data} />
      <ContactSection />
    </div>
  );
}
