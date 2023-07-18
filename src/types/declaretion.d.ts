// typeRoots alanında, node_modules/@types dizini yanında src/@types dizinini ekledik. Bu, projenizin kök dizininde src klasörü altında @types adında bir klasör oluşturduğunuz anlamına gelir.
// src/@types dizinini oluşturun (eğer zaten yoksa).
// src/@types dizini içinde editorjs__image adında bir klasör oluşturun.
// src/@types/editorjs__image klasörü içine oluşturduğunuz index.d.ts dosyasını taşıyın.
// Artık TypeScript derleyicisi, @editorjs/image modülünü projenizin src klasörü altındaki @types dizinindeki index.d.ts dosyasında tanıyacaktır.
// Bu işlemi yaptıktan sonra, projeniz @editorjs/image modülünü kullanırken TypeScript derleyicisi hataları ortadan kalkmalı ve modülü doğru şekilde tanımalıdır.

declare module "@editorjs/image"
declare module "@editorjs/header"
declare module "@editorjs/link"
declare module "@editorjs/raw"