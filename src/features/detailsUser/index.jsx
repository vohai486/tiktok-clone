import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailsUser from './pages/DetailsUser'
import DetailVideo from './pages/DetailVideo'

const DetailsFeature = () => {
  return (
    <>
      <Routes>
        <Route index element={<DetailsUser />}></Route>
        <Route path="/video" element={<DetailVideo />}></Route>
      </Routes>
    </>
  )
}

export default DetailsFeature
