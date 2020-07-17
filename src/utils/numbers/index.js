export const formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

export const revenueCalculator = (price, sold) => price * sold
