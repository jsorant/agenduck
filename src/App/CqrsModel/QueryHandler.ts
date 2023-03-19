import { QueryParameters } from "./Query";

export interface Query<TQueryParameters extends QueryParameters, TResult> {
  handle(query: TQueryParameters): Promise<TResult>;
}
