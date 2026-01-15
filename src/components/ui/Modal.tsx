type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({ title, onClose, children, footer }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h3 className="font-medium">{title}</h3>
          <button onClick={onClose} className="text-lg leading-none">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
        {footer && (
          <div className="border-t px-4 py-2 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
