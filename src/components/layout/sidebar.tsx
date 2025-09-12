'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NavigationItem {
  title: string
  href: string
  icon: string
  badge?: number
  description: string
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: '🏠',
    description: 'Overview and quick access'
  },
  {
    title: 'Active Cases',
    href: '/cases',
    icon: '📁',
    badge: 12,
    description: 'Manage investigations'
  },
  {
    title: 'Evidence Vault',
    href: '/evidence',
    icon: '🔒',
    badge: 847,
    description: 'Secure evidence storage'
  },
  {
    title: 'Network Analysis',
    href: '/network-analysis',
    icon: '🌐',
    description: 'IP and domain investigation'
  },
  {
    title: 'Social Intelligence',
    href: '/social-intel',
    icon: '👥',
    description: 'Social media investigation'
  },
  {
    title: 'Malware Analysis',
    href: '/malware-analysis',
    icon: '🦠',
    badge: 23,
    description: 'Threat detection and analysis'
  },
  {
    title: 'Forensic Tools',
    href: '/forensics',
    icon: '🔍',
    description: 'Digital forensics utilities'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: '📊',
    description: 'Generate and export reports'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: '⚙️',
    description: 'Application configuration'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      'relative flex flex-col bg-slate-900/90 backdrop-blur-sm border-r border-slate-700/50',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">CyberTracker</h2>
              <p className="text-xs text-slate-400">Investigation Platform</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isCollapsed ? '→' : '←'}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group',
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              
              {!isCollapsed && (
                <>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-slate-700 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Status Indicator */}
      <div className="p-4 border-t border-slate-700/50">
        {!isCollapsed && (
          <div className="bg-slate-800/80 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-200">System Status</span>
            </div>
            <p className="text-xs text-slate-400">All systems operational</p>
            <p className="text-xs text-slate-500 mt-1">Local storage: 847 GB used</p>
          </div>
        )}
        
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Version Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-500">CyberTracker Pro v2.1.0</p>
          <p className="text-xs text-slate-600">Build 2024.01.15</p>
        </div>
      )}
    </div>
  )
}