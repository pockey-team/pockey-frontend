/**
 * 현재 API 응답 스키마가 존재하지 않아 임의로 테스트를 위한 응답 스키마 정의
 *
 * @param {import("openapi3-ts/oas30").OpenAPIObject} inputSchema
 * @return {import("openapi3-ts/oas30").OpenAPIObject}
 */
export default (schema) => {
  schema.paths["/api/v1/user/{id}"].get.responses["200"] = {
    ...schema.paths["/api/v1/user/{id}"].get.responses["200"],
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
    },
  };

  return schema;
};
