import React, { useEffect, useState } from 'react';
import styles from './MarketplaceEditer.module.css';
import { MarketplaceData } from '../MarketplaceCreater/MarketplaceCreater';
import { RuleData } from '../RuleCreater/RuleCreater';
import { RuleMarketplaceItem } from '../RuleMarketplaceElement/RuleMarketplaceItem';
import { RuleBinder } from '../RuleBinder/RuleBinder';
import { useToast } from '../Error/ErrorToast';

export interface MarketplaceEditerProps {
    marketplace: MarketplaceData;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: MarketplaceData, rules: RuleData[]) => void;
    onBindRule?: (marketId: string) => void;
    onDelete: (id: string) => void;
}

export function MarketplaceEditer({ marketplace, isOpen, onClose, onSave, onDelete }: MarketplaceEditerProps) {
    const [name, setName] = useState(marketplace.name);
    const [urlDomain, setUrlDomain] = useState(marketplace.urlDomain);
    const [rules, setRules] = useState<RuleData[]>(marketplace.rules ?? []);
    const [isBinderOpen, setBinderOpen] = useState(false);
    const pushError = useToast();
    const initialRules = marketplace.rules ?? [];

    useEffect(() => {
        if (isOpen) {
            setName(marketplace.name);
            setUrlDomain(marketplace.urlDomain);
            setRules(marketplace.rules ?? []);
        }
    }, [isOpen, marketplace]);

    const rulesChanged =
        rules.length !== initialRules.length ||
        rules.some(r => !initialRules.some(ir => ir.id === r.id));

    const isChanged =
        name.trim() !== marketplace.name ||
        urlDomain.trim() !== marketplace.urlDomain ||
        rulesChanged;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isChanged) return;
        onSave(
            { id: marketplace.id, name: name.trim(), urlDomain: urlDomain.trim(), rules: rules },
            rules
        );
        onClose();
    };

    const handleAddRule = () => {
        setBinderOpen(true);
    };

    const handleDoBind = (rule: RuleData) => {
        if (rules.some(r => r.id === rule.id)) {
            pushError('000', 'Правило уже прикреплено');
            return;
        }
        setRules(prev => [...prev, rule]);
        setBinderOpen(false);
    };

    const handleRemoveRule = (ruleId: string) => {
        setRules((prev) => prev.filter((r) => r.id !== ruleId));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
                <h2 className={styles.modalTitle}>Маркетплейс {marketplace.id}</h2>
                <button className={styles.close} onClick={onClose}>
                    X
                </button>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите название"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="urlDomain">Url Domain</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="urlDomain"
                            value={urlDomain}
                            onChange={(e) => setUrlDomain(e.target.value)}
                            placeholder="Введите url маркетплейса"
                            required
                        />
                    </div>

                    <div className={styles.rulesSection}>
                        {rules.length === 0 ? (
                            <p className={styles.noRules}>Нет привязанных правил</p>
                        ) : (
                            <div className={styles.ruleList}>
                                <label htmlFor="rulesList">Rules list</label>
                                {rules.map((r) => (
                                    <RuleMarketplaceItem
                                        key={r.id}
                                        {...r}
                                        onRemove={handleRemoveRule}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={!isChanged}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className={styles.bindRule}
                            onClick={handleAddRule}
                        >
                            Привязать правило
                        </button>
                    </div>

                    {onDelete && (
                        <div className={styles.deleteWrapper}>
                            <button
                                type="button"
                                className={styles.delete}
                                onClick={() => onDelete(marketplace.id)}
                            >
                                Удалить
                            </button>
                        </div> 
                    )}
                </form>

                <RuleBinder
                    isOpen={isBinderOpen}
                    onClose={() => setBinderOpen(false)}
                    onBind={handleDoBind}
                />
            </div>
        </div>
    );
}
