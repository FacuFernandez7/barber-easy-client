import Link from 'next/link'
import './globals.css'
import { Urbanist } from 'next/font/google'
import { Home, User, Scissors, Calendar } from "lucide-react"

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '600'],
})

export const metadata = {
  title: 'BarberEasy',
  description: 'Sistema de gestión para barbería',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <div className="flex h-screen">
        <aside className="w-64 bg-[#0094d9] text-white p-6">
          <h1 className="text-2xl font-semibold mb-10">BarberEasy</h1>
          <nav className="flex flex-col gap-6">
            <Link href="/" className="flex text-white text-xl no-underline hover:text-gray-200 pl-2">
            <Home className="w-5 h-5 mr-3 relative top-[4px]" />
              Inicio
            </Link>
            <Link href="/profile" className="flex text-white text-xl no-underline hover:text-gray-200 pl-2">
              <User className="w-5 h-5 mr-3 relative top-[4px]" />  
              Perfil
            </Link>
            <Link href="/catalog" className="flex text-white text-xl no-underline hover:text-gray-200 pl-2">
              <Scissors className="w-5 h-5 mr-3 relative top-[4px]" />
              Servicios
            </Link>
            <Link href="/turn" className="flex text-white text-xl no-underline hover:text-gray-200 pl-2">
              <Calendar className="w-5 h-5 mr-3 relative top-[4px]" />
              Turnos
            </Link>
          </nav>
        </aside>

          {/* Contenido principal */}
          <main className="flex-1 p-8 bg-white overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}