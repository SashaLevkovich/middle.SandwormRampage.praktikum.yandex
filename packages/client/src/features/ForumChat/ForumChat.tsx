import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { CloseOutlined, RightOutlined } from '@ant-design/icons'

import { Button, Flex, Form, Input } from 'antd'

import { Message } from 'components/Message'

import { getCurrentTime } from 'shared/helpers/formatDate'

import { CHAT_MOCK } from './chat-mock'

import classes from './ForumChat.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const ForumChat: FC<Props> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(CHAT_MOCK)
  const [message, setMessage] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => scrollToBottom(), [messages])

  const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value)

  const handleSendMessage = useCallback(() => {
    if (!message) return

    setMessages(prevState => [
      ...prevState,
      { author: 'You', message, time: getCurrentTime(), isYou: true },
    ])

    setMessage('')
  }, [message])

  if (!isOpen) return null

  return (
    <div className={classes.forumChatContainer}>
      <Flex vertical justify="space-between" className={classes.forumChatModal}>
        <CloseOutlined onClick={onClose} className={classes.closeChat} />

        <div className={classes.messagesList}>
          {messages.map(({ author, isYou, message, time }) => (
            <Message
              message={message}
              author={author}
              isYou={isYou}
              time={time}
              key={time}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={classes.forumChatPanelContainer}>
          <Form
            name="forum"
            autoComplete="off"
            className={classes.forumChatPanel}>
            <Form.Item style={{ margin: 0, width: '100%' }}>
              <Input
                className={classes.messageInput}
                size="large"
                placeholder="Text message..."
                value={message}
                onChange={event => handleMessageInput(event)}
              />
            </Form.Item>

            <Form.Item style={{ margin: 0 }}>
              <Button
                type="default"
                shape="round"
                size="large"
                htmlType="submit"
                className={classes.sendMessage}
                onClick={handleSendMessage}>
                <RightOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </div>
  )
}
