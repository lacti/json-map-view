export interface IViewState {
  selectedNodeKeys: Array<string[] | null>;
  filters: Array<string | null>;
  skipReferenceLevel: number;
  query: string;
}
