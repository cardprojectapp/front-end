import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { CollectionInfoDto, UpdateCardsResponseData } from '../../collection.models';
import { CollectionApiService } from '../../services/collection-api.service';

import { COLLECTION_INFO_INITIAL_STATE } from './collection-info.state';
import { CollectionInfoStoreFunctions } from './collection-info.store.functions';

export const CollectionInfoStore = signalStore(
  { providedIn: 'root' },
  withState(COLLECTION_INFO_INITIAL_STATE),
  withComputed(({ non_existent_cards }) => ({
    nonExistentCardsMap: computed(() => CollectionInfoStoreFunctions.buildNonExistentCardsMap(non_existent_cards())),
  })),
  withMethods(store => {
    const collectionApiService = inject(CollectionApiService);

    return {
      getCollectionInfo: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { error: undefined, loading: true })),
          switchMap(() =>
            collectionApiService.getCollectionInfo$().pipe(
              tapResponse({
                next: (collectionInfo: CollectionInfoDto) => patchState(store, { ...collectionInfo, loading: false }),
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error?.error?.message || error?.message;

                  patchState(store, { error: errorMessage, loading: false });
                },
              }),
            ),
          ),
        ),
      ),
      updateCardsCollected(updateData: UpdateCardsResponseData): void {
        patchState(store, updateData);
      },
    };
  }),
);
