# Checklist Migliorie aReS React Native UI

- [1] 11. Spostare `react` e `react-native` a `peerDependencies` (con range compatibili) per evitare istanze duplicate in app consumer.
- [2] 12. Esplicitare peer deps tipiche di RN quando usate: `react-native-gesture-handler`, `react-native-reanimated` (richiesto indirettamente da `react-native-reanimated-carousel`), eventuali dependency native (maps/webview/vector-icons) con note di linking.
- [3] 13. Sistemare dipendenze `@ares/web`/`@ares/web-ui`: verificare se sono davvero necessarie al runtime mobile (attualmente `@ares/web` appare usato in `effects/query.js`); in caso contrario spostarle ad opzionali o rimuoverle per ridurre peso e coupling.

