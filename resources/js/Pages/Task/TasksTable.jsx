import Pagination from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants.jsx";

export default function TasksTable({ tasks, queryParams = null, routeName = 'task.index', taskId }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route(routeName, taskId),
      queryParams,
      { preserveScroll: true, }
    );
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (field) => {
    if (queryParams.sort_field === field) {
      queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      queryParams.sort_field = field;
      queryParams.sort_direction = 'asc';
    }

    router.get(route(routeName, taskId),
      queryParams,
      { preserveScroll: true, }
    );
  }


  const deleteTask = (taskId) => {
    if (!window.confirm("Are you sure you want to delte the task?")) return;
    router.delete(route('task.destroy', taskId));
  }

  return (
    <>
      <div className="overflow-auto">

        <table className="w-full ext-sm txt-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                onSortChanged={sortChanged}
              >ID</TableHeading>
              <th className="px-3 py-2">Image</th>
              <TableHeading
                name="name"
                sortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                onSortChanged={sortChanged}
              >Name</TableHeading>
              <TableHeading
                name="status"
                sortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                onSortChanged={sortChanged}
              >status</TableHeading>
              <TableHeading
                name="created_at"
                sortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                onSortChanged={sortChanged}
              >Create Date</TableHeading>
              <TableHeading
                name="due_date"
                sortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                onSortChanged={sortChanged}
              >Due Date</TableHeading>
              <th className="px-3 py-2">Created By</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2">
                <TextInput
                  className="w-full !bg-gray-800"
                  placeholder="Task Name"
                  defaultValue={queryParams.name || ''}
                  onBlur={(e) => searchFieldChanged('name', e.target.value)}
                  onKeyPress={(e) => onKeyPress('name', e)}
                />
              </th>
              <th className="px-3 py-2">
                <SelectInput
                  defaultValue={queryParams.status || ''}
                  className="w-full !bg-gray-800"
                  onChange={(e) => searchFieldChanged('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.data.map((task) => (
              <tr key={task.id} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img src={task.image_path} alt={task.name} className="w-[60px]" />
                </td>
                <td className="px-3 py-3">{task.name}</td>
                <td className="px-3 py-3">
                  <span className={TASK_STATUS_CLASS_MAP[task.status] + " px-3 py-1 rounded-lg text-white"}>
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-3">{task.created_at}</td>
                <td className="px-3 py-3">{task.due_date}</td>
                <td className="px-3 py-3">{task.created_by.name}</td>
                <td className="px-3 py-3">
                  <Link
                    href={route('task.edit', task.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                    Edit
                  </Link>

                  <button
                    onClick={(e) => deleteTask(task.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <Pagination links={tasks.meta.links} />
    </>
  )
}
