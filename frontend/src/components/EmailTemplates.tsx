import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Mail, CheckCircle, AlertTriangle, Shield, ExternalLink } from "lucide-react";

export function EmailTemplatePreview() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Email Template Previews</h1>
        <p className="text-muted-foreground">HTML email templates for SecureVote notifications</p>
      </div>

      {/* Welcome Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span>Welcome Email Template</span>
          </CardTitle>
          <CardDescription>welcome.html - New user onboarding email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-200">
            <div className="bg-white max-w-lg mx-auto rounded-lg shadow-sm border">
              {/* Email Header */}
              <div className="bg-primary text-white p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold">SecureVote</h1>
                <p className="text-sm opacity-90">Blockchain-Powered Democracy</p>
              </div>
              
              {/* Email Body */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3">Welcome to SecureVote!</h2>
                <p className="text-gray-600 mb-4">
                  Dear {{userName}},
                </p>
                <p className="text-gray-600 mb-4">
                  Your SecureVote account has been successfully created. You can now participate in secure, transparent blockchain-based voting.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Your Voter ID:</strong> {{voterId}}
                  </p>
                </div>
                <div className="text-center mb-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    Access Your Dashboard
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  If you didn't create this account, please contact support immediately.
                </p>
              </div>
              
              {/* Email Footer */}
              <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
                <p>&copy; 2025 SecureVote. All rights reserved.</p>
                <p>support@securevote.com | +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vote Confirmation Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Vote Confirmation Email Template</span>
          </CardTitle>
          <CardDescription>voteConfirmation.html - Blockchain receipt email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-200">
            <div className="bg-white max-w-lg mx-auto rounded-lg shadow-sm border">
              {/* Email Header */}
              <div className="bg-green-600 text-white p-6 text-center">
                <div className="flex justify-center mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold">Vote Confirmed</h1>
                <p className="text-sm opacity-90">Your vote has been recorded</p>
              </div>
              
              {/* Email Body */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3">Thank you for voting!</h2>
                <p className="text-gray-600 mb-4">
                  Dear {{userName}},
                </p>
                <p className="text-gray-600 mb-4">
                  Your vote has been successfully recorded on the blockchain. Here are your receipt details:
                </p>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-green-800 mb-2">Blockchain Receipt</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Voter ID:</strong> {{voterId}}</p>
                    <p><strong>Election ID:</strong> {{electionId}}</p>
                    <p><strong>Timestamp:</strong> {{voteTime}}</p>
                    <p><strong>Transaction Hash:</strong></p>
                    <p className="font-mono text-xs break-all bg-white p-2 rounded border">{{transactionHash}}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Your vote is now permanently and securely recorded on the blockchain, ensuring transparency and immutability.
                </p>
                
                <div className="text-center">
                  <Button variant="outline">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Blockchain
                  </Button>
                </div>
              </div>
              
              {/* Email Footer */}
              <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
                <p>&copy; 2025 SecureVote. All rights reserved.</p>
                <p>support@securevote.com | +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Notification Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Error Notification Email Template</span>
          </CardTitle>
          <CardDescription>errorNotification.html - System error alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-200">
            <div className="bg-white max-w-lg mx-auto rounded-lg shadow-sm border">
              {/* Email Header */}
              <div className="bg-red-600 text-white p-6 text-center">
                <div className="flex justify-center mb-3">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold">System Notice</h1>
                <p className="text-sm opacity-90">Action required</p>
              </div>
              
              {/* Email Body */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3">System Notification</h2>
                <p className="text-gray-600 mb-4">
                  Dear {{userName}},
                </p>
                <p className="text-gray-600 mb-4">
                  We detected an issue with your account that requires your attention:
                </p>
                
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-red-800 mb-2">{{errorMessage}}</h3>
                  <p className="text-sm text-red-700">
                    Please contact our support team if you believe this is an error or if you need assistance.
                  </p>
                </div>
                
                <div className="text-center mb-4">
                  <Button variant="destructive">
                    Contact Support
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500">
                  For your security, do not share your account credentials with anyone.
                </p>
              </div>
              
              {/* Email Footer */}
              <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
                <p>&copy; 2025 SecureVote. All rights reserved.</p>
                <p>{{supportLink}} | +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Alert Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-orange-600" />
            <span>Admin Alert Email Template</span>
          </CardTitle>
          <CardDescription>adminAlert.html - Security and system alerts for administrators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-200">
            <div className="bg-white max-w-lg mx-auto rounded-lg shadow-sm border">
              {/* Email Header */}
              <div className="bg-orange-600 text-white p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold">Security Alert</h1>
                <p className="text-sm opacity-90">Immediate attention required</p>
              </div>
              
              {/* Email Body */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3">Administrative Alert</h2>
                <p className="text-gray-600 mb-4">
                  Administrator,
                </p>
                <p className="text-gray-600 mb-4">
                  Suspicious activity has been detected on the SecureVote platform:
                </p>
                
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-orange-800 mb-2">Alert Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Type:</strong> {{alertType}}</p>
                    <p><strong>Description:</strong> {{alertDetails}}</p>
                    <p><strong>Timestamp:</strong> {{alertTime}}</p>
                    <p><strong>Affected User:</strong> {{userId}}</p>
                    <p><strong>IP Address:</strong> {{ipAddress}}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Recommended Action:</strong> Review the admin panel and investigate this activity immediately.
                  </p>
                </div>
                
                <div className="text-center">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Access Admin Panel
                  </Button>
                </div>
              </div>
              
              {/* Email Footer */}
              <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
                <p>&copy; 2025 SecureVote. All rights reserved.</p>
                <p>security@securevote.com | Emergency: +1 (555) 911-0000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSS Styling Information */}
      <Card>
        <CardHeader>
          <CardTitle>Email Styling Guidelines</CardTitle>
          <CardDescription>emailStyles.css - Shared styling for all email templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <pre>{`/* SecureVote Email Styles */
.email-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.email-header {
  background-color: #0055A5;
  color: white;
  padding: 24px;
  text-align: center;
}

.email-body {
  padding: 24px;
  background-color: white;
}

.email-footer {
  background-color: #f8f9fa;
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: #6c757d;
  border-top: 1px solid #dee2e6;
}

.button-primary {
  background-color: #0055A5;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  display: inline-block;
}

.alert-box {
  padding: 16px;
  border-radius: 6px;
  margin: 16px 0;
}

.alert-success { background-color: #d4edda; border: 1px solid #c3e6cb; }
.alert-warning { background-color: #fff3cd; border: 1px solid #ffeaa7; }
.alert-danger { background-color: #f8d7da; border: 1px solid #f5c6cb; }`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}