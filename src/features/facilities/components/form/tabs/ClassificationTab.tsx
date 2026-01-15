import { InputField } from '@/components/common/InputField';
import { SelectField } from '@/components/common/SelectField';
import { required } from '@/utils/validators/facility.validators';
import type { Facility } from '../../../types/facility.types';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

type Props = {
  register: UseFormRegister<Facility>;
  errors: FieldErrors<Facility>;
  isViewMode: boolean;
  showErrors: boolean;
};

export function ClassificationTab({
  register,
  errors,
  isViewMode,
  showErrors,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        label="Facility Status"
        {...register('status', required('Facility Status'))}
        error={showErrors ? errors.status?.message : undefined}
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
          { label: 'Closed', value: 'CLOSED' },
        ]}
        disabled={isViewMode}
      />

      <InputField
        label="Custom Facility Type"
        {...register('facilityType', required('Custom Facility Type'))}
        error={showErrors ? errors.facilityType?.message : undefined}
        disabled={isViewMode}
      />

      <SelectField
        label="Franchise Model"
        {...register('isFranchise', required('Franchise Model'))}
        error={showErrors ? errors.isFranchise?.message : undefined}
        options={[
          { label: 'Yes', value: 'YES' },
          { label: 'No', value: 'NO' },
        ]}
        disabled={isViewMode}
      />
    </div>
  );
}
