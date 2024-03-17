import { Participant } from './Participant'

export type Holiday = {
  title: String
  description: String
  date: Date
  location: String
  participants: Participant[]
}
