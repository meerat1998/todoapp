import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

const initialTodos = [
  { id: 1, title: "Finish React tutorial", done: false },
  { id: 2, title: "Buy groceries", done: false },
  { id: 3, title: "Walk the dog", done: true },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleAddTodo = () => {
    if (!newTodo) return;
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    setTodos([...todos, { id, title: newTodo, done: false }]);
    setNewTodo("");
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setNewTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodo.id ? { ...todo, title: newTodo } : todo
    );
    setTodos(updatedTodos);
    setNewTodo("");
    setEditTodo(null);
  };

  const handleDeleteTodo = (todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    hideDialog();
  };

  const deleteTodo = (id) => {
    setSelectedTodoId(id);
    showDialog();
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const onCheckboxChange = (event) => {
    const todo = event.value;
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, done: !t.done } : t
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <Dialog
        visible={dialogVisible}
        onHide={hideDialog}
        header="Confirm Delete"
        footer={
          <div>
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={() => handleDeleteTodo(selectedTodoId)}
            />
            <Button
              label="No"
              icon="pi pi-times"
              onClick={hideDialog}
              className="p-button-secondary"
            />
          </div>
        }
      >
        <p>Are you sure you want to delete this todo?</p>
      </Dialog>

      <div className="p-inputgroup">
        <InputText
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button label="Add" icon="pi pi-plus" onClick={handleAddTodo} />
        {editTodo && (
          <Button
            label="Update"
            icon="pi pi-check"
            className="p-button-success"
            onClick={handleUpdateTodo}
          />
        )}
      </div>
      <DataTable
        value={todos}
        header="Todo List"
        className="p-datatable-sm"
        emptyMessage="No todos found."
      >
        <Column field="title" header="Title"></Column>
        <Column
          field="done"
          header="Done"
          body={(rowData) => (
            <div className="p-field-checkbox">
              <Checkbox
                inputId={`todo-${rowData.id}`}
                name={`todo-${rowData.id}`}
                checked={rowData.done}
                onChange={onCheckboxChange}
                value={rowData}
              />
              <label htmlFor={`todo-${rowData.id}`}></label>
            </div>
          )}
        ></Column>
        <Column
          field="edit"
          header="Edit"
          body={(rowData) => (
            <Button
              icon="pi pi-pencil"
              onClick={() => handleEditTodo(rowData)}
            />
          )}
        ></Column>
        <Column
          field="delete"
          header="Delete"
          body={(rowData) => (
            <Button icon="pi pi-trash" onClick={() => deleteTodo(rowData)} />
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default TodoList;