import { InputField } from '@/components/common/InputField';
import { required, email, mobile } from '@/utils/validators/facility.validators';
import type { Facility } from '../../../types/facility.types';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

type Props = {
  register: UseFormRegister<Facility>;
  errors: FieldErrors<Facility>;
  isViewMode: boolean;
};

export function ContactTab({ register, errors, isViewMode }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Primary POC Name"
        {...register('primaryPoc.name', required('Primary POC Name'))}
        error={errors.primaryPoc?.name?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Primary POC Mobile"
        {...register('primaryPoc.mobile', {
          ...required('Primary POC Mobile'),
          ...mobile,
        })}
        error={errors.primaryPoc?.mobile?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Primary POC Email"
        {...register('primaryPoc.email', {
          ...required('Primary POC Email'),
          ...email,
        })}
        error={errors.primaryPoc?.email?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Secondary POC Name"
        {...register('secondaryPoc.name', required('Secondary POC Name'))}
        error={errors.secondaryPoc?.name?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Secondary POC Mobile"
        {...register('secondaryPoc.mobile', {
          ...required('Secondary POC Mobile'),
          ...mobile,
        })}
        error={errors.secondaryPoc?.mobile?.message}
        disabled={isViewMode}
      />

      <InputField
        label="Client Admin POC Mobile"
        {...register('clientAdminMobile', {
          ...required('Client Admin POC Mobile'),
          ...mobile,
        })}
        error={errors.clientAdminMobile?.message}
        disabled={isViewMode}
      />

      <InputField
        label="SR Owner Mobile"
        {...register('srOwnerMobile', {
          ...required('SR Owner Mobile'),
          ...mobile,
        })}
        error={errors.srOwnerMobile?.message}
        disabled={isViewMode}
      />
    </div>
  );
}
