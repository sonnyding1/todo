import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      Landing page
      <Link href="/sign-in">
        <Button>
          Sign in
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button>
          Sign up
        </Button>
      </Link>
    </div>
  )
}
