import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import MyButton from '../../../Components/MyButton';
import Pagination from '../../../Components/Pagination';
import Layout from '../../../Components/Layout';

export default function Index({ mahasiswa, filters }) {
    console.log(mahasiswa, filters);
    const helper = [
        'No', 'NIM', 'Nama Lurus', 'Jenkel', 'Alamat', 'Tanggal', 'Action'
    ];

    const { flash } = usePage().props;

    const [search, setSearch] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.perPage || 10);

    const doSearchData = () => {
        Inertia.get('/mahasiswa', { perPage, search }, { preserveState: true });
    }

    const fnStatus = (status, message) => {
        if (status) {
            Swal.fire({
                icon: status,
                title: status == 'success' ? 'Berhasil' : 'Gagal',
                text: message,
            })
        }
    }
    fnStatus(flash.status, flash.message);

    const editMahasiswa = (id) => {
        Inertia.get(`/mahasiswa/${id}/edit`);
    }
    const deleteMahasiswa = (id, mahasiswa) => {
        Swal.fire({
            title: `Apakah anda yakin ingin menghapus data ${mahasiswa.nim} ?`,
            text: "Data yang telah dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/mahasiswa/${id}`);
            }
        });

    }

    const convertDate = (date) => {
        const newDate = new Date(date);

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };

        return newDate.toLocaleDateString('id-ID', options);
    }

    const doReset = () => {
        setSearch('');
        Inertia.get('/mahasiswa');
    }

    const clickedButton = () => {
        alert('tombol diklik');
    }

    const startNumber = (mahasiswa.meta.current_page - 1) * mahasiswa.meta.per_page;

    const prevPerPageRef = useRef(perPage);

    useEffect(() => {
        if (perPage !== prevPerPageRef.current) {
            doSearchData();
            prevPerPageRef.current = perPage;
        }
    }, [perPage]);

    return (
        <Layout>
            <div>
                <marquee><h3>List Mahasiswa</h3></marquee>
                <hr />
                <Link as='button' className='btn btn-primary' type='button' href='/mahasiswa/create'>Tambah Data</Link>
                {/* <MyButton buttonClick={clickedButton} />
            <button onClick={clickedButton}>My Button NEW</button> */}
                <br /><br />
                <form className='d-flex mb-2' onSubmit={(e) => { e.preventDefault() }}>
                    <select name="perPage" id="perPage"
                        className='form-select me-2'
                        onChange={(e) => setPerPage(e.target.value)}
                        style={{ width: '70px' }}
                    >
                        <option value="10" selected={perPage === '10'}>10</option>
                        <option value="25" selected={perPage === '25'}>25</option>
                        <option value="50" selected={perPage === '50'}>50</option>
                        <option value="100" selected={perPage === '100'}>100</option>
                    </select>

                    <input className='form-control me-2 w-25'
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search" />
                    <button type="submit" className='btn btn-primary me-2' onClick={() => doSearchData()}>Search</button>
                    <button type="reset" onClick={() => doReset()} className='btn btn-secondary'>Reset</button>
                </form>
                <table cellPadding={5} className='table table-bordered table-striped table-sm'>
                    <thead>
                        <tr className='bg-primary text-white'>
                            {
                                helper.map((item, index) => (
                                    <th className='text-center' key={index}>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mahasiswa.data.length === 0 ? (
                                <tr>
                                    <th colSpan={7}>Data Kosong ....</th>
                                </tr>
                            ) : (
                                mahasiswa.data.map((mahasiswa, index) => (
                                    <tr key={index}>
                                        <td>{startNumber + index + 1}</td>
                                        <td>{mahasiswa.nim}</td>
                                        <td>{mahasiswa.nama}</td>
                                        <td>{mahasiswa.jenkel == 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                                        <td>{mahasiswa.alamat}</td>
                                        <td>{convertDate(mahasiswa.tanggal)}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning'
                                                onClick={() => editMahasiswa(mahasiswa.id)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => deleteMahasiswa(mahasiswa.id, mahasiswa)}
                                                style={{ marginLeft: '5px' }}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
                <div className='mt-3'>
                    <Pagination links={mahasiswa.meta.links} search={search} perPage={perPage} />
                </div>
            </div>
        </Layout>
    );
}
