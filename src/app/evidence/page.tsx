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

interface EvidenceItem {
  id: string
  name: string
  type: 'image' | 'document' | 'video' | 'audio' | 'data' | 'other'
  size: string
  hash: string
  uploadDate: string
  caseId: string
  status: 'processing' | 'verified' | 'corrupted' | 'quarantined'
  chain: ChainEntry[]
  metadata: {
    description?: string
    source?: string
    tags?: string[]
  }
}

interface ChainEntry {
  id: string
  action: 'upload' | 'access' | 'modify' | 'transfer' | 'analyze'
  user: string
  timestamp: string
  details: string
  hash?: string
}

export default function EvidenceVault() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCase, setSelectedCase] = useState('all')
  
  const [evidenceItems] = useState<EvidenceItem[]>([
    {
      id: 'EV-2024-001',
      name: 'suspect_phone_image.raw',
      type: 'data',
      size: '64.2 GB',
      hash: 'sha256:a1b2c3d4e5f6...',
      uploadDate: '2024-01-15 14:30:22',
      caseId: 'CASE-2024-089',
      status: 'verified',
      chain: [
        {
          id: '1',
          action: 'upload',
          user: 'Agent Smith',
          timestamp: '2024-01-15 14:30:22',
          details: 'Initial evidence upload from crime scene',
          hash: 'sha256:a1b2c3d4e5f6...'
        },
        {
          id: '2',
          action: 'access',
          user: 'Forensic Analyst Jones',
          timestamp: '2024-01-15 15:45:10',
          details: 'Evidence accessed for preliminary analysis'
        }
      ],
      metadata: {
        description: 'Mobile phone image from suspect device',
        source: 'Crime Scene Unit',
        tags: ['mobile', 'forensics', 'suspect-device']
      }
    },
    {
      id: 'EV-2024-002',
      name: 'network_traffic_capture.pcap',
      type: 'data',
      size: '2.4 GB',
      hash: 'sha256:b2c3d4e5f6a1...',
      uploadDate: '2024-01-14 09:15:33',
      caseId: 'CASE-2024-067',
      status: 'processing',
      chain: [
        {
          id: '1',
          action: 'upload',
          user: 'Agent Johnson',
          timestamp: '2024-01-14 09:15:33',
          details: 'Network capture from ISP cooperation',
          hash: 'sha256:b2c3d4e5f6a1...'
        }
      ],
      metadata: {
        description: 'Network traffic capture during incident timeframe',
        source: 'ISP Cooperation',
        tags: ['network', 'traffic', 'pcap']
      }
    },
    {
      id: 'EV-2024-003',
      name: 'surveillance_footage.mp4',
      type: 'video',
      size: '847 MB',
      hash: 'sha256:c3d4e5f6a1b2...',
      uploadDate: '2024-01-13 16:20:45',
      caseId: 'CASE-2024-045',
      status: 'verified',
      chain: [
        {
          id: '1',
          action: 'upload',
          user: 'Detective Brown',
          timestamp: '2024-01-13 16:20:45',
          details: 'Security camera footage from scene',
          hash: 'sha256:c3d4e5f6a1b2...'
        },
        {
          id: '2',
          action: 'analyze',
          user: 'Video Analyst Wilson',
          timestamp: '2024-01-13 17:30:12',
          details: 'Video enhancement and frame analysis completed'
        }
      ],
      metadata: {
        description: 'CCTV footage from incident location',
        source: 'Security Camera System',
        tags: ['video', 'surveillance', 'cctv']
      }
    }
  ])

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.metadata.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.caseId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesCase = selectedCase === 'all' || item.caseId === selectedCase
    
    return matchesSearch && matchesType && matchesCase
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500'
      case 'processing': return 'bg-yellow-500'
      case 'corrupted': return 'bg-red-500'
      case 'quarantined': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️'
      case 'video': return '🎥'
      case 'audio': return '🎵'
      case 'document': return '📄'
      case 'data': return '💾'
      default: return '📁'
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'upload': return '⬆️'
      case 'access': return '👁️'
      case 'modify': return '✏️'
      case 'transfer': return '↔️'
      case 'analyze': return '🔍'
      default: return '📝'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 p-8 backdrop-blur-sm border border-slate-600/50">
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/17309499-1f94-4c32-8b5f-692cb7c362cf.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Evidence Vault
          </h1>
          <p className="text-lg text-slate-200 mb-6">
            Secure digital evidence storage with chain of custody tracking
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">847</div>
                <div className="text-xs text-slate-400">Evidence Files</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">2.4 TB</div>
                <div className="text-xs text-slate-400">Total Storage</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">23</div>
                <div className="text-xs text-slate-400">Active Cases</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">99.9%</div>
                <div className="text-xs text-slate-400">Integrity Rate</div>
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
              <Label htmlFor="search" className="text-slate-300">Search Evidence</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by filename, case ID, or description..."
                className="bg-slate-700/50 border-slate-600/50 text-slate-200"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-slate-300">File Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="data">Data Files</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="case" className="text-slate-300">Case</Label>
              <Select value={selectedCase} onValueChange={setSelectedCase}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="CASE-2024-089">CASE-2024-089</SelectItem>
                  <SelectItem value="CASE-2024-067">CASE-2024-067</SelectItem>
                  <SelectItem value="CASE-2024-045">CASE-2024-045</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Management Tabs */}
      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="bg-slate-800/80 border border-slate-600/50">
          <TabsTrigger value="browse" className="data-[state=active]:bg-slate-700">
            📁 Browse Evidence
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-slate-700">
            ⬆️ Upload Evidence
          </TabsTrigger>
          <TabsTrigger value="integrity" className="data-[state=active]:bg-slate-700">
            🔐 Integrity Check
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-slate-700">
            📤 Export Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredEvidence.map((item) => (
              <Card key={item.id} className="bg-slate-800/80 border-slate-600/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{getTypeIcon(item.type)}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">{item.name}</h3>
                        <p className="text-sm text-slate-400">ID: {item.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(item.status)} text-white`}>
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-slate-600/50 text-slate-200">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400">File Size</p>
                      <p className="text-sm text-slate-200">{item.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Upload Date</p>
                      <p className="text-sm text-slate-200">{item.uploadDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Case ID</p>
                      <p className="text-sm text-slate-200">{item.caseId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Hash (SHA256)</p>
                      <p className="text-sm text-slate-200 font-mono">{item.hash.substring(0, 20)}...</p>
                    </div>
                  </div>

                  {item.metadata.description && (
                    <div className="mb-4">
                      <p className="text-xs text-slate-400">Description</p>
                      <p className="text-sm text-slate-200">{item.metadata.description}</p>
                    </div>
                  )}

                  {item.metadata.tags && (
                    <div className="mb-4">
                      <p className="text-xs text-slate-400 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {item.metadata.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-slate-300 border-slate-500">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-slate-400 mb-2">Chain of Custody (Recent)</p>
                    <div className="space-y-2">
                      {item.chain.slice(-2).map((entry) => (
                        <div key={entry.id} className="flex items-center space-x-3 p-2 bg-slate-700/30 rounded">
                          <span className="text-lg">{getActionIcon(entry.action)}</span>
                          <div className="flex-1">
                            <p className="text-sm text-slate-200">{entry.details}</p>
                            <p className="text-xs text-slate-400">{entry.user} • {entry.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {item.chain.length > 2 && (
                      <Button variant="ghost" size="sm" className="mt-2 text-slate-400">
                        View full chain ({item.chain.length} entries)
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Upload New Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">📁</div>
                <p className="text-slate-200 mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-slate-400 mb-4">
                  Supports all file types • Max 50GB per file
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Select Files
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="case-id" className="text-slate-300">Case ID</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select case" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="CASE-2024-089">CASE-2024-089</SelectItem>
                        <SelectItem value="CASE-2024-067">CASE-2024-067</SelectItem>
                        <SelectItem value="CASE-2024-045">CASE-2024-045</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="source" className="text-slate-300">Evidence Source</Label>
                    <Input
                      id="source"
                      placeholder="e.g., Crime Scene Unit, ISP Cooperation"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-slate-300">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., mobile, forensics, network"
                      className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the evidence..."
                    rows={6}
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  Files will be automatically hashed and integrity-checked
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Upload Evidence
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrity" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Integrity Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-700/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">System Integrity Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">847</div>
                    <div className="text-sm text-slate-400">Files Verified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">0</div>
                    <div className="text-sm text-slate-400">Integrity Failures</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">2</div>
                    <div className="text-sm text-slate-400">Pending Checks</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  🔍 Run Full Integrity Check
                </Button>
                <Button variant="outline" className="w-full border-slate-600/50 text-slate-200">
                  📊 Generate Integrity Report
                </Button>
              </div>

              <div className="text-sm text-slate-400">
                <p className="mb-2">Integrity verification includes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Hash comparison against original values</li>
                  <li>File corruption detection</li>
                  <li>Timestamp validation</li>
                  <li>Chain of custody verification</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Export Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-200">Export Options</h3>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    📄 Export Case Evidence Package
                  </Button>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    🔗 Export Chain of Custody Report
                  </Button>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    📊 Export Evidence Inventory
                  </Button>
                  
                  <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700">
                    💾 Create Forensic Image
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-200">Export Settings</h3>
                  
                  <div>
                    <Label htmlFor="format" className="text-slate-300">Export Format</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="zip">ZIP Archive</SelectItem>
                        <SelectItem value="tar">TAR Archive</SelectItem>
                        <SelectItem value="iso">ISO Image</SelectItem>
                        <SelectItem value="e01">E01 Forensic Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="encryption" className="text-slate-300">Encryption</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                        <SelectValue placeholder="Select encryption" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="aes256">AES-256</SelectItem>
                        <SelectItem value="aes128">AES-128</SelectItem>
                        <SelectItem value="none">No Encryption</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      📤 Create Export Package
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}