import convertDateString from "./convertDate";

describe("convertDateString", () => {
  test("Корректные значения", () => {
    expect(convertDateString("2013-07-29T03:24:51Z")).toEqual("29.07.2013 07:24");//msk UTC+4
    expect(convertDateString("2013-07-29T03:24Z")).toEqual("29.07.2013 07:24");
    expect(convertDateString("2013-07-29T03:24:51")).toEqual("29.07.2013 03:24");
  })

  test("Некорректные значения", () => {
    expect(() => convertDateString("2929-29-29T03:24:51Z")).toThrow('Invalid Date')
    expect(() => convertDateString("2013-07-29T03:24:51X")).toThrow('Invalid Date')
    expect(() => convertDateString('test')).toThrow('Invalid Date')
    expect(() => convertDateString('')).toThrow('Invalid Date')
  })
})  