import { connection } from "next/server";
import * as fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Static HTML Files",
  description: "List all static html files",
};

async function readHtmlFileFromDir(dir: string) {
  const htmlFiles: string[] = [];
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      // 如果是文件夹，递归调用
      const subHtmlFiles = await readHtmlFileFromDir(filePath);
      htmlFiles.push(...subHtmlFiles);
    } else if (path.extname(file) === ".html") {
      // 如果是 HTML 文件，将其路径添加到数组中
      htmlFiles.push(filePath);
    }
  }

  return htmlFiles;
}

function transformFilePathToUrl(fromDir: string, filePaths: string[]) {
  const urls: string[] = [];

  for (const filePath of filePaths) {
    const relativePath = path.relative(fromDir, filePath);
    urls.push("/" + relativePath.replace(/\\/g, "/"));
  }

  return urls;
}

export default async function Page() {
  await connection();
  const staticDir = path.join(process.cwd(), "public");
  const htmlFiles = await readHtmlFileFromDir(staticDir);
  const urls = transformFilePathToUrl(staticDir, htmlFiles);

  return (
    <>
      <h1>Static HTML Files</h1>
      <ul>
        {urls.map((url, index) => (
          <li key={url}>
            <Link href={url}>{url}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
