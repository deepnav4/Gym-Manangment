import { useState } from 'react'
import './index.css'

const API_URL = 'http://localhost:3000/api'

function App() {
  const [activeTab, setActiveTab] = useState<'member' | 'trainer'>('member')
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [token, setToken] = useState<string>('')
  const [userRole, setUserRole] = useState<'member' | 'trainer' | null>(null)
  const [response, setResponse] = useState<string>('')

  // Member Signup
  const handleMemberSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      age: parseInt((form.elements.namedItem('age') as HTMLInputElement).value),
      gender: (form.elements.namedItem('gender') as HTMLSelectElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
    }

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
      if (result.success) {
        setToken(result.data.accessToken)
        setUserRole('member')
      }
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Member Login
  const handleMemberLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
      if (result.success) {
        setToken(result.data.accessToken)
        setUserRole('member')
      }
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Trainer Login
  const handleTrainerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    }

    try {
      const res = await fetch(`${API_URL}/auth/trainer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
      if (result.success) {
        setToken(result.data.accessToken)
        setUserRole('trainer')
      }
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Get Member Profile
  const getMemberProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/member/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Get Member Workout
  const getMemberWorkout = async () => {
    try {
      const res = await fetch(`${API_URL}/member/my/workout`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Get Member Diet
  const getMemberDiet = async () => {
    try {
      const res = await fetch(`${API_URL}/member/my/diet`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Get Member Attendance
  const getMemberAttendance = async () => {
    try {
      const res = await fetch(`${API_URL}/member/my/attendance`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Get Member Progress
  const getMemberProgress = async () => {
    try {
      const res = await fetch(`${API_URL}/member/my/progress`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Get All Members (Trainer)
  const getAllMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/trainer/members`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Update Member Workout (Trainer)
  const updateMemberWorkout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const memberId = (form.elements.namedItem('memberId') as HTMLInputElement).value
    const planDetails = (form.elements.namedItem('planDetails') as HTMLTextAreaElement).value

    try {
      const res = await fetch(`${API_URL}/trainer/members/${memberId}/workout`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_details: planDetails }),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Update Member Diet (Trainer)
  const updateMemberDiet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const memberId = (form.elements.namedItem('memberId') as HTMLInputElement).value
    const dietDetails = (form.elements.namedItem('dietDetails') as HTMLTextAreaElement).value

    try {
      const res = await fetch(`${API_URL}/trainer/members/${memberId}/diet`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diet_details: dietDetails }),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Record Attendance (Trainer)
  const recordAttendance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const memberId = (form.elements.namedItem('memberId') as HTMLInputElement).value
    const status = (form.elements.namedItem('status') as HTMLSelectElement).value

    try {
      const res = await fetch(`${API_URL}/trainer/members/${memberId}/attendance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  // Update Progress (Trainer)
  const updateProgress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const memberId = (form.elements.namedItem('memberId') as HTMLInputElement).value
    const data = {
      weight: parseFloat((form.elements.namedItem('weight') as HTMLInputElement).value),
      body_fat: parseFloat((form.elements.namedItem('bodyFat') as HTMLInputElement).value),
      muscle_mass: parseFloat((form.elements.namedItem('muscleMass') as HTMLInputElement).value),
      notes: (form.elements.namedItem('notes') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch(`${API_URL}/trainer/members/${memberId}/progress`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      setResponse('Error: ' + error)
    }
  }

  const logout = () => {
    setToken('')
    setUserRole(null)
    setResponse('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🏋️ Gym Management System</h1>

        {/* Not Logged In */}
        {!token && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('member')}
                className={`px-4 py-2 rounded ${activeTab === 'member' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Member
              </button>
              <button
                onClick={() => setActiveTab('trainer')}
                className={`px-4 py-2 rounded ${activeTab === 'trainer' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Trainer
              </button>
            </div>

            {/* Member Auth */}
            {activeTab === 'member' && (
              <div>
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-4 py-2 rounded ${authMode === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setAuthMode('signup')}
                    className={`px-4 py-2 rounded ${authMode === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    Signup
                  </button>
                </div>

                {authMode === 'login' ? (
                  <form onSubmit={handleMemberLogin} className="space-y-3">
                    <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
                    <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                  </form>
                ) : (
                  <form onSubmit={handleMemberSignup} className="space-y-3">
                    <input name="name" placeholder="Name" className="w-full p-2 border rounded" required />
                    <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
                    <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" required />
                    <input name="age" type="number" placeholder="Age" className="w-full p-2 border rounded" required />
                    <select name="gender" className="w-full p-2 border rounded" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <input name="phone" placeholder="Phone" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
                  </form>
                )}
              </div>
            )}

            {/* Trainer Auth */}
            {activeTab === 'trainer' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Test Credentials: john.trainer@gym.com / trainer123
                </p>
                <form onSubmit={handleTrainerLogin} className="space-y-3">
                  <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
                  <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" required />
                  <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Login</button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Logged In - Member Dashboard */}
        {token && userRole === 'member' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Member Dashboard</h2>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
              </div>
              
              <div className="space-y-2">
                <button onClick={getMemberProfile} className="w-full bg-blue-500 text-white p-2 rounded">Get Profile</button>
                <button onClick={getMemberWorkout} className="w-full bg-blue-500 text-white p-2 rounded">Get Workout Plans</button>
                <button onClick={getMemberDiet} className="w-full bg-blue-500 text-white p-2 rounded">Get Diet Plans</button>
                <button onClick={getMemberAttendance} className="w-full bg-blue-500 text-white p-2 rounded">Get Attendance</button>
                <button onClick={getMemberProgress} className="w-full bg-blue-500 text-white p-2 rounded">Get Progress</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Response:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">{response || 'No response yet'}</pre>
            </div>
          </div>
        )}

        {/* Logged In - Trainer Dashboard */}
        {token && userRole === 'trainer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trainer Dashboard</h2>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
              </div>
              
              <button onClick={getAllMembers} className="w-full bg-green-500 text-white p-2 rounded mb-4">Get All Members</button>

              {/* Update Workout */}
              <details className="mb-4">
                <summary className="cursor-pointer font-bold mb-2">Update Member Workout</summary>
                <form onSubmit={updateMemberWorkout} className="space-y-2">
                  <input name="memberId" placeholder="Member ID" className="w-full p-2 border rounded" required />
                  <textarea name="planDetails" placeholder="Workout Plan Details" className="w-full p-2 border rounded h-24" required />
                  <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Update Workout</button>
                </form>
              </details>

              {/* Update Diet */}
              <details className="mb-4">
                <summary className="cursor-pointer font-bold mb-2">Update Member Diet</summary>
                <form onSubmit={updateMemberDiet} className="space-y-2">
                  <input name="memberId" placeholder="Member ID" className="w-full p-2 border rounded" required />
                  <textarea name="dietDetails" placeholder="Diet Plan Details" className="w-full p-2 border rounded h-24" required />
                  <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Update Diet</button>
                </form>
              </details>

              {/* Record Attendance */}
              <details className="mb-4">
                <summary className="cursor-pointer font-bold mb-2">Record Attendance</summary>
                <form onSubmit={recordAttendance} className="space-y-2">
                  <input name="memberId" placeholder="Member ID" className="w-full p-2 border rounded" required />
                  <select name="status" className="w-full p-2 border rounded" required>
                    <option value="">Select Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">Leave</option>
                  </select>
                  <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Record Attendance</button>
                </form>
              </details>

              {/* Update Progress */}
              <details className="mb-4">
                <summary className="cursor-pointer font-bold mb-2">Update Member Progress</summary>
                <form onSubmit={updateProgress} className="space-y-2">
                  <input name="memberId" placeholder="Member ID" className="w-full p-2 border rounded" required />
                  <input name="weight" type="number" step="0.1" placeholder="Weight (kg)" className="w-full p-2 border rounded" required />
                  <input name="bodyFat" type="number" step="0.1" placeholder="Body Fat (%)" className="w-full p-2 border rounded" required />
                  <input name="muscleMass" type="number" step="0.1" placeholder="Muscle Mass (kg)" className="w-full p-2 border rounded" required />
                  <textarea name="notes" placeholder="Notes" className="w-full p-2 border rounded h-24" />
                  <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Update Progress</button>
                </form>
              </details>
            </div>

            {/* Response Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Response:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">{response || 'No response yet'}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
