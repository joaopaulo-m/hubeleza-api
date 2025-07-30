type getCoordinatesByCEPReturn = {
  lat: string
  lng: string
}

export interface IGeolocationService {
  getCoordinatesByCEP: (cep: string) => Promise<Error | getCoordinatesByCEPReturn>
}