export interface PageBody<T> {
  readonly count?: number;
  readonly data?: Array<T>;
  readonly pages?: number;
}
