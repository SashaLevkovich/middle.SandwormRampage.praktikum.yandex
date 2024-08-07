import { FC, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button, Flex, Typography } from 'antd'

import { ForumChat } from 'features/ForumChat'

import { ForumButton } from 'components/ForumButton'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { topicsRequests } from 'app/api'
import { ITopic } from 'app/api/requests/topics'
import { ForumCreateChat } from 'features/ForumCreateChat'
import { FORUM_CREATE_CHAT_ID, MODAL_CONTAINER_ID } from './constants'
import classes from './Forum.module.scss'

export const Forum: FC = () => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [activeTopic, setActiveTopic] = useState<ITopic>({
    content: '',
    id: 0,
    title: '',
  })
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatOpenNew, setIsChatOpenNew] = useState(false)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  )
  const [portalContainerNew, setPortalContainerNew] =
    useState<HTMLElement | null>(null)

  useEffect(() => {
    const container = document.getElementById(MODAL_CONTAINER_ID)

    if (!container) {
      console.error(`Container ${MODAL_CONTAINER_ID} not found!`)
      return
    }

    setPortalContainer(container)

    return () => {
      setPortalContainer(null)
    }
  }, [])

  useEffect(() => {
    const container = document.getElementById(FORUM_CREATE_CHAT_ID)

    if (!container) {
      console.error(`Container ${FORUM_CREATE_CHAT_ID} not found!`)
      return
    }

    setPortalContainerNew(container)

    return () => {
      setPortalContainerNew(null)
    }
  }, [])

  useEffect(() => {
    getTopics()
  }, [])

  const handleButtonClick = useCallback(async (topic: ITopic) => {
    setActiveTopic(topic)
    setIsChatOpen(true)
  }, [])

  const closeChat = () => {
    setActiveTopic({ content: '', id: 0, title: '' })
    setIsChatOpen(false)
  }

  const closeChatNew = () => {
    setIsChatOpenNew(false)
    setActiveTopic({ content: '', id: 0, title: '' })
    getTopics()
  }

  const createTopic = () => {
    setIsChatOpenNew(true)
  }

  const removeTopic = async (id: number) => {
    try {
      await topicsRequests.deleteTopic(id)
      getTopics()
    } catch (e) {
      console.log(e)
    }
  }

  const editTopic = (topic: ITopic) => {
    setIsChatOpenNew(true)
    setActiveTopic(topic)
  }

  const getTopics = async () => {
    try {
      const { data } = await topicsRequests.getTopics()
      setTopics(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Flex className={classes.wrapper}>
        <Flex justify="space-between" className={classes.container}>
          <Button
            type="default"
            shape="round"
            size="large"
            className={classes.addButton}
            onClick={createTopic}>
            <PlusOutlined />
          </Button>
          <Flex vertical gap={30} className={classes.buttonBlock}>
            {topics &&
              topics.map(topic => (
                <div className={classes.topicRow} key={topic.id}>
                  <ForumButton
                    type="default"
                    onClick={() => handleButtonClick(topic)}
                    key={topic.id}>
                    {topic.title}
                  </ForumButton>
                  <Button
                    type="default"
                    shape="round"
                    size="small"
                    className={classes.removeButton}
                    onClick={() => editTopic(topic)}>
                    <EditOutlined />
                  </Button>
                  <Button
                    type="default"
                    shape="round"
                    size="small"
                    className={classes.removeButton}
                    onClick={() => removeTopic(topic.id)}>
                    <DeleteOutlined />
                  </Button>
                </div>
              ))}
          </Flex>

          <Typography>
            <Typography.Title level={2} className={classes.title}>
              FORUM
            </Typography.Title>
          </Typography>
        </Flex>
      </Flex>

      <div id={MODAL_CONTAINER_ID}>
        {portalContainer &&
          createPortal(
            <ForumChat
              isOpen={isChatOpen}
              onClose={closeChat}
              topic={activeTopic}
            />,
            portalContainer
          )}
      </div>

      <div id={FORUM_CREATE_CHAT_ID}>
        {portalContainerNew &&
          createPortal(
            <ForumCreateChat
              isOpen={isChatOpenNew}
              onClose={closeChatNew}
              editingTopic={activeTopic}
            />,
            portalContainerNew
          )}
      </div>
    </>
  )
}
