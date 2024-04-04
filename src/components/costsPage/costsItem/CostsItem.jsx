import { useState } from "react";
import { ICostsItemProps } from "../../../types";
import { deleteCostFx } from "../../../api/costsClient";
import { getAuthDataFromLS, handleAlertMessage } from "../../../utils/auth";
import {removeCost} from "../../../context/index";
import { Spinner } from "../../spinner/Spinner";

export const CostsItem = ({ cost, index }: ICostsItemProps) => {
const [deleteSpinner,setDeleteSpinner] = useState(false);
const authData = getAuthDataFromLS();

const deleteCost =async ()=> {
  setDeleteSpinner(true);
  await deleteCostFx({
    url:'/cost',
    token:authData.access_token,
    id:cost._id as string
  })
  setDeleteSpinner(false);
  removeCost(cost._id as string);
handleAlertMessage({alertText:'Успешно удалено',alertStatus:'success'})
}

  return (
    <li
     className="cost-item list-group-item d-flex  justify-content-between align-items-center"
      id={cost._id as string}
      >
      <div className="cost-item-left">
        <span>{index} Магазин</span>
        <span>{cost.text}</span>
        <span className="cost-date">Дата {cost.date as string}</span>
      </div>
      <div className="cost-item-right d-flex align-items-center">
        <span className="cost-date">Сумма {cost.price}</span>
        <button className="btn btn-primary btn-edit">Изменить</button>
        <button className="btn btn-danger btn-delete" onClick={deleteCost}>
          {deleteSpinner ? <Spinner top={5} left={7}/> : <span>&times;</span>}
          </button>
      </div>
    </li>
  );
};
