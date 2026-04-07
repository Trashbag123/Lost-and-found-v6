import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormErrors {
  title?: string;
  category?: string;
  description?: string;
  location?: string;
  dateFound?: string;
  submittedBy?: string;
  contactEmail?: string;
}

const categories = ['Electronics', 'Bags & Backpacks', 'Clothing & Accessories', 'Books & Notebooks', 'School Supplies', 'Personal Items', 'Sports Equipment', 'Keys & Cards', 'Water Bottles', 'Other'];
const locations = ['Main Library', 'Cafeteria', 'Gymnasium', 'Science Building', 'Math Building', 'Arts Building', 'Student Center', 'Auditorium', 'Parking Lot', 'Sports Field', 'Locker Room', 'Other'];

export function SubmitItemPage() {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const { getColor } = useTheme();

  const [formData, setFormData] = useState({
    title: '', category: '', description: '', location: '',
    dateFound: '', submittedBy: '', contactEmail: '', imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [customCategory, setCustomCategory] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  const validate = (name: string, value: string): string | undefined => {
    if (name === 'title') {
      if (!value.trim()) return 'Required';
      if (value.length < 3) return 'At least 3 characters';
    }
    if (name === 'category' && !value) return 'Required';
    if (name === 'description') {
      if (!value.trim()) return 'Required';
      if (value.length < 10) return 'At least 10 characters';
    }
    if (name === 'location' && !value) return 'Required';
    if (name === 'dateFound') {
      if (!value) return 'Required';
      if (new Date(value) > new Date()) return 'Cannot be in the future';
    }
    if (name === 'submittedBy' && !value.trim()) return 'Required';
    if (name === 'contactEmail') {
      if (!value.trim()) return 'Required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, formData[field as keyof typeof formData]) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5MB'); return; }
    if (!file.type.startsWith('image/')) { toast.error('Image files only'); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {} as Record<string, boolean>);
    setTouched(allTouched);
    const newErrors: FormErrors = {};
    let valid = true;
    Object.keys(formData).forEach((k) => {
      if (k === 'imageUrl') return;
      const err = validate(k, formData[k as keyof typeof formData]);
      if (err) { newErrors[k as keyof FormErrors] = err; valid = false; }
    });
    setErrors(newErrors);
    if (!valid) { toast.error('Fix the errors above'); return; }

    const finalData = {
      ...formData,
      category: formData.category === 'custom' ? customCategory : formData.category,
      location: formData.location === 'custom' ? customLocation : formData.location,
    };
    if (formData.category === 'custom' && !customCategory.trim()) { toast.error('Enter a custom category'); return; }
    if (formData.location === 'custom' && !customLocation.trim()) { toast.error('Enter a custom location'); return; }

    setIsSubmitting(true);
    setTimeout(() => {
      addItem(finalData);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => navigate('/items'), 2500);
    }, 1200);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: getColor('bgPrimary') }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: getColor('accent1') }}>
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>Submitted!</h2>
          <p className="text-sm" style={{ color: getColor('textSecondary') }}>
            Your item is pending admin review. You'll be redirected shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  const field = (name: keyof FormErrors) => ({
    borderColor: touched[name] && errors[name] ? '#ef4444' : touched[name] && formData[name] ? getColor('accent1') : getColor('border'),
    backgroundColor: getColor('bgPrimary'),
    color: getColor('textPrimary'),
  });

  const FieldError = ({ name }: { name: keyof FormErrors }) => (
    <AnimatePresence>
      {touched[name] && errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-xs flex items-center gap-1 mt-1"
          style={{ color: '#ef4444' }}
        >
          <AlertCircle className="h-3 w-3" />
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8" style={{ background: getColor('accent1') }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: getColor('accent1') }}>
              Lost & Found
            </span>
          </div>
          <h1 className="text-3xl font-black mb-2" style={{ color: getColor('textPrimary') }}>
            Report a Found Item
          </h1>
          <p className="text-sm" style={{ color: getColor('textSecondary') }}>
            Fill in the details below. A photo helps owners identify their item faster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Image upload */}
          <div>
            {!imagePreview ? (
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition-colors"
                style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard') }}
              >
                <Upload className="h-6 w-6 mb-2" style={{ color: getColor('textTertiary') }} />
                <span className="text-sm font-medium" style={{ color: getColor('textSecondary') }}>Upload a photo</span>
                <span className="text-xs mt-1" style={{ color: getColor('textTertiary') }}>PNG, JPG up to 5MB</span>
                <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => { setImagePreview(''); setFormData((p) => ({ ...p, imageUrl: '' })); }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Title + Category row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                Item title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                placeholder="e.g. Black Nike Backpack"
                className="h-10 rounded-lg border"
                style={field('title')}
              />
              <FieldError name="title" />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                <SelectTrigger className="h-10 rounded-lg border" style={field('category')}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  <SelectItem value="custom">Other (custom)</SelectItem>
                </SelectContent>
              </Select>
              {formData.category === 'custom' && (
                <Input
                  className="mt-2 h-10 rounded-lg border"
                  placeholder="Describe the category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  style={{ borderColor: getColor('border'), backgroundColor: getColor('bgPrimary'), color: getColor('textPrimary') }}
                />
              )}
              <FieldError name="category" />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              placeholder="Color, brand, size, any unique features..."
              rows={4}
              maxLength={500}
              className="rounded-lg border resize-none"
              style={field('description')}
            />
            <div className="flex justify-between mt-1">
              <FieldError name="description" />
              <span className="text-xs ml-auto" style={{ color: getColor('textTertiary') }}>{formData.description.length}/500</span>
            </div>
          </div>

          {/* Location + Date row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                Where was it found? *
              </Label>
              <Select value={formData.location} onValueChange={(v) => handleChange('location', v)}>
                <SelectTrigger className="h-10 rounded-lg border" style={field('location')}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  <SelectItem value="custom">Other (custom)</SelectItem>
                </SelectContent>
              </Select>
              {formData.location === 'custom' && (
                <Input
                  className="mt-2 h-10 rounded-lg border"
                  placeholder="Describe the location"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  style={{ borderColor: getColor('border'), backgroundColor: getColor('bgPrimary'), color: getColor('textPrimary') }}
                />
              )}
              <FieldError name="location" />
            </div>

            <div>
              <Label htmlFor="dateFound" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                Date found *
              </Label>
              <Input
                id="dateFound"
                type="date"
                value={formData.dateFound}
                onChange={(e) => handleChange('dateFound', e.target.value)}
                onBlur={() => handleBlur('dateFound')}
                max={new Date().toISOString().split('T')[0]}
                className="h-10 rounded-lg border"
                style={field('dateFound')}
              />
              <FieldError name="dateFound" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t pt-6" style={{ borderColor: getColor('border') }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: getColor('textTertiary') }}>
              Your contact info
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="submittedBy" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                  Your name *
                </Label>
                <Input
                  id="submittedBy"
                  value={formData.submittedBy}
                  onChange={(e) => handleChange('submittedBy', e.target.value)}
                  onBlur={() => handleBlur('submittedBy')}
                  placeholder="Full name"
                  className="h-10 rounded-lg border"
                  style={field('submittedBy')}
                />
                <FieldError name="submittedBy" />
              </div>

              <div>
                <Label htmlFor="contactEmail" className="text-sm font-semibold mb-1.5 block" style={{ color: getColor('textPrimary') }}>
                  Email *
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  onBlur={() => handleBlur('contactEmail')}
                  placeholder="you@school.edu"
                  className="h-10 rounded-lg border"
                  style={field('contactEmail')}
                />
                <FieldError name="contactEmail" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-lg font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: getColor('accent1') }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Item'}
            </motion.button>
            <p className="text-xs text-center mt-3" style={{ color: getColor('textTertiary') }}>
              Submissions are reviewed by staff before being listed.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
