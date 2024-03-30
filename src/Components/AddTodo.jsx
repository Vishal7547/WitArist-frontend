import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { todoContext } from "../context/myContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AddTodo = ({ handleClose, open, setTodoUpdate, todoUpdate }) => {
  const { postTodo, loading, updateTodo } = useContext(todoContext);
  useEffect(() => {
    if (todoUpdate) {
      setTitle(todoUpdate?.title);
      setDescription(todoUpdate?.description);
      setCategories(todoUpdate?.categories);
      setPriority(todoUpdate?.priority);
      // setDueDate(todoUpdate?.dueDate);
    }
  }, [todoUpdate]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [dueDate, setDueDate] = useState(dayjs("2024-03-30"));

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [priority, setPriority] = useState("Low");

  const [isError, setisError] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) {
      setisError(true);
      setErrorMessage("enter title");
      return;
    }
    if (!description) {
      setisError(true);
      setErrorMessage1("enter description");
      return;
    }
    if (!categories) {
      setisError(true);
      setErrorMessage1("enter categories");
      return;
    }

    let data = dueDate.$d;
    const dateSet = new Date(data).toLocaleDateString();

    await postTodo({ title, description, categories, dateSet, priority });
    setTitle("");
    setDescription("");
    setCategories("");
    setErrorMessage("");
    setErrorMessage1("");
    setErrorMessage2("");
    setDueDate(dayjs("2024-03-30"));
    setisError(false);
    handleClose();
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    let data = dueDate.$d;
    const dateSet = new Date(data).toLocaleDateString();
    await updateTodo(todoUpdate?._id, {
      title,
      description,
      categories,
      dateSet,
      priority,
    });
    setTitle("");
    setDescription("");
    setCategories("");
    setErrorMessage("");
    setErrorMessage1("");
    setErrorMessage2("");
    setDueDate(dayjs("2024-03-30"));

    setTodoUpdate(null);
    setisError(false);
    handleClose();
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  const close = () => {
    setTitle("");
    setDescription("");
    setCategories("");
    setErrorMessage("");
    setErrorMessage1("");
    setErrorMessage2("");
    setDueDate(dayjs("2024-03-30"));

    setTodoUpdate(null);
    setisError(false);
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="row my-2"
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={close}
          >
            X
          </div>

          <form
            className="form row"
            onSubmit={todoUpdate ? handleUpdate : handleAdd}
          >
            <TextField
              id="filled-basic"
              error={isError}
              value={title}
              helperText={errorMessage}
              label="Title"
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
              className="w-100 my-1"
            />
            <TextField
              id="filled-basic"
              value={description}
              error={isError}
              label="Description"
              helperText={errorMessage1}
              variant="filled"
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              className="w-100 my-1"
            />
            <TextField
              id="filled-basic"
              value={categories}
              error={isError}
              label="Categories"
              helperText={errorMessage2}
              variant="filled"
              onChange={(e) => setCategories(e.target.value)}
              className="w-100 my-1"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Priority"
              variant="filled"
              onChange={handleChange}
              className="w-100 my-1"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  value={dueDate}
                  variant="filled"
                  onChange={(newValue) => setDueDate(newValue)}
                  className="w-100 my-1"
                />
              </DemoContainer>
            </LocalizationProvider>
            <div>
              <button className="btn btn-dark my-1">
                {loading ? "Loading..." : todoUpdate ? "Update" : "Add Todo"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddTodo;
