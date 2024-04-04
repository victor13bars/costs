import { useEffect, useState, useMemo } from "react";
import { Header } from "./header/Header";
import { Spinner } from "../spinner/Spinner";
import { getAuthDataFromLS } from "../../utils/auth";
import { getCostFx } from "../../api/costsClient";
import { $costs, setCosts } from "../../context";
import { useStore } from "effector-react";
import { CostsList } from "./costsList/CostsList";

export const Costs = () => {
  const store = useStore($costs);
  const [spinner, setSpinner] = useState(false);
  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS();
    const costs = await getCostFx({
      url: "/cost",
      token: authData.access_token,
    });
    setSpinner(false);
    setCosts(costs);
  };

  useEffect(() => {
    handleGetCosts();
    console.log(store);
  }, []);
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Учёт моих расходов
      </h2>
      {useMemo(
        () => (
          <Header costs={store} />
        ),
        [store]
      )}
      <div style={{ position: "relative" }}>
        {spinner && <Spinner top={0} left={0} />}
        {useMemo(
          () => (
            <CostsList costs={store} />
          ),
          [store]
        )}
        {!spinner && !store.length && <h2>Список расходов пуст</h2>}
      </div>
    </div>
  );
};
