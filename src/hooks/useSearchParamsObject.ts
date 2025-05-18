import { useSearchParams } from "next/navigation";

interface Options {
  hook?: (data: Record<string, string>) => Record<string, string>;
}

export const useSearchParamsObject = <T = Record<string, string>>({
  hook,
}: Options = {}): T => {
  const entries = useSearchParams().entries();
  return hook
    ? (hook(Object.fromEntries(entries)) as T)
    : (Object.fromEntries(entries) as T);
};
