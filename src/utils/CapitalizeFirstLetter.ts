export const capitalizeFirst = (string: string | undefined) => {
  if (!string) {
    return "";
  }
  const words = string.toLowerCase().split(" ");
  const capital = words.map((item) => {
    const hurufPertama = item.charAt(0).toUpperCase();
    const sisa = item.slice(1);
    return hurufPertama + sisa;
  });

  return capital.join(" ");
};
