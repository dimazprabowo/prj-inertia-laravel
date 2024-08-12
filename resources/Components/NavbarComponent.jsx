import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
            <div class="container container-fluid">
                <a class="navbar-brand" href="#"><img style={{ width: 50, height: 50 }} src="https://static.vecteezy.com/system/resources/thumbnails/011/658/576/small/letter-a-abstract-logo-flat-capital-letter-a-abstract-logo-icon-image-with-transparent-background-png.png" alt="" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Mahasiswa</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Dosen</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Matakuliah</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
