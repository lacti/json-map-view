export interface IViewState {
  mapUrl: string | null;
  selectedNodeKeys: Array<string[] | null>;
  filters: Array<string | null>;
  skipReferenceLevel: number;
  query: string;
}
