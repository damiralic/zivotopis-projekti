import { MaxWordsPipe } from './max-words.pipe';

describe('MaxWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
