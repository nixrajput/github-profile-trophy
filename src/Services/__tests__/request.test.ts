import { assertEquals, assertRejects } from "@std/assert";
import { stub } from "@std/testing/mock";
import { soxa } from "../../../deps.ts";
import { EServiceKindError, ServiceError } from "../../Types/index.ts";
import { requestGithubData } from "../request.ts";

Deno.test("requestGithubData rejects partial GraphQL responses", async () => {
  const post = stub(soxa, "post", () => {
    return Promise.resolve({
      data: {
        data: { user: { login: "test" } },
        errors: [{ message: "Field access failed", type: "FORBIDDEN" }],
      },
    });
  });

  try {
    const error = await assertRejects(
      () => requestGithubData("query { viewer { login } }", {}),
      ServiceError,
      "Field access failed",
    ) as ServiceError;

    assertEquals(error.cause, EServiceKindError.UPSTREAM);
    assertEquals(error.code, 502);
  } finally {
    post.restore();
  }
});

Deno.test("requestGithubData drops the token from transport errors", async () => {
  const token = "ghp_test_token_must_not_leak";
  const post = stub(soxa, "post", () => {
    const error = Object.assign(
      new Error("Request failed with status code 401"),
      { config: { headers: { Authorization: `bearer ${token}` } } },
    );
    return Promise.reject(error);
  });

  try {
    const error = await assertRejects(
      () => requestGithubData("query { viewer { login } }", {}, token),
      Error,
      "Request failed with status code 401",
    );

    assertEquals(Deno.inspect(error).includes(token), false);
  } finally {
    post.restore();
  }
});
