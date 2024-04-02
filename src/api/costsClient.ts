import { createEffect } from "effector";
import { ICreateCost, IGetCosts } from "../types";
import instance from "./axiosClient";

export const createCostFx = createEffect(
  async ({ url, cost, token }: ICreateCost) => {
    try {
      const { data } = await instance.post(
        url,
        { ...cost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {}
  }
);

export const getCostFx = createEffect(async ({ url, token }: IGetCosts) => {
  try {
    const { data } = await instance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {}
});
