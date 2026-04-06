// ─── Third-party imports ─────────────────────────────────────────────────────
import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router';

// ─── Context providers ────────────────────────────────────────────────────────
import { AuthProvider } from '@/app/contexts/AuthContext';
import { ClaimsProvider } from '@/app/contexts/ClaimsContext';
import { ItemsProvider } from '@/app/contexts/ItemsContext';
import { NotificationsProvider } from '@/app/contexts/NotificationsContext';
import { ThemeProvider, useTheme } from '@/app/contexts/ThemeContext';

// ─── Layout components ────────────────────────────────────────────────────────
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { CustomerServiceBot } from '@/app/components/CustomerServiceBot';
import { FloatingShapes } from '@/app/components/FloatingShapes';
import { Footer } from '@/app/components/Footer';
import { NavBar } from '@/app/components/NavBar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { UltraBackground } from '@/app/components/UltraBackground';
import { Toaster } from '@/app/components/ui/sonner';

// ─── Page components ──────────────────────────────────────────────────────────
import { AccessibilityPage } from '@/app/components/AccessibilityPage';
import { AdminPage } from '@/app/components/AdminPage';
import { ClaimsPage } from '@/app/components/ClaimsPage';
import { FAQPage } from '@/app/components/FAQPage';
import { HelpPage } from '@/app/components/HelpPage';
import { HomePage } from '@/app/components/HomePage';
import { ItemDetailPage } from '@/app/components/ItemDetailPage';
import { ItemsListingPage } from '@/app/components/ItemsListingPage';
import { LoginPage } from '@/app/components/LoginPage';
import { NotificationsPage } from '@/app/components/NotificationsPage';
import { PrivacyPage } from '@/app/components/PrivacyPage';
import { ProfilePage } from '@/app/components/ProfilePage';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { RegisterPage } from '@/app/components/RegisterPage';
import { SecurityPage } from '@/app/components/SecurityPage';
import { SubmitItemPage } from '@/app/components/SubmitItemPage';
import { TermsPage } from '@/app/components/TermsPage';

// ─── Constants ────────────────────────────────────────────────────────────────

const STANDARD_PERFORMANCE_LEVELS = ['low', 'medium', 'high'] as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

function Layout() {
  const { getColor, performanceLevel } = useTheme();

  const isUltra = performanceLevel === 'ultra';
  const showStandardEffects = STANDARD_PERFORMANCE_LEVELS.includes(
    performanceLevel as typeof STANDARD_PERFORMANCE_LEVELS[number]
  );

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      {isUltra && <UltraBackground />}
      {showStandardEffects && (
        <>
          <AnimatedBackground />
          <FloatingShapes />
        </>
      )}

      <ScrollToTop />
      <NavBar />

      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      <Footer />
      <CustomerServiceBot />
      <Toaster />
    </div>
  );
}

// ─── Providers ────────────────────────────────────────────────────────────────

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <ClaimsProvider>
            <ItemsProvider>
              {children}
            </ItemsProvider>
          </ClaimsProvider>
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Providers>
        <Layout />
      </Providers>
    ),
    children: [
      { index: true,           element: <HomePage /> },
      { path: 'items',         element: <ItemsListingPage /> },
      { path: 'item/:id',      element: <ItemDetailPage /> },
      { path: 'submit',        element: <SubmitItemPage /> },
      { path: 'claims',        element: <ClaimsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'security',      element: <SecurityPage /> },
      { path: 'login',         element: <LoginPage /> },
      { path: 'register',      element: <RegisterPage /> },
      { path: 'profile',       element: <ProfilePage /> },
      { path: 'help',          element: <HelpPage /> },
      { path: 'faq',           element: <FAQPage /> },
      { path: 'terms',         element: <TermsPage /> },
      { path: 'privacy',       element: <PrivacyPage /> },
      { path: 'accessibility', element: <AccessibilityPage /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requireAdmin>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}