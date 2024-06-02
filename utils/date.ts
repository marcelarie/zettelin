import { assertEquals } from "$std/assert/assert_equals.ts";

const padWithZeros = (n: number) => String(n).padStart(2, "0");

export function formatDate(date: Date) {
  const day = padWithZeros(date.getUTCDate());
  const month = padWithZeros(date.getUTCMonth() + 1);
  const year = date.getFullYear();
  const hours = padWithZeros(date.getUTCHours());
  const minutes = padWithZeros(date.getUTCMinutes());

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

Deno.test("format date", () => {
  const date = new Date("2021-01-01T00:00:00Z");
  assertEquals(formatDate(date), "01/01/2021 - 00:00");
});
