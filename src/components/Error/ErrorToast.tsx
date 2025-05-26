// src/components/ErrorToast.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import styles from './ErrorToast.module.css';

interface Toast {
    id: string;
    code: string;
    message: string;
}

type Action =
    | { type: 'ADD'; toast: Toast }
    | { type: 'REMOVE'; id: string };

const ToastContext = createContext<{
    push: (code: string, message: string) => void;
}>({ push: () => { } });

function toastReducer(state: Toast[], action: Action): Toast[] {
    switch (action.type) {
        case 'ADD':
            return [...state, action.toast];
        case 'REMOVE':
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }
}

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const push = useCallback((code: string, message: string) => {
        const id = Date.now().toString();
        dispatch({ type: 'ADD', toast: { id, code, message } });
        setTimeout(() => dispatch({ type: 'REMOVE', id }), 5000);
    }, []);

    const remove = useCallback((id: string) => {
        dispatch({ type: 'REMOVE', id });
    }, []);

    return (
        <ToastContext.Provider value={{ push }}>
            {children}
            <div className={styles.container}>
                {toasts.map(({ id, code, message }) => (
                    <div key={id} className={styles.errorBox}>
                        <button
                            className={styles.close}
                            onClick={() => remove(id)}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>
                        <div className={styles.errorHeader}>
                            <div className={styles.icon}>!</div>
                            <div className={styles.errorText}>
                                Произошла ошибка <span className={styles.code}>{code}</span>
                            </div>
                        </div>
                        <div className={styles.errorDetails}>
                            {message}
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

// хук создания ошибки
export function useToast() {
    return useContext(ToastContext).push;
}
