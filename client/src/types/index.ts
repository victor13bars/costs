export interface IAlert {
  alertText: string;
  alertStatus: string;
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

interface IBaseArgs {
  url: string;
  token: string;
}

export interface ICreateCost extends IBaseArgs {
  cost: ICost;
}

export interface IUpdateCost extends IBaseArgs {
  cost: ICost;
  id: string | number;
}

export interface IGetCost extends IBaseArgs {}

export interface IDeleteCost extends IBaseArgs {
  id: string | number;
}

export interface IRefreshToken extends IBaseArgs {
  username: string;
}

export interface IHandleAxiosErrorPayload {
  type: string;
  createCost?: Partial<ICreateCost>;
  getCosts?: Partial<IGetCost>;
  deleteCost?: Partial<IDeleteCost>;
  updateCost?: Partial<IUpdateCost>;
}

export interface ICostItemProps {
  cost: ICost;
  index: number;
}
