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

interface SocialProfile {
  id: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'other'
  username: string
  displayName: string
  verified: boolean
  followers: number
  following: number
  posts: number
  joinDate: string
  lastActive: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  connections: string[]
  flags: string[]
  profileImage?: string
}

interface Investigation {
  id: string
  target: string
  platform: string
  status: 'active' | 'completed' | 'paused'
  startDate: string
  findings: number
  connections: number
}

export default function SocialIntelligence() {
  const [searchTarget, setSearchTarget] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  
  const [profiles] = useState<SocialProfile[]>([
    {
      id: '1',
      platform: 'facebook',
      username: 'john.suspect',
      displayName: 'John Suspect',
      verified: false,
      followers: 1247,
      following: 892,
      posts: 156,
      joinDate: '2019-03-15',
      lastActive: '2 hours ago',
      riskLevel: 'high',
      connections: ['jane.doe', 'suspicious.account', 'crime.partner'],
      flags: ['multiple-accounts', 'suspicious-activity', 'location-spoofing']
    },
    {
      id: '2',
      platform: 'instagram',
      username: '@suspect_insta',
      displayName: 'Suspect Account',
      verified: false,
      followers: 5432,
      following: 234,
      posts: 89,
      joinDate: '2020-07-22',
      lastActive: '1 day ago',
      riskLevel: 'medium',
      connections: ['accomplice1', 'fake.profile'],
      flags: ['fake-followers', 'bot-activity']
    },
    {
      id: '3',
      platform: 'twitter',
      username: '@cybercriminal',
      displayName: 'Anonymous User',
      verified: false,
      followers: 156,
      following: 89,
      posts: 423,
      joinDate: '2021-11-08',
      lastActive: '5 minutes ago',
      riskLevel: 'critical',
      connections: ['darkweb.user', 'hacker.collective'],
      flags: ['dark-web-activity', 'illegal-content', 'threat-making']
    }
  ])

  const [investigations] = useState<Investigation[]>([
    {
      id: 'INV-2024-001',
      target: 'john.suspect',
      platform: 'Multi-platform',
      status: 'active',
      startDate: '2024-01-10',
      findings: 23,
      connections: 15
    },
    {
      id: 'INV-2024-002',
      target: 'cybercriminal',
      platform: 'Twitter',
      status: 'active',
      startDate: '2024-01-08',
      findings: 45,
      connections: 8
    },
    {
      id: 'INV-2023-089',
      target: 'fraud.network',
      platform: 'Facebook',
      status: 'completed',
      startDate: '2023-12-15',
      findings: 67,
      connections: 32
    }
  ])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return '📘'
      case 'twitter': return '🐦'
      case 'instagram': return '📷'
      case 'linkedin': return '💼'
      case 'tiktok': return '🎵'
      default: return '🌐'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const handleProfileAnalysis = () => {
    if (!searchTarget) return
    // Simulate profile analysis
    console.log('Analyzing profile:', searchTarget)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 p-8 backdrop-blur-sm border border-slate-600/50">
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/328dc979-2908-4dc2-abf6-f6859786f155.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Social Intelligence Center
          </h1>
          <p className="text-lg text-slate-200 mb-6">
            Advanced social media investigation and profile analysis platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">2,847</div>
                <div className="text-xs text-slate-400">Profiles Analyzed</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">156</div>
                <div className="text-xs text-slate-400">Active Investigations</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">45</div>
                <div className="text-xs text-slate-400">High-Risk Profiles</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">89k</div>
                <div className="text-xs text-slate-400">Connections Mapped</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Investigation Tools */}
      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="bg-slate-800/80 border border-slate-600/50">
          <TabsTrigger value="search" className="data-[state=active]:bg-slate-700">
            🔍 Profile Search
          </TabsTrigger>
          <TabsTrigger value="profiles" className="data-[state=active]:bg-slate-700">
            👥 Profile Database
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-slate-700">
            🕸️ Network Analysis
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-slate-700">
            📡 Live Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Profile Investigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="target" className="text-slate-300">Username or Profile URL</Label>
                  <Input
                    id="target"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    placeholder="@username, email, phone, or profile URL"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="platform" className="text-slate-300">Platform</Label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-200">Search Options</h3>
                  
                  <Button 
                    onClick={handleProfileAnalysis}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    🔍 Deep Profile Analysis
                  </Button>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    🕸️ Connection Mapping
                  </Button>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    📊 Activity Timeline
                  </Button>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    🎯 Cross-Platform Search
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-200">Analysis Features</h3>
                  
                  <div className="text-sm text-slate-400 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Profile metadata extraction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Connection and follower analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Content and activity patterns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Geographic location tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Behavioral anomaly detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Fake account identification</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id} className="bg-slate-800/80 border-slate-600/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                        {getPlatformIcon(profile.platform)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">{profile.displayName}</h3>
                        <p className="text-sm text-slate-400">{profile.username}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getRiskColor(profile.riskLevel)} text-white`}>
                            {profile.riskLevel} risk
                          </Badge>
                          {profile.verified && (
                            <Badge className="bg-blue-500 text-white">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Last Active</p>
                      <p className="text-sm text-slate-200">{profile.lastActive}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400">Followers</p>
                      <p className="text-sm font-semibold text-slate-200">{profile.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Following</p>
                      <p className="text-sm font-semibold text-slate-200">{profile.following.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Posts</p>
                      <p className="text-sm font-semibold text-slate-200">{profile.posts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Joined</p>
                      <p className="text-sm font-semibold text-slate-200">{profile.joinDate}</p>
                    </div>
                  </div>

                  {profile.flags.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-slate-400 mb-2">Security Flags</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.flags.map((flag) => (
                          <Badge key={flag} className="bg-red-500/20 text-red-300 border border-red-500/30">
                            ⚠️ {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2">Known Connections</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.connections.slice(0, 3).map((connection) => (
                        <Badge key={connection} variant="outline" className="text-slate-300 border-slate-500">
                          {connection}
                        </Badge>
                      ))}
                      {profile.connections.length > 3 && (
                        <Badge variant="outline" className="text-slate-400 border-slate-600">
                          +{profile.connections.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      🔍 Deep Analysis
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      🕸️ View Network
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      📊 Timeline
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-200">
                      📄 Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Network Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-slate-700/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f6733617-229e-437d-80cc-b04b3f027edf.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">🕸️</div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">Network Analysis Visualization</h3>
                  <p className="text-slate-400 mb-4">Interactive graph showing connections between profiles</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    🚀 Launch Network Viewer
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-700/50 border-slate-600/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">847</div>
                    <div className="text-xs text-slate-400">Total Nodes</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700/50 border-slate-600/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">2,156</div>
                    <div className="text-xs text-slate-400">Connections</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700/50 border-slate-600/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">23</div>
                    <div className="text-xs text-slate-400">Clusters</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Active Investigations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investigations.map((inv) => (
                  <div key={inv.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-slate-200">{inv.id}</h4>
                        <p className="text-sm text-slate-400">Target: {inv.target}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(inv.status)} text-white`}>
                          {inv.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Platform</p>
                        <p className="text-sm text-slate-200">{inv.platform}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Start Date</p>
                        <p className="text-sm text-slate-200">{inv.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Findings</p>
                        <p className="text-sm text-slate-200">{inv.findings}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Connections</p>
                        <p className="text-sm text-slate-200">{inv.connections}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  ➕ Start New Investigation
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-200">
                  📊 Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Real-time Monitoring Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="keywords" className="text-slate-300">Keywords to Monitor</Label>
                  <Textarea
                    id="keywords"
                    placeholder="Enter keywords, hashtags, or phrases to monitor..."
                    rows={3}
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="accounts" className="text-slate-300">Accounts to Monitor</Label>
                  <Textarea
                    id="accounts"
                    placeholder="Enter usernames or profile URLs..."
                    rows={3}
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
              </div>
              
              <Button className="bg-red-600 hover:bg-red-700">
                📡 Start Live Monitoring
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}