# Checklist Migliorie aReS React Native UI

- [1] 5. Definire la superficie pubblica stabile del package: oggi la documentazione suggerisce import profondi (`@ares/react-native-ui/components/...`) e il codice interno fa self-import sul package name; formalizzare gli entrypoint supportati.
- [2] 6. Introdurre un entrypoint "root" per l'uso normale (es. export di `ApplicationRoot`, `ARESProvider`, `AuthProvider`, `setConfig`, componenti principali) evitando deep import come default di onboarding.
- [3] 7. Stabilire convenzioni di configurazione: chiarire come viene iniettata l'istanza `aReS` (`config.ares`), come vengono inizializzati i datasource e quali hook opzionali sono attesi (es. `aReS.contextSettings.auth.*`).

