/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {OnlineContributionsService} from "../services/online-contributions.service";
import {CreateOnlineContributionDto} from "../dto/create-online-contribution.dto";
import {OnlineContributions} from "../entities/online-contributions.entity";

@ApiTags('Online Contributions')
@Controller('api/online-contributions')
export class OnlineContributionsController {
  constructor(private readonly onlineContributionsService: OnlineContributionsService) {}

  @Post()
  async create(@Body() onlineContribution: CreateOnlineContributionDto): Promise<OnlineContributions> {
    return await this.onlineContributionsService.create(onlineContribution);
  }

  @Put(':id')
  async update( @Param('id') id: string, @Body() onlineContribution: OnlineContributions): Promise<OnlineContributions> {
    return await this.onlineContributionsService.update(id, onlineContribution);
  }

  @Get()
  async findAll(): Promise<OnlineContributions[]> {
    return await this.onlineContributionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OnlineContributions> {
    return await this.onlineContributionsService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<OnlineContributions[]> {
    return await this.onlineContributionsService.findBy(by, value);
  }
}
