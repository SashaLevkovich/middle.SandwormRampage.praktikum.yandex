import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface ITopic {
  title: string
  content: string
  userId: number
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
