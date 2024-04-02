export type AuthPageType = {
  type: "login" | "registration";
};

export interface IAlert {
  alertStatus: string;
  alertText: string;
}

export interface IAlertProps {
  props: IAlert;
}

export interface ISpinnerProps {
  top: number;
  left: number;
}
