import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { UserPickedUpItemDto } from '../dtos/user.pickedup.item.dto';
import { JwtUserGuard } from 'src/auth/jwt-user-auth.guard';

@Controller('api/v1')
export class UserShoppingController {
  constructor(private userService: UserService) {}

  @Get('show-lists')
  @UseGuards(JwtUserGuard)
  getLists(@Headers('authorization') token: string) {
    return this.userService.getUserLists(token);
  }

  @Get('show-pickedup-items')
  @UseGuards(JwtUserGuard)
  getPickedUpItems(@Headers('authorization') token: string) {
    return this.userService.getUserPickedUpItems(token);
  }

  @Post('pickup-items')
  @UseGuards(JwtUserGuard)
  pickupItems(
    @Headers('authorization') token: string,
    @Body() dto: UserPickedUpItemDto[],
  ) {
    return this.userService.pickUpItem(token, dto);
  }

  @Delete('delete-list/:id')
  @UseGuards(JwtUserGuard)
  deleteList(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) listId: number,
  ) {
    return this.userService.deleteList(token, listId);
  }
}
