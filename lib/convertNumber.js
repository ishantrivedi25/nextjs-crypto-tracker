export const convertNumber = (number) => {
  const numberWithCommas = number.toLocaleString();
  const [integerPart, decimalPart] = numberWithCommas.split(",");

  const suffixes = ["", "K", "M", "B", "T"];
  const magnitude = Math.floor((integerPart.length - 1) / 3); // Find the magnitude (thousands, millions, etc.)

  if (magnitude === 0) {
    return numberWithCommas; // No need to shorten if it's less than 1000
  }

  // Limit decimal places to 2 and append the suffix
  return `${integerPart.slice(0, integerPart.length - magnitude * 3)}.${decimalPart.slice(0, 2)}${suffixes[magnitude]}`;
};