import { createClient } from '~/utils/supabase/server'
import AccountForm from './account-form'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
  <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className='w-full'>
      <AccountForm user={user} />
    </div>
  </div>
  )
}