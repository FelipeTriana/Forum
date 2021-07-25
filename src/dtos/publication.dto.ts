/**
 * Instalar: npm i class-validator class-transformer @nestjs/mapped-types
 */
 
 import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
  } from 'class-validator';  //Para validar los tipos de los atributos del DTO

  import { PartialType } from '@nestjs/mapped-types';  //Nos ayuda a reutilizar codigo extendendiendo clases que ya tenemos
  
  export class CreatePublicationDto {
    @IsString()                   //Estos decoradores nos avisaran si enviamos en el body algun dato que no concuerde con el del atributo
    @IsNotEmpty()
    readonly name: string;
  
    @IsString()
    @IsNotEmpty()
    @IsPositive()
    readonly fullname: string;

    @IsString()
    readonly subject: string;

    @IsString()
    readonly description: string;
  
    @IsNumber()
    @IsPositive()
    readonly like: number;
  
    @IsNumber()
    @IsPositive()
    readonly dislike: number;

    @IsUrl()
    readonly image: string;
  }
  
  /**
   * Aqui eliminamos la informacion de la clase DTO: UpdateProductDTO.
   * En su lugar usamos PartialType que nos permite reutilizar nuestro DTO base pero pone todos los atributos como OPCIONALES
   * Esto es lo mismo que tenemos en la rama dataTransfersObject pero reutilizando el codigo del DTO CreateProductDto
   */
  export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}