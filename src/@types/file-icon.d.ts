declare module "file-icon" {
  export function buffer(
    path: string,
    opts?: { size?: number },
  ): Promise<Buffer>;
}
