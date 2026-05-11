function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted dark:text-content-muted-dark pointer-events-none">
        <SearchIcon />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search students by name..."
        className="input-field pl-10"
        aria-label="Search students by name"
      />
    </div>
  )
}
