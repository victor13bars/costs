import { IAlert } from "../types/index";
import { setAlert } from "../context/alert";
import { setAuth, setUsername } from "../context/auth";
import { setCosts } from "../context";

export const removeUser = () => {
  localStorage.removeItem("auth");
  setAuth(false);
  setUsername("");
  setCosts([]);
};

export const getAuthDataFromLS = () => {
  try {
    const lsData = JSON.parse(localStorage.getItem("auth") as string);
    if (!lsData) {
      removeUser();
      return;
    }
    return lsData;
  } catch (error) {
    removeUser();
  }
};

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertText: "", alertStatus: "" }), 3000);
};
