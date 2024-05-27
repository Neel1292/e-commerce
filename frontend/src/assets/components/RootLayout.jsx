import MainNavigation from './MainNavigation'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
