import timer from './'

describe('test timer', () => {
  it('executes cb and finally hook', async () => {
    const mockCallback = jest.fn()
    const finallyCallback = jest.fn()
    timer(3, mockCallback, finallyCallback)
    await delay(4000)
    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(finallyCallback).toHaveBeenCalled();
  })
})

async function delay(num) {
  return new Promise(resolve => setTimeout(resolve, num));
}
