import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUsers } from './userSlice'

export const UsersList = () => {
  const users = useSelector(selectUsers, shallowEqual)

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
