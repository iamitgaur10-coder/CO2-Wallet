
export enum UserState {
  PUBLIC = 'PUBLIC',
  ONBOARDING = 'ONBOARDING',
  AUTHENTICATED = 'AUTHENTICATED',
  DEMO = 'DEMO'
}

// Supabase Database Types
export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  balance_kg: number;
  lifetime_emitted_kg: number;
  lifetime_removed_kg: number;
  created_at: string;
}

export interface EmissionRecord {
  id: string;
  user_id?: string;
  source: string; // e.g., "Whole Foods Receipt", "Uber Trip"
  amountKg: number;
  date: string; // ISO
  type: 'transport' | 'food' | 'energy' | 'consumption' | 'flight';
  method: 'manual' | 'receipt_scan' | 'auto_detected' | 'plaid_transaction';
  metadata?: any; // JSONB in SQL
  confidence_score?: number;
}

export interface RemovalRecord {
    id: string;
    user_id?: string;
    project_name: string;
    provider: 'Climeworks' | 'Toucan' | 'Pachama' | 'Running Tide' | 'Charm Industrial';
    method: 'DAC' | 'Biochar' | 'Kelp' | 'Enhanced Weathering' | 'Reforestation';
    amount_kg: number;
    cost_usd: number;
    tx_hash?: string; // Polygon Tx Hash
    certificate_url?: string;
    date: string;
}

export interface ReceiptAnalysis {
    total_kg: number;
    confidence: number;
    items: { name: string; kg: number; category: string }[];
    tips: string[];
}

export interface RecommendedRemoval {
    project_id: string;
    provider: string;
    method: string;
    amount_kg: number;
    cost_usd: number;
    reasoning: string;
    location: string;
}

// Global Application State Interface
export interface AppState {
    user: Profile | null;
    emissions: EmissionRecord[];
    removals: RemovalRecord[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: number;
}
