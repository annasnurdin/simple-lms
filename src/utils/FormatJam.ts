export const formatJamMenit = (isoString: string) => {
  const date = new Date(isoString);

  const jam = date.getHours();
  const menit = date.getMinutes();
  // const formattedHours = String(jam).padStart(2, '0');
  // const formattedMinutes = String(menit).padStart(2, '0');

  return `${jam}:${menit}`;
};
