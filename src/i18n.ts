import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    common: {
                        start: "Start",
                        next: "Next",
                        back: "Back",
                        submit: "Submit",
                        loading: "Loading...",
                        consultAttorney: "Consult an Attorney",
                        legalDisclaimer: "Justify is a Registered Legal Document Assistant (LDA). We are not attorneys.",
                        language: "Language"
                    },
                    dashboard: {
                        welcome: "Welcome back,",
                        searchPlaceholder: "Ask Elite about your case status or legal questions...",
                        newMatter: "New Matter"
                    },
                    services: {
                        divorce: "Divorce",
                        bankruptcy: "Bankruptcy",
                        smallClaims: "Small Claims",
                        livingTrust: "Living Trust"
                    }
                }
            },
            es: {
                translation: {
                    common: {
                        start: "Comenzar",
                        next: "Siguiente",
                        back: "Atrás",
                        submit: "Enviar",
                        loading: "Cargando...",
                        consultAttorney: "Consultar a un Abogado",
                        legalDisclaimer: "Justify es un Asistente de Documentos Legales (LDA) registrado. No somos abogados.",
                        language: "Idioma"
                    },
                    dashboard: {
                        welcome: "Bienvenido de nuevo,",
                        searchPlaceholder: "Pregunte a Elite sobre el estado de su caso o preguntas legales...",
                        newMatter: "Nuevo Asunto"
                    },
                    services: {
                        divorce: "Divorcio",
                        bankruptcy: "Bancarrota",
                        smallClaims: "Reclamos Menores",
                        livingTrust: "Fideicomiso en Vida"
                    }
                }
            }
        }
    });

export default i18n;
