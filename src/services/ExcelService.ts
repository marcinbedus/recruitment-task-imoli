import { Character, Favorite, Film } from "@prisma/client";
import XLSX from "xlsx";

class ExcelService {
  getEncodedFile(
    favorites: Favorite & {
      films: (Film & {
        characters: Character[];
      })[];
    }
  ) {
    const ws = XLSX.utils.aoa_to_sheet(this.prepareData(favorites));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, favorites.name);

    return XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });
  }

  private prepareData(
    favorites: Favorite & {
      films: (Film & {
        characters: Character[];
      })[];
    }
  ) {
    const characters = favorites.films
      .map((film) => {
        return film.characters.reduce((acc, curr) => {
          return [...acc, curr.name];
        }, [] as string[]);
      })
      .flat()
      .filter((item, i, ar) => ar.indexOf(item) === i);

    const excelColumns = characters.reduce((acc, curr) => {
      return [...acc, [curr]];
    }, [] as string[][]);

    if (excelColumns.length) {
      excelColumns[0].push(favorites.films.map((film) => film.title).join(","));

      return excelColumns;
    }

    excelColumns.push([
      "",
      favorites.films.map((film) => film.title).join(","),
    ]);

    return excelColumns;
  }
}

export default new ExcelService();
