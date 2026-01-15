import { InputField } from '@/components/common/InputField';
import {
  positiveNumberRequired,
  carpetAreaValidator,
} from '@/utils/validators/facility.validators';
import type { Facility } from '../../../types/facility.types';
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';

type Props = {
  register: UseFormRegister<Facility>;
  errors: FieldErrors<Facility>;
  watch: UseFormWatch<Facility>;
  isViewMode: boolean;
};

export function AreaDetailsTab({
  register,
  errors,
  watch,
  isViewMode,
}: Props) {
  const builtUpArea = watch('builtUpAreaSqFt');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Built Up Area (Sq Ft)"
        type="number"
        step="any"
        {...register(
          'builtUpAreaSqFt',
          positiveNumberRequired('Built Up Area')
        )}
        error={errors.builtUpAreaSqFt?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Carpet Area (Sq Ft)"
        type="number"
        step="any"
        {...register(
          'carpetAreaSqFt',
          carpetAreaValidator(builtUpArea)
        )}
        error={errors.carpetAreaSqFt?.message}
        disabled={isViewMode}
      />
    </div>
  );
}
