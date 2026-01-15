import { InputField } from '@/components/common/InputField';
import {
  required,
  latitude as latitudeValidator,
  longitude as longitudeValidator,
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

export function LocationTab({ register, errors, watch, isViewMode }: Props) {
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const hasLocation =
    typeof latitude === 'number' && typeof longitude === 'number';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Latitude"
        type="number"
        step="any"
        {...register('latitude', latitudeValidator)}
        error={errors.latitude?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Longitude"
        type="number"
        step="any"
        {...register('longitude', longitudeValidator)}
        error={errors.longitude?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Google Map Link"
        {...register('mapLink', required('Google Map Link'))}
        error={errors.mapLink?.message}
        disabled={isViewMode}
      />

      {isViewMode && hasLocation && (
        <div className="md:col-span-2 mt-4">
          <iframe
            title="facility-map"
            width="100%"
            height="300"
            className="rounded border"
            loading="lazy"
            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          />
        </div>
      )}
    </div>
  );
}
