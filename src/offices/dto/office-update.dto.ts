import { PartialType } from "@nestjs/mapped-types";
import { CreateOfficeDto } from "./office-create.dto";

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {}