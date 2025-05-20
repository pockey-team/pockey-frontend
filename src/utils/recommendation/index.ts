import type {
  RecommendSessionControllerStartSession201,
  RecommendSessionControllerSubmitAnswer201,
} from "@/api/__generated__/index.schemas";

interface Props {
  index: number;
  current: number;
}

export const getRotation = ({ index, current }: Props) => {
  const ROTATION_FACTOR = -3;
  const diff = index - current;

  return diff * ROTATION_FACTOR;
};

export const getSessionResultStorageKey = (sessionId: string) => {
  return `pockey.session.${sessionId}.result`;
};

export const createUrlFromSessionResponse = (
  data:
    | RecommendSessionControllerSubmitAnswer201
    | RecommendSessionControllerStartSession201,
  extra?: Record<string, string>,
) => {
  if (Array.isArray(data)) {
    const sessionId = extra?.sessionId || "default";
    window.sessionStorage.setItem(
      getSessionResultStorageKey(sessionId),
      JSON.stringify(data),
    );
    const params = new URLSearchParams({ sessionId, ...extra });
    return `/recommendation/result?${params}`;
  }

  if (data.type === "setup" || data.type === "question") {
    const params = new URLSearchParams({
      sessionId: data.sessionId,
      question: data.question,
      options: JSON.stringify(data.options),
      ...extra,
    });
    return `/recommendation/session/${data.type}/${data.step}?${params}`;
  }

  if (data.type === "occasion") {
    const params = new URLSearchParams({
      sessionId: data.sessionId,
      question: data.question,
      description: data.description,
      options: JSON.stringify(data.options),
      ...extra,
    });
    return `/recommendation/session/${data.type}/${data.step}?${params}`;
  }

  return "/";
};
