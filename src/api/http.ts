const baseURL = "https://api-dev.pockey.pics";

export const http = async <T>(url: string, init: RequestInit): Promise<T> => {
  let endpoint = `${baseURL}${url}`;
  const response = await fetch(endpoint, init);
  const data = handleDate(await response.json());

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T;
};

const isDateString = (value: any): boolean => {
  const pattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
  return value && typeof value === "string" && pattern.test(value);
};

const handleDate = <T>(body: T): T => {
  if (body === null || body === undefined || typeof body !== "object") {
    return body;
  }

  for (const key of Object.keys(body)) {
    const value = (body as any)[key];
    if (isDateString(value)) {
      (body as any)[key] = new Date(value);
    } else if (typeof value === "object") {
      handleDate(value);
    }
  }

  return body;
};
