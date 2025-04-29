import { createContext } from "react";

export const CreateTripContext = createContext({
  trip: null,
  setTrip: () => {},
});
