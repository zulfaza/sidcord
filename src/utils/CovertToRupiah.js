export function convertToRupiah(number) {
  let rupiah = "";
  const number2 = number.toString().split("").reverse().join("");
  for (var i = 0; i < number2.length; i++)
    if (i % 3 === 0) rupiah += number2.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}
