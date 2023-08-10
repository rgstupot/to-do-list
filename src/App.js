import { useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <Title />
      <AddTask handleAddTask={handleAddTask} />
      <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
    </>
  );
}

function Title() {
  return (
    <div className="position-relative text-center">
      <h1 className="display-1">To-Do List</h1>
    </div>
  );
}

function AddTask({ handleAddTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskName) return;

    const id = crypto.randomUUID();

    const newTask = {
      id,
      taskName,
      complete: false,
    };

    handleAddTask(newTask);
    setTaskName("");
  }

  return (
    <div className="p-3">
      <Container className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="task">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Enter a task here to add it to the To-Do List!
                </Form.Text>
              </Form.Group>

              <Button variant="success" type="submit">
                Add Task
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function TaskList({ tasks, handleDeleteTask }) {
  return tasks.map((task) => (
    <Task task={task} key={task.id} handleDeleteTask={handleDeleteTask} />
  ));
}

function Task({ task, handleDeleteTask }) {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3} className="p-3">
              <div className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">
                {task.taskName}
              </div>
              <CloseButton onClick={() => handleDeleteTask(task.id)} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}
