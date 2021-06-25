export class QueryBuilder {
  limit: number;
  offset: number;
  order: any[]

  constructor(baseQuery: any) {
    this.limit = baseQuery.limit;
    this.offset = baseQuery.offset;
    this.order = baseQuery.order;
  }

  getPlainObject () {
    const {...object} = this;
    return object;
  }
}
