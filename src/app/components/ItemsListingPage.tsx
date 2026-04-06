import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Search, Filter, MapPin, Calendar, Eye, Package, TrendingUp, Clock, SlidersHorizontal, Grid3x3, List, X, ChevronLeft, ChevronRight, Heart, Star, Bell, Bookmark, History, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// User preferences stored in localStorage
interface UserPreferences {
  favorites: string[];
  savedSearches: string[];
  recentlyViewed: string[];
  notificationFilters: {
    category?: string;
    location?: string;
  };
}

export function ItemsListingPage() {
  const { items } = useItems();
  const { getColor } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Now customizable
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    favorites: [],
    savedSearches: [],
    recentlyViewed: [],
    notificationFilters: {}
  });
  const [showPersonalization, setShowPersonalization] = useState(false);
  
  const categories = ['all', 'Electronics', 'Bags', 'Clothing', 'Books', 'School Supplies', 'Personal Items', 'Sports Equipment', 'Keys', 'Other'];

  // Load user preferences from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const stored = localStorage.getItem(`userPrefs_${user.id}`);
      if (stored) {
        setUserPrefs(JSON.parse(stored));
      }
    }
  }, [isAuthenticated, user]);

  // Save user preferences to localStorage
  const saveUserPrefs = (prefs: UserPreferences) => {
    if (isAuthenticated && user) {
      localStorage.setItem(`userPrefs_${user.id}`, JSON.stringify(prefs));
      setUserPrefs(prefs);
    }
  };

  // Toggle favorite
  const toggleFavorite = (itemId: string) => {
    if (!isAuthenticated) return;
    const favorites = userPrefs.favorites.includes(itemId)
      ? userPrefs.favorites.filter(id => id !== itemId)
      : [...userPrefs.favorites, itemId];
    saveUserPrefs({ ...userPrefs, favorites });
  };

  // Save current search
  const saveCurrentSearch = () => {
    if (!isAuthenticated || !searchTerm) return;
    const searches = [searchTerm, ...userPrefs.savedSearches.filter(s => s !== searchTerm)].slice(0, 5);
    saveUserPrefs({ ...userPrefs, savedSearches: searches });
  };

  let filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  filteredItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'relevance':
        // Prioritize favorites if logged in
        if (isAuthenticated) {
          const aFav = userPrefs.favorites.includes(a.id) ? 1 : 0;
          const bFav = userPrefs.favorites.includes(b.id) ? 1 : 0;
          return bFav - aFav;
        }
        return 0;
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handleFilterChange = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setCurrentPage(1);
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge 
            className="border-0 text-white shadow-lg"
            style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
          >
            Available
          </Badge>
        );
      case 'claimed':
        return (
          <Badge 
            className="border-0 text-white shadow-lg"
            style={{ background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
          >
            Claimed
          </Badge>
        );
      case 'pending':
        return (
          <Badge 
            className="border-0 text-white shadow-lg"
            style={{ background: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})` }}
          >
            Pending Review
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section - New Compact Design */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 
                className="text-6xl font-black mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${getColor('accent1')}, ${getColor('accent2')}, ${getColor('accent3')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Browse Items
              </h1>
              <p className="text-lg" style={{ color: getColor('textSecondary') }}>
                {filteredItems.length} items found • {items.filter(i => i.status === 'claimed').length} successfully returned
              </p>
            </div>
            
            {/* Personalization Toggle - Only show when logged in */}
            {isAuthenticated && (
              <Button
                onClick={() => setShowPersonalization(!showPersonalization)}
                className="rounded-2xl px-6 h-12 text-white font-semibold shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${getColor('accent2')}, ${getColor('accent3')})`,
                }}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {showPersonalization ? 'Hide' : 'Show'} My Preferences
              </Button>
            )}
          </div>
        </motion.div>

        {/* Personalization Panel */}
        <AnimatePresence>
          {isAuthenticated && showPersonalization && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="border-0 shadow-2xl rounded-3xl overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${getColor('bgCard')}, ${getColor('bgCardHover')})`,
                  borderLeft: `5px solid ${getColor('accent2')}`
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${getColor('accent2')}, ${getColor('accent3')})` }}
                    >
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: getColor('textPrimary') }}>
                        Welcome back, {user?.username}!
                      </h3>
                      <p style={{ color: getColor('textSecondary') }}>
                        Your personalized dashboard
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Favorites */}
                    <div 
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: `${getColor('accent1')}10` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="h-5 w-5" style={{ color: getColor('accent1') }} />
                        <h4 className="font-bold" style={{ color: getColor('textPrimary') }}>
                          Favorites ({userPrefs.favorites.length})
                        </h4>
                      </div>
                      <p className="text-sm mb-3" style={{ color: getColor('textSecondary') }}>
                        Items you've marked for quick access
                      </p>
                      {userPrefs.favorites.length > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFilterChange(setSortBy, 'relevance')}
                          className="w-full rounded-xl"
                        >
                          Show My Favorites First
                        </Button>
                      )}
                    </div>

                    {/* Saved Searches */}
                    <div 
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: `${getColor('accent2')}10` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Bookmark className="h-5 w-5" style={{ color: getColor('accent2') }} />
                        <h4 className="font-bold" style={{ color: getColor('textPrimary') }}>
                          Saved Searches
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {userPrefs.savedSearches.slice(0, 3).map((search) => (
                          <button
                            key={search}
                            onClick={() => handleSearchChange(search)}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                            style={{ 
                              backgroundColor: getColor('bgCard'),
                              color: getColor('textPrimary')
                            }}
                          >
                            "{search}"
                          </button>
                        ))}
                        {userPrefs.savedSearches.length === 0 && (
                          <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                            No saved searches yet
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div 
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: `${getColor('accent3')}10` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <History className="h-5 w-5" style={{ color: getColor('accent3') }} />
                        <h4 className="font-bold" style={{ color: getColor('textPrimary') }}>
                          Your Activity
                        </h4>
                      </div>
                      <div className="space-y-2 text-sm" style={{ color: getColor('textSecondary') }}>
                        <p>• {userPrefs.favorites.length} items favorited</p>
                        <p>• {userPrefs.savedSearches.length} searches saved</p>
                        <p>• Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filters - New Horizontal Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search 
                  className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 pointer-events-none"
                  style={{ color: getColor('accent1') }}
                />
                <Input
                  placeholder="Search by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-14 pr-20 h-16 border-[3px] transition-all rounded-2xl text-lg shadow-lg"
                  style={{
                    borderColor: searchTerm ? getColor('accent1') : getColor('border'),
                    backgroundColor: getColor('bgCard'),
                    color: getColor('textPrimary'),
                    boxShadow: searchTerm ? `0 0 20px ${getColor('accent1')}30` : 'none'
                  }}
                />
                {searchTerm && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isAuthenticated && (
                      <Button
                        size="sm"
                        onClick={saveCurrentSearch}
                        className="rounded-xl h-10 px-3"
                        style={{ background: `linear-gradient(135deg, ${getColor('accent2')}, ${getColor('accent3')})`, color: 'white' }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    )}
                    <button
                      onClick={() => handleSearchChange('')}
                      className="transition-colors p-2 rounded-lg"
                      style={{ color: getColor('textTertiary') }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Filters - Compact Row */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={categoryFilter} onValueChange={(value) => handleFilterChange(setCategoryFilter, value)}>
                <SelectTrigger 
                  className="border-[3px] rounded-xl w-[180px] h-16 cursor-pointer shadow-lg"
                  style={{
                    borderColor: getColor('border'),
                    backgroundColor: getColor('bgCard'),
                    color: getColor('textPrimary')
                  }}
                >
                  <Filter className="h-5 w-5 mr-2" style={{ color: getColor('accent1') }} />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value) => handleFilterChange(setStatusFilter, value)}>
                <SelectTrigger 
                  className="border-[3px] rounded-xl w-[150px] h-16 cursor-pointer shadow-lg"
                  style={{
                    borderColor: getColor('border'),
                    backgroundColor: getColor('bgCard'),
                    color: getColor('textPrimary')
                  }}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="approved">Available</SelectItem>
                  <SelectItem value="claimed">Claimed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => handleFilterChange(setSortBy, value)}>
                <SelectTrigger 
                  className="border-[3px] rounded-xl w-[170px] h-16 cursor-pointer shadow-lg"
                  style={{
                    borderColor: getColor('border'),
                    backgroundColor: getColor('bgCard'),
                    color: getColor('textPrimary')
                  }}
                >
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                  {isAuthenticated && <SelectItem value="relevance">My Favorites</SelectItem>}
                </SelectContent>
              </Select>

              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger 
                  className="border-[3px] rounded-xl w-[160px] h-16 cursor-pointer shadow-lg"
                  style={{
                    borderColor: getColor('border'),
                    backgroundColor: getColor('bgCard'),
                    color: getColor('textPrimary')
                  }}
                >
                  <Package className="h-5 w-5 mr-2" style={{ color: getColor('accent3') }} />
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 per page</SelectItem>
                  <SelectItem value="9">9 per page</SelectItem>
                  <SelectItem value="12">12 per page</SelectItem>
                  <SelectItem value="18">18 per page</SelectItem>
                  <SelectItem value="24">24 per page</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-lg h-12 w-12"
                  style={viewMode === 'grid' ? {
                    background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                    color: 'white'
                  } : {}}
                >
                  <Grid3x3 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-lg h-12 w-12"
                  style={viewMode === 'list' ? {
                    background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                    color: 'white'
                  } : {}}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Items Grid/List */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="shadow-2xl border-0 rounded-3xl"
                style={{ backgroundColor: getColor('bgCard') }}
              >
                <CardContent className="py-32 text-center">
                  <div 
                    className="w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8"
                    style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}15, ${getColor('accent1')}05)` }}
                  >
                    <Search className="h-16 w-16" style={{ color: `${getColor('accent1')}50` }} />
                  </div>
                  <h3 className="text-3xl font-bold mb-3" style={{ color: getColor('textPrimary') }}>
                    No items found
                  </h3>
                  <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: getColor('textSecondary') }}>
                    Try adjusting your search terms or filters to find what you're looking for
                  </p>
                  <Button 
                    onClick={() => {
                      handleSearchChange('');
                      setCategoryFilter('all');
                      setStatusFilter('all');
                    }}
                    className="rounded-2xl text-white px-8 h-12 text-lg shadow-xl"
                    style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {paginatedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card 
                    className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col rounded-3xl group relative"
                    style={{ 
                      backgroundColor: getColor('bgCard'),
                      borderLeft: `5px solid ${getColor('accent1')}`
                    }}
                  >
                    {/* Favorite Button - Only show when logged in */}
                    {isAuthenticated && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(item.id);
                        }}
                        className="absolute top-4 left-4 z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg"
                        style={{
                          backgroundColor: userPrefs.favorites.includes(item.id) 
                            ? getColor('accent1') 
                            : 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        <Heart 
                          className="h-5 w-5"
                          style={{ 
                            color: userPrefs.favorites.includes(item.id) ? 'white' : getColor('accent1'),
                            fill: userPrefs.favorites.includes(item.id) ? 'white' : 'none'
                          }}
                        />
                      </button>
                    )}

                    {/* Image */}
                    {item.imageUrl && (
                      <div 
                        className="h-64 overflow-hidden relative"
                        style={{ background: `linear-gradient(to bottom right, ${getColor('bgSecondary')}, ${getColor('bgSecondary')})` }}
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    )}
                    {!item.imageUrl && (
                      <div 
                        className="h-64 flex items-center justify-center relative"
                        style={{ background: `linear-gradient(135deg, ${getColor('accent1')}15, ${getColor('accent2')}10)` }}
                      >
                        <Package className="h-24 w-24" style={{ color: `${getColor('accent1')}40` }} />
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <CardTitle 
                        className="text-2xl line-clamp-1 mb-3"
                        style={{ color: getColor('textPrimary') }}
                      >
                        {item.title}
                      </CardTitle>
                      <Badge 
                        className="w-fit"
                        style={{
                          backgroundColor: `${getColor('accent2')}15`,
                          color: getColor('accent2'),
                          borderColor: `${getColor('accent2')}30`,
                          border: '2px solid'
                        }}
                      >
                        {item.category}
                      </Badge>
                    </CardHeader>
                    
                    <CardContent className="flex-grow pb-3">
                      <p 
                        className="text-sm line-clamp-2 mb-5 leading-relaxed"
                        style={{ color: getColor('textSecondary') }}
                      >
                        {item.description}
                      </p>
                      <div className="space-y-3 text-sm" style={{ color: getColor('textSecondary') }}>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: getColor('accent1') }} />
                          <span className="line-clamp-1 font-medium">{item.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: getColor('accent2') }} />
                          <span className="font-medium">Found {new Date(item.dateFound).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: getColor('accent3') }} />
                          <span className="font-medium">{Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Link to={`/item/${item.id}`} className="w-full">
                        <Button 
                          className="w-full shadow-lg hover:shadow-2xl transition-all rounded-2xl h-14 font-bold text-lg text-white"
                          style={{ background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})` }}
                        >
                          <Eye className="mr-2 h-5 w-5" />
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination - New Sleek Design */}
        {filteredItems.length > itemsPerPage && (
          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-2xl h-14 px-8 text-lg font-bold shadow-xl disabled:opacity-50"
              style={{
                background: currentPage === 1 
                  ? getColor('bgCard') 
                  : `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                color: currentPage === 1 ? getColor('textSecondary') : 'white'
              }}
            >
              <ChevronLeft className="h-6 w-6 mr-2" />
              Previous
            </Button>

            <div 
              className="px-8 py-3 rounded-2xl shadow-xl"
              style={{ 
                background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent2')})`,
                color: 'white'
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-black">{currentPage}</div>
                <div className="text-xs opacity-90">of {totalPages}</div>
              </div>
            </div>

            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-2xl h-14 px-8 text-lg font-bold shadow-xl disabled:opacity-50"
              style={{
                background: currentPage === totalPages 
                  ? getColor('bgCard') 
                  : `linear-gradient(135deg, ${getColor('accent2')}, ${getColor('accent3')})`,
                color: currentPage === totalPages ? getColor('textSecondary') : 'white'
              }}
            >
              Next
              <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Success Rate Banner */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card 
            className="border-0 shadow-2xl rounded-3xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
          >
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <div>
                    <div className="text-6xl font-black mb-1">
                      {items.length > 0 ? Math.round((items.filter(i => i.status === 'claimed').length / items.length) * 100) : 0}%
                    </div>
                    <div className="text-lg font-semibold opacity-90">Success Rate</div>
                  </div>
                </div>
                <div className="text-center md:text-right max-w-lg">
                  <div className="text-xl font-bold mb-2">
                    Items have been successfully returned to their owners
                  </div>
                  <div className="text-base opacity-90">
                    Join our community and help reunite lost items with their owners
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}