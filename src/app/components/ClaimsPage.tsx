import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useClaims } from '@/app/contexts/ClaimsContext';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { AlertCircle, CheckCircle, Clock, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import type { Claim } from '@/app/contexts/ClaimsContext';

export function ClaimsPage() {
  const { getColor } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { submitClaim, getClaim, getClaimsByEmail } = useClaims();

  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email ?? '');

  const [trackQuery, setTrackQuery] = useState('');
  const [trackResults, setTrackResults] = useState<Claim[]>([]);
  const [tracked, setTracked] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !description.trim() || !dateLost || !contactEmail.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      toast.error('Enter a valid email address');
      return;
    }
    const id = submitClaim(itemName, description, dateLost, contactEmail);
    toast.success(`Request submitted — your ID is ${id}`, { duration: 5000 });
    setItemName('');
    setDescription('');
    setDateLost('');
    if (!user) setContactEmail('');
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    if (trackQuery.includes('@')) {
      const results = getClaimsByEmail(trackQuery);
      if (results.length === 0) { toast.error('No requests found for that email'); return; }
      setTrackResults(results);
    } else {
      const result = getClaim(trackQuery);
      if (!result) { toast.error('No request found with that ID'); return; }
      setTrackResults([result]);
    }
    setTracked(true);
  };

  const statusIcon = (status: string) => {
    if (status === 'verified') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'rejected') return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };
  const statusLabel = (status: string) => {
    if (status === 'verified') return 'Match found — ready for pickup';
    if (status === 'rejected') return 'No match found';
    return 'Watching for a match';
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8" style={{ background: getColor('accent2') }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: getColor('accent2') }}>
              Lost something?
            </span>
          </div>
          <h1 className="text-3xl font-black mb-2" style={{ color: getColor('textPrimary') }}>
            Pre-request a lost item
          </h1>
          <p className="text-sm" style={{ color: getColor('textSecondary') }}>
            Tell us what you lost. If someone turns it in, we'll match it to your request and notify you — even before it appears in the listings.
          </p>
        </div>

        {/* Submit form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-14">
          <div>
            <Label htmlFor="itemName" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
              What did you lose? *
            </Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Black TI-84 calculator"
              className="h-10 rounded-lg border"
              style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard'), color: getColor('textPrimary') }}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
              Description *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Be specific — color, brand, size, anything unique like stickers or engravings. This is how we verify it's yours."
              rows={4}
              className="rounded-lg border resize-none"
              style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard'), color: getColor('textPrimary') }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateLost" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                When did you lose it? *
              </Label>
              <Input
                id="dateLost"
                type="date"
                value={dateLost}
                onChange={(e) => setDateLost(e.target.value)}
                max={today}
                className="h-10 rounded-lg border"
                style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard'), color: getColor('textPrimary') }}
              />
            </div>

            <div>
              <Label htmlFor="contactEmail" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                Notification email *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@school.edu"
                className="h-10 rounded-lg border"
                style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard'), color: getColor('textPrimary') }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <p className="text-xs p-3 rounded-lg border" style={{ borderColor: getColor('border'), color: getColor('textSecondary'), backgroundColor: getColor('bgCard') }}>
              <Link to="/login" className="font-semibold" style={{ color: getColor('accent2') }}>Sign in</Link> to track this request in your profile automatically.
            </p>
          )}

          <motion.button
            type="submit"
            className="w-full h-11 rounded-lg font-semibold text-white"
            style={{ backgroundColor: getColor('accent2') }}
            whileTap={{ scale: 0.98 }}
          >
            Submit lost item request
          </motion.button>

          <p className="text-xs text-center" style={{ color: getColor('textTertiary') }}>
            Staff will compare your request against new drop-offs and contact you if a match is found.
          </p>
        </form>

        {/* Divider */}
        <div className="border-t mb-10" style={{ borderColor: getColor('border') }} />

        {/* Track existing request */}
        <div>
          <h2 className="text-lg font-black mb-1" style={{ color: getColor('textPrimary') }}>
            Check request status
          </h2>
          <p className="text-sm mb-5" style={{ color: getColor('textSecondary') }}>
            Enter the request ID you received or the email you used.
          </p>

          <form onSubmit={handleTrack} className="flex gap-3 mb-6">
            <Input
              value={trackQuery}
              onChange={(e) => { setTrackQuery(e.target.value); setTracked(false); }}
              placeholder="CLM-2026-001 or your@email.com"
              className="h-10 rounded-lg border flex-1"
              style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard'), color: getColor('textPrimary') }}
            />
            <motion.button
              type="submit"
              className="h-10 px-5 rounded-lg font-semibold text-white flex items-center gap-2 shrink-0"
              style={{ backgroundColor: getColor('accent1') }}
              whileTap={{ scale: 0.97 }}
            >
              <Search className="h-4 w-4" />
              Look up
            </motion.button>
          </form>

          <AnimatePresence>
            {tracked && trackResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: getColor('textPrimary') }}>
                    {trackResults.length} request{trackResults.length !== 1 ? 's' : ''} found
                  </span>
                  <button onClick={() => { setTracked(false); setTrackQuery(''); }}>
                    <X className="h-4 w-4" style={{ color: getColor('textTertiary') }} />
                  </button>
                </div>

                {trackResults.map((claim) => (
                  <div
                    key={claim.id}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard') }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-semibold text-sm" style={{ color: getColor('textPrimary') }}>{claim.itemName}</p>
                        <p className="text-xs" style={{ color: getColor('textTertiary') }}>
                          ID: {claim.id} · Lost {new Date(claim.dateLost).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {statusIcon(claim.status)}
                        <span className="text-xs font-medium" style={{ color: getColor('textSecondary') }}>
                          {statusLabel(claim.status)}
                        </span>
                      </div>
                    </div>
                    {claim.adminNotes && (
                      <p className="text-xs italic mt-1" style={{ color: getColor('textTertiary') }}>
                        Staff note: "{claim.adminNotes}"
                      </p>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
