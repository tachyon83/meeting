export interface ISSOHandler {
  tokenGetter: () => Promise<string>
  userIdGetter: () => Promise<string>
}
