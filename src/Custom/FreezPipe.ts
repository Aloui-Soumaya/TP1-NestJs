import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezPipe implements PipeTransform {
    transform(value: { any }, metadata: ArgumentMetadata) {
        if (!value) throw new BadRequestException();
        if (metadata.type === 'body') {
            console.log("L'objet est devenu non modifiable");
            return Object.freeze(value)
        }
    }
}