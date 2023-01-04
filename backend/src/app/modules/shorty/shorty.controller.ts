import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, Res, UploadedFile, Req, BadRequestException, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ShortyService } from './shorty.service';
import { CreateShortyDto } from './dto/create-shorty.dto';
import { UpdateShortyDto } from './dto/update-shorty.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShortyBusiness } from './shorty.business';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';


@ApiTags('shorty')
@Controller('shorty')
export class ShortyController {
  constructor(
    private readonly shortyService: ShortyService,
    private readonly shortyBusiness: ShortyBusiness,
  ) { }

  @Post('create')
  async create(@Body() createShortyDto: CreateShortyDto) {
    const shorty = this.shortyBusiness.create(createShortyDto);
    return shorty
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/upload',
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split(".");
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${Date.now()}.${fileExt}`)
        }
      }),
      fileFilter(req, file, callback) {
        const allowed = process.env.MULTER_TYPES;
        if (allowed.includes(file.mimetype)) {
          return callback(null, true)
        } else {
          req.fileValidationError = `Apenas os arquivos ${process.env.MULTER_TYPES} são aceitos`
          return callback(null, false)
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'binary',
        },
        name: {
          type: 'string',

        },
        description: {
          type: 'string',

        },
        sms: {
          type: 'string',

        },
        shorty: {
          type: 'string',

        },
        link_destino: {
          type: 'string',

        },
        start_date: {
          type: 'string',

        },
        finish_date: {
          type: 'string',

        },
        status: {
          type: 'string',

        },
        origem: {
          type: 'string',

        },
      },
    },

  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: any, @Req() req: any, @Body() input: any): Promise<any> {
    if (!file && req.fileValidationError) {
      throw new BadRequestException(`Arquivo é invalido, arquivos permitidos são ${process.env.MULTER_TYPES}`)
    }
    let { name, description, sms, shorty, link_destino, start_date, finish_date, status, origem } = input
    if (sms === "false")
      sms = false;
    else {
      sms = true
    }

    const createShortyDto: CreateShortyDto = {
      name,
      description,
      sms,
      shorty,
      link_destino,
      start_date,
      finish_date,
      status: Number(status),
      origem
    }


    const linkShorty = await this.shortyBusiness.create(createShortyDto, file.filename);
    res.status(201).send({ linkShorty });

  }
  @Get('all/:page')
  async findAll(@Param('page') page: string) {

    return await this.shortyService.findAll(+page);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shorty = await this.shortyService.findOne(id);
    if (!shorty) {
      throw new HttpException(`Shortcut ${id}  não encontrado`, HttpStatus.NOT_FOUND)
    }
    return shorty
  }
  @Post('search/:page')
  async findOneByName(@Body() body: { search: string }, @Param('page') page: any) {
    const shorty = await this.shortyService.findOneByName(body.search, page);
    if (!shorty) {
      throw new HttpException(`Nenhum shortcut foi encontrado`, HttpStatus.NOT_FOUND)
    }
    return shorty

  }
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateShortyDto: UpdateShortyDto) {
    const shortyFromDB = await this.shortyService.findOne(id);
    if (!shortyFromDB) {
      throw new HttpException(`Shortcut ${id}  não encontrado`, HttpStatus.NOT_FOUND)
    }
    const updateShorty = this.shortyBusiness.update(id, updateShortyDto);

    return updateShorty;

  }


}
