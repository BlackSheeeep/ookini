import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import path from "path";

const outputPath = "../public/antd.min.css";

const css = extractStyle();
console.log(path.resolve(__dirname, outputPath));
fs.writeFileSync(path.resolve(__dirname, outputPath), css);
