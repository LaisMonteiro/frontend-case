import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

import { TODO_LIST } from "./initial-state";
import { ITodoTypes } from "./types";
import { ITodo } from "./interfaces";

import logoImage from "../../assets/logo.svg";
import "./index.css";

function Todo() {
  const [items, setItems] = useState<ITodo[]>(TODO_LIST);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchInputValue(term);
    if (term) {
      const filtered = TODO_LIST.filter((todo) =>
        todo.title.toLowerCase().includes(term.toLowerCase())
      );
      setItems(filtered);
    } else {
      setItems(TODO_LIST);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleChange = (value: string) => {
    setSearchInputValue(value);

    debouncedSearch(value);
  };

  const handleDeleteTask = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChangeTaskStatus = (id: string, status: ITodoTypes) => {
    const reversedStatus = status === "pending" ? "done" : "pending";

    setItems((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: reversedStatus } : todo
      )
    );
  };

  return (
    <main id="page" className="todo">
      <div>
        <img src={logoImage} alt="Cora" title="Cora"></img>
        <h1>Weekly to-do list &#128467;</h1>
        <h2>
          Bem-vindo ao nosso produto <i>fake</i> de <strong>to-do</strong> list
        </h2>
        <p>
          Marque como{" "}
          <strong>
            <u>done</u>
          </strong>{" "}
          as tasks que você conseguir concluir (elas já precisam renderizar com
          o status <strong>done</strong>)
        </p>
        <p className="disclaimer">
          Items obrigatórios marcados com asterisco (<strong>*</strong>)
        </p>
        <div className="todo__wrapper">
          <form className="todo__search">
            <input
              id="search"
              placeholder="Busca por título..."
              value={searchInputValue}
              onChange={(e) => handleChange(e.target.value)}
            />
          </form>
          <ul className="todo__list">
            {items.length === 0 && (
              <span>
                <strong>Ops!!!</strong> Nenhum resultado foi encontrado
                &#128533;
              </span>
            )}
            {items.map((item, index) => {
              return (
                <li key={index}>
                  <span>
                    {index + 1}
                    {item.required ? "*" : ""}.
                  </span>
                  <div className="todo__content">
                    <h3>
                      {item.title}
                      <span data-type={item.status}>{item.status}</span>
                    </h3>
                    <p>{item.description}</p>
                    {item.links && item.links.length > 0 && (
                      <div className="todo__links">
                        {item.links.map((link) => (
                          <a key={link.name} target="_blank" href={link.url}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="todo__actions">
                      <button onClick={() => handleDeleteTask(item.id)}>
                        delete
                      </button>
                      <button
                        onClick={() =>
                          handleChangeTaskStatus(
                            item.id,
                            item.status as ITodoTypes
                          )
                        }
                      >
                        change to{" "}
                        <strong>
                          <u>{item.status === "done" ? "pending" : "done"}</u>
                        </strong>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Todo;
