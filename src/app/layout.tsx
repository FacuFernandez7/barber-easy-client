import './globals.css'
import { Urbanist } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { TopbarActionProvider } from '@/contexts/TopbarActionContext'

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
        <TopbarActionProvider>
          <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Topbar />
              <main className="flex-1 p-8 bg-[#f7f8fa] overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </TopbarActionProvider>
      </body>
    </html>
  )
}