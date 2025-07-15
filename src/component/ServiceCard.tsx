type Service = {
  id: number
  name: string
  description: string
  price: number
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="border p-4 rounded border-[#0094d9] bg-[#eeeeee] shadow-sm flex flex-col justify-between"> 
      <div>
        <h3 className="text-lg font-semibold text-[#0a2f4a] mb-1 truncate">
          {service.name}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-3">
          {service.description}
        </p>
      </div>
      <p className="text-sm text-blue-900 font-medium">${service.price}</p>
    </div>
  )
}


