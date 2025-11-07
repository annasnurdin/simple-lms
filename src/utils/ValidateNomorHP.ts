export const validateNomorHP = (nomorHP: string | undefined): string => {
  if (!nomorHP) {
    return "";
  }

  if (nomorHP.length === 1) {
    return "8";
  } else {
    const maxLength = 11;
    const limitedNomorHP = nomorHP?.substring(0, maxLength);
    return limitedNomorHP;
  }
};
