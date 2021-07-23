import ToDoList from "../services/ToDoList.js";
import Task from "../models/Task.js";
const service = new ToDoList();

const getEle = (id) => document.getElementById(id);

const renderListTask = (arr) => {
  const html = arr.reduce((contentHTML, item) => {
    return (contentHTML += `

    <li>
        ${item.task}
      
        <span><i class="fa fa-check button mx-2" onclick="doneTask(${item.id})"></i><i class="fa fa-times button" onclick="deleteTask(${item.id})"></i></span>
   
     
    </li>
   
      `);
  }, "");
  getEle("todo").innerHTML = html;
};
const renderListCompleteTask = (arr) => {
  const html = arr.reduce((contentHTML, item) => {
    return (contentHTML += `

    <li style="background-color: aqua; text-decoration: line-through">
        ${item.task}
    </li>
   
      `);
  }, "");
  getEle("completed").innerHTML = html;
};

//Thêm
getEle("addItem").addEventListener("click", () => {
  const contentTask = getEle("newTask").value;

  const task = new Task("", contentTask);

  service
    .callApi("ToDoList", "POST", task)
    .then((result) => {
      console.log(result.data);
      fetchData();
      getEle("newTask").value = "";
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(task);
});
// Xong
const doneTask = (id) => {
  const contentTask = Task.task;
  const task = new Task("", contentTask, true);
  service
    .callApi(`ToDoList/${id}`, "PUT", task)
    .then(() => {
      alert("Done Task!!!");
      fetchData();
      fetchDataTaskComplete();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.doneTask = doneTask;

// Xóa
const deleteTask = (id) => {
  console.log(id);
  service
    .callApi(`ToDoList/${id}`, "DELETE", id)
    .then(() => {
      alert("Delete Complete!!!");
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deleteTask = deleteTask;

const fetchData = () => {
  service
    .callApi("ToDoList", "GET", null)
    .then((result) => {
      let taskWaiting = result.data.filter((item) => item.status == false);
      console.log(taskWaiting);
      renderListTask(taskWaiting);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();
const fetchDataTaskComplete = () => {
  service
    .callApi("ToDoList", "GET", null)
    .then((result) => {
      let taskComplete = result.data.filter((item) => item.status == true);
      console.log(taskComplete);
      renderListCompleteTask(taskComplete);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchDataTaskComplete();

const fetchDataAZ = () => {
  service
    .callApi("ToDoList", "GET", null)
    .then((result) => {
      let taskWaiting = result.data.filter((item) => item.status == false);

      let arrAZ = taskWaiting.sort((a, b) => (a.task > b.task) * 2 - 1);

      console.log(arrAZ);
      renderListTask(arrAZ);
    })
    .catch((error) => {
      console.log(error);
    });
};
const fetchDataZA = () => {
  service
    .callApi("ToDoList", "GET", null)
    .then((result) => {
      let taskWaiting = result.data.filter((item) => item.status == false);
      let arrZA = taskWaiting.sort((a, b) => (a.task < b.task) * 2 - 1);
      renderListTask(arrZA);
    })
    .catch((error) => {
      console.log(error);
    });
};

const sortAZ = () => {
  fetchDataAZ();
  getEle("newTask").value = "";
};
window.sortAZ = sortAZ;
const sortZA = () => {
  fetchDataZA();
  getEle("newTask").value = "";
};
window.sortZA = sortZA;
