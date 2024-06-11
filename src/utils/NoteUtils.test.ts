import {
  createNoteFromTonal,
  deriveColorFromNote,
  getAlternateName,
  isEqualFrequency,
  stripOctave
} from '@/utils/NoteUtils'
import { BLACK_KEY_COLOR, WHITE_KEY_COLOR } from '@/utils/GameConstants'
import { Note } from '@/types/Note'

describe('NoteUtils', () => {
  describe('createNoteFromTonal', () => {
    it('should create a Note object from a Tonal note string', () => {
      const noteName = 'C4'
      const expectedNote: Note = {
        fullName: 'C4',
        nameNoOctave: 'C',
        letter: 'C',
        octave: 4,
        accidental: '',
        height: 60
      }
      const createdNote = createNoteFromTonal(noteName)
      expect(createdNote).toEqual(expectedNote)
    })
  })

  describe('stripOctave', () => {
    it('should strip the octave from a note name', () => {
      const noteName = 'D#3'
      const expectedStrippedName = 'D#'
      const strippedName = stripOctave(noteName)
      expect(strippedName).toBe(expectedStrippedName)
    })
  })

  describe('deriveColorFromNote', () => {
    it('should derive the color from a note', () => {
      const whiteNote: Note = {
        fullName: 'C4',
        nameNoOctave: 'C',
        letter: 'C',
        octave: 4,
        accidental: '',
        height: 0
      }
      const blackNote: Note = {
        fullName: 'D#3',
        nameNoOctave: 'D#',
        letter: 'D',
        octave: 3,
        accidental: '#',
        height: 3
      }
      const whiteNoteColor = deriveColorFromNote(whiteNote)
      const blackNoteColor = deriveColorFromNote(blackNote)
      expect(whiteNoteColor).toBe(WHITE_KEY_COLOR)
      expect(blackNoteColor).toBe(BLACK_KEY_COLOR)
    })
  })

  describe('getAlternateName', () => {
    it('should return the alternate name (eharmonic) of a note', () => {
      const note: Note = {
        fullName: 'Db4',
        nameNoOctave: 'Db',
        letter: 'D',
        octave: 4,
        accidental: 'b',
        height: 60
      }
      const alternateName = getAlternateName(note)
      expect(alternateName).toBe('C#4')
    })
  })

  describe('areNotesEharmonic', () => {
    it('should check if two notes are eharmonic', () => {
      const noteA: Note = {
        fullName: 'C#4',
        nameNoOctave: 'C',
        letter: 'C',
        octave: 4,
        accidental: '',
        height: 60
      }
      const noteB: Note = {
        fullName: 'Db4',
        nameNoOctave: 'Db',
        letter: 'D',
        octave: 4,
        accidental: 'b',
        height: 60
      }
      const areEharmonic = isEqualFrequency(noteA, noteB)
      expect(areEharmonic).toBe(true)
    })
  })
})
