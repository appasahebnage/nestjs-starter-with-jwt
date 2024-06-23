#!/usr/bin/env node
'use strict';

import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // To disable to Nest logger color, uncomment the following line
  // process.env.NO_COLOR = 'true'; // Not Required but Recommended

  CommandFactory.run(CliModule, {
    logger: new Logger(),
    errorHandler: (err) => {
      console.error(err);
      process.exit(1); // this could also be a 0 depending on how you want to handle the exit code
    },
  });
}

bootstrap();
