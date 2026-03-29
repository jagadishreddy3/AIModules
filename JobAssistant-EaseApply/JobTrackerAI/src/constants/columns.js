export const COLUMNS = [
  { 
    id: 'wishlist', 
    label: 'Wishlist', 
    color: 'bg-purple-500', 
    border: 'border-purple-500', 
    text: 'text-purple-500', 
    bg: 'bg-purple-500/10' 
  },
  { 
    id: 'applied', 
    label: 'Applied', 
    color: 'bg-blue-500', 
    border: 'border-blue-500', 
    text: 'text-blue-500', 
    bg: 'bg-blue-500/10' 
  },
  { 
    id: 'screening', 
    label: 'Screening', 
    color: 'bg-amber-500', 
    border: 'border-amber-500', 
    text: 'text-amber-500', 
    bg: 'bg-amber-500/10' 
  },
  { 
    id: 'interviews', 
    label: 'Interviews', 
    color: 'bg-cyan-500', 
    border: 'border-cyan-500', 
    text: 'text-cyan-500', 
    bg: 'bg-cyan-500/10' 
  },
  { 
    id: 'offer', 
    label: 'Offer', 
    color: 'bg-emerald-500', 
    border: 'border-emerald-500', 
    text: 'text-emerald-500', 
    bg: 'bg-emerald-500/10' 
  },
  { 
    id: 'closed', 
    label: 'Closed', 
    color: 'bg-rose-500', 
    border: 'border-rose-500', 
    text: 'text-rose-500', 
    bg: 'bg-rose-500/10' 
  },
];

export const STATUS_OPTIONS = COLUMNS.map(col => ({
  value: col.id,
  label: col.label
}));

export const VIEWS = {
  DASHBOARD: 'dashboard',
  APPLICATIONS: 'applications',
  ANALYTICS: 'analytics',
  RESUMES: 'resumes',
  INTERVIEWS: 'interviews',
};
