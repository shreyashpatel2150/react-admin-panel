import { useState, ChangeEvent, useCallback } from 'react';

interface FormInputState {
    value: string;
    error: string;
}

interface UseFormInputReturn {
    value: string;
    error: string;
    bind: {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
    setValue: (value: string) => void;
    setError: (error: string) => void;
    reset: () => void;
    validate: (validator: (value: string) => string | null) => boolean;
}

const useFormInput = (initialValue: string = '', initialError: string = ''): UseFormInputReturn => {
    const [state, setState] = useState<FormInputState>({
        value: initialValue,
        error: initialError,
    });

    const setValue = useCallback((value: string) => {
        setState((prev) => ({ ...prev, value }));
    }, []);

    const setError = useCallback((error: string) => {
        setState((prev) => ({ ...prev, error }));
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
        setState((prev) => ({
            ...prev,
            value,
            error: '', // Clear error on change
        }));
    }, []);

    const reset = useCallback(() => {
        setState({
            value: initialValue,
            error: initialError,
        });
    }, [initialValue, initialError]);

    const validate = useCallback((validator: (value: string) => string | null): boolean => {
        const error = validator(state.value);
        if (error) {
            setError(error);
            return false;
        }
        setError('');
        return true;
    }, [state.value, setError]);

    return {
        value: state.value,
        error: state.error,
        bind: {
            value: state.value,
            onChange: handleChange,
        },
        setValue,
        setError,
        reset,
        validate,
    };
};

export default useFormInput;