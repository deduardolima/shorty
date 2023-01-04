import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Shorty } from "../shorty/shorty.schema";
import { Counter, CounterDocument } from "./counter.schema";


@Injectable()
export class CounterService {
    constructor(
        @InjectModel(Counter.name) private counterModel: Model<CounterDocument>) { }

    async create(shorty_id: Shorty, name: string) {
        const counter = new this.counterModel({ name, shorty_id })
        await counter.save();
    }
    async findAll() {
        const results = await this.counterModel
            .find()
        const count = await this.counterModel.count();

        return { results, count };
    }
    async findOneBySearch(search: string, page: number) {
        const itens = await this.counterModel
            .find({ $text: { $search: search } }, { score: { $meta: "textScore" } })
            .sort({ score: -1 })
            .lean()
            .skip(page * 20)
            .limit(20)
        return itens
    }
    async findOne(id: string, page: number) {
        const results = await this.counterModel
            .find({ shorty_id: id })

        const count = await this.counterModel.count({ shorty_id: id });

        return { results, count };
    }
    async findOneById(id: string) {
        const results = await this.counterModel
            .find({ shorty_id: id })

        const count = await this.counterModel.count({ shorty_id: id });

        return { results, count };
    }
    async findByIdWithFilter(id: string, startDate: number, finishDate: number) {

        const results = await this.counterModel
            .find({
                $and: [
                    { "shorty_id": id },
                    { "create_at": { $gte: startDate } },
                    { "create_at": { $lte: finishDate } }
                ]
            })

        const count = await this.counterModel.count({
            $and: [
                { "shorty_id": id },
                { "create_at": { $gte: startDate } },
                { "create_at": { $lte: finishDate } }
            ]
        });

        return { results, count };
    }

}