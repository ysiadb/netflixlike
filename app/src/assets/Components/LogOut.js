import React from 'react'

const LogOut = () => (
    localStorage.removeItem('token'),
    localStorage.removeItem('id_user'),
    window.location.href = "/"
)

export default LogOut;