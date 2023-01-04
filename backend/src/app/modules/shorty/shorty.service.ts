import { Model } from 'mongoose';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from "cache-manager";
import { InjectModel } from '@nestjs/mongoose';
import { CreateShortyDto } from './dto/create-shorty.dto';
import { UpdateShortyDto } from './dto/update-shorty.dto';
import { Shorty, ShortyDocument } from './shorty.schema';


@Injectable()
export class ShortyService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Shorty.name) private shortyModel: Model<ShortyDocument>) { }


  async create(createShortyDto: CreateShortyDto) {
    const newShorty = new this.shortyModel(createShortyDto)

    await newShorty.save();
  }

  async findAll(page: number) {
    const result = await this.shortyModel
      .find()
      .skip(page * 20)
      .limit(20)

    return result
  }
  async findOne(id: string): Promise<Shorty> {
    return this.shortyModel.findById(id)
  }

  async findOneByShorty(shorty: string) {

    return await this.shortyModel.findOne({ shorty })
  }

  async findOneByName(search: string, page: number) {
    const itens = await this.shortyModel
      .find({ $text: { $search: search } }, { score: { $meta: "textScore" } })
      .sort({ score: -1 })
      .lean()
      .skip(page * 20)
      .limit(20)
    return itens
  }

  async update(id: string, updateShortyDto: UpdateShortyDto) {
    const iten: Shorty = await this.shortyModel.findByIdAndUpdate({
      _id: id

    }, {
      $set: updateShortyDto,

    }, {
      new: true
    },
    );
    const cacheKey = `shorty_${iten.shorty}`;
    await this.cacheManager.del(cacheKey);
    await this.cacheManager.set(cacheKey, iten.link_destino, 60 * 60 * 24 * 180);
    return iten;
  }
  async publishedShorty(date: any) {

    await this.shortyModel.updateMany({
      $and: [
        { "start_date": { $lte: date } }, { "finish_date": { $gte: date } }]
    }, {
      status: 1,
    }, {
      new: true
    })
  }
  async draftShorty(date: any): Promise<void> {

    await this.shortyModel.updateMany({
      "start_date": { $gt: date }
    },
      {
        status: 0,
      }, {
      new: true
    })

  }
  async expiretedShorty(date: any): Promise<void> {

    await this.shortyModel.updateMany({
      "finish_date": { $lt: date }
    },
      {
        status: 3,
      }, {
      new: true
    })

  }
}