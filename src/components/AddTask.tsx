import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddTaskApi } from "../utility/api";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

type Task = {
  title: string;
  description: string;
};

const AddTask = () => {
  const user = useSelector((state: RootState) => {
    return state.auth.user;
  })!;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTaskMutation = useMutation({
    mutationFn: (task: Task) => handleAddTaskApi(user, task.title, task.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: true });
      setTitle("");
      setDescription("");
    },
  });

  const handleAddTask = () => {
    const newTask = { title: title, description: description };
    addTaskMutation.mutate(newTask);
  };

  return (
    <div className="min-w-[300px] bg-white flex flex-col rounded-lg opacity-80">
      <div className="w-full p-2 bg-black rounded-t-lg ">
        <input
          type="text"
          className="w-full outline-none p-1 rounded-lg bg-black text-white font-semibold"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="w-full p-2 rounded-lg">
        <textarea
          className="w-full outline-none"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="flex justify-center items-center mb-2">
        <FaPlusCircle className="text-2xl text-blue-500 hover:text-blue-800 text-center" onClick={handleAddTask} />
      </div>
    </div>
  );
};

export default AddTask;
