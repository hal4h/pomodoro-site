// Utility function to get a darker shade of a color
export const getDarkerShade = (backgroundColor, darkenAmount = 60) => {
  if (!backgroundColor) return '#6366f1'; // fallback color
  
  // Handle hex colors
  if (backgroundColor.startsWith('#')) {
    const hex = backgroundColor.slice(1);
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - darkenAmount);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - darkenAmount);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - darkenAmount);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  // Handle rgb/rgba colors
  if (backgroundColor.startsWith('rgb')) {
    const match = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (match) {
      const r = Math.max(0, parseInt(match[1]) - darkenAmount);
      const g = Math.max(0, parseInt(match[2]) - darkenAmount);
      const b = Math.max(0, parseInt(match[3]) - darkenAmount);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  
  // Handle hsl colors
  if (backgroundColor.startsWith('hsl')) {
    const match = backgroundColor.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)/);
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]);
      const l = Math.max(0, parseInt(match[3]) - darkenAmount);
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  }
  
  return '#6366f1'; // fallback color
};

// Function to get accent color based on background
export const getAccentColor = (backgroundColor) => {
  return getDarkerShade(backgroundColor, 40);
}; 