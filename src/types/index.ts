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

export interface ICostsHeaderProps {
  costs: ICost[];
}

export interface ICost {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}

export interface IBaseArgs {
  url: string;
  token: string;
}

export interface IDeleteCost extends IBaseArgs {
  id: string | number;
}

export interface ICreateCost extends IBaseArgs {
  cost: ICost;
}

export interface IRefreshToken extends IBaseArgs {
  username: string;
}

export interface IHandleAxiosErrorPayload {
  type: string;
  createCost?: Partial<ICreateCost>;
  getCosts?: Partial<IBaseArgs>;
  deleteCost?: Partial<IDeleteCost>;
}

export interface ICostsItemProps {
  cost: ICost;
  index: number;
}
