import { IsBoolean, IsDate, IsNotEmpty, isNumber, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    capacity: number;

    @IsNotEmpty()
    price_per_night: number;

    @IsString()
    @IsOptional()
    image_url?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsDate()
    @IsOptional()
    created_at?: Date;

    @IsDate()
    @IsOptional()
    updated_at?: Date;
}
