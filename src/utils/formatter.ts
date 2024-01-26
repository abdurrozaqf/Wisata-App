export const formatPrice = (price: number | undefined): string => {
  if (price !== undefined) {
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
