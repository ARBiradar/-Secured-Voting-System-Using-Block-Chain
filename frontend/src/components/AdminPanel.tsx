import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Alert, AlertDescription } from "./ui/alert";
import { Download, Search, AlertTriangle, Eye, UserCheck, UserX, Shield } from "lucide-react";

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'failed' | 'suspicious';
}

interface SuspiciousActivity {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  userId: string;
}

interface User {
  id: string;
  email: string;
  role: 'voter' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  hasVoted: boolean;
}

const mockAuditLogs: AuditLog[] = [
  { id: '1', userId: 'voter123', action: 'Login Attempt', timestamp: '2025-01-28 10:30:15', ip: '192.168.1.100', status: 'success' },
  { id: '2', userId: 'voter456', action: 'Vote Cast', timestamp: '2025-01-28 10:25:32', ip: '192.168.1.101', status: 'success' },
  { id: '3', userId: 'unknown', action: 'Failed Login', timestamp: '2025-01-28 10:20:45', ip: '10.0.0.50', status: 'suspicious' },
  { id: '4', userId: 'admin789', action: 'User Role Changed', timestamp: '2025-01-28 10:15:22', ip: '192.168.1.102', status: 'success' },
  { id: '5', userId: 'voter789', action: 'Multiple Login Attempts', timestamp: '2025-01-28 10:10:10', ip: '203.0.113.45', status: 'failed' },
];

const mockSuspiciousActivities: SuspiciousActivity[] = [
  { id: '1', type: 'Brute Force', description: 'Multiple failed login attempts from IP 203.0.113.45', severity: 'high', timestamp: '2025-01-28 10:10:10', userId: 'unknown' },
  { id: '2', type: 'Anomalous Voting', description: 'Rapid voting pattern detected', severity: 'medium', timestamp: '2025-01-28 09:45:30', userId: 'voter456' },
  { id: '3', type: 'Unusual Access', description: 'Admin panel access from new location', severity: 'low', timestamp: '2025-01-28 09:30:15', userId: 'admin123' },
];

const mockUsers: User[] = [
  { id: 'voter123', email: 'john.doe@email.com', role: 'voter', status: 'active', lastLogin: '2025-01-28 10:30:15', hasVoted: true },
  { id: 'voter456', email: 'jane.smith@email.com', role: 'voter', status: 'active', lastLogin: '2025-01-28 10:25:32', hasVoted: true },
  { id: 'voter789', email: 'bob.wilson@email.com', role: 'voter', status: 'suspended', lastLogin: '2025-01-28 08:15:20', hasVoted: false },
  { id: 'admin123', email: 'admin@securevote.com', role: 'admin', status: 'active', lastLogin: '2025-01-28 09:30:15', hasVoted: false },
  { id: 'voter101', email: 'alice.brown@email.com', role: 'voter', status: 'pending', lastLogin: 'Never', hasVoted: false },
];

export function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const downloadAuditTrail = () => {
    // Simulate download
    const data = mockAuditLogs.map(log => 
      `${log.timestamp},${log.userId},${log.action},${log.ip},${log.status}`
    ).join('\n');
    const blob = new Blob([`Timestamp,User ID,Action,IP Address,Status\n${data}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'suspicious': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">System monitoring and user management</p>
        </div>
        <Button onClick={downloadAuditTrail} className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Download Audit Trail
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Active Voters</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">856</p>
                <p className="text-sm text-muted-foreground">Votes Cast</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suspicious Activity Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Suspicious Activity Alerts</span>
          </CardTitle>
          <CardDescription>Recent security incidents requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSuspiciousActivities.map((activity) => (
              <Alert key={activity.id} className={`border ${getSeverityColor(activity.severity)}`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{activity.type}: {activity.description}</p>
                      <p className="text-sm opacity-75">User: {activity.userId} | {activity.timestamp}</p>
                    </div>
                    <Badge className={getSeverityColor(activity.severity)}>
                      {activity.severity.toUpperCase()}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Search, filter, and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="voter">Voter</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Voted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-sm">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                        {user.role.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUserStatusColor(user.status)}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{user.lastLogin}</TableCell>
                    <TableCell>
                      {user.hasVoted ? (
                        <Badge className="bg-green-100 text-green-800">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        {user.status === 'suspended' ? (
                          <Button size="sm" variant="outline" className="text-green-600">
                            <UserCheck className="w-3 h-3" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-red-600">
                            <UserX className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>Detailed system activity logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAuditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-mono text-sm">{log.userId}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}