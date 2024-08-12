<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MahasiswaRequest extends FormRequest
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

    public function attributes()
    {
        return [
            'nim' => 'NIM',
            'nama_lengkap' => 'Nama Lengkap',
            'jenkel' => 'Jenis Kelamin',
            'alamat' => 'Alamat',
        ];
    }
    public function rules(): array
    {
        $rules = [
            'nim' => ['required', 'min:7', 'max:7', 'unique:mahasiswa,nim', 'regex:/^[0-9]+$/'],
            'nama_lengkap' => ['required', 'string'],
            'jenkel' => ['required', 'in:L,P'],
            'alamat' => ['required', 'string'],
        ];

        return $rules;
    }
}
