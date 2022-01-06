import * as preload from "../preload";

declare global {
  const bridge: typeof preload.bridge;

  namespace bridge {
    export type SearchResult = Awaited<
      ReturnType<typeof preload.bridge.search>
    >;
  }
}
