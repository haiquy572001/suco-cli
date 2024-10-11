#!/usr/bin/env node
import importLocal from 'import-local'

if (importLocal(import.meta.url)) {
  ;(await import('@haiquy572001/suco-cli-log')).info('@haiquy572001/suco-cli using local version...')
} else {
  ;(await import('../dist/index.js')).main()
}
