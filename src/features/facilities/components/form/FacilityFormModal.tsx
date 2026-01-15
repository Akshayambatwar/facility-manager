import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { useAppDispatch } from '@/store/hooks';
import { saveFacility, fetchFacilities } from '../../types/facility.slice';
import type { Facility } from '../../types/facility.types';
import { FacilityFormTabs } from './FacilityFormTabs';
import toast from 'react-hot-toast';

import { BasicTab } from './tabs/BasicTab';
import { ContactTab } from './tabs/ContactTab';
import { LocationTab } from './tabs/LocationTab';
import { LifecycleTab } from './tabs/LifecycleTab';
import { AreaDetailsTab } from './tabs/AreaDetailsTab';
import { ClassificationTab } from './tabs/ClassificationTab';

import type { FieldPath } from 'react-hook-form';

type Props = {
  initialData?: Facility;
  mode: 'create' | 'edit' | 'view';
  onClose: () => void;
};

export type TabKey =
  | 'basic'
  | 'contact'
  | 'location'
  | 'facilitylifecycle'
  | 'areadetails'
  | 'classification';

export const TAB_ORDER: TabKey[] = [
  'basic',
  'contact',
  'location',
  'facilitylifecycle',
  'areadetails',
  'classification',
];

const TAB_FIELDS: Record<TabKey, FieldPath<Facility>[]> = {
  basic: ['code', 'name', 'address', 'pincode', 'city', 'state', 'region'],
  contact: [
    'primaryPoc.name',
    'primaryPoc.mobile',
    'primaryPoc.email',
    'secondaryPoc.name',
    'secondaryPoc.mobile',
    'clientAdminMobile',
    'srOwnerMobile',
  ],
  location: ['latitude', 'longitude', 'mapLink'],
  facilitylifecycle: ['openingDate', 'renovationDate', 'closureDate'],
  areadetails: ['builtUpAreaSqFt', 'carpetAreaSqFt'],
  classification: ['facilityType', 'isFranchise', 'status'],
};

export function FacilityFormModal({ initialData, mode, onClose }: Props) {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabKey>('basic');
  const [showClassificationErrors, setShowClassificationErrors] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Facility>({
    defaultValues: initialData,
    mode: 'onChange',
    shouldUnregister: false,
  });

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const currentIndex = TAB_ORDER.indexOf(activeTab);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };


  //Navigation
  const handleNext = async () => {
    const fields = TAB_FIELDS[activeTab];
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) return;

    setActiveTab(TAB_ORDER[currentIndex + 1]);
    scrollToTop();
  };

  const handlePrevious = () => {
    setActiveTab(TAB_ORDER[currentIndex - 1]);
    scrollToTop();
  };

  const handleTabChange = async (nextTab: TabKey) => {
    // Edit / View → free navigation
    if (isEditMode || isViewMode) {
      setActiveTab(nextTab);
      scrollToTop();
      return;
    }

    const nextIndex = TAB_ORDER.indexOf(nextTab);

    // Backward navigation allowed
    if (nextIndex <= currentIndex) {
      setActiveTab(nextTab);
      scrollToTop();
      return;
    }

    // Validate all previous tabs
    for (let i = 0; i <= currentIndex; i++) {
      const valid = await trigger(TAB_FIELDS[TAB_ORDER[i]]);
      if (!valid) {
        toast.error(`Please complete ${TAB_ORDER[i]} section`);
        return;
      }
    }

    setActiveTab(nextTab);
    scrollToTop();
  };


  //Submit
  const onSubmit = async (data: Facility) => {
    const payload = initialData ? { ...initialData, ...data } : data;
    const toastId = toast.loading(
      initialData ? 'Updating facility...' : 'Creating facility...'
    );

    try {
      await dispatch(saveFacility(payload)).unwrap();
      toast.success('Saved successfully', { id: toastId });
      dispatch(fetchFacilities());
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to save facility';
      toast.error(message, { id: toastId });
    }
  };


  return (
    <Modal
      title={initialData ? 'Edit Facility' : 'Create Facility'}
      onClose={onClose}
      footer={
        <div className="flex justify-between w-full">
          {/* Previous */}
          {!isViewMode && currentIndex > 0 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="border px-3 py-1"
            >
              Previous
            </button>
          ) : (
            <span />
          )}

          <div className="flex gap-2">
            {/* Close / Cancel */}
            <button type="button" onClick={onClose}>
              {isViewMode ? 'Close' : 'Cancel'}
            </button>

            {/* View mode → no submit */}
            {!isViewMode && (
              isEditMode || currentIndex === TAB_ORDER.length - 1 ? (
                <button
                  type="submit"
                  form="facility-form"
                  disabled={isSubmitting}
                  onClick={() => setShowClassificationErrors(true)}
                  className="bg-green-600 px-3 py-1 text-white disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 px-3 py-1 text-white"
                >
                  Next
                </button>
              )
            )}
          </div>
        </div>
      }
    >
      <FacilityFormTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto px-2">
        <form id="facility-form" onSubmit={handleSubmit(onSubmit)}>
          {activeTab === 'basic' && (
            <BasicTab
              register={register}
              errors={errors}
              isViewMode={isViewMode} />
          )}

          {activeTab === 'contact' && (
            <ContactTab
              register={register}
              errors={errors}
              isViewMode={isViewMode} />
          )}

          {activeTab === 'location' && (
            <LocationTab
              register={register}
              errors={errors}
              watch={watch}
              isViewMode={isViewMode}
            />
          )}

          {activeTab === 'facilitylifecycle' && (
            <LifecycleTab
              register={register}
              errors={errors}
              watch={watch} />
          )}

          {activeTab === 'areadetails' && (
            <AreaDetailsTab
              register={register}
              errors={errors}
              watch={watch}
              isViewMode={isViewMode}
            />
          )}

          {activeTab === 'classification' && (
            <ClassificationTab
              register={register}
              errors={errors}
              isViewMode={isViewMode}
              showErrors={showClassificationErrors}
            />
          )}
        </form>
      </div>
    </Modal>
  );
}
