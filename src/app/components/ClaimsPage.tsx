import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useClaims } from '@/app/contexts/ClaimsContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { MessageSquare, CheckCircle, Clock, AlertCircle, Search, FileText, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export function ClaimsPage() {
  const { getColor } = useTheme();
  const { claims, submitClaim, getClaim, getClaimsByEmail } = useClaims();
  
  // Submit form state
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Claim code display
  const [showClaimCode, setShowClaimCode] = useState(false);
  const [newClaimId, setNewClaimId] = useState('');
  const [copied, setCopied] = useState(false);

  // Date limits
  const today = new Date().toISOString().split('T')[0];
  const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];

  const handleSubmitClaim = () => {
    if (!itemName.trim() || !description.trim() || !dateLost || !contactEmail.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!contactEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const claimId = submitClaim(itemName, description, dateLost, contactEmail);
    
    // Show claim code
    setNewClaimId(claimId);
    setShowClaimCode(true);

    toast.success('Claim submitted successfully!', {
      description: `Your claim ID is ${claimId}. Save this for tracking.`
    });

    // Reset form
    setItemName('');
    setDescription('');
    setDateLost('');
    setContactEmail('');
  };

  const copyClaimId = () => {
    // Fallback copy method that works without clipboard API permissions
    const textArea = document.createElement('textarea');
    textArea.value = newClaimId;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
      toast.success('Claim ID copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      textArea.remove();
      // If even execCommand fails, show the ID in a toast
      toast.success('Your Claim ID', {
        description: newClaimId,
        duration: 5000
      });
    }
  };

  const handleCheckStatus = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a claim ID or email');
      return;
    }

    // Check if it's an email (contains @)
    if (searchQuery.includes('@')) {
      const results = getClaimsByEmail(searchQuery);
      if (results.length === 0) {
        toast.error('No claims found for this email');
        setShowResults(false);
      } else {
        setSearchResults(results);
        setShowResults(true);
        toast.success(`Found ${results.length} claim${results.length !== 1 ? 's' : ''}`);
      }
    } else {
      // Treat as claim ID
      const result = getClaim(searchQuery);
      if (!result) {
        toast.error('No claim found with this ID');
        setShowResults(false);
      } else {
        setSearchResults([result]);
        setShowResults(true);
        toast.success('Claim found!');
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified - Ready for Pickup';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Unable to Verify';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return getColor('accent3');
      case 'pending':
        return getColor('accent1Light');
      case 'rejected':
        return '#ef4444';
      default:
        return getColor('textSecondary');
    }
  };

  // Get user's claims (using student@school.edu as example)
  const userClaims = getClaimsByEmail('student@school.edu');

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgSecondary') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="p-4 rounded-2xl"
              style={{
                background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Light')})`
              }}
            >
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Claims Portal
          </h1>
          <p className="text-xl" style={{ color: getColor('textSecondary') }}>
            Submit and track your item claims securely
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Submit New Claim */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className="border-2 shadow-xl h-full"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-2xl" style={{ color: getColor('textPrimary') }}>
                  <FileText className="mr-2 h-6 w-6" style={{ color: getColor('accent2') }} />
                  Submit New Claim
                </CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Fill out the form to claim an item you've lost
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                    Item Name *
                  </label>
                  <Input
                    placeholder="What did you lose?"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    style={{
                      backgroundColor: getColor('bgPrimary'),
                      borderColor: getColor('border'),
                      color: getColor('textPrimary')
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                    Description *
                  </label>
                  <Textarea
                    placeholder="Provide details to help verify ownership..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      backgroundColor: getColor('bgPrimary'),
                      borderColor: getColor('border'),
                      color: getColor('textPrimary')
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                    Date Lost *
                  </label>
                  <Input
                    type="date"
                    value={dateLost}
                    onChange={(e) => setDateLost(e.target.value)}
                    max={today}
                    min={oneYearAgo}
                    style={{
                      backgroundColor: getColor('bgPrimary'),
                      borderColor: getColor('border'),
                      color: getColor('textPrimary')
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                    Contact Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@school.edu"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{
                      backgroundColor: getColor('bgPrimary'),
                      borderColor: getColor('border'),
                      color: getColor('textPrimary')
                    }}
                  />
                </div>
                <Button
                  className="w-full text-white cursor-pointer"
                  onClick={handleSubmitClaim}
                  style={{
                    background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`
                  }}
                >
                  Submit Claim
                </Button>

                {/* Claim Code Display */}
                {showClaimCode && (
                  <div
                    className="mt-4 p-4 rounded-lg border-2"
                    style={{
                      backgroundColor: `${getColor('accent2')}10`,
                      borderColor: `${getColor('accent2')}30`
                    }}
                  >
                    <h3 className="font-semibold mb-3 text-lg" style={{ color: getColor('textPrimary') }}>
                      Your Claim ID
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold" style={{ color: getColor('textPrimary') }}>
                        {newClaimId}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyClaimId}
                        className="cursor-pointer"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Track Existing Claim */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="border-2 shadow-xl h-full"
              style={{
                backgroundColor: getColor('bgCard'),
                borderColor: getColor('border')
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-2xl" style={{ color: getColor('textPrimary') }}>
                  <Search className="mr-2 h-6 w-6" style={{ color: getColor('accent2') }} />
                  Track Your Claim
                </CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Enter your claim ID or email to check status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                    Claim ID or Email
                  </label>
                  <Input
                    placeholder="CLM-2026-001 or your.email@school.edu"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckStatus()}
                    style={{
                      backgroundColor: getColor('bgPrimary'),
                      borderColor: getColor('border'),
                      color: getColor('textPrimary')
                    }}
                  />
                </div>
                <Button
                  className="w-full text-white cursor-pointer"
                  onClick={handleCheckStatus}
                  style={{
                    background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Check Status
                </Button>

                {/* Search Results */}
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold" style={{ color: getColor('textPrimary') }}>
                          Found {searchResults.length} claim{searchResults.length !== 1 ? 's' : ''}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowResults(false);
                            setSearchQuery('');
                          }}
                          className="cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {searchResults.map((claim) => (
                        <div
                          key={claim.id}
                          className="p-4 rounded-lg border-2"
                          style={{
                            backgroundColor: getColor('bgPrimary'),
                            borderColor: getStatusColor(claim.status)
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-bold text-sm" style={{ color: getColor('textPrimary') }}>
                                {claim.itemName}
                              </p>
                              <p className="text-xs" style={{ color: getColor('textTertiary') }}>
                                ID: {claim.id}
                              </p>
                            </div>
                            {getStatusIcon(claim.status)}
                          </div>
                          <p className="text-xs mb-2" style={{ color: getColor('textSecondary') }}>
                            {getStatusText(claim.status)}
                          </p>
                          {claim.adminNotes && (
                            <p className="text-xs italic" style={{ color: getColor('textTertiary') }}>
                              "{claim.adminNotes}"
                            </p>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* How It Works */}
                <div
                  className="mt-6 p-4 rounded-lg border-2"
                  style={{
                    backgroundColor: `${getColor('accent2')}10`,
                    borderColor: `${getColor('accent2')}30`
                  }}
                >
                  <h3 className="font-semibold mb-3 text-lg" style={{ color: getColor('textPrimary') }}>
                    Verification Process
                  </h3>
                  <ol className="space-y-2 text-sm" style={{ color: getColor('textSecondary') }}>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold" style={{ color: getColor('accent2') }}>1.</span>
                      Submit your claim with detailed description
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold" style={{ color: getColor('accent2') }}>2.</span>
                      Admin reviews and verifies information
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold" style={{ color: getColor('accent2') }}>3.</span>
                      You receive notification of approval/rejection
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold" style={{ color: getColor('accent2') }}>4.</span>
                      Pick up your item at the designated location
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Claims */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: getColor('textPrimary') }}>
            Your Recent Claims
          </h2>
          {userClaims.length === 0 ? (
            <div
              className="p-12 text-center rounded-2xl border-2 border-dashed"
              style={{
                borderColor: getColor('border'),
                backgroundColor: `${getColor('bgCard')}80`
              }}
            >
              <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-30" style={{ color: getColor('textSecondary') }} />
              <p className="text-lg font-medium mb-2" style={{ color: getColor('textPrimary') }}>
                No claims submitted yet
              </p>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                Submit your first claim using the form above
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {userClaims.map((claim, index) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card
                    className="border-2 shadow-md hover:shadow-lg transition-all"
                    style={{
                      backgroundColor: getColor('bgCard'),
                      borderColor: getColor('border')
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold" style={{ color: getColor('textPrimary') }}>
                              {claim.itemName}
                            </h3>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(claim.status)}
                              <span className="text-sm font-medium" style={{ color: getColor('textSecondary') }}>
                                {getStatusText(claim.status)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm mb-1" style={{ color: getColor('textSecondary') }}>
                            {claim.description}
                          </p>
                          {claim.adminNotes && (
                            <p className="text-sm mb-2 italic p-2 rounded" style={{ 
                              color: getColor('textTertiary'),
                              backgroundColor: `${getColor('accent2')}10`
                            }}>
                              Admin: "{claim.adminNotes}"
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs" style={{ color: getColor('textTertiary') }}>
                            <span>ID: {claim.id}</span>
                            <span>•</span>
                            <span>Submitted: {new Date(claim.submittedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}