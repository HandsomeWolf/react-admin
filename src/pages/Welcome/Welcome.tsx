import { useEffect } from 'react'
import { getPosts } from '@/api/test.ts'

export const Welcome = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts()
      console.log(response)
    }

    // Immediately invoke the async function
    fetchPosts()
  }, [])

  return <div></div>
}
