export interface OperatorItem {
  code: string;
  name?: string;
  show?: (data: any) => boolean;
}
