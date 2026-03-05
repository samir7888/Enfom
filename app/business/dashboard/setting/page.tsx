
import { 
  Settings, Type, Trash2, CreditCard, 
  Image as ImageIcon, Download, Folder, ShoppingCart, TrendingUp 
} from 'lucide-react';

// --- Reusable Components ---

const Toggle = ({ enabled }: { enabled: boolean }) => (
  <button
    className={`${
      enabled ? 'bg-green-500' : 'bg-gray-200'
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
  >
    <span
      className={`${
        enabled ? 'translate-x-6' : 'translate-x-1'
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
    />
  </button>
);

const Checkbox = ({ checked }: { checked: boolean }) => (
  <button
    className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
      checked ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
    }`}
  >
    {checked && (
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    )}
  </button>
);

interface SettingRowProps {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  description: string;
  active: boolean;
  disabled?: boolean;
}

const SettingRow = ({ icon: Icon, title, description, active, disabled = false }: SettingRowProps) => (
  <div className={`flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${disabled ? 'opacity-60' : ''}`}>
    <div className="flex items-center gap-4">
      <div className="p-2 text-gray-500 bg-gray-50 rounded-lg">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
    <Toggle enabled={active} />
  </div>
);

interface CheckboxRowProps {
  icon: React.ComponentType<{ size: number; className: string }>;
  label: string;
  checked: boolean;
}

const CheckboxRow = ({ icon: Icon, label, checked }: CheckboxRowProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-gray-500" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <Checkbox checked={checked} />
  </div>
);

// --- Main Page Component ---

export default function NotificationSettings() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white font-sans text-gray-900">
      <header className="mb-10">
        <h1 className="text-2xl font-bold mb-2">Notification settings</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
          By default, designers will be notified by your company preferred dark patterns. 
          Employees can also customize their notification preferences by logging into the{' '}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Setproduct dashboard</span>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Toggles */}
        <div className="space-y-8">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Primary Settings</h3>
            <div className="space-y-3">
              <SettingRow 
                icon={Settings} 
                title="Setting option disabled" 
                description="Describe here what it is for" 
                active={false} 
                disabled 
              />
              <SettingRow 
                icon={Type} 
                title="Automatically text alignment" 
                description="This is unuseful experimental feature" 
                active={true} 
              />
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Secondary Options</h3>
            <div className="space-y-3">
              <SettingRow 
                icon={Settings} 
                title="Setting option disabled" 
                description="Here is the onhovered statement" 
                active={false} 
              />
              <SettingRow 
                icon={Trash2} 
                title="Automatically delete items" 
                description="Get rid of clutter and keep working hard" 
                active={false} 
              />
              <SettingRow 
                icon={CreditCard} 
                title="Keep my financial information" 
                description="No more privacy on the web" 
                active={true} 
              />
            </div>
          </section>
        </div>

        {/* Right Column: Checkboxes */}
        <div className="space-y-8">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Checkable Section</h3>
            <div className="space-y-1">
              <CheckboxRow icon={ImageIcon} label="Allow images watermark" checked={false} />
              <CheckboxRow icon={Download} label="Available for download" checked={false} />
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl">
                <CheckboxRow icon={Folder} label="Onhovered item" checked={false} />
              </div>
              <CheckboxRow icon={ShoppingCart} label="Show items in stock" checked={false} />
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Checked Items</h3>
            <div className="space-y-1">
              <CheckboxRow icon={CreditCard} label="For commercial projects" checked={true} />
              <CheckboxRow icon={TrendingUp} label="Accelerate design flow" checked={true} />
              <CheckboxRow icon={Download} label="Available for download" checked={false} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}