import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inertia } from "@inertiajs/inertia";

function Pagination({ links, search, perPage }) {
    console.log(search, perPage);
    return (
        <ul class="pagination">
            {links.map((link, index) => {
                let linkLable = link.label.replace(/&laquo;/, '<').replace(/&raquo;/, '>');
                let classLi = link.active ? 'page-item active' : 'page-item';

                if (link.url === null && link.label.includes('aquo')) {
                    return null;
                }

                return (
                    <li className={classLi} key={index}>
                        <button key={index}
                        onClick={() => Inertia.get(link.url + `&perPage=${perPage}&search=${search}`)}
                        className="page-link"
                        >
                            {linkLable}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default Pagination
