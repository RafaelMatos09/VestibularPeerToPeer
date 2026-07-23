'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'
import { sidebarItems } from '@/config/sidebar'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300',
        isOpen ? 'w-64' : 'w-20',
      )}
    >
      <div className="flex items-center justify-between border-b border-sidebar-border p-4">
        {isOpen ? (
          <span className="font-mono text-sm font-semibold uppercase tracking-widest">
            VestAPI
          </span>
        ) : null}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 transition hover:bg-sidebar-accent"
          aria-label={isOpen ? 'Recolher menu' : 'Expandir menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex w-full items-center space-x-3 rounded-md p-3 transition',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive &&
                  'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90',
              )}
            >
              <Icon size={20} />
              {isOpen ? <span>{item.label}</span> : null}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={logout}
          className="flex w-full items-center space-x-3 rounded-md p-3 text-destructive transition hover:bg-sidebar-accent"
        >
          <LogOut size={20} />
          {isOpen ? <span>Sair</span> : null}
        </button>
      </div>
    </div>
  )
}
