import * as esbuild from "esbuild";
import {
	readFileSync,
	writeFileSync,
	copyFileSync,
	mkdirSync,
	existsSync,
} from "fs";
import { join } from "path";

console.log("Building with esbuild...");

// Create dist directory if it doesn't exist
if (!existsSync("dist")) {
	mkdirSync("dist");
}

// Build the main bundle
esbuild
	.build({
		entryPoints: ["src/main.tsx"],
		bundle: true,
		outdir: "dist",
		format: "esm",
		target: "es2020",
		minify: true,
		sourcemap: true,
		loader: {
			".tsx": "tsx",
			".ts": "ts",
			".jsx": "jsx",
			".js": "js",
			".css": "css",
		},
		define: {
			"process.env.NODE_ENV": '"production"',
		},
		jsx: "automatic",
		jsxImportSource: "react",
		external: [],
		platform: "browser",
	})
	.then(() => {
		console.log("Bundle build completed!");

		// Copy static assets
		if (existsSync("public")) {
			console.log("Copying static assets...");
			copyFileSync("public/vite.svg", "dist/vite.svg");
		}

		// Generate index.html
		const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MetaBuilder</title>
  <script type="module" crossorigin src="/main.js"></script>
  <link rel="stylesheet" crossorigin href="/main.css">
</head>
<body>
  <div id="root"></div>
  <script>
    // Debug script to check if page loads
    console.log('HTML loaded successfully');
    window.addEventListener('load', () => {
      console.log('Page fully loaded');
      const root = document.getElementById('root');
      console.log('Root element:', root);
      if (!root.innerHTML.trim()) {
        console.log('Root is empty - React app may not have loaded');
      }
    });
  </script>
</body>
</html>`;

		writeFileSync("dist/index.html", indexHtml);
		console.log("Build completed successfully!");
	})
	.catch((error) => {
		console.error("Build failed:", error);
		process.exit(1);
	});
