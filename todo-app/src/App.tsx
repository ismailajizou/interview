import { useCallback, useEffect, useState } from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { MdOutlinePending } from "react-icons/md";
import { selectTasks, taskActions } from "./redux/features/tasks.slice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const [task, setTask] = useState("");

  const dispatch = useAppDispatch();
  const {
    data,
    loading,
    createError,
    fetchAllError,
    createIsLoading,
    removeIsLoading,
  } = useAppSelector(selectTasks);

  const fetchTasks = useCallback(() => {
    dispatch(taskActions.fetchAllIsLoading());
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) return <div>Loading...</div>;

  if (fetchAllError) return <div>Error: {fetchAllError}</div>;

  return (
    <main className="container mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(taskActions.createIsLoading({ body: task }));
        }}
      >
        <div className="flex items-center my-4 py-4 gap-12">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="What do you want to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {createIsLoading ? "Creating..." : "Create"}
          </button>
        </div>
        {createError && <div className="text-red-500">{createError}</div>}
      </form>

      <ul className="my-4 space-y-4">
        {data.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center gap-4 bg-white border rounded-md px-8 py-6"
          >
            <span className="flex gap-2 items-center text-gray-900 dark:text-white text-lg">
              {task.status === "DONE" ? (
                <HiCheck className="text-green-500" />
              ) : task.status === "PENDING" ? (
                <MdOutlinePending className="text-yellow-500" />
              ) : (
                <HiXMark className="text-red-500" />
              )}
              {task.body}
            </span>
            <div className="flex items-center gap-4">
              {task.status !== "DONE" && task.status !== "CANCELLED" && (
                <button
                  onClick={() => {
                    dispatch(
                      taskActions.updateIsLoading({
                        _id: task._id,
                        status: "DONE",
                      })
                    );
                  }}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Done
                </button>
              )}
              {task.status !== "CANCELLED" && (
                <button
                  onClick={() => {
                    dispatch(
                      taskActions.updateIsLoading({
                        _id: task._id,
                        status: "CANCELLED",
                      })
                    );
                  }}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  dispatch(taskActions.removeIsLoading(task._id));
                }}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                {removeIsLoading ? "Removing..." : "Remove"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
