import { Argv } from 'yargs'
import { logging } from '@graphprotocol/common-ts'

import { Agent } from '../agent'
import { AgentConfig } from '../types'

export default {
  command: 'start',
  describe: 'Start the agent',
  builder: (yargs: Argv) => {
    return yargs
      .option('query-node', {
        description: 'Graph Node to query for indexing subgraphs',
        type: 'string'
      })
      .demandOption(['query-node'])
  },
  handler: async (argv: { [key: string]: any } & Argv['argv']) => {
    let logger = logging.createLogger({ appName: 'IndexerAgent' })

    logger.info('Starting up agent...')
    let config: AgentConfig = {
      queryNode: argv.queryNode,
      logger: logger
    }
    let agent = new Agent(config)
    await agent.start()
  },
}
