import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Claim Interface
 * Represents a claim submission in the standalone Claims Portal
 * This is separate from ClaimRequest in ItemsContext - it's for general lost item inquiries
 * where the item might not yet be in the found items database
 */
export interface Claim {
  id: string;                    // Unique claim ID (format: CLM-YYYY-NNN)
  itemName: string;              // What item was lost (e.g., "Blue Backpack")
  description: string;           // Detailed description to verify ownership
  dateLost: string;              // When the item was lost (YYYY-MM-DD)
  contactEmail: string;          // Email for status updates and notifications
  submittedDate: string;         // Date claim was submitted (YYYY-MM-DD)
  status: 'pending' | 'verified' | 'rejected';  // Current claim status
  adminNotes?: string;           // Optional notes from admin review
}

/**
 * ClaimsContext Type Definition
 * Manages the standalone claims system for students looking for lost items
 * Provides claim tracking via ID or email lookup
 */
interface ClaimsContextType {
  claims: Claim[];               // All claims in the system
  submitClaim: (itemName: string, description: string, dateLost: string, contactEmail: string) => string;
  getClaim: (idOrEmail: string) => Claim | undefined;     // Lookup by ID or email
  getClaimsByEmail: (email: string) => Claim[];           // Get all claims for an email
}

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined);

/**
 * ClaimsProvider Component
 * Provides claim management functionality to the application
 * Pre-populated with sample claims for demonstration purposes
 */
export function ClaimsProvider({ children }: { children: ReactNode }) {
  // Initialize with sample claims showing different statuses
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: 'CLM-2026-001',
      itemName: 'Blue Backpack',
      description: 'Lost near the cafeteria, has a small tear on the side pocket and Nike logo on front',
      dateLost: '2026-01-15',
      contactEmail: 'student@school.edu',
      submittedDate: '2026-01-16',
      status: 'pending',
      adminNotes: 'Pending verification'
    },
    {
      id: 'CLM-2026-002',
      itemName: 'TI-84 Calculator',
      description: 'TI-84 Plus CE graphing calculator, blue color with my name "Alex Chen" written on the back',
      dateLost: '2026-01-10',
      contactEmail: 'student@school.edu',
      submittedDate: '2026-01-11',
      status: 'verified',
      adminNotes: 'Ownership verified. Ready for pickup at Main Office.'
    },
    {
      id: 'CLM-2026-003',
      itemName: 'Red Water Bottle',
      description: 'Red Hydro Flask with stickers from various bands',
      dateLost: '2026-01-05',
      contactEmail: 'student@school.edu',
      submittedDate: '2026-01-06',
      status: 'rejected',
      adminNotes: 'Unable to verify ownership. Description does not match found item.'
    }
  ]);

  const submitClaim = (itemName: string, description: string, dateLost: string, contactEmail: string): string => {
    const newClaim: Claim = {
      id: `CLM-2026-${String(claims.length + 1).padStart(3, '0')}`,
      itemName,
      description,
      dateLost,
      contactEmail,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setClaims(prev => [newClaim, ...prev]);
    return newClaim.id; // Return the claim ID
  };

  const getClaim = (idOrEmail: string) => {
    // Check if it's a claim ID
    const byId = claims.find(claim => claim.id.toLowerCase() === idOrEmail.toLowerCase());
    if (byId) return byId;

    // Check if it's an email and return the most recent claim
    const byEmail = claims.filter(claim => claim.contactEmail.toLowerCase() === idOrEmail.toLowerCase());
    return byEmail[0]; // Return most recent
  };

  const getClaimsByEmail = (email: string) => {
    return claims.filter(claim => claim.contactEmail.toLowerCase() === email.toLowerCase());
  };

  return (
    <ClaimsContext.Provider
      value={{
        claims,
        submitClaim,
        getClaim,
        getClaimsByEmail
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaims() {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error('useClaims must be used within ClaimsProvider');
  }
  return context;
}