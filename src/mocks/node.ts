import { setupServer } from "msw/node";
import { getPockeyAPIDocumentationMock } from "@/api/__generated__/index.msw";

const handlers = getPockeyAPIDocumentationMock();
export const server = setupServer(...handlers);
