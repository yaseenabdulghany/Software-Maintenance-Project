export default function DashboardCard({ title, value, icon }) {
  return (
    <article className="card hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-2xl">
      <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-dark flex items-center justify-center">
        {icon}
      </div>
      <div className="text-3xl font-semibold mt-3 text-content dark:text-content-dark">{value}</div>
      <div className="text-sm text-content-muted dark:text-content-muted-dark mt-1">{title}</div>
    </article>
  )
}
