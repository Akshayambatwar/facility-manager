import { InputField } from '@/components/common/InputField';
import { TextareaField } from '@/components/common/TextareaField';
import { required, pincode as pincodeValidator } from '@/utils/validators/facility.validators';
import type { Facility } from '../../../types/facility.types';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

type Props = {
  register: UseFormRegister<Facility>;
  errors: FieldErrors<Facility>;
  isViewMode: boolean;
};

export function BasicTab({ register, errors, isViewMode }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Facility Code"
        {...register('code', required('Facility Code'))}
        error={errors.code?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Facility Name"
        {...register('name', required('Facility Name'))}
        error={errors.name?.message}
        disabled={isViewMode}
      />

      <TextareaField
        label="Address"
        {...register('address', required('Address'))}
        error={errors.address?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Pincode"
        type="number"
        {...register('pincode', {
          ...required('Pincode'),
          ...pincodeValidator,
        })}
        error={errors.pincode?.message}
        disabled={isViewMode}
      />

      <InputField
        label="City"
        {...register('city', required('City'))}
        error={errors.city?.message}
        disabled={isViewMode}
      />

      <InputField
        label="State"
        {...register('state', required('State'))}
        error={errors.state?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Region"
        {...register('region', required('Region'))}
        error={errors.region?.message}
        disabled={isViewMode}
      />
    </div>
  );
}
