import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseTest = () => {
  const [status, setStatus] = useState('Testing connection...')
  const [user, setUser] = useState(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('user_profiles')
        .select('count')
        .limit(1)

      if (error) {
        console.log(`Connection error: ${error.message}`)
      } else {
        console.log('✅ Supabase connection successful!')
      }
    } catch (err) {
      console.log(`❌ Connection failed: ${err.message}`)
    }
  }

  const testAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setStatus('✅ User authenticated!')
      } else {
        setStatus('No user logged in')
      }
    } catch (err) {
      setStatus(`Auth error: ${err.message}`)
    }
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Supabase Connection Test</h2>
      <p>{status}</p>
      {user && (
        <div>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={testAuth} style={{ margin: '1rem' }}>
        Test Authentication
      </button>
    </div>
  )
}

export default SupabaseTest 