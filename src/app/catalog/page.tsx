import ServiceCard from "@/component/ServiceCard";
import { getServicesCatalog } from "@/services/catalog"

export default async function ServicePage() {
  const catalog = await getServicesCatalog();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catálogo de Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {catalog.map((s: any) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  )
}