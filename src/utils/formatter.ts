export const formatPrice = (price: number | undefined | string): string => {
  if (price !== undefined && price !== null) {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  } else {
    return "";
  }
};

export const countFormula = (firstPrice: number, secondPrice: number) => {
  const discont = ((firstPrice - secondPrice) / firstPrice) * 100;
  return Math.ceil(discont);
};
