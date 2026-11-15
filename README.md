# CET-4 Visual Vocabulary（大学英语四级可视化词汇学习网站）

基于 React 19、TypeScript、Vite 构建的纯静态大学英语四级（CET-4）可视化词汇学习网站。支持图文记忆、纯文字/纯图片模式、看图猜词、Web Speech API 系统双语朗读、循环播放、全列表搜索、图片与词条在线/本地编辑、IndexedDB 草稿与进度持久化、ZIP 导出，以及 Story Review 场景故事复习。

- **项目仓库**：`seki999/cet4-visual-vocabulary`
- **目标部署地址**：https://seki999.github.io/cet4-visual-vocabulary/
- **本地存储隔离**：使用独立的 LocalStorage（`cet4-settings-v1`、`cet4-story-settings-v1`）与 IndexedDB（`cet4-drafts`）命名空间，默认开发端口为 `5174`，与原 `toeic-visual-vocabulary` 网站完全隔离、互不影响。

---

## 一、词库来源、数量与许可说明

1. **当前词库来源与许可**：
   - 源数据位于 `data-source/cet4-vocabulary.xlsx`（归档副本 `data-source/英语单词_英美音标_释义_固定搭配_例句_第十四组.xlsx`），为项目自有整理的真实教学词表，许可明确，可公开用于本项目部署与学习，不包含任何原 TOEIC 项目的词条、图片或故事。
2. **当前数量与分表结构**：
   - 当前共导入 **79 条**真实词汇记录（`v000001`～`v000079`），按每 List 50 条划分为 **2 个 List**：
     - `public/data/list01.json`（List 01）：50 条记录（`strive` ～ `roar`）
     - `public/data/list02.json`（List 02）：29 条记录（`worthwhile` ～ `hatred`）
   - 同形不同词性或不同常用义项独立成行保留（如 `farm` n./v.、`bay`、`gulf`、`spray`、`bait`、`shell`、`chop`、`crust`、`grain`、`clash`、`dull`、`hollow`、`pitch`、`roar`、`mill`、`brake`、`deck`、`hatch`、`saddle`、`trunk`、`beam`、`grin`、`yell`、`frown`）。
3. **每条记录包含字段**：
   - 英语单词（`word`）、词性（`partOfSpeech`）、英式与美式音标（`ipa.uk` / `ipa.us`）、中文释义（`meaning`）、英语搭配与中文释义（`collocation.en` / `collocation.zh`）、英语例句与中文翻译（`example.en` / `example.zh`）、图片列表（`images`）、笔记（`notes`）和标签（`tags`）。
4. **词库缺口记录与后续扩充方式**：
   - 目标规模约为 **4,500 词**（约 90 个 List，每 List 50 词）。遵循「不编造虚假词条、以真实可靠数据逐步扩充」原则，当前版本已完成首批 79 条真实记录与 List 01 完整 Story Review（覆盖 50/50 词条），缺口约 4,421 条。
   - 后续只需将新增九列词汇表放入 `data-source/` 并执行 `python scripts/append_vocabulary.py "data-source/新批次.xlsx"`，即可自动补满 `list02.json`（剩余 21 条空位）并继续生成 `list03.json` ～ `list90.json` 及更新 `public/data/manifest.json`，已有词条 ID、图片和笔记完全保留。

---

## 二、Windows PowerShell 安装与本地启动说明

安装 Node.js 22+（含 npm/pnpm）和 Python 3.10+，在项目根目录运行：

```powershell
pnpm install
python -m pip install -r requirements.txt
npm run dev
```

- 执行 `npm run dev`（或 `npm run dev:edit`）后会自动打开浏览器访问 `http://127.0.0.1:5174/`（使用 **5174** 端口，避免与 5173 端口冲突），并默认开启本地自动保存模式。
- 在页面顶部点击「图片编辑」即可为词条粘贴（`Ctrl+V`）、拖入或选择添加图片。本地编辑模式下，图片自动写入 `public/images/listXX/`，词条修改自动同步写入 `public/data/listXX.json`。
- `npm run dev:view` 启动纯浏览模式（同样使用 `127.0.0.1:5174`）。
- 暂时没有图片的词条在图文模式、纯文字模式、纯图片模式及看图猜词模式下均正常显示占位提示与覆盖层文字，不产生任何报错。

### 常用检查与测试命令

```powershell
npm run typecheck
npm run lint
npm test
npm run test:browser
python scripts/test_import.py
python scripts/test_append.py
python scripts/validate_data.py
python scripts/test_story.py
npm run story:validate
npm run build
```

---

## 三、导入与追加词汇表

### 1. 整表导入

源文件默认路径为 `data-source/cet4-vocabulary.xlsx`（工作表 `Vocabulary`，九列表头：`单词, 词性, 英式 IPA, 美式 IPA, 汉语意思, 惯用法 / 固定搭配, 搭配的汉语意思, 汉语例句, 英语翻译`）：

```powershell
npm run import
python scripts/validate_data.py
```

### 2. 增量追加新批次

对于新增词汇的九列表格（工作表 `Vocabulary`），使用追加脚本：

```powershell
python scripts/append_vocabulary.py "data-source/新增四级词汇.xlsx"
python scripts/test_append.py
python scripts/validate_data.py
```

追加脚本会先校验全部输入，再自动补满最后一个未满 50 条的 List，之后创建新的 List，保留已有 ID、图片、笔记及顺序。

### 3. 应用浏览器导出的修改包（ZIP）

在非本地写盘模式下，点击顶部「导出修改」会下载 `cet4-modifications.zip`，可通过以下命令安全应用到仓库：

```powershell
python scripts/apply_export.py "$env:USERPROFILE\Downloads\cet4-modifications.zip"
python scripts/validate_data.py
npm run build
```

---

## 四、图片系统与批量生成规则

- 每个词条支持一张主图，推荐使用 **21:9 比例（2100×900）、WebP 格式**。
- 支持图片添加、更换、删除、宽度/固定高度/比例（原图、4:3、1:1、16:9）切换、缩放、旋转、铺满/完整显示、位置调整、大图预览（适应屏幕/放大细节）及导出。
- 批量生成提示词规范见 [CET-4 英语词汇图片批量生成模式 — 全局规则](docs/cet4-image-generation-batch-rules.md)。
- 词汇配图批次清单与状态记录见 [docs/vocabulary-images-20261115.json](docs/vocabulary-images-20261115.json)。
- Story Review 维护说明与场景提示词见 [Story Review 维护说明](docs/story-review.md) 与 [Story Review 场景图片提示词](docs/story-image-prompts.md)。

---

## 五、GitHub Pages 部署配置

1. 在 GitHub 上确保仓库名称为 `seki999/cet4-visual-vocabulary`。
2. 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
3. 推送代码到 `main` 分支后，`.github/workflows/deploy.yml` 会自动执行：
   - Python 数据导入/追加/完整性/故事校验（`test_import.py`、`test_append.py`、`validate_data.py`、`test_story.py`、`story:validate`）
   - TypeScript 类型检查（`pnpm typecheck`）
   - ESLint 代码检查（`pnpm lint`）
   - Vitest 单元测试（`pnpm test`）
   - Vite 生产环境构建（`pnpm build`）并自动发布到 `https://seki999.github.io/cet4-visual-vocabulary/`
4. 项目使用 `base: './'`、统一 `asset()` 路径解析与 `HashRouter`，确保在 `/cet4-visual-vocabulary/` 子路径下 JSON、图片与路由均正常工作。
