import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { CheckCircle, User, ArrowLeft, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Candidate {
  id: string;
  name: string;
  party: string;
  photo: string;
  bio: string;
}

interface VotePageProps {
  onBack: () => void;
  onVoteSubmit: (candidateId: string, transactionHash: string) => void;
}

const candidates: Candidate[] = [
  {
    id: "candidate-1",
    name: "Sarah Johnson",
    party: "Democratic Party",
    photo: "https://images.unsplash.com/photo-1734637019880-d2c7d06ce56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwb2xpdGljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2Mzc1MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bio: "Former state senator with 15 years of public service experience, focusing on education and healthcare reform."
  },
  {
    id: "candidate-2",
    name: "Michael Rodriguez",
    party: "Republican Party",
    photo: "https://images.unsplash.com/photo-1693035730007-fbc2c14c6814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb2xpdGljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzA0MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bio: "Business leader and military veteran committed to economic growth, fiscal responsibility, and strong defense."
  },
  {
    id: "candidate-3",
    name: "Dr. James Chen",
    party: "Independent",
    photo: "https://images.unsplash.com/photo-1551862390-7894b509f8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjMzMTc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bio: "Environmental scientist and policy expert advocating for climate action and sustainable development."
  }
];

export function VotePage({ onBack, onVoteSubmit }: VotePageProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zkpStatus, setZkpStatus] = useState<'idle' | 'processing' | 'verified'>('idle');

  const handleVoteClick = () => {
    if (!selectedCandidate) return;
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    setIsSubmitting(true);
    setZkpStatus('processing');
    
    // Simulate ZKP processing and blockchain submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setZkpStatus('verified');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock transaction hash
    const transactionHash = `0x${Math.random().toString(16).substring(2, 42).padStart(40, '0')}`;
    
    setIsSubmitting(false);
    setShowConfirmation(false);
    onVoteSubmit(selectedCandidate, transactionHash);
  };

  const getSelectedCandidate = () => {
    return candidates.find(c => c.id === selectedCandidate);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Cast Your Vote</h1>
          <p className="text-muted-foreground">2025 General Election - Choose your candidate</p>
        </div>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Secure Voting Process</p>
              <p className="text-sm text-blue-700">Your vote is encrypted and recorded on the blockchain for transparency and immutability.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Your Candidate</CardTitle>
          <CardDescription>Choose one candidate to cast your vote</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="relative">
                  <Label
                    htmlFor={candidate.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1" />
                    
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={candidate.photo}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{candidate.name}</h3>
                          <Badge variant="outline">{candidate.party}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.bio}</p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Submit Vote */}
      <div className="flex justify-center">
        <Button
          onClick={handleVoteClick}
          disabled={!selectedCandidate}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground min-w-48"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          SUBMIT VOTE
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Please review your selection before submitting to the blockchain
            </DialogDescription>
          </DialogHeader>
          
          {getSelectedCandidate() && (
            <div className="py-4">
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                  <ImageWithFallback
                    src={getSelectedCandidate()!.photo}
                    alt={getSelectedCandidate()!.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{getSelectedCandidate()!.name}</p>
                  <p className="text-sm text-muted-foreground">{getSelectedCandidate()!.party}</p>
                </div>
              </div>
            </div>
          )}

          {zkpStatus !== 'idle' && (
            <div className="py-2">
              <div className="flex items-center space-x-2 text-sm">
                {zkpStatus === 'processing' && (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Zero-Knowledge Proof...</span>
                  </>
                )}
                {zkpStatus === 'verified' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">ZKP Verified - Submitting to blockchain...</span>
                  </>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmVote}
              disabled={isSubmitting}
              className="bg-accent hover:bg-accent/90"
            >
              {isSubmitting ? "Submitting..." : "Confirm Vote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}