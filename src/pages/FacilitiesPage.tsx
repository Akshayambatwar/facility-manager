import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import type { Facility } from '@/features/facilities/types/facility.types';
import { FacilityTable } from '@/features/facilities/components/FacilityTable';
import { FacilityFormModal } from '@/features/facilities/components/form/FacilityFormModal';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/common/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Pagination } from '@/components/ui/Pagination';

import { usePermission } from '@/hooks/usePermission';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchFacilities,
  removeFacility,
} from '@/features/facilities/types/facility.slice';

const ITEMS_PER_PAGE = 10;

export function FacilitiesPage() {
  const dispatch = useAppDispatch();
  const canCreate = usePermission('FACILITY_CREATE');

  // UI state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  // Modal state
  const [viewFacility, setViewFacility] = useState<Facility | null>(null);
  const [editFacility, setEditFacility] = useState<Facility | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Store data
  const facilities = useAppSelector((state) => state.facilities.list);

  // Fetch facilities on mount
  useEffect(() => {
    dispatch(fetchFacilities());
  }, [dispatch]);

  
  // Filtered and paginated data

  const filteredFacilities = facilities.filter((filter) => {
    const q = search.toLowerCase();
    return (
      filter.code?.toLowerCase().includes(q) ||
      filter.name?.toLowerCase().includes(q) ||
      filter.city?.toLowerCase().includes(q)
    );
  });

  const pageCount = Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE);

  const paginatedFacilities = filteredFacilities.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  
  // Delete handler
  const handleDelete = async () => {
    if (!deleteId) return;

    await dispatch(removeFacility(deleteId));
    setDeleteId(null);
    toast.success('Facility deleted successfully');
  };

  return (
    <div className="p-4">
      {/* Top actions */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by code, name or city"
        />

        {canCreate && (
          <Button
            variant="primary"
            className="rounded-lg bg-[#1e3a8a] py-2 text-white"
            onClick={() => setShowForm(true)}
          >
            Create Facility
          </Button>
        )}
      </div>

      
        <>
          <h2 className="mb-3 text-lg font-semibold">Facilities</h2>

          {filteredFacilities.length === 0 ? (
            <div className="mt-6 text-center text-sm text-gray-500">
              No facilities found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <FacilityTable
                  data={paginatedFacilities}
                  onView={(id) => {
                    const f = paginatedFacilities.find((x) => x.id === id);
                    if (f) setViewFacility(f);
                  }}
                  onEdit={(id) => {
                    const f = paginatedFacilities.find((x) => x.id === id);
                    if (f) {
                      setEditFacility(f);
                      setShowForm(true);
                    }
                  }}
                  onDelete={setDeleteId}
                />
              </div>

              {pageCount > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination
                    pageCount={pageCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </>

      {/* View modal */}
      {viewFacility && (
          <FacilityFormModal
            initialData={viewFacility}
            mode="view"
            onClose={() => setViewFacility(null)}
          />
      )}

      {/* Delete modal */}
      {deleteId && (
        <Modal
          title="Delete Facility"
          onClose={() => setDeleteId(null)}
          footer={
            <>
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                className="bg-red-600 px-3 py-1 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this facility?
          </p>
        </Modal>
      )}

      {/* Create / Edit modal */}
      {showForm && (
        <FacilityFormModal
          initialData={editFacility || undefined}
          mode={editFacility ? 'edit' : 'create'}
          onClose={() => {
            setShowForm(false);
            setEditFacility(null);
          }}
        />
      )}
    </div>
  );
}
