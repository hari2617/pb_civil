import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOwnerDto, UpdateOwnerDto } from './dto/owner.dto';

@Injectable()
export class OwnersService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Complete or create owner profile (called after OTP verification) ──────
  async upsertProfile(ownerId: string, dto: CreateOwnerDto) {
    const owner = await this.prisma.owner.findUnique({ where: { id: ownerId } });
    if (!owner) throw new NotFoundException('Owner not found');

    return this.prisma.owner.update({
      where: { id: ownerId },
      data: {
        fullName: dto.fullName,
        email: dto.email,
        companyName: dto.companyName,
      },
    });
  }

  // ── Get own profile ───────────────────────────────────────────────────────
  async findById(id: string) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            supervisors: true,
          },
        },
      },
    });
    if (!owner) throw new NotFoundException('Owner not found');
    return owner;
  }

  // ── Update own profile ────────────────────────────────────────────────────
  async update(id: string, dto: UpdateOwnerDto) {
    await this.findById(id);
    return this.prisma.owner.update({
      where: { id },
      data: dto,
    });
  }

  // ── Admin: list all owners ────────────────────────────────────────────────
  async findAll() {
    return this.prisma.owner.findMany({
      include: { projects: true },
    });
  }
}
