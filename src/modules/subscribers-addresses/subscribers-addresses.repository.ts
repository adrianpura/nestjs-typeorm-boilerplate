import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Subscriber } from 'rxjs';
import { SubscribersAddresses } from 'src/entities/subscriber-address.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SaveSubscriberAddressDto } from './dto/save-subscriber-address.dto';

@EntityRepository(SubscribersAddresses)
export class SubscribersAddressesRepository extends Repository<SubscribersAddresses> {
  async saveSubscriberAddress(
    saveSubscriberAddressDto: SaveSubscriberAddressDto,
  ): Promise<SubscribersAddresses> {
    const { subscriber_id, full_address, lon, lat } = saveSubscriberAddressDto;
    const subAddress = new SubscribersAddresses();
    subAddress.subscriber_id = subscriber_id;
    subAddress.full_address = full_address;
    subAddress.lon = lon;
    subAddress.lat = lat;
    subAddress.is_selected = 1;
    try {
      await subAddress.save();
    } catch (e) {
      if (e.code === '23505' || e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('subscriber address already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return subAddress;
  }

  async updateSubscriberSelectedAddress(subscriber_id: number): Promise<any> {
    const query = await this.createQueryBuilder('subscribers_addresses')
      .update(SubscribersAddresses)
      .set({ is_selected: 0 })
      .where('subscriber_id = :id', { id: subscriber_id })
      .execute();
    return query.affected;
  }
}
