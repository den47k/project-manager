import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";
import TasksTable from "../Task/Taskstable";

export default function Show({ project, tasks, queryParams = null }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {`Project - ${project.name}`}
        </h2>
      }
    >

    <Head title={project.name} />

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div>
            <img src={project.image_path} alt={project.name} className="w-full h-64 object-cover" />
          </div>
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <div className="grid gap-1 grid-cols-2 mt-2">
              <div>
                <div>
                  <label className="font-bold text-lg">Project ID</label>
                  <p className="mt-1">{project.id}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">Name</label>
                  <p className="mt-1">{project.name}</p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Project Status</label>
                  <p className="mt-1">
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      }
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Created By</label>
                  <p className="mt-1">{project.created_by.name}</p>
                </div>
              </div>

              <div>
                <div>
                  <label className="font-bold text-lg">Due Date</label>
                  <p className="mt-1">{project.due_date}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">Create Date</label>
                  <p className="mt-1">{project.created_at}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">Updated By</label>
                  <p className="mt-1">{project.updated_by.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-bold text-lg">Project Description</label>
              <p className="mt-1">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <TasksTable tasks={tasks} queryParams={queryParams} routeName="project.show" projectId={project.id}/>
          </div>
        </div>
      </div>
    </div>

    </AuthenticatedLayout>
  )
}
