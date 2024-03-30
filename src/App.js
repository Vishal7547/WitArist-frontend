import React, { useState, useContext, useEffect } from "react";
import { todoContext } from "./context/myContext";

import Checkbox from "@mui/material/Checkbox";
import AddTodo from "./Components/AddTodo";
import Loader from "./Components/Loader";
import { Select } from "antd";
const App = () => {
  const {
    getAllTodo,
    updateTodo,
    todo,
    loading,
    update,
    error,
    handleDeleteTodo,
    setTodo,
  } = useContext(todoContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState(null);
  const [todoUpdate, setTodoUpdate] = useState(null);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);
  const [filterTodo, setFilterTodo] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  const [checkSearch, setCheckSearch] = useState("");
  const [categoriesValue, SetcategoriesValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [chainFilter, setChainFilter] = useState([]);

  const handleDetails = (t) => {
    setData(t);
  };
  useEffect(() => {
    setFilterTask(
      filterTodo?.length > 0
        ? checkSearch?.length > 0
          ? filterTodo
          : todo
        : todo
    );
  }, [todo, filterTodo, update, chainFilter]);

  useEffect(() => {
    setFilterTask(
      chainFilter?.length > 0
        ? categoriesValue?.length > 0 || priorityValue?.length > 0
          ? chainFilter
          : todo
        : todo
    );
  }, [todo, chainFilter, update]);

  useEffect(() => {
    const fetchedTodo = async () => {
      await getAllTodo();
    };
    fetchedTodo();
  }, [update]);
  useEffect(() => {
    setData(filterTask[0]);
    setTotal(filterTask.length);
    const pending = filterTask?.filter((p, i) => p?.completed === false);
    setPending(pending.length);
    const donees = filterTask?.filter((p, i) => p?.completed === true);
    setDone(donees.length);
  }, [todo, filterTask]);
  const handleTodo = () => {
    handleOpen();
  };
  const handleDelete = async (id) => {
    setCheckSearch("");
    setPriorityValue("");
    SetcategoriesValue("");
    await handleDeleteTodo(id);
  };
  const handleUpdate = (t) => {
    setCheckSearch("");
    setPriorityValue("");
    SetcategoriesValue("");
    setTodoUpdate(t);
    handleOpen();
  };
  const handleUpdateStatus = async (t) => {
    setCheckSearch("");
    setPriorityValue("");
    SetcategoriesValue("");
    console.log(!t?.completed);
    const status = {
      completed: !t?.completed,
    };
    await updateTodo(t._id, status);
  };
  const handleSearch = (e) => {
    setCheckSearch(e);
    const data = todo.filter(
      (t) =>
        t.title.toLowerCase().includes(e.toLowerCase()) ||
        t.description.toLowerCase().includes(e.toLowerCase()) ||
        t.categories.toLowerCase().includes(e.toLowerCase()) ||
        t.priority.toLowerCase().includes(e.toLowerCase())
    );
    setFilterTodo(data);
  };
  const clearFilter = () => {
    // setCheckSearch("");
    // setPriorityValue("");
    // SetcategoriesValue("");
  };
  const handlechainFilter = () => {
    if (categoriesValue.length) {
      const layer1 = todo.filter((l) => l.categories === categoriesValue);
      setChainFilter(layer1);
      clearFilter();
      return;
    }
    const layer1 = todo.filter((l) => l.categories === categoriesValue);
    if (layer1.length > 0) {
      const layer2 = layer1.filter((l) =>
        l.priority?.length > 0
          ? l.priority === priorityValue
          : l.categories === categoriesValue
      );
      setChainFilter(layer2);
      clearFilter();

      return;
    } else {
      const layer2 = todo?.filter((l) => l.priority === priorityValue);
      setChainFilter(layer2);
    }
    clearFilter();
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      {loading && <Loader />}
      <section className="hero">
        <div className="container-fluid">
          <div className="row text-center">
            <h4>Welcome to WitArist It Services Private Limited</h4>
            <p>Task Management System</p>
          </div>
          {data && (
            <div className="todoSingleContainer my-2">
              <div>
                <h6>{data?.title}</h6>

                <p>{data?.description}</p>
                <p>
                  <b>{data?.categories}</b>
                </p>

                <i>Due Date:{data?.dueDate}</i>
                <hr />
                <i>{new Date(data?.createdAt).toDateString()}</i>
                <br />
                <button
                  className={`btn ${
                    data?.completed ? "btn-success" : "btn-danger"
                  }`}
                >
                  {data?.completed ? "Done" : "Pending"}
                </button>
              </div>
            </div>
          )}

          <div className="mainTask">
            <div className="row mainTodo my-4">
              <div className="row searchFun0 searchFun m-0  g-0">
                <div className="innerSearch1 m-0 p-0 g-0">
                  <div>
                    <Select
                      defaultValue=" categories"
                      style={{
                        width: 120,
                      }}
                      onChange={(value) => SetcategoriesValue(value)}
                      options={todo.map((item) => ({
                        value: item?.categories,
                        label: item?.categories,
                      }))}
                    />
                  </div>
                  <div>
                    <Select
                      defaultValue=" priority"
                      style={{
                        width: 120,
                      }}
                      onChange={(value) => setPriorityValue(value)}
                      options={[
                        {
                          value: "Low",
                          label: "Low",
                        },
                        {
                          value: "Medium",
                          label: "Medium",
                        },
                        {
                          value: "High",
                          label: "High",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-dark"
                      onClick={handlechainFilter}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              <div className="row searchFun m-0  g-0">
                <hr />
                <div className="innerSearch m-0 p-0 g-0">
                  <div className="left">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search All Fields..."
                        value={checkSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <button className="btn btn-dark" onClick={handleTodo}>
                        Add Todo
                      </button>
                    </div>
                  </div>
                  <div className="right">
                    <button className="btn btn-dark">Total: {total}</button>
                    <button className="btn btn-danger">
                      Pending: {pending}
                    </button>
                    <button className="btn btn-success">Done: {done}</button>
                  </div>
                </div>
              </div>
              <div className="row m-0 g-0 ">
                <table class="table m-0 mainTable">
                  <thead>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Categories</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Assign Date</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterTask?.map((t, i) => (
                      <tr className="tableDataSetCursor" key={t._id}>
                        <th scope="row">{i + 1}</th>
                        <td onClick={() => handleDetails(t)}>{t?.title}</td>
                        <td onClick={() => handleDetails(t)}>
                          {t?.description.substring(0, 30)} read more..
                        </td>
                        <td onClick={() => handleDetails(t)}>
                          {t?.categories}
                        </td>
                        <td>{t?.dueDate}</td>
                        <td>{new Date(t?.createdAt).toDateString()}</td>

                        <td>
                          <span
                            className={` btn m-0 p-0 ${
                              t?.priority === "High"
                                ? "btn-danger"
                                : t?.priority === "Low"
                                ? "btn-success"
                                : "btn-primary"
                            }`}
                          >
                            {t?.priority}
                          </span>
                        </td>

                        <td>
                          {" "}
                          <Checkbox
                            {...label}
                            checked={t.completed}
                            value={t.completed}
                            color="success"
                            onClick={() => handleUpdateStatus(t)}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(t._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-success mx-2"
                            onClick={() => {
                              handleUpdate(t);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <AddTodo
          open={open}
          handleClose={handleClose}
          todoUpdate={todoUpdate}
          setTodoUpdate={setTodoUpdate}
        />
      </section>
    </>
  );
};

export default App;
