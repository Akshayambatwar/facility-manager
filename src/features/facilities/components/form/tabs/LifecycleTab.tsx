import { InputField } from '@/components/common/InputField';
import {
  requiredDate,
  closureAfterOpening,
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
};

export function LifecycleTab({ register, errors, watch }: Props) {
  const openingDate = watch('openingDate');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        type="date"
        label="Opening Date"
        {...register('openingDate', requiredDate('Opening Date'))}
        error={errors.openingDate?.message}
      />

      <InputField
        type="date"
        label="Last Renovation Date"
        {...register('renovationDate', requiredDate('Last Renovation Date'))}
        error={errors.renovationDate?.message}
      />

      <InputField
        type="date"
        label="Closure Date"
        {...register('closureDate', closureAfterOpening(openingDate))}
        error={errors.closureDate?.message}
      />
    </div>
  );
}
