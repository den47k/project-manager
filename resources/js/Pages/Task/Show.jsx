import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP } from "@/constants.jsx";
import TasksTable from "../Task/Taskstable";

export default function Show({ task }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {`Task - ${task.name}`}
        </h2>
      }
    >

    <Head title={task.name} />

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div>
            <img src={task.image_path} alt={task.name} className="w-full h-64 object-cover" />
          </div>
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <div className="grid gap-1 grid-cols-2 mt-2">
              <div>
                <div>
                  <label className="font-bold text-lg">Task ID</label>
                  <p className="mt-1">{task.id}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">Name</label>
                  <p className="mt-1">{task.name}</p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Task Status</label>
                  <p className="mt-1">
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Task Priority</label>
                  <p className="mt-1">
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Created By</label>
                  <p className="mt-1">{task.created_by.name}</p>
                </div>
              </div>

              <div>
                <div>
                  <label className="font-bold text-lg">Due Date</label>
                  <p className="mt-1">{task.due_date}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">Create Date</label>
                  <p className="mt-1">{task.created_at}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">Updated By</label>
                  <p className="mt-1">{task.updated_by.name}</p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Project</label>
                  <p className="mt-1">{task.project.name}</p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Assigned to</label>
                  <p className="mt-1">{task.assigned_to.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-bold text-lg">Task Description</label>
              <p className="mt-1">{task.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </AuthenticatedLayout>
  )
}
