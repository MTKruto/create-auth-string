import { isApiHashValid } from "./is_api_hash_valid.ts";

export function findApiCredentials() {
  let apiIdKey = TELEGRAM_API_ID;
  let apiId = Deno.env.get(apiIdKey);
  if (apiId === undefined) {
    apiIdKey = API_ID;
    apiId = Deno.env.get(API_ID);
  }

  let apiHashKey = TELEGRAM_API_HASH;
  let apiHash = Deno.env.get(apiHashKey);
  if (apiHash === undefined) {
    apiHashKey = API_HASH;
    apiHash = Deno.env.get(API_HASH);
  }

  const apiIdNumber = apiId === undefined ? 0 : parseInt(apiId);
  if (
    !isNaN(apiIdNumber) && apiIdNumber > 0 && apiHash && isApiHashValid(apiHash)
  ) {
    return {
      apiId: {
        envVar: apiIdKey,
        value: apiIdNumber,
      },
      apiHash: {
        envVar: apiHashKey,
        value: apiHash,
      },
    };
  } else {
    return null;
  }
}

const API_ID = "API_ID";
const TELEGRAM_API_ID = "TELEGRAM_API_ID";

const API_HASH = "API_HASH";
const TELEGRAM_API_HASH = "TELEGRAM_API_HASH";
