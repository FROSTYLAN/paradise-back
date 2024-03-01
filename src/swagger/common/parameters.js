export const pagerParams = [
  {
    in: 'query',
    name: 'page_size',
    required: false,
    schema: {
      type: 'integer'
    }
  },
  {
    in: 'query',
    name: 'page_index',
    required: false,
    schema: {
      type: 'integer'
    }
  },
  {
    in: 'query',
    name: 'sort_name',
    required: false,
    schema: {
      type: 'string'
    }
  },
  {
    in: 'query',
    name: 'sort_direction',
    required: false,
    schema: {
      type: 'string'
    }
  }
]
