import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectUsers } from '../users/userSlice'
import { selectAllNotifications } from './notificationSlice'
import {
  markRead,
  syncLatestNotificationStatus,
} from '../notifications/notificationSlice'
import classnames from 'classnames'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectUsers)

  React.useEffect(() => {
    dispatch(markRead())

    return () => {
      // sync latest notification status so that the new ones are read next time
      // the user visits the notification page
      dispatch(syncLatestNotificationStatus())
    }
  }, [dispatch, notifications.length])

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
