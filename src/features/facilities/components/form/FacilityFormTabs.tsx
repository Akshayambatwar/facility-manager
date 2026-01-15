
// All Tabs for Facility Form
type TabKey =
  | 'basic'
  | 'contact'
  | 'location'
  | 'facilitylifecycle'
  | 'areadetails'
  | 'classification';


// Mapping of tab keys to their display labels
const TAB_LABELS: Record<TabKey, string> = {
  basic: 'Basic',
  contact: 'Contact',
  location: 'Location',
  facilitylifecycle: 'Facility Lifecycle',
  areadetails: 'Area Details',
  classification: 'Classification', 
};

type Props = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

// Function to determine the CSS classes for each tab based on its active state
const tabClass = (active: boolean) =>
  `px-3 py-2 text-sm border-b-2 transition
   ${active
      ? 'border-blue-700 text-blue-700 font-medium'
      : 'border-transparent text-gray-500 hover:text-gray-700'
   }`;

export function FacilityFormTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex gap-4 border-b mb-4 overflow-x-auto no-scrollbar">
      {(Object.keys(TAB_LABELS) as TabKey[]).map(tab => (
        <button
          key={tab}
          type="button"
          className={tabClass(activeTab === tab)}
          onClick={() => onTabChange(tab)}
        >
          {TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
}
