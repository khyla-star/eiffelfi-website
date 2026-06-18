import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type MarketplaceFilterDropdownOption = {
  id: string;
  label: string;
  count?: number;
};

type PanelPosition = {
  top: number;
  left: number;
  width: number;
};

type MarketplaceFilterDropdownProps = {
  label: string;
  icon: string;
  allOption: MarketplaceFilterDropdownOption;
  options: MarketplaceFilterDropdownOption[];
  selected: Set<string>;
  searchPlaceholder: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onChange: (selected: Set<string>) => void;
};

function getPanelPosition(trigger: HTMLElement): PanelPosition {
  const rect = trigger.getBoundingClientRect();
  const width = Math.min(320, window.innerWidth - 24);

  return {
    top: rect.bottom + 8,
    left: Math.min(Math.max(12, rect.left), window.innerWidth - width - 12),
    width,
  };
}

export default function MarketplaceFilterDropdown({
  label,
  icon,
  allOption,
  options,
  selected,
  searchPlaceholder,
  isOpen,
  onToggle,
  onClose,
  onChange,
}: MarketplaceFilterDropdownProps) {
  const [query, setQuery] = useState('');
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchId = useId();

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setPanelPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!triggerRef.current) {
        return;
      }

      setPanelPosition(getPanelPosition(triggerRef.current));
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }

      onClose();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  function toggleOption(optionId: string) {
    if (optionId === allOption.id) {
      onChange(new Set([allOption.id]));
      return;
    }

    const next = new Set(selected);
    next.delete(allOption.id);

    if (next.has(optionId)) {
      next.delete(optionId);
    } else {
      next.add(optionId);
    }

    if (next.size === 0) {
      onChange(new Set([allOption.id]));
      return;
    }

    onChange(next);
  }

  const panel =
    isOpen && panelPosition
      ? createPortal(
          <div
            ref={panelRef}
            className="marketplace-nav-dropdown__panel marketplace-nav-dropdown__panel--portal"
            role="listbox"
            aria-label={label}
            style={{
              top: `${panelPosition.top}px`,
              left: `${panelPosition.left}px`,
              width: `${panelPosition.width}px`,
            }}
          >
            <div className="marketplace-nav-dropdown__search-wrap">
              <i className="fal fa-search marketplace-nav-dropdown__search-icon" aria-hidden="true" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="marketplace-nav-dropdown__search"
                aria-label={searchPlaceholder}
              />
            </div>

            <ul className="marketplace-nav-dropdown__list">
              <li>
                <button
                  type="button"
                  className="marketplace-nav-dropdown__option"
                  role="option"
                  aria-selected={selected.has(allOption.id)}
                  onClick={() => toggleOption(allOption.id)}
                >
                  <span
                    className={`marketplace-nav-dropdown__checkbox${
                      selected.has(allOption.id) ? ' marketplace-nav-dropdown__checkbox--checked' : ''
                    }`}
                    aria-hidden="true"
                  >
                    {selected.has(allOption.id) ? <i className="fal fa-check" /> : null}
                  </span>
                  <span
                    className={
                      selected.has(allOption.id) ? 'marketplace-nav-dropdown__option-label--active' : ''
                    }
                  >
                    {allOption.label}
                  </span>
                </button>
              </li>

              {filteredOptions.map((option) => {
                const checked = selected.has(option.id);
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      className="marketplace-nav-dropdown__option"
                      role="option"
                      aria-selected={checked}
                      onClick={() => toggleOption(option.id)}
                    >
                      <span
                        className={`marketplace-nav-dropdown__checkbox${
                          checked ? ' marketplace-nav-dropdown__checkbox--checked' : ''
                        }`}
                        aria-hidden="true"
                      >
                        {checked ? <i className="fal fa-check" /> : null}
                      </span>
                      <span className="marketplace-nav-dropdown__option-label">{option.label}</span>
                      {option.count !== undefined ? (
                        <span className="marketplace-nav-dropdown__option-count">({option.count})</span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className={`marketplace-nav-dropdown${isOpen ? ' marketplace-nav-dropdown--open' : ''}`}>
        <button
          ref={triggerRef}
          type="button"
          className="marketplace-nav-dropdown__trigger"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onClick={onToggle}
        >
          <i className={`fal ${icon} marketplace-nav-dropdown__trigger-icon`} aria-hidden="true" />
          <span>{label}</span>
          <i
            className={`fal fa-chevron-${isOpen ? 'up' : 'down'} marketplace-nav-dropdown__trigger-chevron`}
            aria-hidden="true"
          />
        </button>
      </div>
      {panel}
    </>
  );
}
