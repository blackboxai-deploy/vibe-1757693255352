'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface DashboardStats {
  activeCases: number
  evidenceFiles: number
  threatsDetected: number
  reportsGenerated: number
}

interface RecentActivity {
  id: string
  type: 'case' | 'evidence' | 'threat' | 'report'
  title: string
  timestamp: string
  status: 'active' | 'completed' | 'pending' | 'critical'
}

interface ThreatAlert {
  id: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  timestamp: string
}

export default function Dashboard() {
  const [stats] = useState<DashboardStats>({
    activeCases: 12,
    evidenceFiles: 847,
    threatsDetected: 23,
    reportsGenerated: 156
  })

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'case',
      title: 'Cyberbullying Investigation - Case #2024-001',
      timestamp: '2 minutes ago',
      status: 'active'
    },
    {
      id: '2',
      type: 'threat',
      title: 'Suspicious network activity detected',
      timestamp: '15 minutes ago',
      status: 'critical'
    },
    {
      id: '3',
      type: 'evidence',
      title: 'Digital evidence uploaded for Case #2023-089',
      timestamp: '1 hour ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'report',
      title: 'Quarterly investigation report generated',
      timestamp: '3 hours ago',
      status: 'completed'
    }
  ])

  const [threatAlerts] = useState<ThreatAlert[]>([
    {
      id: '1',
      severity: 'high',
      title: 'Malware signature detected',
      description: 'Suspicious file activity in evidence submission',
      timestamp: '5 minutes ago'
    },
    {
      id: '2',
      severity: 'medium',
      title: 'Unusual network traffic pattern',
      description: 'Multiple failed authentication attempts detected',
      timestamp: '23 minutes ago'
    },
    {
      id: '3',
      severity: 'low',
      title: 'Storage capacity warning',
      description: 'Evidence storage is 85% full',
      timestamp: '1 hour ago'
    }
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 p-8 backdrop-blur-sm border border-slate-600/50">
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84ee0ccf-2765-4a69-be6f-a6acf6e81894.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            CyberTracker Pro
          </h1>
          <p className="text-xl text-slate-200 mb-6">
            Advanced Cyber Crime Investigation Platform
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start New Investigation
            </Button>
            <Button variant="outline" size="lg" className="border-slate-400 text-slate-200">
              View Active Cases
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Cases</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeCases}</div>
            <p className="text-xs text-slate-400">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Evidence Files</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.evidenceFiles}</div>
            <p className="text-xs text-slate-400">
              +127 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Threats Detected</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.threatsDetected}</div>
            <p className="text-xs text-slate-400">
              +5 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Reports Generated</CardTitle>
            <div className="h-4 w-4 rounded-full bg-purple-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.reportsGenerated}</div>
            <p className="text-xs text-slate-400">
              +12 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="bg-slate-800/80 border border-slate-600/50">
          <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700">
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="threats" className="data-[state=active]:bg-slate-700">
            Threat Alerts
          </TabsTrigger>
          <TabsTrigger value="tools" className="data-[state=active]:bg-slate-700">
            Quick Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-700/50">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`}></div>
                  <div className="flex-1">
                    <p className="text-slate-200 font-medium">{activity.title}</p>
                    <p className="text-slate-400 text-sm">{activity.timestamp}</p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(activity.status)} text-white border-none`}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Threat Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {threatAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg bg-slate-700/50 border-l-4" style={{borderLeftColor: getSeverityColor(alert.severity).replace('bg-', '#')}}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-slate-200 font-medium">{alert.title}</h4>
                    <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{alert.description}</p>
                  <p className="text-slate-400 text-xs">{alert.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-slate-200">Network Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Analyze IP addresses, domains, and network traffic patterns</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Launch Tool
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-slate-200">Social Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Investigate social media profiles and connections</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Launch Tool
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-slate-200">Malware Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Scan and analyze suspicious files for threats</p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Launch Tool
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-slate-200">Evidence Vault</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Secure storage and management of digital evidence</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Access Vault
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-slate-200">Case Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Organize and track investigation cases</p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Manage Cases
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-slate-200">Report Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Generate comprehensive investigation reports</p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Create Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}