import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LoginPage } from "./components/LoginPage";
import { VoterDashboard } from "./components/VoterDashboard";
import { VotePage } from "./components/VotePage";
import { AdminPanel } from "./components/AdminPanel";
import { NotFoundPage, AccessDeniedPage, SessionExpiredPage } from "./components/ErrorPages";
import { EmailTemplatePreview } from "./components/EmailTemplates";

type Page = 'login' | 'voter-dashboard' | 'vote' | 'admin-panel' | 'email-templates' | '404' | 'access-denied' | 'session-expired';
type UserRole = 'voter' | 'admin';

interface User {
  email: string;
  role: UserRole;
  name: string;
  voterId: string;
}

interface BlockchainReceipt {
  electionId: string;
  timestamp: string;
  transactionHash: string;
}

// Demo user accounts
const demoUsers: Record<string, { password: string; user: User }> = {
  'voter@demo.com': {
    password: 'password123',
    user: {
      email: 'voter@demo.com',
      role: 'voter',
      name: 'John Doe',
      voterId: 'VTR-2025-001247'
    }
  },
  'admin@demo.com': {
    password: 'admin123',
    user: {
      email: 'admin@demo.com',
      role: 'admin',
      name: 'Admin User',
      voterId: 'ADM-2025-000001'
    }
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>('');
  const [hasVoted, setHasVoted] = useState(false);
  const [blockchainReceipt, setBlockchainReceipt] = useState<BlockchainReceipt | null>(null);

  const handleLogin = (email: string, password: string) => {
    const account = demoUsers[email];
    
    if (!account || account.password !== password) {
      setLoginError('Invalid email or password');
      return;
    }

    setCurrentUser(account.user);
    setLoginError('');
    
    // Route based on role
    if (account.user.role === 'admin') {
      setCurrentPage('admin-panel');
    } else {
      setCurrentPage('voter-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setHasVoted(false);
    setBlockchainReceipt(null);
    setLoginError('');
  };

  const handleVote = () => {
    setCurrentPage('vote');
  };

  const handleBackToDashboard = () => {
    if (currentUser?.role === 'admin') {
      setCurrentPage('admin-panel');
    } else {
      setCurrentPage('voter-dashboard');
    }
  };

  const handleVoteSubmit = (candidateId: string, transactionHash: string) => {
    // Generate blockchain receipt
    const receipt: BlockchainReceipt = {
      electionId: 'ELC-2025-GENERAL',
      timestamp: new Date().toLocaleString(),
      transactionHash: transactionHash
    };

    setHasVoted(true);
    setBlockchainReceipt(receipt);
    setCurrentPage('voter-dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} error={loginError} />;
      
      case 'voter-dashboard':
        if (!currentUser || currentUser.role !== 'voter') {
          return <AccessDeniedPage onLogin={handleLogout} onHome={handleBackToDashboard} />;
        }
        return (
          <VoterDashboard
            userName={currentUser.name}
            voterId={currentUser.voterId}
            hasVoted={hasVoted}
            blockchainReceipt={blockchainReceipt}
            onVote={handleVote}
          />
        );
      
      case 'vote':
        if (!currentUser || currentUser.role !== 'voter') {
          return <AccessDeniedPage onLogin={handleLogout} onHome={handleBackToDashboard} />;
        }
        if (hasVoted) {
          setCurrentPage('voter-dashboard');
          return null;
        }
        return (
          <VotePage
            onBack={handleBackToDashboard}
            onVoteSubmit={handleVoteSubmit}
          />
        );
      
      case 'admin-panel':
        if (!currentUser || currentUser.role !== 'admin') {
          return <AccessDeniedPage onLogin={handleLogout} onHome={handleBackToDashboard} />;
        }
        return <AdminPanel />;
      
      case 'email-templates':
        return <EmailTemplatePreview />;
      
      case '404':
        return <NotFoundPage onHome={handleBackToDashboard} />;
      
      case 'access-denied':
        return <AccessDeniedPage onLogin={handleLogout} onHome={handleBackToDashboard} />;
      
      case 'session-expired':
        return <SessionExpiredPage onLogin={handleLogout} />;
      
      default:
        return <NotFoundPage onHome={handleBackToDashboard} />;
    }
  };

  const isFullScreenPage = ['login', '404', 'access-denied', 'session-expired'].includes(currentPage);

  if (isFullScreenPage) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        userName={currentUser?.name}
        userRole={currentUser?.role}
        isAuthenticated={!!currentUser}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}