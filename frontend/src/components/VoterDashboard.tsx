import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { CheckCircle, Clock, AlertTriangle, Vote, Copy } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface VoterDashboardProps {
  userName: string;
  voterId: string;
  hasVoted: boolean;
  blockchainReceipt?: {
    electionId: string;
    timestamp: string;
    transactionHash: string;
  };
  onVote: () => void;
}

const votingStats = [
  { name: 'Voted', value: 65, color: '#28A745' },
  { name: 'Not Voted', value: 35, color: '#DC3545' }
];

const hourlyVotes = [
  { hour: '08:00', votes: 120 },
  { hour: '10:00', votes: 450 },
  { hour: '12:00', votes: 380 },
  { hour: '14:00', votes: 520 },
  { hour: '16:00', votes: 680 },
  { hour: '18:00', votes: 820 },
];

export function VoterDashboard({ userName, voterId, hasVoted, blockchainReceipt, onVote }: VoterDashboardProps) {
  const getStatusIcon = () => {
    if (hasVoted) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (hasVoted) return "Vote Submitted";
    return "Pending Vote";
  };

  const getStatusBadge = () => {
    if (hasVoted) return <Badge className="bg-green-500">Voted</Badge>;
    return <Badge variant="secondary">Not Voted</Badge>;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className="text-muted-foreground">Your secure voting dashboard</p>
      </div>

      {/* Voter Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>Voter Status</span>
          </CardTitle>
          <CardDescription>Your current voting status and registration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Voter ID</p>
              <p className="font-mono">{voterId}</p>
            </div>
            {getStatusBadge()}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{getStatusText()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Registration</p>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          {!hasVoted && (
            <Button 
              onClick={onVote} 
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Vote className="w-4 h-4 mr-2" />
              CAST YOUR VOTE
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Blockchain Receipt */}
      {hasVoted && blockchainReceipt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Blockchain Receipt</span>
            </CardTitle>
            <CardDescription>Your vote has been securely recorded on the blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Election ID</p>
                <p className="font-mono text-sm">{blockchainReceipt.electionId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timestamp</p>
                <p className="font-mono text-sm">{blockchainReceipt.timestamp}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction Hash</p>
              <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                <p className="font-mono text-xs flex-1 break-all">{blockchainReceipt.transactionHash}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(blockchainReceipt.transactionHash)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voting Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Participation</CardTitle>
            <CardDescription>Real-time voting statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={votingStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {votingStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Voted (65%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Not Voted (35%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Voting Activity</CardTitle>
            <CardDescription>Votes cast throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyVotes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#0055A5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Blockchain network and security status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Blockchain Network</p>
                <p className="text-sm text-muted-foreground">Online & Secure</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">ZKP Verification</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Vote Encryption</p>
                <p className="text-sm text-muted-foreground">256-bit SSL</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}