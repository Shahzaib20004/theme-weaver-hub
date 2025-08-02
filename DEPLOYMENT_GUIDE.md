# 🚀 Domain & Hosting Setup Guide for kaar.rentals

## 🎯 **Recommended: Vercel (Free & Easy)**

### **Step 1: Deploy to Vercel**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your app:**
   ```bash
   vercel --prod
   ```

4. **Set environment variables in Vercel dashboard:**
   ```
   VITE_SUPABASE_URL=https://cmdnaaclpkgxxportnuc.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZG5hYWNscGtneHhwb3J0bnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzQyNzcsImV4cCI6MjA2OTM1MDI3N30.hFh9dR4oo-ZG_LKaLMYyBK-qQKreEBTJqFBxFLqKRig
   ```

### **Step 2: Connect Domain in Vercel**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Domains**
4. **Add domain:** `kaar.rentals`
5. **Vercel will provide DNS records**

### **Step 3: Update Namecheap DNS**

**In Namecheap DNS settings, add these records:**

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

---

## 🌐 **Alternative: Netlify (Also Free)**

### **Step 1: Deploy to Netlify**

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Drag `dist` folder to Netlify**
3. **Or connect GitHub repository**

### **Step 2: Connect Domain**

1. **Go to Netlify Dashboard**
2. **Site Settings → Domain Management**
3. **Add custom domain:** `kaar.rentals`
4. **Update Namecheap DNS with Netlify records**

---

## ☁️ **Alternative: AWS Amplify**

### **Step 1: Deploy to AWS Amplify**

1. **Connect GitHub repository**
2. **Build settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```

### **Step 2: Connect Domain**

1. **Go to AWS Amplify Console**
2. **Domain Management → Add domain**
3. **Enter:** `kaar.rentals`
4. **Update Namecheap DNS with AWS records**

---

## 🔧 **Namecheap DNS Configuration**

### **For Vercel (Recommended):**

**In Namecheap DNS settings:**

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

### **For Netlify:**

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 600

Type: CNAME
Name: www
Value: your-site.netlify.app
TTL: 600
```

### **For AWS Amplify:**

```
Type: A
Name: @
Value: [AWS provided IP]
TTL: 600

Type: CNAME
Name: www
Value: [AWS provided CNAME]
TTL: 600
```

---

## 🚀 **Quick Deployment Steps**

### **Option 1: Vercel (Recommended)**

1. **Install Vercel:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Add domain in Vercel dashboard**
4. **Update Namecheap DNS**
5. **Wait 24-48 hours for propagation**

### **Option 2: Netlify**

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder to Netlify**
3. **Add custom domain**
4. **Update Namecheap DNS**

---

## 🔒 **SSL Certificate**

- ✅ **Vercel:** Automatic SSL
- ✅ **Netlify:** Automatic SSL  
- ✅ **AWS Amplify:** Automatic SSL

All platforms provide free SSL certificates automatically.

---

## 📱 **Environment Variables**

**Set these in your hosting platform:**

```
VITE_SUPABASE_URL=https://cmdnaaclpkgxxportnuc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZG5hYWNscGtneHhwb3J0bnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzQyNzcsImV4cCI6MjA2OTM1MDI3N30.hFh9dR4oo-ZG_LKaLMYyBK-qQKreEBTJqFBxFLqKRig
```

---

## 🎯 **Recommended Approach**

**Use Vercel because:**
- ✅ **Free hosting**
- ✅ **Automatic deployments**
- ✅ **Easy domain connection**
- ✅ **Great performance**
- ✅ **Built-in analytics**
- ✅ **Easy environment variable management**

---

## 🚀 **Final Result**

After deployment, your car rental platform will be live at:
**`https://kaar.rentals`**

With all features:
- ✅ **Pakistani market adapted**
- ✅ **Urdu language support**
- ✅ **Flexible authentication**
- ✅ **Real-time car listings**
- ✅ **WhatsApp integration**
- ✅ **SMS/Email notifications**

Perfect for the Pakistani market! 🇵🇰✨