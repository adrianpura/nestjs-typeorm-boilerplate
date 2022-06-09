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
import { SaveSubscriberAddressDto } from './dto/save-subscriber-address.dto';
import { SubscribersAddressesService } from './subscribers-addresses.service';

@Controller('subscribers-addresses')
export class SubscribersAddressesController {
  constructor(
    private subscribersAddressesService: SubscribersAddressesService, //   private configService: ConfigService,
  ) {}
  @Post()
  @UsePipes(ValidationPipe)
  saveSubscriberAddress(
    @Body() saveSubscriberAddressDto: SaveSubscriberAddressDto,
  ): Promise<any> {
    return this.subscribersAddressesService.saveSubscriberAddress(
      saveSubscriberAddressDto,
    );
  }
  //   @Patch()
  //   @UsePipes(ValidationPipe)
  //   updateBag(@Body() updateBagDto: UpdateBagDto): Promise<any> {
  //     return this.bagsService.updateBag(updateBagDto);
  //   }
  //   @Get('/:id')
  //   getBagById(@Param('id', ParseIntPipe) id: number): Promise<Bag> {
  //     return this.bagsService.getBagById(id);
  //   }
  //   @Get('/get-by-subscriber-id/:subscriber_id')
  //   getBagBySubscriberId(
  //     @Query(ValidationPipe) filterDto: GetBagsFilterDto,
  //     @Param('subscriber_id') subscriber_id: number,
  //     @Query('page') page = 1,
  //     @Query('limit') limit = 10,
  //   ): Promise<Pagination<Bag>> {
  //     const baseUrl = this.configService.get('BASE_URL');
  //     limit = limit > 100 ? 100 : limit;
  //     const params = filterDto;
  //     delete params['page'];
  //     delete params['limit'];
  //     const queryString = Object.keys(params)
  //       .map((key) => key + '=' + filterDto[key])
  //       .join('&');
  //     return this.bagsService.getBagBySubscriberId(subscriber_id, filterDto, {
  //       page,
  //       limit,
  //       route: baseUrl + '/bags?' + queryString,
  //     });
  //   }
}
