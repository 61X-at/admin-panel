import React, { useState, useEffect } from 'react';
import styles from './RuleBinder.module.css';
import { RuleData } from '../RuleCreater/RuleCreater';
import { useToast } from '../Error/ErrorToast';

export interface RuleBinderProps {
    isOpen: boolean;
    onClose: () => void;
    onBind: (rule: RuleData) => void;
}

export function RuleBinder({ isOpen, onClose, onBind }: RuleBinderProps) {
    const [inputId, setInputId] = useState('');
    const [allRules, setAllRules] = useState<RuleData[]>([]);
    const pushError = useToast();

    useEffect(() => {
        if (isOpen) {
            const stored = localStorage.getItem('rules');
            setAllRules(stored ? JSON.parse(stored) : []);
            setInputId('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();      
        e.stopPropagation();

        const found = allRules.find(r => r.id === inputId.trim());
        if (!found) {
            pushError('000', 'Правила с таким ID не существует');
            return;
        }

        onBind(found);
    };

    if (!isOpen) return null;
    return (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
                <h2 className={styles.modalTitle}>Привязать правило</h2>
                <button
                    type="button"                 
                    className={styles.close}
                    onClick={onClose}
                >
                    ✕
                </button>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="rule-id">ID правила</label>
                        <input
                            id="rule-id"
                            className={styles.input}
                            type="text"
                            value={inputId}
                            onChange={e => setInputId(e.target.value)}
                            placeholder="Введите идентификатор правила"
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"               
                            className={styles.submit}
                        >
                            Привязать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}