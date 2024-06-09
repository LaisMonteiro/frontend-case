export const formatCurrency = (number: number) => {
  const formattedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);

  return formattedNumber;
};
