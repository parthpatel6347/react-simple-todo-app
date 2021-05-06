import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
    };
    this.addTodoItem = this.addTodoItem.bind(this);
    this.update = this.update.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  addTodoItem(item) {
    let newItem = {
      name: item,
      id: uuidv4(),
      completed: false,
    };
    this.setState((curState) => ({
      todoItems: [...curState.todoItems, newItem],
    }));
  }

  delete(id) {
    this.setState((curState) => ({
      todoItems: curState.todoItems.filter((item) => item.id !== id),
    }));
  }

  update(id, updatedItem) {
    const updatedItems = this.state.todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: updatedItem };
      }
      return item;
    });

    this.setState({
      todoItems: updatedItems,
    });
  }

  toggleComplete(id) {
    const updatedItems = this.state.todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    this.setState({
      todoItems: updatedItems,
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.todoItems.map((item) => (
            <Todo
              todoItem={item.name}
              id={item.id}
              key={item.id}
              deleteItem={() => this.delete(item.id)}
              updateItem={this.update}
              completed={item.completed}
              toggleComplete={this.toggleComplete}
            />
          ))}
        </ul>
        <NewTodoForm addItem={this.addTodoItem} />
      </div>
    );
  }
}

export default TodoList;
