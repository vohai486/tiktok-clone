import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import userApi from '../../../api/userApi'
import LoadingTiktok from '../../../components/loading/LoadingTiktok'
import VideoCard from '../components/VideoCard'

const FollowingPage = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [loadingFirst, setLoadingFirst] = useState(true)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await userApi.getSuggestedUser({ page: page, per_page: 15 })
      setUsers((users) => [...users, ...res.data])
      setLoadingFirst(false)
      setLoading(false)
    })()
  }, [page])
  useEffect(() => {
    const handleScroll = () => {
      if (page >= 2) return
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage(page + 1)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [page])
  return (
    <Box
      sx={{
        marginRight: '24px',
        width: '720px',
        maxWidth: '720px',
        padding: '24px 0',
        position: 'relative',
      }}
    >
      <Box
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px', color: '#fff' }}
      >
        {loadingFirst
          ? Array.from(new Array(10)).map((item, index) => (
              <Skeleton
                sx={{
                  transform: 'unset',
                  width: '226px',
                  height: '302px',
                  borderRadius: '8px',
                }}
                key={index}
              ></Skeleton>
            ))
          : users.length > 0 &&
            users.map((item) => (
              <VideoCard key={`${item.id}${item.nickname}`} user={item}></VideoCard>
            ))}
      </Box>
      {loading && (
        <Box
          sx={{
            margin: '50px 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LoadingTiktok />
        </Box>
      )}
    </Box>
  )
}

export default FollowingPage
