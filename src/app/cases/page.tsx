'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

interface CaseFile {
  id: string
  title: string
  description: string
  status: 'open' | 'active' | 'pending' | 'closed' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'critical'
  category: 'cyberbullying' | 'fraud' | 'hacking' | 'ransomware' | 'terrorism' | 'other'
  assignedAgent: string
  createdDate: string
  lastUpdated: string
  dueDate?: string
  progress: number
  evidenceCount: number
  suspectCount: number
  activities: Activity[]
}

interface Activity {
  id: string
  type: 'evidence' | 'interview' | 'analysis' | 'report' | 'update'
  description: string
  timestamp: string
  user: string
}

export default function CaseManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  
  const [cases] = useState<CaseFile[]>([
    {
      id: 'CASE-2024-001',
      title: 'Cyberbullying Investigation - Social Media Harassment',
      description: 'Investigation into coordinated harassment campaign against multiple victims via social media platforms.',
      status: 'active',
      priority: 'high',
      category: 'cyberbullying',
      assignedAgent: 'Agent Smith',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-15 14:30',
      dueDate: '2024-02-10',
      progress: 65,
      evidenceCount: 23,
      suspectCount: 3,
      activities: [
        {
          id: '1',
          type: 'evidence',
          description: 'Social media screenshots and conversation logs uploaded',
          timestamp: '2024-01-15 14:30',
          user: 'Agent Smith'
        },
        {
          id: '2',
          type: 'analysis',
          description: 'IP address analysis completed for suspect accounts',
          timestamp: '2024-01-15 10:15',
          user: 'Digital Forensics Team'
        }
      ]
    },
    {
      id: 'CASE-2024-089',
      title: 'Financial Fraud - Cryptocurrency Scam Operation',
      description: 'Large-scale cryptocurrency investment scam targeting elderly victims through fake investment platforms.',
      status: 'active',
      priority: 'critical',
      category: 'fraud',
      assignedAgent: 'Agent Johnson',
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-15 16:45',
      dueDate: '2024-01-25',
      progress: 85,
      evidenceCount: 156,
      suspectCount: 8,
      activities: [
        {
          id: '1',
          type: 'report',
          description: 'Financial analysis report completed',
          timestamp: '2024-01-15 16:45',
          user: 'Financial Crimes Unit'
        },
        {
          id: '2',
          type: 'evidence',
          description: 'Bank records and transaction logs obtained',
          timestamp: '2024-01-14 09:20',
          user: 'Agent Johnson'
        }
      ]
    },
    {
      id: 'CASE-2023-245',
      title: 'Corporate Network Intrusion',
      description: 'Unauthorized access to corporate network with data exfiltration and ransomware deployment.',
      status: 'closed',
      priority: 'critical',
      category: 'hacking',
      assignedAgent: 'Agent Brown',
      createdDate: '2023-11-15',
      lastUpdated: '2024-01-10 11:00',
      progress: 100,
      evidenceCount: 89,
      suspectCount: 2,
      activities: [
        {
          id: '1',
          type: 'report',
          description: 'Final investigation report submitted',
          timestamp: '2024-01-10 11:00',
          user: 'Agent Brown'
        }
      ]
    }
  ])

  const filteredCases = cases.filter(caseFile => {
    const matchesSearch = caseFile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseFile.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseFile.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || caseFile.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || caseFile.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'open': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'closed': return 'bg-gray-500'
      case 'archived': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cyberbullying': return '👥'
      case 'fraud': return '💰'
      case 'hacking': return '🔓'
      case 'ransomware': return '🔒'
      case 'terrorism': return '⚠️'
      default: return '📁'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'evidence': return '📄'
      case 'interview': return '🎤'
      case 'analysis': return '🔍'
      case 'report': return '📊'
      case 'update': return '📝'
      default: return '📋'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 p-8 backdrop-blur-sm border border-slate-600/50">
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6dd9f511-cc45-4b06-9c91-2321c7d55656.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Case Management Center
          </h1>
          <p className="text-lg text-slate-200 mb-6">
            Comprehensive investigation tracking and case workflow management
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="text-xs text-slate-400">Active Cases</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">89</div>
                <div className="text-xs text-slate-400">Closed Cases</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">5</div>
                <div className="text-xs text-slate-400">Critical Priority</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">72%</div>
                <div className="text-xs text-slate-400">Avg. Completion</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800/80 border-slate-600/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search" className="text-slate-300">Search Cases</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by case ID, title, or description..."
                className="bg-slate-700/50 border-slate-600/50 text-slate-200"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-slate-300">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority" className="text-slate-300">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Management Tabs */}
      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="bg-slate-800/80 border border-slate-600/50">
          <TabsTrigger value="cases" className="data-[state=active]:bg-slate-700">
            📁 Case Files
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-slate-700">
            ➕ New Case
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
            📅 Timeline View
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700">
            📊 Case Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredCases.map((caseFile) => (
              <Card key={caseFile.id} className="bg-slate-800/80 border-slate-600/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{getCategoryIcon(caseFile.category)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-200">{caseFile.title}</h3>
                          <Badge variant="outline" className="text-slate-300 border-slate-500">
                            {caseFile.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{caseFile.description}</p>
                        <p className="text-xs text-slate-500">Assigned to: {caseFile.assignedAgent}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex space-x-2">
                        <Badge className={`${getStatusColor(caseFile.status)} text-white`}>
                          {caseFile.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(caseFile.priority)} text-white`}>
                          {caseFile.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400">Updated: {caseFile.lastUpdated}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400">Created</p>
                      <p className="text-sm text-slate-200">{caseFile.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Due Date</p>
                      <p className="text-sm text-slate-200">{caseFile.dueDate || 'No deadline'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Evidence</p>
                      <p className="text-sm text-slate-200">{caseFile.evidenceCount} files</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Suspects</p>
                      <p className="text-sm text-slate-200">{caseFile.suspectCount} persons</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-slate-400">Investigation Progress</p>
                      <p className="text-xs text-slate-400">{caseFile.progress}%</p>
                    </div>
                    <Progress value={caseFile.progress} className="h-2" />
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2">Recent Activities</p>
                    <div className="space-y-2">
                      {caseFile.activities.slice(0, 2).map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-2 bg-slate-700/30 rounded">
                          <span className="text-sm">{getActivityIcon(activity.type)}</span>
                          <div className="flex-1">
                            <p className="text-sm text-slate-200">{activity.description}</p>
                            <p className="text-xs text-slate-400">{activity.user} • {activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      📂 Open Case
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      🔍 View Evidence
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      📊 Generate Report
                    </Button>
                    {caseFile.status !== 'closed' && (
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                        ✏️ Update Status
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Create New Case</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="case-title" className="text-slate-300">Case Title</Label>
                    <Input
                      id="case-title"
                      placeholder="Enter descriptive case title"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-slate-300">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
                        <SelectItem value="fraud">Financial Fraud</SelectItem>
                        <SelectItem value="hacking">Hacking/Intrusion</SelectItem>
                        <SelectItem value="ransomware">Ransomware</SelectItem>
                        <SelectItem value="terrorism">Cyber Terrorism</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority-level" className="text-slate-300">Priority Level</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="assigned-agent" className="text-slate-300">Assigned Agent</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="smith">Agent Smith</SelectItem>
                        <SelectItem value="johnson">Agent Johnson</SelectItem>
                        <SelectItem value="brown">Agent Brown</SelectItem>
                        <SelectItem value="davis">Agent Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="text-slate-300">Case Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the case..."
                      rows={6}
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="due-date" className="text-slate-300">Due Date (Optional)</Label>
                    <Input
                      id="due-date"
                      type="date"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  Case will be automatically assigned a unique ID upon creation
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-slate-600 text-slate-200">
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Create Case
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Investigation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-slate-700/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ddeb4057-b4c5-4304-8d6a-9b15f5862a33.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">Timeline Visualization</h3>
                  <p className="text-slate-400 mb-4">Interactive timeline of case activities and milestones</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    🚀 Launch Timeline View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Case Reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-200">Report Types</h3>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    📄 Individual Case Report
                  </Button>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    📊 Case Summary Dashboard
                  </Button>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    📈 Performance Analytics
                  </Button>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    🎯 Investigation Metrics
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-200">Export Options</h3>
                  
                  <div>
                    <Label htmlFor="export-format" className="text-slate-300">Export Format</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                        <SelectItem value="json">JSON Export</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date-range" className="text-slate-300">Date Range</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    📤 Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}