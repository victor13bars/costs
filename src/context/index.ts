import { createDomain } from "effector";
import { ICost } from "../types";

const costs = createDomain();

export const setCosts = costs.createEvent<ICost[]>();
export const createCost = costs.createEvent<ICost>();
export const updateCost = costs.createEvent<ICost>();
export const removeCost = costs.createEvent<string | number>();
export const setTotalPrice = costs.createEvent<number>();

const handleRemoveCost = (costs: ICost[], id: string | number) =>
  costs.filter((cost) => cost._id !== id);

export const $costs = costs
  .createStore<ICost[]>([])
  .on(createCost, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)
  .on(removeCost, (state, id) => [...handleRemoveCost(state, id)]);

export const $totalPrice = costs
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value);
