export const START_OCTAVE = 4
export const END_OCTAVE = 5

export const STARTING_NOTE = `C${START_OCTAVE}`
export const ENDING_NOTE = `B${END_OCTAVE}`
export const NUM_OF_KEYS = 12 * (END_OCTAVE - START_OCTAVE + 1)

export const WHITE_KEY_COLOR = 'WHITE'
export const BLACK_KEY_COLOR = 'BLACK'

const WHITE_KEY_WIDTH = 30
const WHITE_KEY_HEIGHT = 95

export const PIANO_SVG_CONSTANTS = {
  WHITE_KEY_WIDTH,
  WHITE_KEY_HEIGHT,
  WHITE_KEY_TEXT_CLASS: 'white-key-text',
  WHITE_KEY_FONT_SIZE: '1rem',
  WHITE_KEY_TEXT_OFFSET: 0.5,
  BLACK_KEY_TEXT_OFFSET: 1,
  BLACK_KEY_WIDTH: WHITE_KEY_WIDTH * 0.7,
  BLACK_KEY_HEIGHT: WHITE_KEY_HEIGHT * 0.65,
  BLACK_KEY_TEXT_CLASS: 'black-key-text',
  BLACK_KEY_FONT_SIZE: '0.75rem',
  PANEL_HEIGHT: 12,
  PANEL_SHADOW_HEIGHT: 4,
  KEY_BORDER_RADIUS: 4,
  KEY_PADDING: 1.5,
  BASE_Y_COORD: 0,
  BASE_Y_OFFSET: 10,
  TEXT_ANCHOR: 'middle',
  DOMINANT_BASELINE: 'middle'
}
