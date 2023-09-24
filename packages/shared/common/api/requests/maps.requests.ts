export namespace MapReq {
  export type PlaceSuggestion = {
    description: string;
  };

  export type PlaceSuggestionRes = {
    predictions: PlaceSuggestion[];
  };
}

export namespace GetCitySuggestionsReq {
  export type ReqBody = {
    query: string;
  };

  export type ResBody = {
    predictions: MapReq.PlaceSuggestion[];
  };
}
