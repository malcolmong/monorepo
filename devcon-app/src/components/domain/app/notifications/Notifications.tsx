import React from 'react'
import { PushNotification } from 'types/PushNotification'
import { ThumbnailBlock } from 'components/common/thumbnail-block'
import IconCheck from 'assets/icons/check_circle.svg'
import css from './notifications.module.scss'
// import { useFilter, Filter } from 'components/common/filter'
import { usePageContext } from 'context/page-context'
// import { Search, Tags, Basic, FilterFoldout } from 'components/common/filter/Filter'
import moment from 'moment'
import { Button } from 'components/common/button'
import { useAppContext } from 'context/app-context'
import Image from 'next/image'
// import EthBackground from 'assets/images/eth-diamond-rainbow.png'
// import AppLogoColor from 'assets/images/app-logo-color.png'
import AppLogo from 'assets/images/app-logo.svg'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { Link } from 'components/common/link'
import App from 'next/app'

const filters = [
  {
    value: 'inbox',
    text: 'Inbox',
  },
  {
    value: 'health-safety',
    text: 'Health & Safety',
  },
  {
    value: 'all',
    text: 'All',
  },
  {
    value: 'archived',
    text: 'Archived',
  },
]

export const NotificationCard = React.forwardRef((props: any, ref: any) => {
  const { seenNotifications, setSeenNotifications } = useAppContext()
  const [notificationSeen, setNotificationSeen] = useLocalStorage(
    `notification-seen-${props.notification.id}`,
    seenNotifications?.[props.notification.id]
  )

  const markAsSeen = () => {
    setSeenNotifications((seenNotifications: any) => {
      return {
        ...seenNotifications,
        [props.notification.id]: true,
      }
    })

    setNotificationSeen('yes')
  }

  React.useImperativeHandle(ref, () => ({
    notificationSeen,
    markAsSeen,
  }))

  let className = css['notification-block']

  if (!notificationSeen) className += ` ${css['highlight']}`

  const notification = props.notification
  const dateAsMoment = moment.utc(notification.date)

  return (
    <ThumbnailBlock key={notification.id} className={className}>
      <div className={css['top']}>
        <div className={css['time']}>
          <p>{dateAsMoment.format('MM/DD/YY')}</p>
          <p>{dateAsMoment.format('HH:mm A')}</p>
          {/* TODO: Why the fook doesn't this work? */}
          {/* <p>{dateAsMoment.from(moment.utc())}</p> */}
        </div>

        {notificationSeen ? <IconCheck /> : <div className="label sm error bold">New</div>}
      </div>
      <div className={css['details']}>
        {notification.label === 'Twitter' && (
          <p className={`bold hover-underline ${css['title']}`}>
            <Link to={notification.url}>{notification.title}</Link>
          </p>
        )}
        {notification.label !== 'Twitter' && <p className={`bold ${css['title']}`}>{notification.title}</p>}
        <p>{notification.body}</p>
      </div>
      {notification.label && (
        <div className={css['labels']}>
          <div className={`label sm bold ${notification.labelType}`}>{notification.label}</div>
        </div>
      )}
    </ThumbnailBlock>
  )
})

export const Notifications = (props: any) => {
  const pageContext = usePageContext()
  const notificationRefs = React.useRef<any>({})
  const { seenNotifications, setSeenNotifications } = useAppContext()
  // const [basicFilter, setBasicFilter] = React.useState('all')

  const unseenNotifications =
    pageContext && Object.values(seenNotifications).length < pageContext.appNotifications?.length

  return (
    <div className={css['container']}>
      <div className={css['header']}>
        <h2 className="font-lg-fixed">Notifications</h2>
        {unseenNotifications && (
          <Button
            className="red sm"
            onClick={() => {
              Object.values(notificationRefs.current).forEach((notification: any) => notification.markAsSeen())
            }}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* <Basic
        className={css['filter']}
        value={basicFilter}
        onChange={setBasicFilter}
        options={[
          {
            text: 'All',
            value: 'all',
          },
          {
            text: 'New',
            value: 'new',
          },
        ]}
      /> */}

      {pageContext?.appNotifications.map(notification => {
        return (
          <NotificationCard
            key={notification.id}
            notification={notification}
            ref={(ref: any) => (notificationRefs.current[notification.id] = ref)}
          />
        )
      })}

      <div className={css['background']}>
        <AppLogo />
        {/* <Image src={AppLogoColor} layout="fill" objectFit="contain" objectPosition="right" alt="Ether" /> */}
      </div>
    </div>
  )
}
