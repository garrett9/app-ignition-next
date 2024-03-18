import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { clientFetch, ClientFetchRequest } from '../lib/client/clientFetch';
import { useAuth } from '../providers/AuthProvider';
import { FetchError, isFetchError, ValidationErrors } from '../types/errors';

export interface UseFetchProps<T, D = any> {
  path: string;
  init?: ClientFetchRequest<D>;
  onSuccess?: (data: T) => Promise<void> | void;
  onError?: (error: FetchError) => void;
}

export interface UseFetchResponse<D = any> {
  $fetch: () => Promise<void>;
  errors: ValidationErrors<D>;
  inProgress: boolean;
  succeeded?: boolean;
}

export const useFetch = <T, D = any>({
  path,
  init = {
    method: 'POST',
  },
  onSuccess,
  onError,
}: UseFetchProps<T, D>): UseFetchResponse<D> => {
  const [_, setUser] = useAuth();
  const [errors, setErrors] = useState<ValidationErrors<D>>({});
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>();
  const router = useRouter();

  const $fetch = useCallback(
    async (event?: Event): Promise<void> => {
      event?.preventDefault();

      setErrors({});
      setInProgress(true);
      setSucceeded(undefined);

      try {
        const response = await clientFetch<T, D>(path, init);
        await onSuccess?.(response);
        setSucceeded(true);
      } catch (e) {
        setSucceeded(false);
        if (!isFetchError(e)) {
          throw e;
        }

        if (e.response?.status === 422) {
          const data = (await e.response.json()).errors as ValidationErrors<D>;
          setErrors(data);
          return;
        }

        if (e.response?.status === 401) {
          setUser(undefined);
          router.refresh();
          return;
        }

        if (e.response?.status === 409) {
          router.push('/verify-email');
          return;
        }

        if (onError) {
          onError(e);
          return;
        }

        throw e;
      } finally {
        setInProgress(false);
      }
    },
    [
      setInProgress,
      setErrors,
      setSucceeded,
      onSuccess,
      init,
      path,
      router,
      setUser,
      onError,
    ],
  );

  return {
    errors,
    inProgress,
    succeeded,
    $fetch,
  };
};
