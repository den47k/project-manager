import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./Taskstable";

export default function Index({ tasks, queryParams = null }) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-cente justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              Tasks
          </h2>
          <Link href={route('task.create')} className="bg-emerald-500 py-1 px-3 text-white rounded-lg hover:bg-emerald-600 shadow transition-all">
            Add new
          </Link>
        </div>
      }
    >

    <Head title="Tasks" />

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                  <TasksTable tasks={tasks} queryParams={queryParams}/>
              </div>
          </div>
      </div>
    </div>

    </AuthenticatedLayout>
  )
}
