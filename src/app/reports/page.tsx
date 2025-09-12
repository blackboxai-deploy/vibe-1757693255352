'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Report {
  id: string
  title: string
  type: 'case' | 'evidence' | 'analysis' | 'summary' | 'compliance'
  caseId?: string
  generatedBy: string
  createdDate: string
  status: 'draft' | 'completed' | 'reviewed' | 'approved'
  size: string
  pages: number
  format: 'pdf' | 'excel' | 'word' | 'html'
}

interface Template {
  id: string
  name: string
  description: string
  type: 'investigation' | 'evidence' | 'forensic' | 'compliance'
  sections: string[]
}

export default function ReportCenter() {
  const [selectedReportType, setSelectedReportType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  
  const [reports] = useState<Report[]>([
    {
      id: 'RPT-2024-001',
      title: 'Cyberbullying Investigation Final Report',
      type: 'case',
      caseId: 'CASE-2024-001',
      generatedBy: 'Agent Smith',
      createdDate: '2024-01-15',
      status: 'completed',
      size: '2.4 MB',
      pages: 23,
      format: 'pdf'
    },
    {
      id: 'RPT-2024-002',
      title: 'Digital Evidence Analysis Summary',
      type: 'evidence',
      caseId: 'CASE-2024-089',
      generatedBy: 'Forensics Team',
      createdDate: '2024-01-14',
      status: 'reviewed',
      size: '1.8 MB',
      pages: 15,
      format: 'pdf'
    },
    {
      id: 'RPT-2024-003',
      title: 'Network Traffic Analysis Report',
      type: 'analysis',
      caseId: 'CASE-2024-067',
      generatedBy: 'Agent Johnson',
      createdDate: '2024-01-13',
      status: 'draft',
      size: '5.2 MB',
      pages: 34,
      format: 'pdf'
    },
    {
      id: 'RPT-2024-004',
      title: 'Monthly Investigation Summary',
      type: 'summary',
      generatedBy: 'System',
      createdDate: '2024-01-01',
      status: 'approved',
      size: '890 KB',
      pages: 8,
      format: 'excel'
    }
  ])

  const [templates] = useState<Template[]>([
    {
      id: 'TPL-001',
      name: 'Standard Investigation Report',
      description: 'Comprehensive template for criminal investigation reports',
      type: 'investigation',
      sections: ['Executive Summary', 'Case Overview', 'Evidence Analysis', 'Findings', 'Recommendations']
    },
    {
      id: 'TPL-002',
      name: 'Digital Evidence Report',
      description: 'Specialized template for digital forensics evidence documentation',
      type: 'evidence',
      sections: ['Chain of Custody', 'Technical Analysis', 'Metadata Extraction', 'Hash Verification']
    },
    {
      id: 'TPL-003',
      name: 'Forensic Analysis Report',
      description: 'Technical template for detailed forensic analysis documentation',
      type: 'forensic',
      sections: ['Technical Overview', 'Methodology', 'Findings', 'Tools Used', 'Conclusions']
    },
    {
      id: 'TPL-004',
      name: 'Compliance Report',
      description: 'Template for regulatory compliance and audit reports',
      type: 'compliance',
      sections: ['Compliance Overview', 'Standards Assessment', 'Gap Analysis', 'Action Items']
    }
  ])

  const filteredReports = reports.filter(report => {
    const matchesType = selectedReportType === 'all' || report.type === selectedReportType
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
    return matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500'
      case 'reviewed': return 'bg-blue-500'
      case 'completed': return 'bg-purple-500'
      case 'draft': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'case': return '📁'
      case 'evidence': return '🔒'
      case 'analysis': return '🔍'
      case 'summary': return '📊'
      case 'compliance': return '📋'
      default: return '📄'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return '📄'
      case 'excel': return '📊'
      case 'word': return '📝'
      case 'html': return '🌐'
      default: return '📄'
    }
  }

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'investigation': return '🔍'
      case 'evidence': return '🔒'
      case 'forensic': return '🔬'
      case 'compliance': return '📋'
      default: return '📋'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 p-8 backdrop-blur-sm border border-slate-600/50">
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/df75bb3e-204d-4271-a7df-b3d6b78db3fa.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Report Generation Center
          </h1>
          <p className="text-lg text-slate-200 mb-6">
            Professional report creation and document management for investigations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">156</div>
                <div className="text-xs text-slate-400">Reports Generated</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">89</div>
                <div className="text-xs text-slate-400">Approved Reports</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">12</div>
                <div className="text-xs text-slate-400">Templates Available</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">2.1 GB</div>
                <div className="text-xs text-slate-400">Total Storage</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Report Management Tabs */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="bg-slate-800/80 border border-slate-600/50">
          <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700">
            📄 Generated Reports
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-slate-700">
            ➕ Create Report
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-slate-700">
            📋 Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
            📊 Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filters */}
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="report-type" className="text-slate-300">Report Type</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="case">Case Reports</SelectItem>
                      <SelectItem value="evidence">Evidence Reports</SelectItem>
                      <SelectItem value="analysis">Analysis Reports</SelectItem>
                      <SelectItem value="summary">Summary Reports</SelectItem>
                      <SelectItem value="compliance">Compliance Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status" className="text-slate-300">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    🔍 Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-slate-800/80 border-slate-600/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{getTypeIcon(report.type)}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">{report.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-slate-300 border-slate-500">
                            {report.id}
                          </Badge>
                          {report.caseId && (
                            <Badge variant="outline" className="text-slate-300 border-slate-500">
                              {report.caseId}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(report.status)} text-white`}>
                        {report.status}
                      </Badge>
                      <div className="text-2xl">{getFormatIcon(report.format)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400">Generated By</p>
                      <p className="text-sm text-slate-200">{report.generatedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Created</p>
                      <p className="text-sm text-slate-200">{report.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Size</p>
                      <p className="text-sm text-slate-200">{report.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Pages</p>
                      <p className="text-sm text-slate-200">{report.pages} pages</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      👁️ Preview
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      📥 Download
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      📤 Share
                    </Button>
                    {report.status === 'draft' && (
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                        ✏️ Edit
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
              <CardTitle className="text-slate-200">Create New Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-title" className="text-slate-300">Report Title</Label>
                    <Input
                      id="report-title"
                      placeholder="Enter descriptive report title"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="report-type-create" className="text-slate-300">Report Type</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="case">Case Report</SelectItem>
                        <SelectItem value="evidence">Evidence Report</SelectItem>
                        <SelectItem value="analysis">Analysis Report</SelectItem>
                        <SelectItem value="summary">Summary Report</SelectItem>
                        <SelectItem value="compliance">Compliance Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="template-select" className="text-slate-300">Template</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="case-select" className="text-slate-300">Associated Case</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select case (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="CASE-2024-001">CASE-2024-001</SelectItem>
                        <SelectItem value="CASE-2024-089">CASE-2024-089</SelectItem>
                        <SelectItem value="CASE-2024-067">CASE-2024-067</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="output-format" className="text-slate-300">Output Format</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="word">Word Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="html">HTML Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-description" className="text-slate-300">Description</Label>
                    <Textarea
                      id="report-description"
                      placeholder="Brief description of the report contents..."
                      rows={4}
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Report Sections</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-slate-300">Executive Summary</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-slate-300">Case Overview</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-slate-300">Evidence Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-slate-300">Findings & Conclusions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-slate-300">Recommendations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-slate-300">Appendices</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  Report will be generated with selected sections and formatting
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-slate-600 text-slate-200">
                    📄 Save as Draft
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    🚀 Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="bg-slate-800/80 border-slate-600/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-3xl">{getTemplateIcon(template.type)}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-200">{template.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                      <Badge variant="outline" className="text-slate-300 border-slate-500 mt-2">
                        {template.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2">Template Sections</p>
                    <div className="flex flex-wrap gap-2">
                      {template.sections.map((section) => (
                        <Badge key={section} variant="outline" className="text-slate-300 border-slate-500">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      👁️ Preview
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      📄 Use Template
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      ✏️ Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Create Custom Template</h3>
              <p className="text-slate-400 mb-4">Design your own report template with custom sections</p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                🎨 Template Builder
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/80 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-200">Report Generation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Reports This Month</span>
                    <span className="text-slate-200 font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Average Processing Time</span>
                    <span className="text-slate-200 font-semibold">2.4 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Most Used Template</span>
                    <span className="text-slate-200 font-semibold">Standard Investigation</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Storage Used</span>
                    <span className="text-slate-200 font-semibold">2.1 GB / 10 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-200">Report Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Approval Rate</span>
                    <span className="text-green-400 font-semibold">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Average Review Time</span>
                    <span className="text-slate-200 font-semibold">1.2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Compliance Score</span>
                    <span className="text-green-400 font-semibold">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Template Usage</span>
                    <span className="text-slate-200 font-semibold">87.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Report Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-700/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5f96c568-df2b-4c15-8323-68d66dd20305.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">Analytics Dashboard</h3>
                  <p className="text-slate-400 mb-4">Detailed report generation and usage analytics</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    📈 View Full Analytics
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