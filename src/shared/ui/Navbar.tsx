import { Button } from '#/components/ui/button'
import {
  UserAvatar,
  UserButton,
  UserProfile,
} from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'

export function Navbar(props: { isAuthenticated: boolean }) {
  return (
    <nav className="h-12 w-screen outline-1">
      <div className="flex h-full flex-row items-center justify-between px-4">
        <p>Navbar</p>
        <AuthStateOnNavbar {...props} />
      </div>
    </nav>
  )
}

function AuthStateOnNavbar(props: { isAuthenticated: boolean }) {
  if (props.isAuthenticated) {
    return (
      <div>
        <UserButton />
      </div>
    )
  } else {
    return (
      <div className="mr-4 flex flex-row items-center gap-6">
        <Button variant="outline" className="hover:cursor-pointer">
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <Button variant="outline" className="hover:cursor-pointer">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </div>
    )
  }
}
