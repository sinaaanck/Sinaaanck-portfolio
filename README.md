# Mohammed Sinan - Portfolio

A high-performance, immersive portfolio website featuring custom Islamic calligraphy animations, procedural geometric backgrounds, and advanced visual effects using Three.js and WebGL.

## 🌟 Features

### 🎨 Visual Effects
-   **ASCII Visual Effect**: A custom post-processing effect implemented with Three.js and React Three Fiber, rendering the scene in an ASCII character set for a unique, retro-futuristic aesthetic.
-   **Islamic Calligraphy Animation**: Interactive particle system using Unicode presentation forms of Arabic calligraphy, featuring spring physics and mouse interaction.
-   **Procedural Geometric Background**: A dynamic, procedurally generated hexagonal grid pattern inspired by Islamic geometry, rendered using the HTML5 Canvas API.
-   **Progressive Blur**: A subtle, gradient-based blur effect that adds depth to the scrolling experience.
-   **Custom Cursor**: A custom-designed cursor that interacts with on-screen elements, enhancing immersion.

### ⚡ Performance & Interaction
-   **Smooth Scrolling**: Custom physics-based scroll hook (`useSmoothScroll`) for a premium, fluid navigation feel.
-   **Optimized Rendering**: Efficient use of `requestAnimationFrame` and Canvas API for high-performance animations.
-   **Vercel Speed Insights**: Integrated performance monitoring to ensure optimal load times and user experience.
-   **Responsive Design**: Fully responsive layout with mobile-optimized navigation and interactions.

## 🛠️ Tech Stack

-   **Core**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **3D & Graphics**: 
    -   [Three.js](https://threejs.org/)
    -   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
    -   [React Three Drei](https://github.com/pmndrs/drei)
    -   [Postprocessing](https://github.com/pmndrs/postprocessing)
-   **Animations**: [GSAP](https://greensock.com/gsap), HTML5 Canvas
-   **Routing**: [React Router](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sinaaanck/Sinaaanck-portfolio.git
    cd Sinaaanck-portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build for Production

To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your changes to GitHub.
2.  Import the project into Vercel.
3.  Vercel will automatically detect the Vite framework and configure the build settings.
4.  Deploy!

## 📄 License

MIT License - Copyright (c) 2025 Mohammed Sinan
