import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto & { authorId: number }) {
    return this.prismaService.posts.create({
      data: createPostDto,
    });
  }

  findAll() {
    return this.prismaService.posts.findMany();
  }

  findOne(id: number) {
    return this.prismaService.posts.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismaService.posts.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prismaService.posts.delete({
      where: { id },
    });
  }
}
