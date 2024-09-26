import { ScaleMode } from './Types'
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
  // Tries left before moved to next note
  triesRemaining: number
  // Tries you get per note
  triesPerNote: number
  noteStatuses: Record<string, 'CORRECT' | 'MISSED_CORRECT'>
}
