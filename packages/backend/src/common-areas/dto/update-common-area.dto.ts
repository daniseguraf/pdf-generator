import { PartialType } from '@nestjs/swagger';
import { CreateCommonAreaDto } from './create-common-area.dto';

export class UpdateCommonAreaDto extends PartialType(CreateCommonAreaDto) {}
