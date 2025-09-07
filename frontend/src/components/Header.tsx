import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Shield, User, LogOut } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userRole?: 'voter' | 'admin';
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Header({ userName, userRole, isAuthenticated, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">SecureVote</h1>
              <p className="text-sm text-muted-foreground">Blockchain-Powered Democracy</p>
            </div>
          </div>

          {/* Navigation and User Info */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Welcome, {userName}</span>
                <Badge variant={userRole === 'admin' ? 'destructive' : 'default'}>
                  {userRole?.toUpperCase()}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}