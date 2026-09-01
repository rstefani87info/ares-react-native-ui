# Checklist Migliorie aReS React Native UI

- [1] 14. Eliminare o rendere opt-in i `console.log`/`console.warn` dentro componenti e context (es. `ApplicationRoot`, `AuthContext`), per evitare rumore e potenziali leak.
- [2] 15. Evitare effetti globali non documentati (es. `global.sessionID` in `ARESContext`): definire un contratto esplicito e/o confinare lo stato nel context.
- [3] 16. Verificare che i componenti critici non assumano che un provider sia sempre presente (fallback sensati, errori chiari quando manca `config.ares` o `ARESProvider`).

