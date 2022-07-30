export interface IServerResponse<T extends string | boolean | number> {
  readonly message: T;
}
