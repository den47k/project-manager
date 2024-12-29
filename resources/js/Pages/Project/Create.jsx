import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function Create() {
  const {data, setData, post, errors} = useForm({
    image: '',
    name: '',
    status: '',
    description: '',
    due_date: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('project.store'));
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              Create new Project
          </h2>
        </div>
      }
    >

      <Head title="Create Project" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form onSubmit={onSubmit} className="p-4 sm:p-8bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div>
                <InputLabel htmlFor="project_image_path" value="Project Image"/>
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('image', e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name"/>
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Project Description"/>
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('description', e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Due Date"/>
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('due_date', e.target.value)}
                  />
                  <InputError message={errors.due_date} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status"/>
                <SelectInput
                  id="project_status"
                  name="status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route('project.index')}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-0.5 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Create Project
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}