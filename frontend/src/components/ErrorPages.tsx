import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, Home, LogIn, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  onHome?: () => void;
  onLogin?: () => void;
  onRefresh?: () => void;
}

export function NotFoundPage({ onHome }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-4xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-2">Lost in Cyberspace</h2>
          <p className="text-muted-foreground">
            The page you're looking for seems to have drifted into the digital void.
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Don't worry, even in the most secure voting systems, sometimes we take a wrong turn.
            </p>
            <Button onClick={onHome} className="w-full bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AccessDeniedPage({ onLogin, onHome }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-4xl font-bold text-destructive mb-2">403</h1>
          <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this secure area.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span>Security Notice</span>
            </CardTitle>
            <CardDescription>
              This action requires proper authentication and authorization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={onLogin} variant="outline" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Login with Different Account
            </Button>
            <Button onClick={onHome} className="w-full bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SessionExpiredPage({ onLogin }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl mb-4">⏰</div>
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Session Expired</h1>
          <h2 className="text-xl font-semibold mb-2">Please Login Again</h2>
          <p className="text-muted-foreground">
            Your secure session has expired for your protection.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Timeout</CardTitle>
            <CardDescription>
              For your security, voting sessions automatically expire after a period of inactivity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                Your voting progress has been securely saved on the blockchain.
              </p>
            </div>
            
            <Button onClick={onLogin} className="w-full bg-primary hover:bg-primary/90">
              <LogIn className="w-4 h-4 mr-2" />
              Login Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SystemErrorPage({ onRefresh, onHome }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-destructive mb-2">System Error</h1>
          <h2 className="text-xl font-semibold mb-2">Temporary Service Interruption</h2>
          <p className="text-muted-foreground">
            We're experiencing technical difficulties. Please try again in a moment.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span>Service Status</span>
            </CardTitle>
            <CardDescription>
              Our blockchain network is temporarily unavailable. Your data is safe.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                All votes and user data remain secure on the distributed ledger.
              </p>
            </div>
            
            <Button onClick={onRefresh} variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={onHome} className="w-full bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}