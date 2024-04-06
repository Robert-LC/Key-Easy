import { Note } from './Note'

export type Scale = {
  name: string
  notes: Note[]
  tonic: string | null
  type: string
}
