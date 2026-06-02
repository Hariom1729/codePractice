"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { ReactNode } from "react";

export default function DropdownFilter({ 
  paramKey, 
  options, 
  label,
  iconNode
}: { 
  paramKey: string, 
  options: { value: string, label: string }[],
  label: string,
  iconNode?: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramKey);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayFilter = options.find(o => o.value === currentValue)?.label || `All ${label}`;

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'All') {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    return params.toString();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-48 px-4 py-2 text-sm font-medium text-white bg-[#0f172a]/80 border border-gray-700 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[var(--color-neon-cyan)] transition-colors"
        >
          <span className="flex items-center gap-2 truncate">
            {iconNode || <Filter size={16} className="text-[var(--color-neon-cyan)] flex-shrink-0" />}
            <span className="truncate">{displayFilter}</span>
          </span>
          <ChevronDown size={16} className={`transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#1e293b] ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-700 max-h-60 overflow-y-auto">
          <div className="py-1">
            <Link
              href={`?${createQueryString(paramKey, 'All')}`}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors ${
                !currentValue 
                  ? 'bg-gray-800 text-[var(--color-neon-cyan)] font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              All {label}
            </Link>
            {options.map((option) => (
              <Link
                key={option.value}
                href={`?${createQueryString(paramKey, option.value)}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors ${
                  currentValue === option.value 
                    ? 'bg-gray-800 text-green-400 font-medium' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
