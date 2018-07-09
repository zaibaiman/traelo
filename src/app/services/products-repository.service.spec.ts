import { TestBed, inject } from '@angular/core/testing';

import { ProductsRepositoryService } from './products-repository.service';

describe('ProductsRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsRepositoryService]
    });
  });

  it('should be created', inject([ProductsRepositoryService], (service: ProductsRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
