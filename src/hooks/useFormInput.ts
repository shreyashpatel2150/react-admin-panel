import { useState, ChangeEvent, useCallback } from 'react';

interface FormInputState<T> {
    value: T;
    error: string;
}

interface UseFormInputReturn<T> {
    value: T;
    error: string;
    bind: {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
    setValue: (value: T) => void;
    setError: (error: string) => void;
    reset: () => void;
    validate: (validator: (value: T) => string) => boolean;
}

/**
 * Generic form input hook with explicit string → T parsing
 */
const useFormInput = <T,>(
    initialValue: T,
    parse: (value: string) => T,
    initialError: string = ''
): UseFormInputReturn<T> => {
    const [state, setState] = useState<FormInputState<T>>({
        value: initialValue,
        error: initialError,
    });

    const setValue = useCallback((value: T) => {
        setState(prev => ({ ...prev, value }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({ ...prev, error }));
    }, []);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const parsedValue = parse(e.target.value);
            setState(prev => ({
                ...prev,
                value: parsedValue,
                error: '',
            }));
        },
        [parse]
    );

    const reset = useCallback(() => {
        setState({
            value: initialValue,
            error: initialError,
        });
    }, [initialValue, initialError]);

    const validate = useCallback(
        (validator: (value: T) => string): boolean => {
            const error = validator(state.value);
            setError(error ?? '');
            return !error;
        },
        [state.value, setError]
    );

    return {
        value: state.value,
        error: state.error,
        bind: {
            value: String(state.value ?? ''),
            onChange: handleChange,
        },
        setValue,
        setError,
        reset,
        validate,
    };
};

export default useFormInput;
