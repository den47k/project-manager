import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ users, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('user.index'), queryParams);
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

    router.get(route('user.index'), queryParams);
  }

  const deleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    router.delete(route('user.destroy', userId), {
      preserveScroll: true
    });
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              Users
          </h2>
          <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded-lg hover:bg-emerald-600 shadow transition-all">
            Add new
          </Link>
        </div>
      }
    >

    <Head title="Users" />

    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success && (
          <div className="bg-emerald-500 py-2 px-4 text-white rounded-lg shadow mb-4">
            {success}
          </div>
        )}
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
                          <TableHeading
                            name="name"
                            sortable={true}
                            sortField={queryParams.sort_field}
                            sortDirection={queryParams.sort_direction}
                            onSortChanged={sortChanged}
                          >Name</TableHeading>
                          <TableHeading
                            name="email"
                            sortable={true}
                            sortField={queryParams.sort_field}
                            sortDirection={queryParams.sort_direction}
                            onSortChanged={sortChanged}
                          >Email</TableHeading>
                          <TableHeading
                            name="created_at"
                            sortable={true}
                            sortField={queryParams.sort_field}
                            sortDirection={queryParams.sort_direction}
                            onSortChanged={sortChanged}
                          >Create Date</TableHeading>
                          <th className="px-3 py-2 text-right">Actions</th>
                        </tr>
                      </thead>

                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                          <th className="px-3 py-2"></th>
                          <th className="px-3 py-2">
                            <TextInput
                              className="w-full !bg-gray-800"
                              placeholder="User Name"
                              defaultValue={queryParams.name || ''}
                              onBlur={(e) => searchFieldChanged('name', e.target.value)}
                              onKeyPress={(e) => onKeyPress('name', e)}
                            />
                          </th>
                          <th className="px-3 py-2">
                            <TextInput
                              className="w-full !bg-gray-800"
                              placeholder="User Email"
                              defaultValue={queryParams.email || ''}
                              onBlur={(e) => searchFieldChanged('email', e.target.value)}
                              onKeyPress={(e) => onKeyPress('email', e)}
                            />
                          </th>
                          <th className="px-3 py-2"></th>
                          <th className="px-3 py-2"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.data.map((user) => (
                          <tr key={user.id} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <td className="px-3 py-2">{user.id}</td>
                            <th className="px-3 py-3 text-gray-100">
                              {user.name}
                            </th>
                            <td className="px-3 py-3">
                              {user.email}
                            </td>
                            <td className="px-3 py-3">{user.created_at}</td>
                            <td className="px-3 py-3 text-nowrap">
                              <Link
                                href={route('user.edit', user.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                Edit
                              </Link>

                              <button
                                onClick={e => deleteUser(user.id)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                  <Pagination links={users.meta.links} />
              </div>
          </div>
      </div>
    </div>

    </AuthenticatedLayout>
  )
}
