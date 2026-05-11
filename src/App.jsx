import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { StudentProvider } from './context/StudentContext'
import { ThemeProvider } from './context/ThemeContext'
import AddStudent from './pages/AddStudent'
import Dashboard from './pages/Dashboard'
import EditStudent from './pages/EditStudent'
import NotFound from './pages/NotFound'
import StudentDetails from './pages/StudentDetails'
import Students from './pages/Students'

export default function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/student/:id" element={<StudentDetails />} />
                <Route path="/edit-student/:id" element={<EditStudent />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </StudentProvider>
    </ThemeProvider>
  )
}
