import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribersAddresses } from 'src/entities/subscriber-address.entity';
import { SubscribersService } from '../subscribers/subscribers.service';
import { SaveSubscriberAddressDto } from './dto/save-subscriber-address.dto';
import { SubscribersAddressesRepository } from './subscribers-addresses.repository';

@Injectable()
export class SubscribersAddressesService {
  constructor(
    @InjectRepository(SubscribersAddressesRepository)
    private subscribersAddressesRepository: SubscribersAddressesRepository,
    private subscribersService: SubscribersService,
  ) {}
  async saveSubscriberAddress(
    saveSubscriberAddressDto: SaveSubscriberAddressDto,
  ): Promise<any> {
    const { subscriber_id } = saveSubscriberAddressDto;
    const userInDb = await this.subscribersService.getSubscriberById(
      subscriber_id,
    );
    if (!userInDb) {
      throw new NotFoundException(`User with id ${subscriber_id} not found`);
    }
    const subscriberAddress = await SubscribersAddresses.count({
      subscriber_id,
    });
    if (subscriberAddress >= 10) {
      throw new ConflictException(
        `User with id ${subscriber_id} subscriber address entries exceeded`,
      );
    } else {
      if (subscriberAddress > 0) {
        const subscriberAddresses =
          await this.subscribersAddressesRepository.updateSubscriberSelectedAddress(
            subscriber_id,
          );
        if (subscriberAddresses.affected === 0) {
          throw new NotFoundException(
            `Subscriber Address with Subscriber ID ${subscriber_id} not found`,
          );
        }
      }
    }
    const data =
      await this.subscribersAddressesRepository.saveSubscriberAddress(
        saveSubscriberAddressDto,
      );

    return {
      statusCode: 201,
      message: 'subscriber address added',
      data: data,
    };
  }
}
