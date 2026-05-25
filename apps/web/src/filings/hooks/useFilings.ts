import { useEffect, useReducer } from "react";
import type { Filing } from "../model.d.ts";

const EVENT_SOURCE_URL = "/sse";

export const FILING_ACTION_NAMES = {
  ADD_FILING: "ADD_FILING",
};

export type ADD_FILING = {
  type: typeof FILING_ACTION_NAMES.ADD_FILING;
  payload: Filing;
};

export type FILING_ACTIONS = ADD_FILING;

const reducer: React.Reducer<Filing[], FILING_ACTIONS> = (state, action) => {
  switch (action.type) {
    case FILING_ACTION_NAMES.ADD_FILING: {
      const filing = action.payload;
      if (!state.some((f) => f.id === filing.id)) {
        return [...state, filing];
      }
    }
  }
  return state;
};

export default function useFilings() {
  const [filings, dispatch] = useReducer(
    reducer,
    [],
  );

  useEffect(() => {
    const eventSource = new EventSource(EVENT_SOURCE_URL);
    eventSource.onmessage = (ev) => {
      const payload = {
        type: FILING_ACTION_NAMES.ADD_FILING,
        payload: JSON.parse(ev.data),
      };

      dispatch(payload);
    };

    return () => eventSource.close();
  }, []);

  return { filings };
}
