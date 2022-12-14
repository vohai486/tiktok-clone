import { Box, Skeleton } from '@mui/material'
import React from 'react'

const VideoSekeleton = () => {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box sx={{ paddingTop: '132.653%' }}>
          <Box sx={{ position: 'absolute', inset: 0 }}>
            <Skeleton
              animation="wave"
              sx={{
                width: '100%',
                height: '100%',
                transform: 'scale(1)',
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default VideoSekeleton
