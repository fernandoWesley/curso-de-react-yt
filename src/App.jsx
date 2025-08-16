import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4} from 'uuid'
import Title from "./components/Title"

function App () {

  // Usando o local storage
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //Usando um array com objetos
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     title: "Estudar Programação",
  //     description: "Estudar programação para se tornar um desenvolvedor full stack.",
  //     isCompleted: false
  //   },
  //   {
  //     id: 2,
  //     title: "Estudar inglês",
  //     description: "Estudar inglês para me tornar fluente.",
  //     isCompleted: false
  //   },
  //   {
  //     id: 3,
  //     title: "Estudar matemática",
  //     description: "Estudar matemática para ser um ótimo desenvolvedor.",
  //     isCompleted: false
  //   }
  // ]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Quando o segundo parametro do useEffect for uma lista vazia [] significa que a função só será
  // executada na primeira vez
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     // CHAMAR A API
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
  //       method: 'GET'
  //     });
      
  //     // PEGAR OS DADOS QUE ELA RETORNA
  //     const data = await response.json();      

  //     // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
  //     setTasks(data);
  //   };

  //   // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
  //  fetchTasks();
    
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESTA TAREFA
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }

      //NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    })

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => {
      
      if (task.id !== taskId) {
        return task;
      }
    })

    setTasks(newTasks);
  }

    function onAddTaskSubmit(title, description) {
      const newTask = {
        id: v4(),
        title,
        description,
        isCompleted: false
      }     

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>
          Gerenciador de Tarefas
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  )
}

export default App;