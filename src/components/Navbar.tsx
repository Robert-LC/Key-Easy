'use client'
import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { signIn } from 'next-auth/react'

const Navbar = () => {
  const isUserLoggedIn: boolean = true

  // const [providers, setProviders] = useState(null)

  // useEffect(() => {
  //   const setProviders = async () => {
  //     const response = await getProviders()

  //     setProviders(response)
  //   }

  //   setProviders()
  // }, [])

  return (
    <nav className='flex-between w-full shadow-xl h-16 p-6 bg-menu-blue'>
      {isUserLoggedIn ? (
        <>
          <div className='flex gap-3'>
            <Link href='/profile' className='white_btn'>
              Profile
            </Link>
            <Link href='/settings' className='white_btn'>
              Settings
            </Link>
          </div>
          <button type='button' className='white_btn'>
            Sign Out
          </button>
        </>
      ) : (
        <>
          {/* {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                className='black_btn'
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            ))} */}
        </>
      )}
    </nav>
  )
}

export default Navbar
