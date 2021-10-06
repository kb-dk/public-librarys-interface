import { TestBed } from '@angular/core/testing';

import { LoansResolver } from './loans.resolver';

describe('LoansResolver', () => {
  let resolver: LoansResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoansResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
