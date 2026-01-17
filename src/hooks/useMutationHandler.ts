import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface MutationHandlerConfig<TResponse = unknown, TError = unknown> {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TResponse) => void;
    onError?: (error: TError) => void;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    redirectUrl?: string;
}

interface UseMutationHandlerReturn<TPayload, TResponse> {
    execute: (payload: TPayload) => Promise<TResponse | undefined>;
    isLoading: boolean;
    error: string | null;
    reset: () => void;
}

/**
 * Universal mutation handler hook
 * Handles RTK Query mutations with toast notifications, navigation, and custom callbacks
 * 
 * @param mutationFn - The mutation function from RTK Query (e.g., useCreateUserMutation)
 * @param config - Configuration object for handling success/error, navigation, and notifications
 * @returns Object with execute function and loading/error states
 */
export const useMutationHandler = <TPayload, TResponse = unknown>(
    mutationFn: (payload: TPayload) => Promise<TResponse>,
    config: MutationHandlerConfig<TResponse, unknown> = {}
): UseMutationHandlerReturn<TPayload, TResponse> => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        successMessage = 'Operation completed successfully!',
        errorMessage = 'An error occurred. Please try again.',
        redirectUrl,
        onSuccess,
        onError,
        showSuccessToast = true,
        showErrorToast = true,
    } = config;

    const execute = useCallback(
        async (payload: TPayload): Promise<TResponse | undefined> => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await mutationFn(payload);
                if (response && typeof response === 'object' && 'error' in response && (response as Record<string, unknown>).error) {
                    return response;
                }

                if (showSuccessToast) {
                    toast.success(successMessage);
                }

                if (onSuccess) {
                    onSuccess(response);
                }

                if (redirectUrl) {
                    navigate(redirectUrl);
                }

                return response;

            } catch (err: unknown) {
                const errorMessage_ = err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage_);

                if (showErrorToast) {
                    toast.error(errorMessage);
                }

                if (onError) {
                    onError(err);
                }

                return undefined;
            } finally {
                setIsLoading(false);
            }
        },
        [mutationFn, navigate, showSuccessToast, showErrorToast, successMessage, errorMessage, onSuccess, onError, redirectUrl]
    );

    const reset = useCallback(() => {
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        execute,
        isLoading,
        error,
        reset,
    };
}