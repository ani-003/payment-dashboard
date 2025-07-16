import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express'; // ✅ Add this
import { PaymentsService } from './payments.service';


@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get()
  getAll(@Query() query: any, @Req() req: Request) {
    console.log('Decoded JWT:', req.user); // ✅ this will now work
    return this.service.findAll(query);
  }

  @Post()
  async addPayment(@Body() data: any) {
    return this.service.create(data);
  }

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  @Get(':id') // 👈 must be last to avoid route conflicts
  getPaymentById(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
