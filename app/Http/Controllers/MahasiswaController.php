<?php

namespace App\Http\Controllers;

use App\Http\Requests\MahasiswaRequest;
use App\Repositories\MahasiswaRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    protected $repository;
    public function __construct(MahasiswaRepository $mahasiswaRepository)
    {
        // $this->middleware('auth');
        $this->repository = $mahasiswaRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $mahasiswa = $this->repository->get($request->all());
        return Inertia::render('Mahasiswa/Index', ['mahasiswa' => $mahasiswa, 'filters' => $request->all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Mahasiswa/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MahasiswaRequest $request)
    {
        $response = $this->repository->create($request->all());
        // dd($response);
        return redirect()->route('mahasiswa.index')->with(['message' => "data $response berhasil di tambahkan ...", 'status' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $response = $this->repository->edit($id);
        return Inertia::render('Mahasiswa/Form',
        [
            'id' => $id,
            'dataMahasiswa' => $response
        ]
    );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $response = $this->repository->update($request->all(), $id);
        return redirect()->route('mahasiswa.index')->with(['message' => "data $response berhasil di ubah ...", 'status' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $response = $this->repository->delete($id);
        return redirect()->route('mahasiswa.index')->with(['message' => "data $response berhasil di hapus ...", 'status' => 'success']);
    }
}
