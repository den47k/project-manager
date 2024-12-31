<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            "image" => ["nullable", "image", "max:1024"],
            "description" => ["string"],
            "due_date" => ["nullable", "date"],
            "project_id" => ["required", "exists:projects,id"],
            "assigned_user_id" => ["required", "exists:users,id"],
            "status" => ["required", Rule::enum(TaskStatus::class)],
            "priority" => ["required", Rule::enum(TaskPriority::class)],
        ];
    }
}
