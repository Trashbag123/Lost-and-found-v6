import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Upload, X, CheckCircle, ImagePlus, Sparkles, Info, HelpCircle, AlertCircle, Check, Camera, Shield } from 'lucide-react';
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

export function SubmitItemPage() {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const { getColor } = useTheme();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    dateFound: '',
    submittedBy: '',
    contactEmail: '',
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [customCategory, setCustomCategory] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  const categories = [
    'Electronics',
    'Bags & Backpacks',
    'Clothing & Accessories',
    'Books & Notebooks',
    'School Supplies',
    'Personal Items',
    'Sports Equipment',
    'Keys & Cards',
    'Water Bottles',
    'Other'
  ];

  const locations = [
    'Main Library',
    'Cafeteria',
    'Gymnasium',
    'Science Building',
    'Math Building',
    'Arts Building',
    'Student Center',
    'Auditorium',
    'Parking Lot',
    'Sports Field',
    'Locker Room',
    'Other'
  ];

  // Validation function
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Item title is required';
        if (value.length < 3) return 'Title must be at least 3 characters';
        if (value.length > 100) return 'Title must be less than 100 characters';
        break;
      case 'category':
        if (!value) return 'Please select a category';
        break;
      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.length < 10) return 'Please provide at least 10 characters';
        if (value.length > 500) return 'Description must be less than 500 characters';
        break;
      case 'location':
        if (!value) return 'Please select where you found the item';
        break;
      case 'dateFound':
        if (!value) return 'Date found is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (selectedDate > today) return 'Date cannot be in the future';
        break;
      case 'submittedBy':
        if (!value.trim()) return 'Your name is required';
        if (value.length < 2) return 'Please enter your full name';
        break;
      case 'contactEmail':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== 'imageUrl') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageUrl: result });
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting', {
        description: 'Check the highlighted fields above'
      });
      return;
    }

    // Use custom values if "Other" was selected
    const finalData = {
      ...formData,
      category: formData.category === 'custom' ? customCategory : formData.category,
      location: formData.location === 'custom' ? customLocation : formData.location
    };

    // Validate custom inputs
    if (formData.category === 'custom' && !customCategory.trim()) {
      toast.error('Please enter a custom category');
      return;
    }

    if (formData.location === 'custom' && !customLocation.trim()) {
      toast.error('Please enter a custom location');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addItem(finalData);
      
      toast.success('Item submitted successfully! 🎉', {
        description: 'Your submission is pending admin approval'
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Navigate after showing success message
      setTimeout(() => {
        navigate('/items');
      }, 2500);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: getColor('bgPrimary') }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Card className="max-w-md w-full border-0 shadow-2xl rounded-3xl overflow-hidden" style={{ backgroundColor: getColor('bgCard') }}>
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
              >
                <CheckCircle className="h-12 w-12 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: getColor('textPrimary') }}>Successfully Submitted!</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: getColor('textSecondary') }}>
                Thank you for helping your fellow students. Your item submission is now pending admin approval and will be visible once reviewed.
              </p>
              <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: `${getColor('accent1')}10` }}>
                <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                  <strong style={{ color: getColor('accent1') }}>What's next?</strong><br/>
                  Our team will review your submission within 24 hours. You'll be notified via email once it's approved.
                </p>
              </div>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>Redirecting to browse items...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const getFieldIcon = (field: string) => {
    if (!touched[field]) return null;
    if (errors[field as keyof FormErrors]) {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    if (formData[field as keyof typeof formData]) {
      return <Check className="h-5 w-5" style={{ color: getColor('accent1') }} />;
    }
    return null;
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div 
            className="inline-flex items-center gap-2 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
            style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
          >
            <Sparkles className="h-4 w-4" />
            Help Your Community
          </div>
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
          >
            Report Found Item
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: getColor('textSecondary') }}>
            Found something? Help reunite it with its owner by providing detailed information below
          </p>
        </motion.div>

        {/* Helper Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card 
            className="border-2 rounded-2xl"
            style={{
              borderColor: `${getColor('accent1')}30`,
              background: `linear-gradient(to bottom right, ${getColor('accent1')}08, transparent)`,
              backgroundColor: getColor('bgCard')
            }}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                >
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: getColor('textPrimary') }}>Before You Submit</h3>
                  <ul className="text-sm space-y-1" style={{ color: getColor('textSecondary') }}>
                    <li>• Take a clear photo if possible - it significantly increases claim success</li>
                    <li>• Provide detailed description including colors, brands, and unique features</li>
                    <li>• Your contact information will only be shared with verified claimants</li>
                    <li>• All submissions are reviewed by admin before being published</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden" style={{ backgroundColor: getColor('bgCard') }}>
              <CardHeader style={{ background: `linear-gradient(to right, ${getColor('accent1')}08, transparent)` }}>
                <CardTitle className="flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                  <Camera className="h-5 w-5" style={{ color: getColor('accent1') }} />
                  Item Photo (Optional but Recommended)
                </CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  A clear photo helps owners identify their items faster
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!imagePreview ? (
                  <div 
                    className="border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group"
                    style={{ 
                      borderColor: `${getColor('accent1')}50`,
                      backgroundColor: getColor('bgSecondary')
                    }}
                  >
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer block">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                        style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}20, ${getColor('accent1')}10)` }}
                      >
                        <ImagePlus className="h-8 w-8" style={{ color: getColor('accent1') }} />
                      </div>
                      <p className="font-semibold mb-2" style={{ color: getColor('textPrimary') }}>
                        Click to upload image
                      </p>
                      <p className="text-sm" style={{ color: getColor('textSecondary') }}>PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <Button
                        type="button"
                        onClick={removeImage}
                        variant="destructive"
                        size="lg"
                        className="gap-2"
                      >
                        <X className="h-5 w-5" />
                        Remove Image
                      </Button>
                    </div>
                    <div 
                      className="absolute top-4 right-4 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg"
                      style={{ backgroundColor: getColor('accent1') }}
                    >
                      <Check className="h-4 w-4 inline mr-1" />
                      Uploaded
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Item Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: getColor('bgCard') }}>
              <CardHeader style={{ background: `linear-gradient(to right, ${getColor('accent1')}08, transparent)` }}>
                <CardTitle style={{ color: getColor('textPrimary') }}>Item Details</CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Provide accurate information about the found item
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                    Item Title *
                    {getFieldIcon('title')}
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    onBlur={() => handleBlur('title')}
                    placeholder="e.g., Black Nike Backpack"
                    className="h-12 rounded-xl border-2 transition-all"
                    style={{
                      borderColor: errors.title && touched.title
                        ? '#ef4444'
                        : formData.title && touched.title
                        ? getColor('accent1')
                        : getColor('border'),
                      backgroundColor: getColor('bgSecondary'),
                      color: getColor('textPrimary')
                    }}
                  />
                  <AnimatePresence>
                    {errors.title && touched.title && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.title}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p className="text-sm flex items-center gap-1" style={{ color: getColor('textTertiary') }}>
                    <HelpCircle className="h-4 w-4" />
                    Be specific - include brand, color, or notable features
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                    Category *
                    {getFieldIcon('category')}
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger 
                      id="category"
                      onBlur={() => handleBlur('category')}
                      className="h-12 rounded-xl border-2"
                      style={{
                        borderColor: errors.category && touched.category
                          ? '#ef4444'
                          : formData.category && touched.category
                          ? getColor('accent1')
                          : getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="cursor-pointer">
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom" className="cursor-pointer">
                        Add Custom Category
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {errors.category && touched.category && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.category}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {formData.category === 'custom' && (
                    <Input
                      id="customCategory"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      onBlur={() => handleBlur('category')}
                      placeholder="Enter custom category"
                      className="h-12 rounded-xl border-2 transition-all"
                      style={{
                        borderColor: errors.category && touched.category
                          ? '#ef4444'
                          : customCategory && touched.category
                          ? getColor('accent1')
                          : getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    />
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                    Description *
                    {getFieldIcon('description')}
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    onBlur={() => handleBlur('description')}
                    placeholder="Describe the item in detail: size, color, brand, any unique features, condition, etc."
                    rows={5}
                    maxLength={500}
                    className="rounded-xl border-2 resize-none"
                    style={{
                      borderColor: errors.description && touched.description
                        ? '#ef4444'
                        : formData.description && touched.description
                        ? getColor('accent1')
                        : getColor('border'),
                      backgroundColor: getColor('bgSecondary'),
                      color: getColor('textPrimary')
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <AnimatePresence>
                      {errors.description && touched.description ? (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.description}
                        </motion.p>
                      ) : (
                        <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                          The more details, the better!
                        </p>
                      )}
                    </AnimatePresence>
                    <span 
                      className="text-sm"
                      style={{ color: formData.description.length > 450 ? getColor('accent3') : getColor('textSecondary') }}
                    >
                      {formData.description.length}/500
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location & Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: getColor('bgCard') }}>
              <CardHeader style={{ background: `linear-gradient(to right, ${getColor('accent2')}08, transparent)` }}>
                <CardTitle style={{ color: getColor('textPrimary') }}>Where & When</CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Help us track patterns and locate items efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                      Location Found *
                      {getFieldIcon('location')}
                    </Label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => handleChange('location', value)}
                    >
                      <SelectTrigger 
                        id="location"
                        onBlur={() => handleBlur('location')}
                        className="h-12 rounded-xl border-2"
                        style={{
                          borderColor: errors.location && touched.location
                            ? '#ef4444'
                            : formData.location && touched.location
                            ? getColor('accent1')
                            : getColor('border'),
                          backgroundColor: getColor('bgSecondary'),
                          color: getColor('textPrimary')
                        }}
                      >
                        <SelectValue placeholder="Where did you find it?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc} className="cursor-pointer">
                            {loc}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom" className="cursor-pointer">
                          Add Custom Location
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <AnimatePresence>
                      {errors.location && touched.location && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.location}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {formData.location === 'custom' && (
                      <Input
                        id="customLocation"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        onBlur={() => handleBlur('location')}
                        placeholder="Enter custom location"
                        className="h-12 rounded-xl border-2 transition-all"
                        style={{
                          borderColor: errors.location && touched.location
                            ? '#ef4444'
                            : customLocation && touched.location
                            ? getColor('accent1')
                            : getColor('border'),
                          backgroundColor: getColor('bgSecondary'),
                          color: getColor('textPrimary')
                        }}
                      />
                    )}
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="dateFound" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                      Date Found *
                      {getFieldIcon('dateFound')}
                    </Label>
                    <Input
                      id="dateFound"
                      type="date"
                      value={formData.dateFound}
                      onChange={(e) => handleChange('dateFound', e.target.value)}
                      onBlur={() => handleBlur('dateFound')}
                      max={new Date().toISOString().split('T')[0]}
                      min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}
                      className="h-12 rounded-xl border-2"
                      style={{
                        borderColor: errors.dateFound && touched.dateFound
                          ? '#ef4444'
                          : formData.dateFound && touched.dateFound
                          ? getColor('accent1')
                          : getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    />
                    <AnimatePresence>
                      {errors.dateFound && touched.dateFound && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.dateFound}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: getColor('bgCard') }}>
              <CardHeader style={{ background: `linear-gradient(to right, ${getColor('accent3')}08, transparent)` }}>
                <CardTitle className="flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                  Your Contact Information
                  <div 
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${getColor('accent1')}20`,
                      color: getColor('accent1')
                    }}
                  >
                    Private
                  </div>
                </CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  This information will only be shared with verified claimants
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="submittedBy" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                      Your Name *
                      {getFieldIcon('submittedBy')}
                    </Label>
                    <Input
                      id="submittedBy"
                      value={formData.submittedBy}
                      onChange={(e) => handleChange('submittedBy', e.target.value)}
                      onBlur={() => handleBlur('submittedBy')}
                      placeholder="John Smith"
                      className="h-12 rounded-xl border-2"
                      style={{
                        borderColor: errors.submittedBy && touched.submittedBy
                          ? '#ef4444'
                          : formData.submittedBy && touched.submittedBy
                          ? getColor('accent1')
                          : getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    />
                    <AnimatePresence>
                      {errors.submittedBy && touched.submittedBy && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.submittedBy}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-base font-semibold flex items-center gap-2" style={{ color: getColor('textPrimary') }}>
                      Your Email *
                      {getFieldIcon('contactEmail')}
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      onBlur={() => handleBlur('contactEmail')}
                      placeholder="john.smith@school.edu"
                      className="h-12 rounded-xl border-2"
                      style={{
                        borderColor: errors.contactEmail && touched.contactEmail
                          ? '#ef4444'
                          : formData.contactEmail && touched.contactEmail
                          ? getColor('accent1')
                          : getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    />
                    <AnimatePresence>
                      {errors.contactEmail && touched.contactEmail && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.contactEmail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border rounded-2xl p-6"
            style={{
              backgroundColor: `${getColor('accent1')}08`,
              borderColor: `${getColor('accent1')}30`
            }}
          >
            <div className="flex gap-3">
              <Shield className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: getColor('accent1') }} />
              <div className="text-sm" style={{ color: getColor('textSecondary') }}>
                <p className="font-semibold mb-2" style={{ color: getColor('textPrimary') }}>Privacy & Security</p>
                <p>
                  Your contact information is kept confidential and will only be shared with individuals whose claim has been verified by our admin team. All submissions are manually reviewed before publication to ensure authenticity and protect the community.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-4 justify-end"
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate('/items')}
              className="border-2 rounded-xl px-8"
              style={{
                borderColor: getColor('border'),
                color: getColor('textSecondary')
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="text-white rounded-xl px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <Upload className="h-5 w-5" />
                  </motion.div>
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Submit Item
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}