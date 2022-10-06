import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerService } from 'src/kafka/producer.service';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    private readonly producerService: ProducerService,
  ) {}
  async create(createCatDto: CreateCatDto) {
    const newCat = this.catRepository.create(createCatDto);
    await this.producerService.produce({
      topic: 'cats',
      messages: [
        {
          value:
            createCatDto.age +
            ' | ' +
            createCatDto.breed +
            ' | ' +
            createCatDto.name,
        },
      ],
    });
    return this.catRepository.save(newCat);
  }

  findAll() {
    return this.catRepository.find();
  }

  async findOne(id: number) {
    const cat = this.catRepository.findOneBy({ id });
    cat.then(async (cat) => {
      await this.producerService.produce({
        topic: 'cats',
        messages: [
          {
            value:
              'found cat: ' + cat.name + ' | ' + cat.age + ' | ' + cat.breed,
          },
        ],
      });
    });
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    await this.producerService.produce({
      topic: 'cats',
      messages: [
        {
          value: 'updated cat: ' + id,
        },
      ],
    });
    return this.catRepository.save({
      id,
      ...updateCatDto,
    });
  }

  async remove(id: number) {
    await this.producerService.produce({
      topic: 'cats',
      messages: [
        {
          value: 'deleted cat: ' + id,
        },
      ],
    });
    return this.catRepository.delete(id);
  }
}
