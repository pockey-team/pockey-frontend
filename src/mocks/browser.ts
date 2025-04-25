import { setupWorker } from "msw/browser";
import { getPockeyAPIDocumentationMock } from "@/api/__generated__/index.msw";

const handlers = getPockeyAPIDocumentationMock();
export const worker = setupWorker(...handlers);
