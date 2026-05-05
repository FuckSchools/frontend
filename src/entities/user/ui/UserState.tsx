import { Button } from '#/components/ui/button'
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/tanstack-react-start'

export function UserState() {
  return (
    <div>
      <Show when="signed-out">
        <Button variant="outline">
          <SignInButton />
        </Button>
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <Button variant="outline">
          <UserButton />
        </Button>
      </Show>
    </div>
  )
}
