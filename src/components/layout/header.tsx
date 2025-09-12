'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  timestamp: string
  read: boolean
}

export function Header() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Critical Threat Detected',
      message: 'Malware signature found in evidence file EV-2024-001',
      type: 'error',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Case Update',
      message: 'New evidence added to Case #2024-089',
      type: 'info',
      timestamp: '15 minutes ago',
      read: false
    },
    {
      id: '3',
      title: 'Analysis Complete',
      message: 'Network analysis finished for IP 192.168.1.100',
      type: 'success',
      timestamp: '1 hour ago',
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error': return '🚨'
      case 'warning': return '⚠️'
      case 'success': return '✅'
      case 'info': return 'ℹ️'
      default: return '📄'
    }
  }

  const getCurrentTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <header className="flex items-center justify-between p-4 bg-slate-900/50 border-b border-slate-700/50 backdrop-blur-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search cases, evidence, suspects..."
            className="pl-10 bg-slate-800/80 border-slate-600/50 text-slate-200 placeholder:text-slate-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            🔍
          </div>
        </div>
      </div>

      {/* Center Actions */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-600/50 text-slate-200 hover:bg-slate-800"
        >
          🚨 Emergency Mode
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-slate-400">Current Time</p>
          <p className="text-sm text-slate-200 font-medium">{getCurrentTime()}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* System Status */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400">Online</span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative text-slate-400 hover:text-white">
              🔔
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-slate-800 border-slate-700">
            <DropdownMenuLabel className="text-slate-200">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-4 focus:bg-slate-700">
                <div className="flex space-x-3">
                  <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-slate-200">{notification.title}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{notification.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-center text-slate-400 hover:text-slate-200">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 text-slate-400 hover:text-white">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                👮
              </div>
              <span className="text-sm">Agent Smith</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
            <DropdownMenuLabel className="text-slate-200">
              <div>
                <p className="font-medium">Agent Smith</p>
                <p className="text-xs text-slate-400">Cyber Crime Division</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-slate-300 hover:text-white focus:bg-slate-700">
              👤 Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white focus:bg-slate-700">
              🔐 Security Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white focus:bg-slate-700">
              📋 Case History
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-slate-300 hover:text-white focus:bg-slate-700">
              ❓ Help & Support
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:bg-slate-700">
              🚪 Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}