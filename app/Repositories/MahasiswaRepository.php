<?php

namespace App\Repositories;

use App\Models\Mahasiswa;
use App\Http\Resources\MahasiswaResource;

class MahasiswaRepository
{
    protected $mahasiswa;
    public function __construct(Mahasiswa $mahasiswa)
    {
        $this->mahasiswa = $mahasiswa;
    }
    public function get($req)
    {
        $q = $this->mahasiswa->query();

        if (isset($req['search']) && $req['search'] != '') {
            $q->where('nim', 'like', '%' . $req['search'] . '%')
            ->orWhere('nama_lengkap', 'like', '%' . $req['search'] . '%')
            ->orWhere('alamat', 'like', '%' . $req['search'] . '%');
        }
        $q->orderBy('created_at', 'desc');
        $mahasiswas = $q->paginate($req['perPage'] ?? 10);
        $result = MahasiswaResource::collection($mahasiswas);
        return $result;
    }

    public function create($req)
    {
        $response = $this->mahasiswa::create($req);
        return $response->nim;
    }

    public function edit($id)
    {
        $data = $this->mahasiswa::findorfail($id);
        return $data;
    }

    public function update($req, $id)
    {
        $mahasiswa = $this->mahasiswa::findorfail($id);
        $mahasiswa->update($req);
        return $mahasiswa->nim;
    }

    public function delete($id)
    {
        $mahasiswa = $this->mahasiswa::findorfail($id);
        $namaMahasiswa = $mahasiswa->nim;
        $mahasiswa->delete();
        return $namaMahasiswa;
    }
}
