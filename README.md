# SUCHI Jewellery - Handcrafted Kundan & Artificial Jewellery Store

A modern, responsive e-commerce application for **SUCHI Jewellery**, featuring handcrafted Kundan, American Diamond, Rose Gold, Oxidized Silver, and bridal collections with live order processing, cart management, and UPI payment integration.

---

## 📁 Repository Structure

When you clone or download this repository, the main files and directories are organized as follows:

```text
├── index.html                  # Main HTML entry point (main.html equivalent)
├── src/
│   ├── index.css               # Main CSS stylesheet with Tailwind styling (main.css equivalent)
│   ├── main.tsx                # React application bootstrapper
│   ├── App.tsx                 # Core App layout & route views
│   ├── assets/                 # Image assets (img.jpg / logos / banners / QR codes)
│   │   └── images/             # Product pictures, brand logos, payment QR codes
│   ├── components/             # Reusable UI components (Navbar, Footer, Modals)
│   ├── context/                # Shop context (Cart, Wishlist, Firebase Firestore data)
│   ├── data/                   # Initial product inventory and categories
│   ├── lib/                    # Firebase configuration
│   └── pages/                  # Page views (Home, Products, ProductDetail, Cart, Checkout, Admin)
├── public/                     # Static assets served at build root
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   └── 404.html                # SPA redirect helper for deep page refreshes
├── .gitignore                  # Git ignore rules
├── firebase-applet-config.json # Firebase database configuration
├── metadata.json               # Applet metadata
├── package.json                # Dependencies and npm scripts
├── README.md                   # Repository documentation
└── vite.config.ts              # Vite bundler configuration
```

---

## 🚀 How to Commit to GitHub

Follow these steps to push all files and folders to your GitHub repository:

1. **Initialize Git** (if not already initialized):
   ```bash
   git init
   git branch -M main
   ```

2. **Add your GitHub Repository Remote**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```

3. **Stage and Commit all files**:
   ```bash
   git add .
   git commit -m "Add SUCHI Jewellery source code, styles, and assets"
   ```

4. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

---

## 🌐 Deploying to GitHub Pages (Fixing Blank Screen)

> **⚠️ Why did a blank screen appear?**
> If you selected **"Deploy from a branch"** and chose the `main` branch, GitHub Pages tries to serve uncompiled React/TypeScript source code directly (`/src/main.tsx`). Web browsers cannot run uncompiled React JSX directly, resulting in a blank white page!

### 💡 Solution 1: Use GitHub Actions (Recommended - 1 Click)

We have included a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) in this repository.

1. Go to your repository on **GitHub.com**.
2. Click **Settings** (top tab) -> **Pages** (left sidebar).
3. Under **Build and deployment**:
   - Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
4. Click **Save**!

GitHub will automatically run the build script (`npm run build`) and deploy the compiled app. Your site will be live within 1 minute without any blank page issues!

---

### 💡 Solution 2: Use `npm run deploy` (gh-pages Branch)

If you prefer building locally or running a terminal script:

1. Run the deploy script in your terminal:
   ```bash
   npm run deploy
   ```
2. Go to **Settings > Pages** on your GitHub repository.
3. Under **Build and deployment**, select **Source**: `Deploy from a branch`.
4. Choose **Branch**: `gh-pages` and **Folder**: `/ (root)`.
5. Click **Save**.

---

## 🛠️ Features
- **Responsive E-Commerce Store**: Handcrafted Kundan, American Diamond & Bridal sets.
- **Cart & Wishlist Engine**: Local and Firebase Firestore persistence.
- **UPI QR Payment Integration**: Easy payments with screenshot upload support.
- **Admin Dashboard**: Manage inventory, categories, banner images, and customer orders.
- **GitHub Pages Ready**: Configured with SPA redirect rules (`404.html`) and `.nojekyll`.
