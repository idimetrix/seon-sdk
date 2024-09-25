import * as crypto from "crypto";

export function hmacSha256(message: string, key: string = ""): string {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(message);
  return hmac.digest("hex");
}
