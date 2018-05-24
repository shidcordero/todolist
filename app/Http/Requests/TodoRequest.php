<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'text' => 'required|string|max:250',
            'due_date' => 'required|date',
            'priority' => "integer|between:0,2000000000",
            'is_completed' => 'boolean',
        ];
    }
}
