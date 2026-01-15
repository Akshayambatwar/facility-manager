import { Button } from '@/components/common/Button';
import type { Facility } from '../types/facility.types';
import { usePermission } from '@/hooks/usePermission';

type Props = {
  //List of facilities to display
  data: Facility[];

  //Action handlers
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function FacilityTable({ data, onView, onEdit, onDelete }: Props) {
  //permission check
  const canEdit = usePermission('FACILITY_EDIT');
  const canDelete = usePermission('FACILITY_DELETE');

  return (
    <>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Code</th>
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">City</th>
            <th className="border px-2 py-1 text-left">Status</th>
            <th className="border px-2 py-1 text-left">Opening Date</th>
            <th className="border px-2 py-1 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.code}</td>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.city || '-'}</td>
              <td className="border px-2 py-1">{item.status}</td>
              <td className="border px-2 py-1">{item.openingDate || '-'}</td>
              <td className="border px-2 py-1">
                <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
                  <Button className='bg-[#1e3a8a] text-white' variant='primary' onClick={() => onView(item.id)}>
                    View
                  </Button>

                  {canEdit && (
                    <Button variant='secondary' onClick={() => onEdit(item.id)}>
                      Edit
                    </Button>
                  )}

                  {canDelete && (
                    <Button variant='danger' onClick={() => onDelete(item.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
