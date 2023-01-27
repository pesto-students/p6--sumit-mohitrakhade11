import "./ToDoListItem.css";
export default function ToDoListItem({ task, setDeleteId, setTaskStatus }) {
	return (
		<>
			<li>
				<button className="statusChangeButton" type="button" onClick={() => setTaskStatus(task.id)}>
					{task.isActive === false ? (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
							<path fill="none" d="M0 0h24v24H0z" />
							<path
								d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
								fill="#00aeef"
							/>
						</svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="#fff" />
						</svg>
					)}
				</button>
				<label onClick={() => setTaskStatus(task.id)}>{task.text}</label>
				<button className="deleteButton" type="button" onClick={() => setDeleteId(task.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" fill="#fff" />
					</svg>
				</button>
			</li>
		</>
	);
}
