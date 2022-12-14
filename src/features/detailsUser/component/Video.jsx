import { Box, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const Video = ({ video }) => {
  const [show, setShow] = useState(false)
  const refVideo = useRef(null)
  const navigate = useNavigate()
  return (
    <Box
      // onClick={() => navigate(`video/${video.id}`)}
      onClick={() =>
        navigate({
          pathname: 'video',
          search: createSearchParams({
            q: video.id,
          }).toString(),
        })
      }
      onMouseEnter={() => {
        setShow(true)
      }}
      onMouseLeave={() => {
        setShow(false)
      }}
      sx={{ cursor: 'pointer' }}
    >
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
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt=""
              src={video?.thumb_url}
            />
            {show && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  style={{ width: '100%', objectFit: 'cover', height: '100%' }}
                  ref={refVideo}
                  src={video?.file_url}
                ></video>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            paddingLeft: '5px',
            fontSize: '16px',
            marginTop: '5px',
          }}
        >
          {video?.description.length <= 20
            ? video?.description
            : video?.description.slice(0, 20) + '...'}
        </Typography>
      </Box>
    </Box>
  )
}

export default Video
