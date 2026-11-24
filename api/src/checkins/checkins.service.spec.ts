import { CheckInsService } from './checkins.service';

describe('CheckInsService.record', () => {
  const makeRepo = (existing: unknown) => ({
    findOne: jest.fn().mockResolvedValue(existing),
    create: jest.fn((x) => x),
    save: jest.fn(async (x) => ({ id: 1, ...x })),
  });

  it('creates a check-in the first time', async () => {
    const repo = makeRepo(null);
    const svc = new CheckInsService(repo as never);
    const row = await svc.record(7, '2026-11-20', 62);
    expect(row.checkInDate).toBe('2026-11-20');
    expect(repo.save).toHaveBeenCalledTimes(1);
  });

  it('counts consecutive days ending yesterday', async () => {
    const d = (n: number) => {
      const x = new Date();
      x.setUTCDate(x.getUTCDate() - n);
      return x.toISOString().slice(0, 10);
    };
    const repo = {
      ...makeRepo(null),
      find: jest.fn().mockResolvedValue([
        { checkInDate: d(1) },
        { checkInDate: d(2) },
        { checkInDate: d(3) },
      ]),
    };
    const svc = new CheckInsService(repo as never);
    const res = await svc.streak(7);
    expect(res.count).toBe(3);
  });

  it('is idempotent for the same local date', async () => {
    const repo = makeRepo({ id: 9, userId: 7, checkInDate: '2026-11-20', mindScore: 50 });
    const svc = new CheckInsService(repo as never);
    const row = await svc.record(7, '2026-11-20', 62);
    expect(row.id).toBe(9);
    expect(repo.save).not.toHaveBeenCalled();
  });
});
