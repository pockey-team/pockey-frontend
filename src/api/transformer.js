/**
 * 현재 API 응답 스키마가 존재하지 않아 임의로 테스트를 위한 응답 스키마 정의
 *
 * @param {import("openapi3-ts/oas30").OpenAPIObject} schema
 * @return {import("openapi3-ts/oas30").OpenAPIObject}
 */
export default (schema) => {
  // POST /api/v1/recommend-session
  schema.paths["/api/v1/recommend-session"].post.responses["201"].content = {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          id: { type: "string" },
          sessionId: { type: "string" },
          step: { type: "number", enum: [1] },
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          setupCount: { type: "number" },
          occasionCount: { type: "number" },
          questionCount: { type: "number" },
          type: { type: "string", enum: ["setup"] },
        },
        required: [
          "id",
          "sessionId",
          "step",
          "question",
          "options",
          "setupCount",
          "occasionCount",
          "questionCount",
          "type",
        ],
      },
    },
  };

  // POST /api/v1/recommend-session/{sessionId}/answer
  schema.paths["/api/v1/recommend-session/{sessionId}/answer"].post.responses[
    "201"
  ].content = {
    "application/json": {
      schema: {
        oneOf: [
          {
            type: "object",
            properties: {
              id: { type: "string" },
              sessionId: { type: "string" },
              step: { type: "number", enum: [2, 3, 4] },
              question: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              type: { type: "string", enum: ["setup"] },
            },
            required: [
              "id",
              "sessionId",
              "step",
              "question",
              "options",
              "type",
            ],
          },
          {
            type: "object",
            properties: {
              id: { type: "string" },
              sessionId: { type: "string" },
              step: { type: "number", enum: [5] },
              question: { type: "string" },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    key: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                  },
                  required: ["key", "title", "description"],
                },
              },
              type: { type: "string", enum: ["occasion"] },
              description: { type: "string" },
            },
            required: [
              "id",
              "sessionId",
              "step",
              "question",
              "options",
              "type",
              "description",
            ],
          },
          {
            type: "object",
            properties: {
              id: { type: "string" },
              sessionId: { type: "string" },
              step: { type: "number", enum: [6, 7, 8, 9] },
              question: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              type: { type: "string", enum: ["question"] },
            },
            required: [
              "id",
              "sessionId",
              "step",
              "question",
              "options",
              "type",
            ],
          },
        ],
      },
    },
  };
  return schema;
};
