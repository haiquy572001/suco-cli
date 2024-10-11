import { describe, expect, it } from 'vitest'

import { gradient } from '../utils.js'

describe('@haiquy572001/suco-cli -> utils.ts', () => {
  it('can be return a gradient string', () => {
    expect(gradient('abcdefg')).toBeTypeOf('string')
  })
})
