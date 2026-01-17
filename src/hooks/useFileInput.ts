import { useState, useCallback } from 'react';

interface FormInputState<T> {
    value: T;
    error: string;
}

export interface UseFileInputReturn<T> {
    value: T | undefined;
    error: string;
    onChange: (files: FileList | undefined) => void;
    setValue: (value: T | undefined) => void;
    setError: (error: string) => void;
    reset: () => void;
}

const useFileInput = <T,>(
    initialValue: T | undefined = undefined,
    initialError: string = ''
): UseFileInputReturn<T> => {
    const [state, setState] = useState<FormInputState<T | undefined>>({
        value: initialValue,
        error: initialError,
    });

    const onChange = useCallback((files: FileList | undefined) => {
        const file = files?.[0] ?? undefined;
        setState(prev => ({
            ...prev,
            value: file as T | undefined,
            error: '',
        }));
    }, []);

    const setValue = useCallback((value: T | undefined) => {
        setState(prev => ({ ...prev, value }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({ ...prev, error }));
    }, []);

    const reset = useCallback(() => {
        setState({
            value: initialValue,
            error: initialError,
        });
    }, [initialValue, initialError]);

    return {
        value: state.value,
        error: state.error,
        onChange,
        setValue,
        setError,
        reset,
    };
};

export default useFileInput;
