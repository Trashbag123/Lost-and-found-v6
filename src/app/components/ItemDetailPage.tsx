import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { toast } from 'sonner';
import { MapPin, Calendar, User, Mail, ArrowLeft, QrCode, Share2, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { celebrateClaim } from '@/app/utils/confetti';

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addClaim } = useItems();
  const { getColor } = useTheme();
  const [open, setOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const item = items.find(i => i.id === id);

  const [claimData, setClaimData] = useState({
    claimantName: '',
    claimantEmail: '',
    claimantPhone: '',
    description: ''
  });

  if (!item) {
    return (
      <div className="min-h-screen py-16" style={{ backgroundColor: getColor('bgPrimary') }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${getColor('accent1')}10` }}
          >
            <Package className="h-12 w-12" style={{ color: `${getColor('accent1')}50` }} />
          </div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: getColor('textPrimary') }}>
            Item Not Found
          </h1>
          <p className="mb-6" style={{ color: getColor('textSecondary') }}>
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            onClick={() => navigate('/items')}
            className="rounded-xl text-white"
            style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!claimData.claimantName || !claimData.claimantEmail || !claimData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    addClaim({
      itemId: item.id,
      ...claimData
    });

    // Celebrate with confetti!
    celebrateClaim();
    
    toast.success('Claim submitted successfully! 🎉', {
      description: 'We will review your claim and contact you soon.'
    });
    setOpen(false);
    setClaimData({
      claimantName: '',
      claimantEmail: '',
      claimantPhone: '',
      description: ''
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="border-0 text-white text-base px-4 py-1.5" style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}>Available to Claim</Badge>;
      case 'claimed':
        return <Badge className="border-0 text-white text-base px-4 py-1.5" style={{ backgroundColor: getColor('textTertiary') }}>Already Claimed</Badge>;
      case 'pending':
        return <Badge className="border-0 text-white text-base px-4 py-1.5" style={{ background: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})` }}>Pending Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const itemUrl = window.location.href;

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/items')}
            className="mb-6 rounded-xl"
            style={{ color: getColor('textSecondary') }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden" style={{ backgroundColor: getColor('bgCard') }}>
                {item.imageUrl ? (
                  <div className="relative group">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full object-cover aspect-square"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center" style={{ backgroundColor: `${getColor('accent1')}10` }}>
                    <Package className="h-32 w-32" style={{ color: `${getColor('accent1')}40` }} />
                  </div>
                )}
              </Card>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowQR(!showQR)}
                  className="border-2 rounded-xl h-12"
                  style={{ borderColor: getColor('accent1'), color: getColor('accent1') }}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  {showQR ? 'Hide' : 'Show'} QR Code
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      // Try modern clipboard API first
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(itemUrl);
                        toast.success('Link copied to clipboard!');
                      } else {
                        // Fallback for browsers that don't support clipboard API
                        const textArea = document.createElement('textarea');
                        textArea.value = itemUrl;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        textArea.style.top = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        try {
                          document.execCommand('copy');
                          toast.success('Link copied to clipboard!');
                        } catch (err) {
                          toast.error('Unable to copy link');
                        }
                        textArea.remove();
                      }
                    } catch (err) {
                      // If clipboard API fails, try fallback method
                      const textArea = document.createElement('textarea');
                      textArea.value = itemUrl;
                      textArea.style.position = 'fixed';
                      textArea.style.left = '-999999px';
                      textArea.style.top = '-999999px';
                      document.body.appendChild(textArea);
                      textArea.focus();
                      textArea.select();
                      try {
                        document.execCommand('copy');
                        toast.success('Link copied to clipboard!');
                      } catch (fallbackErr) {
                        toast.error('Unable to copy link');
                      }
                      textArea.remove();
                    }
                  }}
                  className="border-2 rounded-xl h-12"
                  style={{ borderColor: getColor('accent2'), color: getColor('accent2') }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              {/* QR Code Display */}
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <Card className="border-0 shadow-lg rounded-2xl p-6" style={{ backgroundColor: getColor('bgCard') }}>
                    <div className="text-center">
                      <h3 className="font-semibold mb-4" style={{ color: getColor('textPrimary') }}>Scan to View Item</h3>
                      <div className="bg-white p-6 rounded-2xl inline-block shadow-md">
                        <QRCodeSVG
                          value={itemUrl}
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="text-sm mt-4" style={{ color: getColor('textSecondary') }}>Share this QR code to help spread the word</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>

            {/* Details Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h1 className="text-4xl font-bold" style={{ color: getColor('textPrimary') }}>{item.title}</h1>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="text-base px-3 py-1"
                    style={{ backgroundColor: `${getColor('accent1')}15`, color: getColor('accent1'), borderColor: `${getColor('accent1')}30` }}
                  >
                    {item.category}
                  </Badge>
                </div>
              </div>

              <Card className="border-0 shadow-lg rounded-2xl" style={{ backgroundColor: getColor('bgCard') }}>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed" style={{ color: getColor('textSecondary') }}>{item.description}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl" style={{ backgroundColor: getColor('bgCard') }}>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>Location & Date</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getColor('accent1')}15` }}>
                      <MapPin className="h-5 w-5" style={{ color: getColor('accent1') }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: getColor('textPrimary') }}>Found at</div>
                      <div style={{ color: getColor('textSecondary') }}>{item.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getColor('accent1')}15` }}>
                      <Calendar className="h-5 w-5" style={{ color: getColor('accent1') }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: getColor('textPrimary') }}>Date Found</div>
                      <div style={{ color: getColor('textSecondary') }}>{new Date(item.dateFound).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl" style={{ backgroundColor: getColor('bgCard') }}>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>Contact Information</CardTitle>
                  <CardDescription style={{ color: getColor('textSecondary') }}>Submitted by a community member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getColor('accent2')}15` }}>
                      <User className="h-5 w-5" style={{ color: getColor('accent2') }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: getColor('textPrimary') }}>Submitted by</div>
                      <div style={{ color: getColor('textSecondary') }}>{item.submittedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getColor('accent2')}15` }}>
                      <Mail className="h-5 w-5" style={{ color: getColor('accent2') }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: getColor('textPrimary') }}>Email</div>
                      <div style={{ color: getColor('textSecondary') }}>{item.contactEmail}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Button or Status Message */}
              {item.status === 'approved' && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg shadow-lg rounded-xl font-semibold text-white"
                      style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                    >
                      Claim This Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Submit a Claim</DialogTitle>
                      <DialogDescription className="text-base">
                        Fill out this form to claim "{item.title}". Staff will verify your information and contact you.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleClaimSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="claimantName" className="text-base font-semibold">Your Name *</Label>
                        <Input
                          id="claimantName"
                          value={claimData.claimantName}
                          onChange={(e) => setClaimData(prev => ({ ...prev, claimantName: e.target.value }))}
                          placeholder="Enter your full name"
                          className="border-2 rounded-xl h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="claimantEmail" className="text-base font-semibold">Your Email *</Label>
                        <Input
                          id="claimantEmail"
                          type="email"
                          value={claimData.claimantEmail}
                          onChange={(e) => setClaimData(prev => ({ ...prev, claimantEmail: e.target.value }))}
                          placeholder="your.email@school.edu"
                          className="border-2 rounded-xl h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="claimantPhone" className="text-base font-semibold">Your Phone</Label>
                        <Input
                          id="claimantPhone"
                          type="tel"
                          value={claimData.claimantPhone}
                          onChange={(e) => setClaimData(prev => ({ ...prev, claimantPhone: e.target.value }))}
                          placeholder="(123) 456-7890"
                          className="border-2 rounded-xl h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-semibold">Why is this yours? *</Label>
                        <Textarea
                          id="description"
                          value={claimData.description}
                          onChange={(e) => setClaimData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe distinguishing features, contents, or other proof of ownership..."
                          rows={5}
                          className="border-2 rounded-xl resize-none"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          className="flex-1 h-12 rounded-xl font-semibold text-white"
                          style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                        >
                          Submit Claim
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpen(false)}
                          className="flex-1 h-12 border-2 rounded-xl font-semibold"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}

              {item.status === 'claimed' && (
                <div
                  className="border-2 rounded-2xl p-6 text-center"
                  style={{ backgroundColor: `${getColor('textTertiary')}10`, borderColor: `${getColor('textTertiary')}30` }}
                >
                  <p className="font-medium" style={{ color: getColor('textSecondary') }}>
                    This item has been claimed and is no longer available.
                  </p>
                </div>
              )}

              {item.status === 'pending' && (
                <div
                  className="border-2 rounded-2xl p-6 text-center"
                  style={{ backgroundColor: `${getColor('accent3')}10`, borderColor: `${getColor('accent3')}30` }}
                >
                  <p className="font-medium" style={{ color: getColor('accent3') }}>
                    This item is pending admin approval and will be available soon.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}