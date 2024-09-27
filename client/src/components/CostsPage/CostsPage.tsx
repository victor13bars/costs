import React, { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "./Header/Header";
import { Spinner } from "../Spinner/Spinner";
import { getAuthDataFromLS } from "../../utils/auth";
import { getCostFx } from "../../api/costsClient";
import { $costs, setCosts } from "../../context";
import { CostsList } from "./CostsList/CostsList";
import { useStore } from "effector-react";

export const CostsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const store = useStore($costs);
  const shouldLoadCosts = useRef(true);

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
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false;
      handleGetCosts();
    }
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Учёт Моих Расходов
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
