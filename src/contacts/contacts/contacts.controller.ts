import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { Contact } from '../contact.entity';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  index(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Post('create')
  async create(@Body() contactData: Contact): Promise<any> {
    return this.contactsService.create(contactData);
  }

  @Put(':id/update')
  async update(
    @Param('id') id: number,
    @Body() contactData: Contact,
  ): Promise<any> {
    contactData.id = Number(id);
    console.log('Update # ', contactData.id);
    return this.contactsService.update(contactData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number): Promise<any> {
    return this.contactsService.delete(id);
  }
}
