import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
@Command({
  name: 'sample-command',
  description: 'sample-command',
})
export class SampleCommand extends CommandRunner {
  constructor(private logger: Logger) {
    super();
    this.logger = logger;
  }

  public async run(): Promise<void> {
    this.logger.debug('sample-command started');
    this.logger.debug('sample-command command ended');
  }
}
