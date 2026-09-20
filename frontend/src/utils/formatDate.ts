
const pad = (n: number) => String(n).padStart(2, "0");

// 2017-08-30T03:29:17Z  ->  30-08-2017 03:29:17
export const formatDate = (value: string) => {
  const d = new Date(value);

  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// 2017-08-30T03:29:17Z  ->  30-08-2017
export const formatDateOnly = (value: string) => {
  const d = new Date(value);

  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
};
