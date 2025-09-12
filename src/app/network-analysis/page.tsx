'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

interface AnalysisResult {
  id: string
  type: 'ip' | 'domain' | 'url' | 'port'
  target: string
  status: 'analyzing' | 'completed' | 'failed'
  timestamp: string
  results?: {
    location?: string
    isp?: string
    threatLevel?: 'low' | 'medium' | 'high' | 'critical'
    ports?: number[]
    subdomains?: string[]
    whoisData?: any
    reputation?: 'clean' | 'suspicious' | 'malicious'
  }
}

export default function NetworkAnalysis() {
  const [ipAddress, setIpAddress] = useState('')
  const [domain, setDomain] = useState('')
  const [urlToAnalyze, setUrlToAnalyze] = useState('')
  const [portRange, setPortRange] = useState('')
  const [bulkTargets, setBulkTargets] = useState('')
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([
    {
      id: '1',
      type: 'ip',
      target: '192.168.1.100',
      status: 'completed',
      timestamp: '2 minutes ago',
      results: {
        location: 'United States, California',
        isp: 'Example ISP Corp',
        threatLevel: 'low',
        ports: [80, 443, 22],
        reputation: 'clean'
      }
    },
    {
      id: '2',
      type: 'domain',
      target: 'suspicious-site.com',
      status: 'completed',
      timestamp: '5 minutes ago',
      results: {
        location: 'Russia',
        threatLevel: 'high',
        subdomains: ['mail.suspicious-site.com', 'ftp.suspicious-site.com'],
        reputation: 'suspicious'
      }
    },
    {
      id: '3',
      type: 'ip',
      target: '10.0.0.50',
      status: 'analyzing',
      timestamp: '1 minute ago'
    }
  ])

  const handleIpAnalysis = () => {
    if (!ipAddress) return
    
    const newResult: AnalysisResult = {
      id: Date.now().toString(),
      type: 'ip',
      target: ipAddress,
      status: 'analyzing',
      timestamp: 'Just now'
    }
    
    setAnalysisResults(prev => [newResult, ...prev])
    setIpAddress('')
    
    // Simulate analysis completion after 3 seconds
    setTimeout(() => {
      setAnalysisResults(prev => 
        prev.map(result => 
          result.id === newResult.id 
            ? {
                ...result,
                status: 'completed' as const,
                results: {
                  location: 'Unknown Location',
                  isp: 'Analysis Complete',
                  threatLevel: 'medium' as const,
                  ports: [80, 443],
                  reputation: 'clean' as const
                }
              }
            : result
        )
      )
    }, 3000)
  }

  const handleDomainAnalysis = () => {
    if (!domain) return
    
    const newResult: AnalysisResult = {
      id: Date.now().toString(),
      type: 'domain',
      target: domain,
      status: 'analyzing',
      timestamp: 'Just now'
    }
    
    setAnalysisResults(prev => [newResult, ...prev])
    setDomain('')
    
    setTimeout(() => {
      setAnalysisResults(prev => 
        prev.map(result => 
          result.id === newResult.id 
            ? {
                ...result,
                status: 'completed' as const,
                results: {
                  location: 'Analysis Complete',
                  threatLevel: 'low' as const,
                  subdomains: ['www.' + domain, 'mail.' + domain],
                  reputation: 'clean' as const
                }
              }
            : result
        )
      )
    }, 3000)
  }

  const getThreatColor = (level?: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getReputationColor = (reputation?: string) => {
    switch (reputation) {
      case 'malicious': return 'bg-red-500'
      case 'suspicious': return 'bg-orange-500'
      case 'clean': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/90 to-slate-700/90 p-8 backdrop-blur-sm border border-slate-600/50">
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3fd08c4b-ffac-474b-b54c-9eed13bf7776.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Network Analysis Suite
          </h1>
          <p className="text-lg text-slate-200 mb-6">
            Comprehensive network investigation and threat analysis tools
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">1,247</div>
                <div className="text-xs text-slate-400">IPs Analyzed</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">89</div>
                <div className="text-xs text-slate-400">Domains Scanned</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">23</div>
                <div className="text-xs text-slate-400">Threats Found</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 border-slate-600/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">156</div>
                <div className="text-xs text-slate-400">Ports Open</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Analysis Tools */}
      <Tabs defaultValue="ip" className="space-y-6">
        <TabsList className="bg-slate-800/80 border border-slate-600/50">
          <TabsTrigger value="ip" className="data-[state=active]:bg-slate-700">
            🌐 IP Analysis
          </TabsTrigger>
          <TabsTrigger value="domain" className="data-[state=active]:bg-slate-700">
            🔍 Domain Lookup
          </TabsTrigger>
          <TabsTrigger value="port" className="data-[state=active]:bg-slate-700">
            🚪 Port Scanner
          </TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:bg-slate-700">
            📋 Bulk Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ip" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">IP Address Investigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Label htmlFor="ip" className="text-slate-300">IP Address</Label>
                  <Input
                    id="ip"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    placeholder="e.g., 192.168.1.1 or 8.8.8.8"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleIpAnalysis}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    🔍 Analyze IP
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-slate-400">
                <p>This tool will analyze:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Geolocation and ISP information</li>
                  <li>Reputation and threat intelligence</li>
                  <li>Open ports and services</li>
                  <li>Historical activity and associations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Domain & URL Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Label htmlFor="domain" className="text-slate-300">Domain or URL</Label>
                  <Input
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g., example.com or https://suspicious-site.com"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleDomainAnalysis}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    🔍 Analyze Domain
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-slate-400">
                <p>Domain analysis includes:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>WHOIS registration information</li>
                  <li>DNS records and subdomains</li>
                  <li>SSL certificate details</li>
                  <li>Content analysis and screenshots</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="port" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Port Scanner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target" className="text-slate-300">Target IP/Domain</Label>
                  <Input
                    id="target"
                    placeholder="192.168.1.1"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="ports" className="text-slate-300">Port Range</Label>
                  <Input
                    id="ports"
                    value={portRange}
                    onChange={(e) => setPortRange(e.target.value)}
                    placeholder="1-1000 or 80,443,22"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                  />
                </div>
              </div>
              
              <Button className="bg-orange-600 hover:bg-orange-700">
                🚪 Start Port Scan
              </Button>
              
              <div className="text-sm text-slate-400">
                <p>Port scanning capabilities:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>TCP and UDP port detection</li>
                  <li>Service identification and versioning</li>
                  <li>OS fingerprinting</li>
                  <li>Vulnerability assessment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card className="bg-slate-800/80 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-200">Bulk Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bulk" className="text-slate-300">
                  Targets (one per line)
                </Label>
                <Textarea
                  id="bulk"
                  value={bulkTargets}
                  onChange={(e) => setBulkTargets(e.target.value)}
                  placeholder="192.168.1.1&#10;example.com&#10;https://suspicious-site.com&#10;10.0.0.1"
                  rows={6}
                  className="bg-slate-700/50 border-slate-600/50 text-slate-200"
                />
              </div>
              
              <Button className="bg-purple-600 hover:bg-purple-700">
                🔍 Analyze All Targets
              </Button>
              
              <div className="text-sm text-slate-400">
                <p>Bulk analysis supports:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Mixed IP addresses and domains</li>
                  <li>Parallel processing for speed</li>
                  <li>Export results to CSV/JSON</li>
                  <li>Progress tracking and reporting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis Results */}
      <Card className="bg-slate-800/80 border-slate-600/50">
        <CardHeader>
          <CardTitle className="text-slate-200">Recent Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisResults.map((result) => (
              <div key={result.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600/30">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-slate-600 text-white">
                      {result.type.toUpperCase()}
                    </Badge>
                    <span className="font-medium text-slate-200">{result.target}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.status === 'analyzing' && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    )}
                    {result.status === 'completed' && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    {result.status === 'failed' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-xs text-slate-400">{result.timestamp}</span>
                  </div>
                </div>

                {result.results && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {result.results.location && (
                      <div>
                        <p className="text-xs text-slate-400">Location</p>
                        <p className="text-sm text-slate-200">{result.results.location}</p>
                      </div>
                    )}
                    {result.results.isp && (
                      <div>
                        <p className="text-xs text-slate-400">ISP</p>
                        <p className="text-sm text-slate-200">{result.results.isp}</p>
                      </div>
                    )}
                    {result.results.threatLevel && (
                      <div>
                        <p className="text-xs text-slate-400">Threat Level</p>
                        <Badge className={`${getThreatColor(result.results.threatLevel)} text-white`}>
                          {result.results.threatLevel}
                        </Badge>
                      </div>
                    )}
                    {result.results.reputation && (
                      <div>
                        <p className="text-xs text-slate-400">Reputation</p>
                        <Badge className={`${getReputationColor(result.results.reputation)} text-white`}>
                          {result.results.reputation}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                {result.results?.ports && (
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-2">Open Ports</p>
                    <div className="flex flex-wrap gap-2">
                      {result.results.ports.map((port) => (
                        <Badge key={port} variant="outline" className="text-slate-300 border-slate-500">
                          {port}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {result.results?.subdomains && (
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-2">Subdomains</p>
                    <div className="flex flex-wrap gap-2">
                      {result.results.subdomains.map((subdomain) => (
                        <Badge key={subdomain} variant="outline" className="text-slate-300 border-slate-500">
                          {subdomain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}