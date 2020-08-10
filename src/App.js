import React from 'react';
import './App.css';
import ListItem from './ListItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			currentItem: {
				text: '',
				key: ''
			}
		};
		this.handleInput = this.handleInput.bind(this);
		this.addTask = this.addTask.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.setUpdate = this.setUpdate.bind(this);
	}
	handleInput(e) {
		this.setState({
			currentItem: {
				text: e.target.value,
				key: Date.now()
			}
		});
	}
	addTask(event) {
		event.preventDefault();
		const newTask = this.state.currentItem;
		if (newTask !== '') {
			const newItems = [ ...this.state.items, newTask ];
			this.setState({
				items: newItems,
				currentItem :{
					key: '',
					text: ''
				}
			});
		}
	}
	deleteItem(key) {
		const filteredItems = this.state.items.filter((item) => item.key !== key);
		this.setState({
			items: filteredItems
		});
	}
	setUpdate(text, key) {
		const items = this.state.items;
		items.map((item) => {
			if (item.key === key) {
				item.text = text;
			}
		});
		this.setState({
			items: items
		});
	}
	render() {
		return (
			<div className="App">
				<header>
					<form id="form-todo" onSubmit={this.addTask}>
						<input
							type="text"
							placeholder="Enter Task"
							value={this.state.currentItem.text}
							onChange={this.handleInput}
						/>
						<button type="submit">Add</button>
					</form>
				</header>
				<ListItem items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate} />
			</div>
		);
	}
}

export default App;
