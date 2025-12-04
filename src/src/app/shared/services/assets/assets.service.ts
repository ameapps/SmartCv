import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(public http: HttpClient) { }

  /**
   * @param path Method getting the content of the file (included into
   * Assets folder ) specified as parameter.
   * <usage>
   * const asset = await this.assets.getFile('assets/Test.json')
   * </usage>
   * @returns a string representing the content of the file.
   */
  async getFile(path: string): Promise<any> {
    try {
      return await firstValueFrom(this.http.get<any>(path));
    } catch (error) {
      console.error("Error loading asset file:", error);
      return undefined;
    }
  }
}
