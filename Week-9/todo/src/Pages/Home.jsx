import { useState, useEffect } from "react";
import Logo from "../Assets/logo.svg";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";
import ToDoListItem from "../Components/ToDoListItem";

export default function Home() {
	const [toggleView, setToggleView] = useState(false);
	const [toDoText, setToDoText] = useState("");
	const [deleteId, setDeleteId] = useState("");
	const [taskStatus, setTaskStatus] = useState("");
	const [date] = useState(new Date());
	const [tasks, setTasks] = useState([]);
	const handleChange = (event) => {
		setToDoText(event.target.value);
	};
	const addToDo = (e) => {
		e.preventDefault();
		if (toDoText === "") {
			return alert("Please enter the task! :)");
		} else {
			tasks.push({ id: uuidv4(), isActive: true, text: toDoText });
			setToDoText("");
		}
	};
	useEffect(() => {
		let index = tasks.findIndex((task) => task.id === deleteId);
		if (index > -1) {
			tasks.splice(index, 1);
			setTasks([...tasks]);
			setDeleteId("");
		}
	}, [deleteId, tasks]);
	useEffect(() => {
		let index = tasks.findIndex((task) => task.id === taskStatus);
		if (index > -1) {
			tasks[index].isActive = !tasks[index].isActive;
			setTasks([...tasks]);
			setTaskStatus("");
		}
	}, [taskStatus, tasks]);
	return (
		<>
			<header className="header">
				<img src={Logo} alt="App Logo" height={75} />
			</header>
			<main>
				<section className="navbar">
					<h1>
						<time dateTime={date.toISOString()}>{date.toLocaleDateString("en-us", { weekday: "long", month: "long", day: "numeric" })}</time>
						{!toggleView ? <p>{tasks.filter((task) => task.isActive === true).length} Active Tasks</p> : <p>{tasks.filter((task) => task.isActive === false).length} Completed Tasks</p>}
					</h1>
					<nav>
						<button className={toggleView ? "switchTaskListButton" : "switchTaskListButton active"} onClick={() => setToggleView(false)}>
							Incomplete Tasks
						</button>
						<button className={toggleView ? "switchTaskListButton active" : "switchTaskListButton"} onClick={() => setToggleView(true)}>
							Completed Tasks
						</button>
					</nav>
				</section>
				<section className="inputfields">
					<form>
						<fieldset>
							<legend className="invisible">ToDo</legend>
							<label htmlFor="todotext"></label>
							<input type="text" id="todotext" value={toDoText} onChange={handleChange} />
							<button type="submit" onClick={addToDo}>
								Add Task
							</button>
						</fieldset>
					</form>
				</section>
				{!toggleView ? (
					<section className="activetasks">
						{tasks.filter((task) => task.isActive === true).length === 0 && tasks.filter((task) => task.isActive === false).length === 0 ? (
							<h1>You currently have 0 tasks added. Add a task to get started!</h1>
						) : tasks.filter((task) => task.isActive === true).length === 0 ? (
							<h1>You currently have 0 active tasks. Add a task now!</h1>
						) : (
							<ul>
								{tasks
									.filter((task) => task.isActive === true)
									.map((task, index) => {
										return <ToDoListItem key={index} task={task} setDeleteId={setDeleteId} setTaskStatus={setTaskStatus} />;
									})}
							</ul>
						)}
					</section>
				) : (
					<section className="completedtasks">
						{tasks.filter((task) => task.isActive === true).length === 0 && tasks.filter((task) => task.isActive === false).length === 0 ? (
							<h1>You currently have 0 tasks added. Add a task to get started!</h1>
						) : tasks.filter((task) => task.isActive === false).length === 0 ? (
							<h1>You currently have 0 completed tasks. Complete a task now!</h1>
						) : (
							<ul>
								{tasks
									.filter((task) => task.isActive === false)
									.map((task, index) => {
										return <ToDoListItem key={index} task={task} setDeleteId={setDeleteId} setTaskStatus={setTaskStatus} />;
									})}
							</ul>
						)}
					</section>
				)}
			</main>
			<footer>
				<h1>&copy; 2022 Devansh Dalmia | All Rights Reserved</h1>
			</footer>
		</>
	);
}
