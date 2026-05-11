import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
      <div className="text-7xl sm:text-9xl font-bold text-primary/20 dark:text-primary-dark/20 select-none">
        404
      </div>
      <h1 className="mt-4 text-3xl font-semibold text-content dark:text-content-dark">
        Page not found
      </h1>
      <p className="mt-2 text-content-muted dark:text-content-muted-dark max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Go to Dashboard
      </Link>
    </section>
  )
}
