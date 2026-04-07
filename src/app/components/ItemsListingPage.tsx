import { useState } from 'react';
import { Link } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Search, MapPin, Calendar, Package, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ITEMS_PER_PAGE = 12;

const categories = ['all', 'Electronics', 'Bags', 'Clothing', 'Books', 'School Supplies', 'Personal Items', 'Sports Equipment', 'Keys', 'Other'];

export function ItemsListingPage() {
  const { items } = useItems();
  const { getColor } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.isAdmin ?? false;

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('approved');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);

  let filtered = items.filter((item) => {
    if (!isAdmin && item.status === 'pending') return false;
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
    const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const setFilter = (fn: () => void) => { fn(); setCurrentPage(1); };

  const statusColor = (status: string) => {
    if (status === 'approved') return getColor('accent1');
    if (status === 'claimed') return getColor('accent2');
    return getColor('accent3');
  };
  const statusLabel = (status: string) => {
    if (status === 'approved') return 'Available';
    if (status === 'claimed') return 'Claimed';
    return 'Pending';
  };

  const activeFilters = [
    categoryFilter !== 'all' && { label: categoryFilter, clear: () => setFilter(() => setCategoryFilter('all')) },
    statusFilter !== 'all' && { label: statusLabel(statusFilter), clear: () => setFilter(() => setStatusFilter('all')) },
    searchTerm && { label: `"${searchTerm}"`, clear: () => setFilter(() => setSearchTerm('')) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="min-h-screen" style={{ backgroundColor: getColor('bgPrimary') }}>

      {/* Top bar */}
      <div className="border-b" style={{ borderColor: getColor('border'), backgroundColor: getColor('bgCard') }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: getColor('textTertiary') }} />
            <Input
              placeholder="Search items, locations..."
              value={searchTerm}
              onChange={(e) => setFilter(() => setSearchTerm(e.target.value))}
              className="pl-10 h-11 rounded-lg border"
              style={{
                borderColor: getColor('border'),
                backgroundColor: getColor('bgPrimary'),
                color: getColor('textPrimary'),
              }}
            />
            {searchTerm && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setFilter(() => setSearchTerm(''))}>
                <X className="h-4 w-4" style={{ color: getColor('textTertiary') }} />
              </button>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Select value={categoryFilter} onValueChange={(v) => setFilter(() => setCategoryFilter(v))}>
              <SelectTrigger className="h-11 w-44 rounded-lg border" style={{ borderColor: getColor('border'), backgroundColor: getColor('bgPrimary'), color: getColor('textPrimary') }}>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => setFilter(() => setStatusFilter(v))}>
              <SelectTrigger className="h-11 w-36 rounded-lg border" style={{ borderColor: getColor('border'), backgroundColor: getColor('bgPrimary'), color: getColor('textPrimary') }}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Available</SelectItem>
                <SelectItem value="claimed">Claimed</SelectItem>
                {isAdmin && <SelectItem value="pending">Pending</SelectItem>}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setFilter(() => setSortBy(v))}>
              <SelectTrigger className="h-11 w-40 rounded-lg border" style={{ borderColor: getColor('border'), backgroundColor: getColor('bgPrimary'), color: getColor('textPrimary') }}>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">A – Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters + result count */}
        <div className="max-w-7xl mx-auto px-6 pb-4 flex items-center gap-3 flex-wrap">
          <span className="text-sm" style={{ color: getColor('textSecondary') }}>
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </span>
          {activeFilters.map((f, i) => (
            <button
              key={i}
              onClick={f.clear}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
              style={{ borderColor: getColor('accent1'), color: getColor('accent1') }}
            >
              {f.label}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {paged.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <Package className="h-12 w-12 mx-auto mb-4" style={{ color: getColor('textTertiary') }} />
              <p className="text-lg font-semibold mb-1" style={{ color: getColor('textPrimary') }}>No items found</p>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>Try a different search or clear your filters</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {paged.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={`/item/${item.id}`}>
                    <div
                      className="group rounded-xl overflow-hidden border transition-all hover:shadow-lg"
                      style={{ backgroundColor: getColor('bgCard'), borderColor: getColor('border') }}
                    >
                      {/* Image */}
                      <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: getColor('bgSecondary') }}>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-10 w-10" style={{ color: getColor('textTertiary') }} />
                          </div>
                        )}
                        {/* Status dot */}
                        <div className="absolute top-3 right-3">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: statusColor(item.status) }}
                          >
                            {statusLabel(item.status)}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-sm leading-tight line-clamp-1" style={{ color: getColor('textPrimary') }}>
                            {item.title}
                          </h3>
                        </div>
                        <Badge
                          className="text-xs mb-3 border-0"
                          style={{ backgroundColor: `${getColor('accent1')}15`, color: getColor('accent1') }}
                        >
                          {item.category}
                        </Badge>
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: getColor('textSecondary') }}>
                          {item.description}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: getColor('textTertiary') }}>
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: getColor('textTertiary') }}>
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span>{new Date(item.dateFound).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 w-9 rounded-lg border flex items-center justify-center disabled:opacity-40 transition-opacity"
              style={{ borderColor: getColor('border'), color: getColor('textPrimary'), backgroundColor: getColor('bgCard') }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className="h-9 w-9 rounded-lg border text-sm font-semibold transition-all"
                style={{
                  borderColor: n === page ? getColor('accent1') : getColor('border'),
                  backgroundColor: n === page ? getColor('accent1') : getColor('bgCard'),
                  color: n === page ? '#fff' : getColor('textPrimary'),
                }}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-9 w-9 rounded-lg border flex items-center justify-center disabled:opacity-40 transition-opacity"
              style={{ borderColor: getColor('border'), color: getColor('textPrimary'), backgroundColor: getColor('bgCard') }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
