import { fetchTasksApi, handleDeleteTaskApi } from "../utility/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/Auth";
import { RootState } from "../redux/store";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddTask from "../components/AddTask";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user)!;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasksApi(user),
    staleTime: 1000 * 60 * 5,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => handleDeleteTaskApi(user, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: true });
    },
  });

  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  useEffect(() => {
    if (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        console.log("error in fetching tasks : ", axiosError);
        // handling expired token
        localStorage.clear();
        dispatch(setUser(null));
        // TODO toast - login again session got expired
        navigate("/login");
      }
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#7C43F6] to-[#D992EA] h-full min-h-screen">
      <h1 className="font-bold text-center p-5 text-4xl">Tasks</h1>
      <div className=" p-4 w-full">
        <div className="">
          {isLoading ? (
            <div className="flex flex-row flex-wrap gap-5">
              <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-56">
                <div className="h-12 rounded-t dark:bg-black"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                  <div className="w-full h-6 rounded dark:bg-white"></div>
                  <div className="w-full h-6 rounded dark:bg-white"></div>
                  <div className="w-3/4 h-6 rounded dark:bg-white"></div>
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-56">
                <div className="h-12 rounded-t dark:bg-black"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                  <div className="w-full h-6 rounded dark:bg-white"></div>
                  <div className="w-full h-6 rounded dark:bg-white"></div>
                  <div className="w-3/4 h-6 rounded dark:bg-white"></div>
                </div>
              </div>
              <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-56">
                <div className="h-12 rounded-t dark:bg-black"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                  <div className="w-full h-6 rounded dark:bg-white"></div>
                  <div className="w-full h-6 rounded dark:bg-white"></div>
                  <div className="w-3/4 h-6 rounded dark:bg-white"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row flex-wrap gap-5">
              {tasks &&
                tasks.length > 0 &&
                tasks.map((task) => (
                  <div key={task._id} className="bg-white min-w-[200px] max-w-[300px] rounded-lg relative">
                    <div className="bg-black p-2 rounded-t-lg text-white pr-6       break-words font-semibold">{task.title}</div>
                    <div className="break-words p-2">{task.description}</div>
                    <MdDelete
                      className="text-2xl text-blue-500 hover:text-red-500 absolute right-1 top-2"
                      onClick={() => handleDeleteTask(task._id)}
                    />
                  </div>
                ))}
              <AddTask />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
