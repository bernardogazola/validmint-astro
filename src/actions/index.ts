import { Ratelimit } from "@unkey/ratelimit";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getSecret } from "astro:env/server";
import DOMPurify from "isomorphic-dompurify";

const unkey = new Ratelimit({
  rootKey: getSecret("UNKEY_ROOT_KEY")!,
  namespace: "fastValidate_astro",
  limit: 5,
  duration: "30s",
});

export const server = {
  fastValidate: defineAction({
    input: z.object({
      email: z.string(),
    }),
    handler: async (input) => {
      const cleanInput = DOMPurify.sanitize(input.email);
      const { success } = await unkey.limit(cleanInput);
      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      const response = await fetch(
        `https://email-validator-api.fly.dev/v1/fast-validate-dev?domain=${cleanInput}`,
        {
          headers: {
            Authorization: `Bearer ${getSecret("API_TOKEN_FLY")!}`,
          },
        }
      );
      const dataResponse = await response.json();
      const data = {
        domain: dataResponse.domain,
        is_valid: dataResponse.is_valid,
        is_disposable: dataResponse.is_disposable,
        performance: { total_time_ms: dataResponse.performance.total_time_ms },
      };
      console.log(data);
      return data;
    },
  }),
  validate: defineAction({
    input: z.object({
      email: z.string(),
    }),
    handler: async (input) => {
      const cleanInput = DOMPurify.sanitize(input.email);
      const { success } = await unkey.limit(cleanInput);
      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      const response = await fetch(
        `https://email-validator-api.fly.dev/v1/validate-dev?domain=${cleanInput}`,
        {
          headers: {
            Authorization: `Bearer ${getSecret("API_TOKEN_FLY")!}`,
          },
        }
      );
      const dataResponse = await response.json();
      const data = {
        domain: dataResponse.domain,
        is_valid: dataResponse.is_valid,
        is_disposable: dataResponse.is_disposable,
        has_mx_records: dataResponse.has_mx_records,
        spf_record: dataResponse.spf_record,
        dkim_records: dataResponse.dkim_records,
        risk_score: dataResponse.risk_score,
        risk_level: dataResponse.risk_level,
        performance: { total_time_ms: dataResponse.performance.total_time_ms },
      };
      console.log(data);
      return data;
    },
  }),
};
