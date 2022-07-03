const average = require('../utils/list_helper').average

describe('average', () => {
  test('one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})