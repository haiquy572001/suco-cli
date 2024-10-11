import { Command } from '@haiquy572001/suco-cli-command'
import { describe, expect, it } from 'vitest'

import listCommand from '../../list/list.command.js'

describe('@haiquy572001/suco-cli-command-boilerplate -> list -> list.command.ts', () => {
  it('Correct exported', () => {
    expect(listCommand).toBeInstanceOf(Command)
  })
})
