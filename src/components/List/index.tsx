import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IResponseList } from "./interfaces";
import { ETransaction } from "./enums";

import "./index.css";
import creditLogo from "../../assets/credit.png";
import debitLogo from "../../assets/debit.png";

import { formatDate, formatExtendedDateTime } from "../../utils/dates";
import { formatCurrency } from "../../utils/strings";

export default function List() {
  /* States */
  const [list, setList] = useState<IResponseList>();
  const [filter, setFilter] = useState<ETransaction>(ETransaction.DEBIT);

  /* Hooks */
  const navigate = useNavigate();

  /* Vars */
  const filteredData = list?.results?.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => filter === "ALL" || item.entry === filter
    ),
  }));

  /* Handlers */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/list", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setList(response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  /* Lifecycles */
  useEffect(() => {
    (async () => await getList())();
  }, []);

  /* Render */
  return (
    <div className="transaction-container">
      <div className="transactions-buttons-group">
        <div className="filter-buttons">
          <button
            className={`filter-button ${
              filter === ETransaction.ALL ? "active" : ""
            }`}
            onClick={() => setFilter(ETransaction.ALL)}
          >
            Todos
          </button>
          <button
            className={`filter-button ${
              filter === ETransaction.DEBIT ? "active" : ""
            }`}
            onClick={() => setFilter(ETransaction.DEBIT)}
          >
            Débito
          </button>
          <button
            className={`filter-button ${
              filter === ETransaction.CREDIT ? "active" : ""
            }`}
            onClick={() => setFilter(ETransaction.CREDIT)}
          >
            Crédito
          </button>
        </div>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {filteredData?.map((group, index) => (
        <div key={index} className="transaction-group">
          {group.items.map((item) => (
            <>
              <div className="transaction-header">
                <div className="date">{formatDate(group.date)}</div>
                <div>
                  <small>
                    Saldo do dia <b>{formatCurrency(item.amount)}</b>
                  </small>
                </div>
              </div>
              <div className="transaction-decor" />
              <div
                key={item.id}
                className={`transaction ${item.entry.toLowerCase()}`}
              >
                <div className="transaction-details">
                  <div
                    className="description"
                    style={{
                      color:
                        item.entry === "CREDIT"
                          ? "var(--color-blue)"
                          : "var(--color-black)",
                    }}
                  >
                    <img
                      src={item.entry === "CREDIT" ? creditLogo : debitLogo}
                      alt="logo"
                      width={28}
                      className="images"
                    />
                    {item.description}
                  </div>
                  <div className="label">{item.label}</div>
                  <div className="name">
                    {formatExtendedDateTime(item.dateEvent)}
                  </div>

                  {item.entry === "CREDIT" ? (
                    <div className="amount-credit">
                      + {formatCurrency(item.amount)}
                    </div>
                  ) : (
                    <div className="amount-debit">
                      - {formatCurrency(item.amount)}
                    </div>
                  )}
                </div>
              </div>
              <div className="transaction-decor" />
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
