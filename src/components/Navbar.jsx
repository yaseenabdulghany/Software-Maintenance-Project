import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary dark:text-primary-dark">
      <path d="M22 10L12 4 2 10l10 6 10-6z" />
      <path d="M6 12v5c3 1.5 9 1.5 12 0v-5" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  )
}

function navLinkClass({ isActive }) {
  const base = 'px-3 py-2 text-sm font-medium transition-colors'
  return isActive
    ? `${base} text-primary dark:text-primary-dark border-b-2 border-primary dark:border-primary-dark`
    : `${base} text-content-muted dark:text-content-muted-dark hover:text-content dark:hover:text-content-dark border-b-2 border-transparent`
}

function mobileLinkClass({ isActive }) {
  const base = 'block px-4 py-3 text-base font-medium rounded-lg transition-colors'
  return isActive
    ? `${base} bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-dark`
    : `${base} text-content-muted dark:text-content-muted-dark hover:bg-surface dark:hover:bg-surface-hover-dark`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/students', label: 'Students' },
    { to: '/add-student', label: 'Add Student' },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-edge dark:border-edge-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <GraduationCapIcon />
          <span className="text-xl font-bold text-content dark:text-content-dark">EduManage</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-edge dark:border-edge-dark bg-white dark:bg-bg-dark animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
