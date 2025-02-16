import { AxiosError } from "axios";

export const pick = <T extends NonNullable<unknown>, K extends keyof T>(
  obj: T,
  ...keys: K[]
) =>
  Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
  ) as Pick<T, K>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}
