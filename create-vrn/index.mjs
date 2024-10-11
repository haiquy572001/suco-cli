#!/usr/bin/env node

/*
 * @Author: Cphayim
 * this package is a wrapper for @haiquy572001/suco-cli
 * support `npm init vrn` or `npx create-vrn`
 * used quick call to `vrn create` interactive `package` mode
 */
import { main } from '@haiquy572001/suco-cli'

// -> vrn create
// without arguments and options
process.argv = [...process.argv.slice(0, 2), 'create']

main()
