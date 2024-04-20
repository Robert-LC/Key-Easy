import { ScaleMode } from './Enums'
import { Note } from './Note'
import { Scale } from './Scale'

export interface GameState {
  notes: Note[]
  scales: Scale[]
  currentNote?: Note
  currentScale?: Scale
  isGameInProgress: boolean
  mode: ScaleMode
  score: number
  showNoteNames: boolean
  triesLeft: number
  noteStatuses: Record<string, 'CORRECT' | 'MISSED_CORRECT' | 'NONE'>
}
