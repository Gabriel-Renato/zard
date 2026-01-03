# 🔓 Gerar APK Sem Senha (GitHub Actions)

Se você esqueceu a senha do sistema, **não precisa dela** para gerar o APK! Use o GitHub Actions que já está configurado.

## 🚀 Método: GitHub Actions (Sem Senha)

### Passo a Passo:

1. **Fazer commit das mudanças (se houver):**
```bash
cd /var/www/html/zard-flashcard-mastery
git add .
git commit -m "Atualizar projeto"
git push
```

2. **Acessar o GitHub:**
   - Vá em: `https://github.com/Gabriel-Renato/zard/actions`

3. **Executar o workflow:**
   - Clique em "Build Android APK"
   - Clique em "Run workflow" (canto superior direito)
   - Selecione "main" e execute

4. **Aguardar alguns minutos**

5. **Baixar o APK:**
   - Na execução do workflow, role até "Artifacts"
   - Baixe "app-debug-apk"

6. **Instalar no dispositivo:**
   - Transfira o APK para seu Android
   - Abra e instale

## ✅ Vantagens

- ✅ **Não precisa de senha** - Tudo no GitHub
- ✅ **Não precisa instalar nada** - GitHub faz tudo
- ✅ **Automático** - Gera APK automaticamente
- ✅ **Gratuito** - GitHub Actions é gratuito

## 🔄 Para Atualizar o App

Sempre que quiser gerar novo APK:

```bash
# Fazer mudanças no código (se necessário)
git add .
git commit -m "Atualizar app"
git push
```

O GitHub vai gerar novo APK automaticamente!

## 💡 Recuperar Senha (Opcional)

Se quiser recuperar a senha do sistema depois:

### Ubuntu/WSL:

1. **Reiniciar e entrar em modo recovery:**
   - Na tela de boot, pressione `Shift` ou `Esc`
   - Selecione "Advanced options"
   - Escolha "Recovery mode"
   - Selecione "root" (modo root)

2. **Remontar sistema como leitura/escrita:**
```bash
mount -o remount,rw /
```

3. **Alterar senha:**
```bash
passwd seu-usuario
```

4. **Reiniciar:**
```bash
reboot
```

### Mas não precisa!

Você pode continuar usando o GitHub Actions sem precisar da senha. É mais fácil e rápido! 🚀

