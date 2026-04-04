# 📱 PWA Configuration - ECTA Saint-Alban

## ✅ Fichiers créés

1. **manifest.json** - Configuration PWA (app name, icons, couleurs, shortcuts)
2. **service-worker.js** - Cache strategy et offline support
3. **.htaccess** - En-têtes de sécurité et caching optimisé
4. **scripts.js (Updated)** - Enregistrement automatique du Service Worker

## 🚀 Comment tester la PWA

### Sur Desktop (Chrome/Edge)

1. Ouvre DevTools (F12) → Application → Manifest
   - Tu dois voir "ecta-v1" dans le manifest
2. Va sur l'onglet "Service Workers"
   - Tu dois voir le SW "Active and running"
3. Clique sur "Install" dans la barre d'adresse (en Chrome) ou "Installer l'application" en Edge

### Sur Mobile (iOS/Android)

**iOS (Safari):**
- Partage → Ajouter à l'écran d'accueil
- L'app fonctionnera offline avec le cache du SW

**Android (Chrome):**
- Menu (⋮) → Installer l'application
- L'app s'installera avec icône personnalisée

## 🔄 Fonctionnalités de la PWA

### Service Worker
- ✅ **Cache-First** : Assets statiques (CSS, JS, fonts)
- ✅ **Network-First** : Pages HTML (toujours cherche la version fraîche)
- ✅ **Fallback** : Offline support avec cache
- ✅ **Gestion des mises à jour** : Banner notification si nouvelle version

### Offline
- Pages visitées restent accessibles
- Assets (images, CSS, JS) cachés
- Message sympa si offline : "Offline - Page non disponible"

### Icons & Branding
- Icône personnalisée 🚴 sur l'écran d'accueil
- Couleur de theme rose (#e8357a)
- Shortcuts rapides : Agenda, Contact

## 📊 Cache Strategy

```
Assets statiques (CSS, JS) : ∞ cache
Pages HTML : 1h cache + network check
Manifest + SW : 0s cache (toujours frais)
Images/PDF : 7j cache
```

## 🔐 Sécurité

Le .htaccess ajoute :
- ✅ Headers de sécurité (X-Frame-Options, X-Content-Type)
- ✅ Blocage des fichiers sensibles (.env, .git, etc.)
- ✅ Compression GZIP
- ✅ Cache-Control optimisé
- ✅ Permissions-Policy restrictive

## 📝 Notes importantes

1. **Service Worker scope** : Raccine du site (/)
2. **Manifest scope** : Raccine du site (/)
3. **Icons** : SVG inline (pas d'image externe, plus rapide offline)
4. **Updates** : Le SW vérifie automatiquement les mises à jour au chargement
5. **Database** : Aucune persistance utilisateur (stateless)

## 🐛 Debugging

Pour voir les logs du SW :
```javascript
// Dans le navigateur, ouvre la console et regarde les messages "SW: ..."
```

Pour recharger manuellement le SW :
1. DevTools → Application → Service Workers
2. Clique "Update" ou "Unregister"
3. Recharge la page

## 📦 Déploiement

Si tu changes le contenu statique, mets à jour `STATIC_ASSETS` dans `service-worker.js` pour :
- Ajouter de nouvelles pages
- Changer de fichiers CSS/JS

Pour forcer une nouvelle version :
- Change `CACHE_NAME` de "ecta-v1" à "ecta-v2"
- Le SW supprimera automatiquement l'ancien cache

---

✨ Ton site ECTA est maintenant une **Progressive Web App** complète !
