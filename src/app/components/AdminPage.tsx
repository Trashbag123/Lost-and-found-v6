import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { toast } from 'sonner';
import { Check, X, Trash2, Mail, TrendingUp, Package, Users, CheckCircle, AlertCircle, BarChart3, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export function AdminPage() {
  const navigate = useNavigate();
  const { items, claims, updateItemStatus, deleteItem, updateClaimStatus } = useItems();
  const { logout, user } = useAuth();
  const { getColor } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const pendingItems = items.filter(item => item.status === 'pending');
  const approvedItems = items.filter(item => item.status === 'approved');
  const claimedItems = items.filter(item => item.status === 'claimed');
  const pendingClaims = claims.filter(claim => claim.status === 'pending');

  const handleApproveItem = (id: string) => {
    updateItemStatus(id, 'approved');
    toast.success('Item approved successfully');
  };

  const handleRejectItem = (id: string) => {
    deleteItem(id);
    toast.success('Item rejected and removed');
  };

  const handleApproveClaim = (claimId: string, itemId: string) => {
    updateClaimStatus(claimId, 'approved');
    updateItemStatus(itemId, 'claimed');
    toast.success('Claim approved - Owner will be notified');
  };

  const handleRejectClaim = (claimId: string) => {
    updateClaimStatus(claimId, 'rejected');
    toast.success('Claim rejected');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getItemById = (itemId: string) => {
    return items.find(item => item.id === itemId);
  };

  // count how many items belong to each category for the bar chart
  const categoryData = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // recharts needs an array of objects, not a plain object
  const chartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const statusData = [
    { name: 'Available', value: approvedItems.length },
    { name: 'Claimed', value: claimedItems.length },
    { name: 'Pending', value: pendingItems.length }
  ];

  // just grab the 5 most recent submissions for the activity feed
  const recentActivity = [...items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // pull chart colors from the theme so they match whatever mode is active
  const COLORS = [getColor('accent1'), getColor('accent2'), getColor('accent3')];

  // recharts breaks if you pass zero-value slices to the pie chart
  const filteredStatusData = statusData.filter(item => item.value > 0);

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: getColor('bgPrimary') }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Logout */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl relative"
              style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Dark')})` }}
            >
              <div 
                className="absolute inset-0 rounded-2xl blur-lg opacity-50"
                style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
              ></div>
              <BarChart3 className="h-6 w-6 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-5xl font-bold" style={{ color: getColor('textPrimary') }}>
                Admin Dashboard
              </h1>
              <p style={{ color: getColor('textSecondary') }}>Manage submissions, claims, and view analytics</p>
            </div>
          </div>
          
          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm" style={{ color: getColor('textTertiary') }}>Logged in as</p>
              <p className="font-semibold" style={{ color: getColor('textPrimary') }}>{user?.username || 'Admin'}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-2 rounded-xl h-12 transition-all shadow-sm"
              style={{
                borderColor: getColor('accent3'),
                color: getColor('accent3')
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card 
            className="border-2 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(to bottom right, ${getColor('accent3')}20, ${getColor('accent3')}10)`,
                    borderColor: `${getColor('accent3')}50`
                  }}
                >
                  <AlertCircle className="h-6 w-6" style={{ color: getColor('accent3') }} />
                </div>
                <Badge 
                  className="border"
                  style={{
                    backgroundColor: `${getColor('accent3')}20`,
                    color: getColor('accent3'),
                    borderColor: `${getColor('accent3')}50`
                  }}
                >
                  Pending
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: getColor('textPrimary') }}>
                {pendingItems.length}
              </div>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>Pending Item Approvals</p>
            </CardContent>
          </Card>

          <Card 
            className="border-2 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(to bottom right, ${getColor('accent1')}20, ${getColor('accent1')}10)`,
                    borderColor: `${getColor('accent1')}50`
                  }}
                >
                  <CheckCircle className="h-6 w-6" style={{ color: getColor('accent1') }} />
                </div>
                <Badge 
                  className="border"
                  style={{
                    backgroundColor: `${getColor('accent1')}20`,
                    color: getColor('accent1'),
                    borderColor: `${getColor('accent1')}50`
                  }}
                >
                  Available
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: getColor('textPrimary') }}>
                {approvedItems.length}
              </div>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>Approved Items</p>
            </CardContent>
          </Card>

          <Card 
            className="border-2 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(to bottom right, ${getColor('accent2')}20, ${getColor('accent2')}10)`,
                    borderColor: `${getColor('accent2')}50`
                  }}
                >
                  <Package className="h-6 w-6" style={{ color: getColor('accent2') }} />
                </div>
                <Badge 
                  className="border"
                  style={{
                    backgroundColor: `${getColor('accent2')}20`,
                    color: getColor('accent2'),
                    borderColor: `${getColor('accent2')}50`
                  }}
                >
                  Returned
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: getColor('textPrimary') }}>
                {claimedItems.length}
              </div>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>Claimed Items</p>
            </CardContent>
          </Card>

          <Card 
            className="border-2 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(to bottom right, ${getColor('accent1')}20, ${getColor('accent1')}10)`,
                    borderColor: `${getColor('accent1')}50`
                  }}
                >
                  <Users className="h-6 w-6" style={{ color: getColor('accent1') }} />
                </div>
                <Badge 
                  className="border"
                  style={{
                    backgroundColor: `${getColor('accent1')}20`,
                    color: getColor('accent1'),
                    borderColor: `${getColor('accent1')}50`
                  }}
                >
                  Requests
                </Badge>
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: getColor('textPrimary') }}>
                {pendingClaims.length}
              </div>
              <p className="text-sm" style={{ color: getColor('textSecondary') }}>Pending Claims</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList 
            className="grid w-full grid-cols-3 mb-6 backdrop-blur-sm p-1 rounded-2xl shadow-xl border-2 h-14"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <TabsTrigger 
              value="overview" 
              className="rounded-xl data-[state=active]:text-white font-semibold transition-colors"
              style={{
                color: getColor('textSecondary')
              }}
              data-active-style={{
                background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              }}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="items"
              className="rounded-xl data-[state=active]:text-white font-semibold transition-colors"
              style={{
                color: getColor('textSecondary')
              }}
            >
              Items Management
            </TabsTrigger>
            <TabsTrigger 
              value="claims"
              className="rounded-xl data-[state=active]:text-white font-semibold transition-colors"
              style={{
                color: getColor('textSecondary')
              }}
            >
              Claims Management
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <Card 
                className="border-0 shadow-lg rounded-2xl backdrop-blur-sm"
                style={{ backgroundColor: getColor('bgCard') }}
              >
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>
                    Items by Category
                  </CardTitle>
                  <CardDescription style={{ color: getColor('textSecondary') }}>
                    Distribution of items across different categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={getColor('border')} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: getColor('textSecondary') }} 
                        angle={-45} 
                        textAnchor="end" 
                        height={80} 
                      />
                      <YAxis tick={{ fill: getColor('textSecondary') }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: getColor('bgCard'), 
                          border: `1px solid ${getColor('border')}`,
                          borderRadius: '12px',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          color: getColor('textPrimary')
                        }}
                      />
                      <Bar dataKey="value" fill={getColor('accent1')} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card 
                className="border-0 shadow-lg rounded-2xl backdrop-blur-sm"
                style={{ backgroundColor: getColor('bgCard') }}
              >
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>
                    Quick Stats
                  </CardTitle>
                  <CardDescription style={{ color: getColor('textSecondary') }}>
                    Overview of all items in the system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Available Items */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: getColor('textSecondary') }}>
                        Available Items
                      </span>
                      <span className="text-lg font-bold" style={{ color: getColor('accent1') }}>
                        {approvedItems.length}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: getColor('bgSecondary') }}>
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${items.length > 0 ? (approvedItems.length / items.length) * 100 : 0}%`,
                          background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
                        }}
                      />
                    </div>
                  </div>

                  {/* Claimed Items */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: getColor('textSecondary') }}>
                        Claimed Items
                      </span>
                      <span className="text-lg font-bold" style={{ color: getColor('accent2') }}>
                        {claimedItems.length}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: getColor('bgSecondary') }}>
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${items.length > 0 ? (claimedItems.length / items.length) * 100 : 0}%`,
                          background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`
                        }}
                      />
                    </div>
                  </div>

                  {/* Pending Items */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: getColor('textSecondary') }}>
                        Pending Approval
                      </span>
                      <span className="text-lg font-bold" style={{ color: getColor('accent3') }}>
                        {pendingItems.length}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: getColor('bgSecondary') }}>
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${items.length > 0 ? (pendingItems.length / items.length) * 100 : 0}%`,
                          background: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})`
                        }}
                      />
                    </div>
                  </div>

                  {/* Total */}
                  <div 
                    className="pt-4 mt-4 border-t flex justify-between items-center"
                    style={{ borderColor: getColor('border') }}
                  >
                    <span className="font-semibold" style={{ color: getColor('textPrimary') }}>
                      Total Items
                    </span>
                    <span className="text-2xl font-bold" style={{ color: getColor('textPrimary') }}>
                      {items.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card 
              className="border-0 shadow-lg rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: getColor('bgCard') }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>Recent Activity</CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Latest items reported in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-xl hover:opacity-80 transition-all"
                      style={{ backgroundColor: getColor('bgSecondary') }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(to bottom right, ${getColor('accent1')}10, ${getColor('accent1')}05)`
                          }}
                        >
                          <Package className="h-6 w-6" style={{ color: getColor('accent1') }} />
                        </div>
                        <div>
                          <div className="font-semibold" style={{ color: getColor('textPrimary') }}>{item.title}</div>
                          <div className="text-sm" style={{ color: getColor('textSecondary') }}>
                            {item.location} • {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {item.status === 'approved' && (
                        <Badge 
                          style={{ 
                            backgroundColor: `${getColor('accent1')}20`, 
                            color: getColor('accent1') 
                          }}
                        >
                          Available
                        </Badge>
                      )}
                      {item.status === 'claimed' && (
                        <Badge 
                          style={{ 
                            backgroundColor: `${getColor('accent2')}20`, 
                            color: getColor('accent2') 
                          }}
                        >
                          Claimed
                        </Badge>
                      )}
                      {item.status === 'pending' && (
                        <Badge 
                          style={{ 
                            backgroundColor: `${getColor('accent3')}20`, 
                            color: getColor('accent3') 
                          }}
                        >
                          Pending
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card 
              className="border-0 shadow-xl rounded-2xl overflow-hidden relative"
              style={{
                background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              }}
            >
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90 font-medium mb-1">Overall Success Rate</div>
                      <div className="text-5xl font-bold">
                        {items.length > 0 ? Math.round((claimedItems.length / items.length) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right max-w-md">
                    <div className="text-lg font-semibold mb-1">Excellent Performance</div>
                    <div className="text-sm opacity-90">
                      {claimedItems.length} out of {items.length} items successfully reunited with their owners
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Items Management Tab */}
          <TabsContent value="items" className="space-y-6">
            <Card 
              className="border-0 shadow-lg rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: getColor('bgCard') }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>
                  Pending Item Approvals
                </CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Review and approve/reject item submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${getColor('accent1')}10` }}
                    >
                      <CheckCircle className="h-10 w-10" style={{ color: getColor('accent1') }} />
                    </div>
                    <p className="font-medium" style={{ color: getColor('textSecondary') }}>
                      No pending items to review
                    </p>
                    <p className="text-sm mt-1" style={{ color: getColor('textTertiary') }}>
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border" style={{ borderColor: getColor('border') }}>
                    <Table>
                      <TableHeader>
                        <TableRow style={{ backgroundColor: getColor('bgSecondary') }}>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Image</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Title</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Category</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Location</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Submitted By</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingItems.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.imageUrl ? (
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.title}
                                  className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                />
                              ) : (
                                <div 
                                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: `${getColor('accent1')}10` }}
                                >
                                  <Package className="h-6 w-6" style={{ color: `${getColor('accent1')}80` }} />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium" style={{ color: getColor('textPrimary') }}>
                              {item.title}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                style={{
                                  backgroundColor: `${getColor('accent1')}10`,
                                  color: getColor('accent1'),
                                  borderColor: `${getColor('accent1')}20`
                                }}
                              >
                                {item.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm" style={{ color: getColor('textSecondary') }}>
                              {item.location}
                            </TableCell>
                            <TableCell className="text-sm" style={{ color: getColor('textSecondary') }}>
                              {item.submittedBy}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveItem(item.id)}
                                  className="text-white rounded-lg"
                                  style={{
                                    background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
                                  }}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectItem(item.id)}
                                  className="rounded-lg"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card 
              className="border-0 shadow-lg rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: getColor('bgCard') }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>All Items</CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  View and manage all items in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-xl border" style={{ borderColor: getColor('border') }}>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ backgroundColor: getColor('bgSecondary') }}>
                        <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Title</TableHead>
                        <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Category</TableHead>
                        <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Status</TableHead>
                        <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Date Found</TableHead>
                        <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium" style={{ color: getColor('textPrimary') }}>
                            {item.title}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              style={{
                                backgroundColor: `${getColor('accent1')}10`,
                                color: getColor('accent1'),
                                borderColor: `${getColor('accent1')}20`
                              }}
                            >
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item.status === 'approved' && (
                              <Badge style={{ backgroundColor: `${getColor('accent1')}20`, color: getColor('accent1') }}>
                                Available
                              </Badge>
                            )}
                            {item.status === 'claimed' && (
                              <Badge style={{ backgroundColor: `${getColor('accent2')}20`, color: getColor('accent2') }}>
                                Claimed
                              </Badge>
                            )}
                            {item.status === 'pending' && (
                              <Badge style={{ backgroundColor: `${getColor('accent3')}20`, color: getColor('accent3') }}>
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm" style={{ color: getColor('textSecondary') }}>
                            {new Date(item.dateFound).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteItem(item.id)}
                              className="rounded-lg"
                              style={{ color: getColor('error') }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Claims Management Tab */}
          <TabsContent value="claims" className="space-y-6">
            <Card 
              className="border-0 shadow-lg rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: getColor('bgCard') }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: getColor('textPrimary') }}>
                  Pending Claim Requests
                </CardTitle>
                <CardDescription style={{ color: getColor('textSecondary') }}>
                  Review and approve/reject claim requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingClaims.length === 0 ? (
                  <div className="text-center py-12">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${getColor('accent3')}10` }}
                    >
                      <CheckCircle className="h-10 w-10" style={{ color: getColor('accent3') }} />
                    </div>
                    <p className="font-medium" style={{ color: getColor('textSecondary') }}>
                      No pending claims to review
                    </p>
                    <p className="text-sm mt-1" style={{ color: getColor('textTertiary') }}>
                      All caught up!
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border" style={{ borderColor: getColor('border') }}>
                    <Table>
                      <TableHeader>
                        <TableRow style={{ backgroundColor: getColor('bgSecondary') }}>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Item</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Claimant</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Contact</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Description</TableHead>
                          <TableHead className="font-semibold" style={{ color: getColor('textPrimary') }}>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingClaims.map(claim => {
                          const item = getItemById(claim.itemId);
                          return (
                            <TableRow key={claim.id}>
                              <TableCell className="font-medium" style={{ color: getColor('textPrimary') }}>
                                {item?.title || 'Unknown Item'}
                              </TableCell>
                              <TableCell style={{ color: getColor('textSecondary') }}>
                                {claim.claimantName}
                              </TableCell>
                              <TableCell className="text-sm" style={{ color: getColor('textSecondary') }}>
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {claim.claimantEmail}
                                </div>
                                {claim.claimantPhone && (
                                  <div className="text-xs mt-1" style={{ color: getColor('textTertiary') }}>
                                    {claim.claimantPhone}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <p className="text-sm line-clamp-2" style={{ color: getColor('textSecondary') }}>
                                  {claim.description}
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApproveClaim(claim.id, claim.itemId)}
                                    className="text-white rounded-lg"
                                    style={{
                                      background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
                                    }}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRejectClaim(claim.id)}
                                    className="rounded-lg"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}