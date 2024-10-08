'use client'
import { type User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { createClient } from '~/utils/supabase/client'
import ReadOnlyAccountCard from './card/read-only-account-card'
import EditAccountForm from './forms/edit-account-form'

// ...

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false);


  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
      }
    } catch (error) {
      alert('Error loading user data!' + JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    fullname,
    username,
    website,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
      return false
    } catch (error) {
      alert('Error updating the data!')
      return true
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isEdit ? (
          <Button onClick={() => setIsEdit(false)} size="sm" variant="outline">Cancel</Button>
          ) : (
          <Button onClick={() => setIsEdit(true)} size="sm" variant="outline">Edit</Button>
          )
    }
    <Card className='w-fit'>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit profile"  : "Your profile"}</CardTitle>
        <CardDescription>
          {isEdit ? "Enter changes to profile details" : null }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {isEdit ? (
            <EditAccountForm 
              initialFullName={fullname}
              initialUsername={username}
              initialWebsite={website}
              handleUpdate={updateProfile}
            />
          ) : (
            <ReadOnlyAccountCard email={user?.email} full_name={fullname} username={username} website={website}/>
          )
        }
      </CardContent>
    </Card>
    <form action="/auth/signout" method="post">
      <Button type="submit">
        Sign out
      </Button>
    </form>
    </>
  )
}

