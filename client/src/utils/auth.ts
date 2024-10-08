import { setCosts } from "../context";
import { setAlert } from "../context/alert";
import { setAuth, setUsername } from "../context/auth";
import { IAlert } from "../types";

export const removeUser = () => {
  localStorage.removeItem("auth");
  setAuth(false);
  setUsername("");
  setCosts([]);
};

export const getAuthDataFromLS = () => {
  try {
    const lsDate = JSON.parse(localStorage.getItem("auth") as string);

    if (!lsDate) {
      removeUser();
      return;
    }
    return lsDate;
  } catch (error) {
    removeUser();
  }
};

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertText: "", alertStatus: "" }), 3000);
};
