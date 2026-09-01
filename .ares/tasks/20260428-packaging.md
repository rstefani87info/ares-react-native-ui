# Checklist Migliorie aReS React Native UI

- [1] 8. Aggiungere una mappa `exports` in `package.json` (coerente con lo stile dei moduli `core`/`web`) per esplicitare root e sottopath pubblici e ridurre import fragili.
- [2] 9. Valutare e dichiarare i campi tipici RN: `react-native`, `module`, `types` (o dichiarazioni `.d.ts` minime), e una strategia chiara su JSX/ESM (Metro vs Node resolution).
- [3] 10. Aggiungere `files`/`.npmignore` per non pubblicare artefatti non necessari e per evitare che path locali o file temporanei entrino nel pacchetto.

