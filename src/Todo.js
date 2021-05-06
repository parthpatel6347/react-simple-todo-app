import React, { Component } from "react";
// import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      updatedItem: this.props.todoItem,
    };
    this.showEdit = this.showEdit.bind(this);
    this.handleupdate = this.handleupdate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  showEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleupdate(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSave(evt) {
    evt.preventDefault();
    this.props.updateItem(this.props.id, this.state.updatedItem);
    this.setState({
      isEditing: false,
    });
  }

  handleToggle() {
    this.props.toggleComplete(this.props.id);
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div>
          <form onSubmit={this.handleSave}>
            <input
              type="text"
              value={this.state.updatedItem}
              name="updatedItem"
              onChange={this.handleupdate}
            ></input>
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <li>
          <div>
            <span
              className={this.props.completed ? "completed" : ""}
              onClick={this.handleToggle}
            >
              {this.props.todoItem}
            </span>
            <button onClick={this.showEdit}>edit</button>
            <button onClick={this.props.deleteItem}>X</button>
          </div>
        </li>
      );
    }
    return result;
  }
}

export default Todo;
