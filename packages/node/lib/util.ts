export function createURL(urlString: string) {
  if (!urlString.startsWith("http")) {
    urlString = `http://self${urlString}`;
    return new URL(urlString);
  } else {
    return new URL(urlString);
  }
}
import { Injector } from "@nger/core";
import { createHash } from "crypto";
export function createCid(str: string | Buffer): string {
  return createHash(`md5`)
    .update(str)
    .digest("hex");
}
