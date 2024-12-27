import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ projects, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('project.index'), queryParams);
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

    router.get(route('project.index'), queryParams);
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
        </h2>
      }
    >

    <Head title="Projects" />

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
              <div className="p-6 text-gray-900 dark:text-gray-100">
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
                              placeholder="Project Name"
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
                        {projects.data.map((project) => (
                          <tr key={project.id} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <td className="px-3 py-2">{project.id}</td>
                            <td className="px-3 py-2">
                              <img src={project.image_path} alt={project.name} className="w-[60px]" />
                            </td>
                            <td className="px-3 py-3">{project.name}</td>
                            <td className="px-3 py-3">
                              <span className={PROJECT_STATUS_CLASS_MAP[project.status] + " px-3 py-1 rounded-lg text-white"}>
                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                              </span>
                            </td>
                            <td className="px-3 py-3">{project.created_at}</td>
                            <td className="px-3 py-3">{project.due_date}</td>
                            <td className="px-3 py-3">{project.created_by.name}</td>
                            <td className="px-3 py-3">
                              <Link
                                href={route('project.edit', project.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                Edit
                              </Link>

                              <Link
                                href={route('project.destroy', project.id)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                  <Pagination links={projects.meta.links} />
              </div>
          </div>
      </div>
    </div>

    </AuthenticatedLayout>
  )
}
