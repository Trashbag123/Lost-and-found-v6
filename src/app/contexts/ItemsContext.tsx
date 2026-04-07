import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { FoundItem, ClaimRequest } from '@/app/types';
import sampleItems from '@/app/data/sampleItems';

// re-export so components that already import these from here don't break
export type { FoundItem, ClaimRequest };

interface ItemsContextType {
  items: FoundItem[];
  claims: ClaimRequest[];
  addItem: (item: Omit<FoundItem, 'id' | 'createdAt' | 'status'>) => void;
  updateItemStatus: (id: string, status: FoundItem['status']) => void;
  deleteItem: (id: string) => void;
  addClaim: (claim: Omit<ClaimRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateClaimStatus: (id: string, status: ClaimRequest['status']) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  // load from localStorage if it exists, otherwise use the sample data
  const [items, setItems] = useState<FoundItem[]>(() => {
    const stored = localStorage.getItem('lostAndFoundItems');
    return stored ? JSON.parse(stored) : sampleItems;
  });

  const [claims, setClaims] = useState<ClaimRequest[]>(() => {
    const stored = localStorage.getItem('lostAndFoundClaims');
    return stored ? JSON.parse(stored) : [];
  });

  // save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('lostAndFoundItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('lostAndFoundClaims', JSON.stringify(claims));
  }, [claims]);

  const addItem = (item: Omit<FoundItem, 'id' | 'createdAt' | 'status'>) => {
    const newItem: FoundItem = {
      ...item,
      id: Date.now().toString(),
      status: 'pending', // all new submissions start as pending until admin approves
      createdAt: new Date().toISOString()
    };
    setItems((prev) => [newItem, ...prev]);
  };

  // used by admin to approve/reject items
  const updateItemStatus = (id: string, status: FoundItem['status']) => {
    setItems((prev) => prev.map((item) =>
      item.id === id ? { ...item, status } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addClaim = (claim: Omit<ClaimRequest, 'id' | 'createdAt' | 'status'>) => {
    const newClaim: ClaimRequest = {
      ...claim,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setClaims((prev) => [newClaim, ...prev]);
  };

  const updateClaimStatus = (id: string, status: ClaimRequest['status']) => {
    setClaims((prev) => prev.map((claim) =>
      claim.id === id ? { ...claim, status } : claim
    ));

    // if a claim gets approved, also mark the item itself as claimed
    if (status === 'approved') {
      const claim = claims.find(c => c.id === id);
      if (claim) {
        updateItemStatus(claim.itemId, 'claimed');
      }
    }
  };

  return (
    <ItemsContext.Provider value={{
      items,
      claims,
      addItem,
      updateItemStatus,
      deleteItem,
      addClaim,
      updateClaimStatus
    }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider');
  }
  return context;
}
