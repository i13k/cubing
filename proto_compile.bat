del app\messages.js
del app\messages.d.ts
npx pbjs -t static-module -w commonjs -o app\messages.js cubing.proto
npx pbts -o app\messages.d.ts app\messages.js