import { createEffect } from "effector";
import { ICreateCost, IBaseArgs, IRefreshToken, IDeleteCost } from "../types";
import instance from "./axiosClient";
import { removeUser } from "../utils/auth";
import { handleAxiosError } from "../utils/errors";

export const createCostFx = createEffect(
  async ({ url, cost, token }: ICreateCost) => {
    try {
      const { data } = await instance.post(
        url,
        { ...cost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      handleAxiosError(error, { type: "create", createCost: { cost } });
    }
  }
);

export const getCostFx = createEffect(async ({ url, token }: IBaseArgs) => {
  try {
    const { data } = await instance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    handleAxiosError(error, { type: "get" });
  }
});

export const deleteCostFx = createEffect(
  async ({ url, token, id }: IDeleteCost) => {
    try {
      await instance.delete(`${url}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      handleAxiosError(error, { type: "delete", deleteCost: { id } });
    }
  }
);

export const refreshTokenFx = createEffect(
  async ({ url, token, username }: IRefreshToken) => {
    try {
      const result = await instance.post(url, {
        refresh_token: token,
        username,
      });
      if (result.status === 200) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...result.data, username })
        );
        return result.data.access_token;
      } else {
        removeUser();
      }
    } catch (error) {}
  }
);
