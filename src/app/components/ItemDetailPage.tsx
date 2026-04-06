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
import { MapPin, Calendar, User, Mail, ArrowLeft, QrCode, Share2, Printer, Package } from 'lucide-react';
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
        return <Badge className="bg-gradient-to-r from-[#7C9885] to-[#A4C2AD] border-0 text-white text-base px-4 py-1.5">Available to Claim</Badge>;
      case 'claimed':
        return <Badge className="bg-gradient-to-r from-[#636E72] to-[#95A5A6] border-0 text-white text-base px-4 py-1.5">Already Claimed</Badge>;
      case 'pending':
        return <Badge className="bg-gradient-to-r from-[#E09F7D] to-[#F0B896] border-0 text-white text-base px-4 py-1.5">Pending Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const itemUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[#FDFCFA] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/items')}
            className="mb-6 hover:bg-[#7C9885]/5 rounded-xl"
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
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
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
                  <div className="w-full aspect-square bg-gradient-to-br from-[#7C9885]/10 to-[#A4C2AD]/10 flex items-center justify-center">
                    <Package className="h-32 w-32 text-[#7C9885]/30" />
                  </div>
                )}
              </Card>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowQR(!showQR)}
                  className="border-2 border-[#7C9885] text-[#7C9885] hover:bg-[#7C9885]/5 rounded-xl h-12"
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
                  className="border-2 border-[#B4A5C5] text-[#B4A5C5] hover:bg-[#B4A5C5]/5 rounded-xl h-12"
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
                  <Card className="border-0 shadow-lg rounded-2xl p-6 bg-white/90 backdrop-blur-sm">
                    <div className="text-center">
                      <h3 className="font-semibold text-[#2D3436] mb-4">Scan to View Item</h3>
                      <div className="bg-white p-6 rounded-2xl inline-block shadow-md">
                        <QRCodeSVG 
                          value={itemUrl} 
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="text-sm text-[#636E72] mt-4">Share this QR code to help spread the word</p>
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
                  <h1 className="text-4xl font-bold text-[#2D3436]">{item.title}</h1>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-[#7C9885]/10 text-[#7C9885] border-[#7C9885]/20 text-base px-3 py-1">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-[#2D3436]">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#636E72] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-[#2D3436]">Location & Date</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#7C9885]/10 to-[#A4C2AD]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#7C9885]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D3436]">Found at</div>
                      <div className="text-[#636E72]">{item.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#7C9885]/10 to-[#A4C2AD]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#7C9885]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D3436]">Date Found</div>
                      <div className="text-[#636E72]">{new Date(item.dateFound).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-[#2D3436]">Contact Information</CardTitle>
                  <CardDescription>Submitted by a helpful community member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#B4A5C5]/10 to-[#D4C5E0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-[#B4A5C5]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D3436]">Submitted by</div>
                      <div className="text-[#636E72]">{item.submittedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#B4A5C5]/10 to-[#D4C5E0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#B4A5C5]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D3436]">Email</div>
                      <div className="text-[#636E72]">{item.contactEmail}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Button or Status Message */}
              {item.status === 'approved' && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full h-14 text-lg bg-gradient-to-r from-[#7C9885] to-[#A4C2AD] hover:from-[#6B8774] hover:to-[#7C9885] shadow-lg hover:shadow-xl rounded-xl font-semibold">
                      Claim This Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Submit a Claim</DialogTitle>
                      <DialogDescription className="text-base">
                        Fill out this form to claim "{item.title}". We will verify your information and contact you within 24 hours.
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
                          className="border-2 border-[#E8E5E0] focus:border-[#7C9885] rounded-xl h-12"
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
                          className="border-2 border-[#E8E5E0] focus:border-[#7C9885] rounded-xl h-12"
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
                          className="border-2 border-[#E8E5E0] focus:border-[#7C9885] rounded-xl h-12"
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
                          className="border-2 border-[#E8E5E0] focus:border-[#7C9885] rounded-xl resize-none"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button 
                          type="submit" 
                          className="flex-1 h-12 bg-gradient-to-r from-[#7C9885] to-[#A4C2AD] hover:from-[#6B8774] hover:to-[#7C9885] rounded-xl font-semibold"
                        >
                          Submit Claim
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setOpen(false)}
                          className="flex-1 h-12 border-2 border-[#E8E5E0] rounded-xl font-semibold"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}

              {item.status === 'claimed' && (
                <div className="bg-[#636E72]/10 border-2 border-[#636E72]/20 rounded-2xl p-6 text-center">
                  <p className="text-[#636E72] font-medium">
                    This item has been claimed and is no longer available.
                  </p>
                </div>
              )}

              {item.status === 'pending' && (
                <div className="bg-[#E09F7D]/10 border-2 border-[#E09F7D]/20 rounded-2xl p-6 text-center">
                  <p className="text-[#E09F7D] font-medium">
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