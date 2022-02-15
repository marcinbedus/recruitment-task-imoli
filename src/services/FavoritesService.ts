import prisma from "../config/db";
import { Film } from "../typings/api";

class FavoritesService {
  findAll(name?: string, page?: string, count?: string) {
    return prisma.favorite.findMany({
      where: { name },
      select: {
        id: true,
        name: true,
      },
      skip:
        page && count ? parseInt(page) * parseInt(count) - parseInt(count) : 0,
      take: count ? parseInt(count) : 10,
    });
  }

  find(id: string) {
    return prisma.favorite.findFirst({
      where: { id },
      include: {
        films: {
          include: {
            characters: {},
          },
        },
      },
    });
  }

  create(name: string, filmsData: Film[]) {
    return prisma.favorite.create({
      data: {
        name,
        films: {
          connectOrCreate: filmsData.map((film) => ({
            where: {
              title: film.title,
            },
            create: {
              characters: {
                connectOrCreate: film.characters.map((characterName) => ({
                  where: {
                    name: characterName,
                  },
                  create: {
                    name: characterName,
                  },
                })),
              },
              releaseDate: film.release_date,
              title: film.title,
            },
          })),
        },
      },
    });
  }

  count() {
    return prisma.favorite.count();
  }
}

export default new FavoritesService();
