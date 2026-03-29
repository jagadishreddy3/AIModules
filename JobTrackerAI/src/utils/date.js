export const getDaysSince = (dateString) => {
  if (!dateString) return 0;
  const appliedDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - appliedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
  return Math.max(0, diffDays);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
