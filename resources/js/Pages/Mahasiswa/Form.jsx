import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Form({id, dataMahasiswa}) {
    let initialState = {}
    if (dataMahasiswa) {
        initialState = {
            nim: dataMahasiswa.nim,
            nama_lengkap: dataMahasiswa.nama_lengkap,
            jenkel: dataMahasiswa.jenkel,
            alamat: dataMahasiswa.alamat
        }
    }

    const [tnim, setTnim] = useState(initialState.nim ?? '');
    const [tnama, setTnama] = useState(initialState.nama_lengkap ?? '');
    const [tjenkel, setTjenkel] = useState(initialState.jenkel ?? '');
    const [talamat, setTalamat] = useState(initialState.alamat ?? '');

    const [loading, setLoading] = useState(false);

    const {errors} = usePage().props;
    console.log(errors);

    const saveData = (e) => {
        e.preventDefault();
        setLoading(true);

        const mahasiswa = {
            nim: tnim,
            nama_lengkap: tnama,
            jenkel: tjenkel,
            alamat: talamat
        }

        if (dataMahasiswa) {
            Inertia.put(`/mahasiswa/${id}`, mahasiswa, {
                onFinish: () => {
                    setLoading(false);
                }
            })
        } else {
            Inertia.post('/mahasiswa', mahasiswa, {
                onFinish: () => {
                    setLoading(false);
                }
            })
        }
    }

    const styleError = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: '10px',
        position: 'absolute'
    }
    return (
        <div className='container'>
            <h3>Form Mahasiswa</h3>
            <hr />

            <Link href='/mahasiswa' as='button' type='button' className='btn btn-secondary'>Kembali</Link>

            <form onSubmit={saveData} className='form-group'>
                <table border={0} cellPadding={10}>
                    <tr>
                        <td>NIM</td>
                        <td> : </td>
                        <td>
                            <input maxLength={7} className={errors.nim ? 'form-control is-invalid' : 'form-control'} type="text" value={tnim} onChange={(e) => setTnim(e.target.value)}
                            placeholder='masukkan NIM'
                            disabled={dataMahasiswa ? true : false}
                             />

                            {
                                errors.nim ? <div style={styleError}>{errors.nim}</div> : ''
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Nama Lengkap</td>
                        <td> : </td>
                        <td>
                            <input className={errors.nama_lengkap ? 'form-control is-invalid' : 'form-control'} type="text" value={tnama} onChange={(e) => setTnama(e.target.value)} placeholder='masukkan Nama' size={50} />

                            {
                                errors.nama_lengkap ? <div style={styleError}>{errors.nama_lengkap}</div> : ''
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td> : </td>
                        <td>
                            <select className={errors.jenkel ? 'form-select is-invalid' : 'form-select'} onChange={(e) => setTjenkel(e.target.value)}>
                                <option value="">-Pilih-</option>
                                <option value="L" selected={tjenkel == 'L'}>Laki-Laki</option>
                                <option value="P" selected={tjenkel == 'P'}>Perempuan</option>
                            </select>

                            {
                                errors.jenkel ? <div style={styleError}>{errors.jenkel}</div> : ''
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td> : </td>
                        <td>
                            <textarea className={errors.alamat ? 'form-control is-invalid' : 'form-control'} value={talamat} onChange={(e) => setTalamat(e.target.value)} placeholder='masukkan Alamat' cols={50} rows={5}></textarea>

                            {
                                errors.alamat ? <div style={styleError}>{errors.alamat}</div> : ''
                            }
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <button className={`btn ${loading ? 'btn-secondary' : 'btn-success'}`} disabled={loading} type='submit'>
                                {
                                    loading ? 'Tunggu...' : 'Simpan Data'
                                }
                            </button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}
