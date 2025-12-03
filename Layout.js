import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { 
    LayoutDashboard, 
    Receipt, 
    PiggyBank, 
    Target, 
    Lightbulb, 
    Menu, 
    X, 
    Languages, 
    Moon, 
    Sun,
    DollarSign,
    Settings,
    CreditCard
} from 'lucide-react';

// App Context for Global State
const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export default function Layout({ children, currentPageName }) {
    const [language, setLanguage] = useState('es'); // 'es' or 'en'
    const [currency, setCurrency] = useState('CRC'); // 'CRC' or 'USD'
    const [darkMode, setDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Exchange rate: 1 USD = 515 CRC (Approx)
    const EXCHANGE_RATE = 515;

    const toggleLanguage = () => setLanguage(prev => prev === 'es' ? 'en' : 'es');
    const toggleCurrency = () => setCurrency(prev => prev === 'CRC' ? 'USD' : 'CRC');
    const toggleTheme = () => setDarkMode(prev => !prev);

    // Helper to format currency
    const formatMoney = (amountInCRC) => {
        if (currency === 'CRC') {
            return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(amountInCRC);
        } else {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountInCRC / EXCHANGE_RATE);
        }
    };

    // Translations
    const t = (key) => {
        const translations = {
            es: {
                dashboard: "Tablero",
                transactions: "Transacciones",
                goals: "Metas",
                budgets: "Presupuestos",
                debts: "Deudas",
                tips: "Consejos",
                settings: "Ajustes",
                appName: "MiPlata CR",
                darkMode: "Modo Oscuro",
                lightMode: "Modo Claro",
                currencySwitch: "Cambiar Moneda"
            },
            en: {
                dashboard: "Dashboard",
                transactions: "Transactions",
                goals: "Goals",
                budgets: "Budgets",
                debts: "Debts",
                tips: "Tips",
                settings: "Settings",
                appName: "My Money CR",
                darkMode: "Dark Mode",
                lightMode: "Light Mode",
                currencySwitch: "Switch Currency"
            }
        };
        return translations[language][key] || key;
    };

    const navItems = [
        { name: t('dashboard'), icon: LayoutDashboard, path: 'Dashboard' },
        { name: t('transactions'), icon: Receipt, path: 'Transactions' },
        { name: t('goals'), icon: Target, path: 'Goals' },
        { name: t('budgets'), icon: PiggyBank, path: 'Budgets' },
        { name: t('debts'), icon: CreditCard, path: 'Debts' },
        { name: t('tips'), icon: Lightbulb, path: 'Tips' },
        { name: t('settings'), icon: Settings, path: 'Settings' },
    ];

    useEffect(() => {
 
