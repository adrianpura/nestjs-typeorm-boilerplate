import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bag } from 'src/entities/bag.entity';
import { BagsService } from './bags.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { GetBagsFilterDto } from './dto/get-bags-filter.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Controller('bags')
export class BagsController {
  constructor(
    private bagsService: BagsService,
    private configService: ConfigService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBag(@Body() createBagDto: CreateBagDto): Promise<any> {
    return this.bagsService.createBag(createBagDto);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateBag(@Body() updateBagDto: UpdateBagDto): Promise<any> {
    return this.bagsService.updateBag(updateBagDto);
  }

  @Get('/:id')
  getBagById(@Param('id', ParseIntPipe) id: number): Promise<Bag> {
    return this.bagsService.getBagById(id);
  }

  @Get('/get-by-subscriber-id/:subscriber_id')
  getBagBySubscriberId(
    @Query(ValidationPipe) filterDto: GetBagsFilterDto,
    @Param('subscriber_id') subscriber_id: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Bag>> {
    const baseUrl = this.configService.get('BASE_URL');
    limit = limit > 100 ? 100 : limit;

    const params = filterDto;
    delete params['page'];
    delete params['limit'];

    const queryString = Object.keys(params)
      .map((key) => key + '=' + filterDto[key])
      .join('&');

    return this.bagsService.getBagBySubscriberId(subscriber_id, filterDto, {
      page,
      limit,
      route: baseUrl + '/bags?' + queryString,
    });
  }
}
