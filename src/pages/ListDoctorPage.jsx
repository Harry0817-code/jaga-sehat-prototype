import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { LIST_DOCTORS } from '../utils/ListDoctors.js';
import { usePagination } from '../hooks/setPages.js';

import CompListDoctors from '../components/CompListDoctors.jsx';
import Pagination from '../components/Pagination.jsx';

const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

function ListDoctorPage() {
  const [searchByInput, setSearchByInput] = useState('');
  const [searchByDropDown, setSearchByDropDown] = useState('');
  const [activeClick, setActiveClick] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const listSpecialists = useMemo(() => {
    return [...new Set(LIST_DOCTORS.map(doc => doc.specialization))];
  }, []);

  const resultSearch = useMemo(() => {
    if (!searchByInput && !searchByDropDown) return LIST_DOCTORS;

    if (activeClick === 'input' && searchByInput) {
      const keyword = searchByInput.toLowerCase();
      return LIST_DOCTORS.filter(doc =>
        doc.name.toLowerCase().includes(keyword) ||
        doc.specialization.toLowerCase().includes(keyword)
      );
    }

    if (activeClick === 'select' && searchByDropDown) {
      return LIST_DOCTORS.filter(
        doc => doc.specialization === searchByDropDown
      );
    }

    return LIST_DOCTORS;
  }, [searchByInput, searchByDropDown, activeClick]);

  const { resultPages: paginatedDoctors, totalPages } = usePagination(resultSearch, ITEMS_PER_PAGE, currentPage)

  return (
    <div className="container-list-doctors">
      <div className="hero-header-list-doctor">
        <h1>Daftar Dokter</h1>
        <p>Pilih dokter untuk berkonsultasi</p>
      </div>

      <div className="filter-doctors">
        <div className="icon-input-filter-doctors">
          <Search />
          <input
            type="text"
            placeholder="Cari nama atau spesialis dokter..."
            value={searchByInput}
            onChange={(e) => {
              setSearchByInput(e.target.value);
              setActiveClick('input');
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          value={searchByDropDown}
          onChange={(e) => {
            setSearchByDropDown(e.target.value);
            setActiveClick('select');
            setCurrentPage(1);
          }}
        >
          <option value="">Semua Spesialis</option>
          {listSpecialists.map((spec, idx) => (
            <option key={idx} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div className="display-box-and-pagination">
        <div className="hero-list-doctors" style={{ gridTemplateColumns: paginatedDoctors.length > 0 ? 'repeat(3, 1fr)' : 'none' }}>
          {paginatedDoctors.length > 0 ? (
            paginatedDoctors.map((doctor) => (
              <CompListDoctors key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p>Dokter tidak ditemukan</p>
          )}
        </div>

        <div className="position-pagination-list-doctors">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={MAX_VISIBLE_PAGES}
          />
        </div>
      </div>
    </div>
  );
}

export default ListDoctorPage;
