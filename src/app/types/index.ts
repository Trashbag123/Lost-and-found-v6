// shared types used across multiple contexts and components

export interface FoundItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  dateFound: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'claimed';
  submittedBy: string;
  contactEmail: string;
  createdAt: string;
}

export interface ClaimRequest {
  id: string;
  itemId: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
