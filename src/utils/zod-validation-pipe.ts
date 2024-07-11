import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodArray, ZodObject } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any> | ZodArray<any> | any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        this.schema.parse(value);

        if (value.skip && value.take) {
          const skip = (value.skip - 1) * value.take;
          value.skip = skip;
        }
      }
    } catch (error) {
      const validationError = fromZodError(error);
      throw new BadRequestException(
        'Validation failed',
        validationError.toString(),
      );
    }
    return value;
  }
}
