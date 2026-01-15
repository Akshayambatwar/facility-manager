import type { Facility } from '../types/facility.types';

type Props = {
  facility: Facility;
};

export function FacilityViewContent({ facility }: Props) {
  const { latitude, longitude } = facility;
  const hasLocation = latitude && longitude;
  
  return (
    <div className="space-y-4 text-sm">
      <section>
        <div>
          <div className="text-gray-500">Code</div>
          <div>{facility.code}</div>
        </div>

        <div>
          <div className="text-gray-500">Name</div>
          <div>{facility.name}</div>
        </div>

        <div>
          <div className="text-gray-500">Status</div>
          <div>{facility.status}</div>
        </div>

        <div>
          <div className="text-gray-500">City</div>
          <div>{facility.city || '-'}</div>
        </div>

        <div>
          <div className="text-gray-500">Primary Contact</div>
          <div>
            {facility.primaryPoc.name} ({facility.primaryPoc.mobile})
          </div>
        </div>
      </section>
      {/* MAP */}
      <section>
        <h3 className="font-medium mb-2">Location</h3>

        {hasLocation ? (
          <iframe
            title="facility-map"
            width="100%"
            height="300"
            loading="lazy"
            className="rounded border"
            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          />
        ) : (
          <p className="text-sm text-gray-500">
            Location coordinates not available
          </p>
        )}
      </section>
    </div>
  );
}
