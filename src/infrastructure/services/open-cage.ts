import axios from "axios";

import type { IGeolocationService } from "../../application/contracts/services/geolocation";

export class OpenCageGeolocationService implements IGeolocationService {
  async getCoordinatesByCEP(cep: string): Promise<Error | { lat: string; lng: string; }> {
    try {
      const { data } = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${process.env.OPENCAGE_API_KEY}`);

      if (data.results.length === 0) {
        return new Error("No results found for the provided CEP");
      }

      if (!data.results[0].geometry || !data.results[0].geometry.lat || !data.results[0].geometry.lng) {
        return new Error("Invalid geolocation data received");
      }

      return {
        lat: data.results[0].geometry.lat.toString(),
        lng: data.results[0].geometry.lng.toString()
      }
    } catch (error) {
      console.error("Error fetching geolocation data: ", error);
      return new Error("Failed to fetch geolocation data");
    }
  }
}