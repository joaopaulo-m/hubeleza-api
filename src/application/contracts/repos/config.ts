export interface IConfigRepository {
  getLeadPrice: () => Promise<number>
}