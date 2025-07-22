import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleToggle = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button onClick={handleToggle} className="theme-toggle">
      Tema {isDark ? 'Claro' : 'Oscuro'}
    </button>
  )
}

export default ThemeToggle