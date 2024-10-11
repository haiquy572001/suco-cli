import { Command } from '@haiquy572001/suco-cli-command'
import { isArray } from '@haiquy572001/suco-cli-shared'
import { describe, expect, it } from 'vitest'

import commands from '../commands.js'

describe('@haiquy572001/suco-cli -> commands.ts', () => {
  it('Correct exported commands', () => {
    expect(isArray(commands)).toBeTruthy()
    expect(() => commands.every((command) => command instanceof Command)).toBeTruthy()
  })
})
