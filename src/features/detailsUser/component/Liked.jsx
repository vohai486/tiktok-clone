import { Box, Typography } from '@mui/material'
import React from 'react'
import { IconLock, IconLockBorder } from '../../../components/Icons'

const Liked = ({ user }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <IconLockBorder />
        <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>
          This user's liked videos are private
        </Typography>
        <Typography sx={{ color: 'rgba(22, 24, 35, 0.75)', marginTop: '8px' }}>
          Videos liked by {user?.nickname} are currently hidden
        </Typography>
      </Box>
    </Box>
  )
}

export default Liked
