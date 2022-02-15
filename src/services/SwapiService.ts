import { Film, GetFilmsResponse } from "../typings/api";
import { axiosInstance } from "../utils/axios";

class SwapiService {
  getAllFilms() {
    return axiosInstance.get<GetFilmsResponse>("/");
  }

  async getFilmById(id: number) {
    try {
      const { data } = await axiosInstance.get<Film>(`/${id}`);

      const charactersNamesResponse = await this.getCharactersNames(
        data.characters
      );

      return {
        ...data,
        characters: charactersNamesResponse.map(({ data }) => data.name),
      };
    } catch (e) {
      throw e;
    }
  }

  getAllFilmsWithIds(ids: number[]) {
    return Promise.all(ids.map((id) => this.getFilmById(id)));
  }

  getCharactersNames(urls: string[]) {
    return Promise.all(urls.map((url) => this.getCharacterName(url)));
  }

  getCharacterName(url: string) {
    return axiosInstance.get<{ name: string }>(url);
  }
}

export default new SwapiService();
