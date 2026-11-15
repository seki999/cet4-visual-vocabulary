import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { List } from "../../src/types";

const list01Data: List = JSON.parse(
  readFileSync("public/data/list01.json", "utf8"),
);
const list02Data: List = JSON.parse(
  readFileSync("public/data/list02.json", "utf8"),
);

// Valid 2100x900 WebP test fixture for verifying 21:9 image layout, lightbox, and fullscreen behavior.
const FIXTURE_2100X900_WEBP = Buffer.from(
  "UklGRugOAABXRUJQVlA4INwOAAAQnAGdASo0CIQDPtFosVMoJiSioAgBABoJaW7hd2Efe+B7ABaW" +
    "yclJh9qr8WEGYGbqFqFqELhKZr7ZRJ8WEGYGbqFqFqELhKZr7ZRJ8WEGYGbqFqFqELhKZr7ZRJ8W" +
    "EGYGbXi5v30P3mX9Lxt7zKrTVCox9hRXol2/xRW8fYvN8fEbm/fQ/eZf0vG3vMqtNUKjH2FFeiXb" +
    "/FFbx9i83x8Rub99D95l/S8be8fNyJRAsl2vFych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ" +
    "99snIe+2TkPfbJyHvtk5D32ych+DM1snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHv" +
    "tk5D32ych77ZOQ99snIe+2TkPfbmX6e2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D" +
    "32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99sn" +
    "Ie+2TkPfbJyHvtk5D32ych77ZORJlgTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32" +
    "ych77ZOQ99snIe+2TkPfbJyHvtk6LstPbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32yc" +
    "h77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2" +
    "TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D3" +
    "2ych77ZOQ99snIe+2TkPfbJyHvtmMtPbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych" +
    "77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2T" +
    "kPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32" +
    "ych77ZOQ99snIe+2TkPfbJyHvtlAy8XJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych7" +
    "7ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2Tk" +
    "PfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32y" +
    "ch77ZOQ99snIe+2TkPfbJyHvtk5xEXJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77" +
    "ZOQ99snIe+2TkPfbJyHvtk5D3251N4uTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D3" +
    "2ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snI" +
    "e+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk" +
    "5D32ych77ZOQ99snIe+2TkPfbJziIuTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32" +
    "ych77ZOQ99snIe+2TkPfbJyHvtzqbxcnIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHv" +
    "tk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ" +
    "99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJ" +
    "yHvtk5D32ych77ZOQ99snIe+2TnERcnIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvt" +
    "k5D32ych77ZOQ99snIe+2TkPfbnU3i5OQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPf" +
    "bJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych" +
    "77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2T" +
    "kPfbJyHvtk5D32ych77ZOQ99snOIi5OQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfb" +
    "JyHvtk5D32ych77ZOQ99snIe+3OpvFych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+" +
    "2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D" +
    "32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99sn" +
    "Ie+2TkPfbJyHvtk5D32ych77ZOcRFych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2" +
    "TkPfbJyHvtk5D32ych77ZOQ99udTeLk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99" +
    "snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyH" +
    "vtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZO" +
    "Q99snIe+2TkPfbJyHvtk5D32yc4iLk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99s" +
    "nIe+2TkPfbJyHvtk5D32ych77c6m8XJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77" +
    "ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkP" +
    "fbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32yc" +
    "h77ZOQ99snIe+2TkPfbJyHvtk5xEXJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77Z" +
    "OQ99snIe+2TkPfbJyHvtk5D3251N4uTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32" +
    "ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe" +
    "+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5" +
    "D32ych77ZOQ99snIe+2TkPfbJziIuTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32y" +
    "ch77ZOQ99snIe+2TkPfbJyHvtzqbxcnIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvt" +
    "k5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ9" +
    "9snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJy" +
    "Hvtk5D32ych77ZOQ99snIe+2TnERcnIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk" +
    "5D32ych77ZOQ99snIe+2TkPfbnU3i5OQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfb" +
    "JyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych7" +
    "7ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2Tk" +
    "PfbJyHvtk5D32ych77ZOQ99snOIi5OQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJ" +
    "yHvtk5D32ych77ZOQ99snIe+3OpvFych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2" +
    "TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D3" +
    "2ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snI" +
    "e+2TkPfbJyHvtk5D32ych77ZOcRFych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2T" +
    "kPfbJyHvtk5D32ych77ZOQ99YAD+/6oK/9JxjN1pr2F/aT15Bvs1+uiq+vIN9mv10VX15Bvs1+ui" +
    "q+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX1" +
    "5Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN" +
    "9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1+uiq+vIN9mv10VX15Bvs1" +
    "+uiq+vIN9mv1vJiy4tJOhQAAAAAAAAAGzigoAABQOV4AAAXr3+iYEAABfeuBAAAAAAADkfroPgAA" +
    "H1zYEAAAAAAAOF+hQAACo5sCAAAAAAAJV+hQAACo5sCAAAAAAAJV+hQAAC+rgAAFj64EAAAAAAAS" +
    "r9CgAAF9XAAALH1wIAAAAAAAlX6FAAAL6uAAAWPrgQAAAAAABKv0KAAAX1cAAAsfXAgAAAAAACVf" +
    "oUAAAvq4AABY+uBAAAAAAAEq/QoAABfVwAACx9cCAAAAAAAJV+hQAAC+rgAAFj64EAAAAAAASr9C" +
    "gAAF9XAAALH1wIAAAAAAAlX6FAAAL6uAAAWPrgQAAAAAABKv0KAAAX1cAAAsfXAgAAAAAACVfoUA" +
    "AAAAAAA=",
  "base64",
);

async function mockList01Images(page: Page) {
  const populated: List = {
    ...list01Data,
    items: list01Data.items.map((w) => ({
      ...w,
      images: [
        {
          id: `${w.id}-img`,
          src: `images/list01/${w.id}.webp`,
          alt: w.word,
          widthPercent: 100,
          height: 300,
          objectFit: "contain",
          objectPosition: "center",
          rotation: 0,
          zoom: 1,
        },
      ],
    })),
  };
  await page.route("**/data/list01.json", (r) => r.fulfill({ json: populated }));
  await page.route("**/images/list01/*.webp", (r) =>
    r.fulfill({ contentType: "image/webp", body: FIXTURE_2100X900_WEBP }),
  );
}

test("CET-4 vocabulary lists load and both illustrated and non-illustrated words display cleanly", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (e) => pageErrors.push(String(e)));

  const list01WithImg = list01Data.items.filter(
    (w) => w.images.length > 0,
  ).length;
  const list01Empty = list01Data.items.length - list01WithImg;
  const list02WithImg = list02Data.items.filter(
    (w) => w.images.length > 0,
  ).length;
  const list02Empty = list02Data.items.length - list02WithImg;

  await page.goto("/");
  await expect(page.locator(".brand")).toContainText("CET-4");
  await expect(page.locator(".card")).toHaveCount(50);
  await expect(page.locator(".word-content h2").first()).toContainText(
    "strive",
  );
  await expect(page.locator(".word-content h2").last()).toContainText("roar");
  await expect(page.locator(".picture img")).toHaveCount(list01WithImg);
  await expect(page.locator(".empty-image")).toHaveCount(list01Empty);
  if (list01WithImg > 0) {
    await expect
      .poll(async () =>
        page
          .locator(".picture img")
          .first()
          .evaluate((img: HTMLImageElement) =>
            img.complete
              ? `${img.naturalWidth}x${img.naturalHeight}`
              : "loading",
          ),
      )
      .toBe("2100x900");
  }

  await page.getByRole("button", { name: "List 02", exact: false }).click();
  await expect(page.locator(".card")).toHaveCount(29);
  await expect(page.locator(".word-content h2").first()).toContainText(
    "worthwhile",
  );
  await expect(page.locator(".word-content h2").last()).toContainText("hatred");
  await expect(page.locator(".picture img")).toHaveCount(list02WithImg);
  await expect(page.locator(".empty-image")).toHaveCount(list02Empty);
  expect(pageErrors).toEqual([]);
});

test("narrow portrait controls fit and can be hidden while reading text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.addInitScript(() =>
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        getVoices: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        cancel: () => {},
        pause: () => {},
        resume: () => {},
        speak: () => {},
      },
    }),
  );
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await page.getByRole("button", { name: "纯文字", exact: true }).click();
  await page.getByRole("button", { name: "播放", exact: true }).click();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  for (const label of ["暂停", "下一条", "停止", "隐藏播放控制"]) {
    const box = await page
      .getByRole("button", { name: label, exact: true })
      .boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }
  await page.getByRole("button", { name: "隐藏播放控制" }).click();
  await expect(page.locator(".player-bar")).toBeHidden();
  await expect(page.locator("main")).toHaveCSS("height", "700px");
  await page.locator(".card.current h2").click();
  await expect(page.locator(".player-bar")).toBeVisible();
  await page.getByRole("button", { name: "停止", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("已停止");
});

test("landscape playback hides controls and gives the current image the available screen", async ({
  page,
}) => {
  await mockList01Images(page);
  await page.setViewportSize({ width: 800, height: 300 });
  await page.addInitScript(() =>
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        getVoices: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        cancel: () => {},
        pause: () => {},
        resume: () => {},
        speak: () => {},
      },
    }),
  );
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await page.getByRole("button", { name: "纯图片", exact: true }).click();
  await page.getByRole("button", { name: "播放", exact: true }).click();
  await expect(page.locator(".app")).toHaveClass(/image-focus/);
  await expect(page.locator(".card:visible")).toHaveCount(1);
  const image = page.locator(".card.current .picture img");
  await expect
    .poll(() =>
      image.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  const withControls = await image.boundingBox();
  expect(withControls!.height).toBeGreaterThan(190);
  await expect(page.locator(".player-bar")).toBeHidden({ timeout: 7000 });
  const hidden = await image.boundingBox();
  expect(hidden!.height).toBeGreaterThan(270);
  expect(hidden!.y).toBeGreaterThanOrEqual(0);
  expect(hidden!.y + hidden!.height).toBeLessThanOrEqual(300);
  await page.screenshot({ path: "test-results/landscape-playback-hidden.png" });
  await image.click();
  await expect(page.locator(".player-bar")).toBeVisible();
  await expect(page.locator(".player-word small").first()).toContainText(
    "1 / 50",
  );
  await page.getByRole("button", { name: "隐藏播放控制" }).click();
  await expect(page.locator(".player-bar")).toBeHidden();
  await page.getByRole("button", { name: "显示播放控制" }).click();
  await expect(page.locator(".player-bar")).toBeVisible();
  await page.getByRole("button", { name: "暂停", exact: true }).click();
  await expect(page.locator(".player-bar")).toBeVisible();
  await page.getByRole("button", { name: "停止", exact: true }).click();
  await expect(page.locator(".app")).not.toHaveClass(/image-focus/);
  await expect(page.locator(".card:visible")).toHaveCount(50);
});

for (const [name, width, height] of [
  ["phone-text-landscape", 844, 390],
  ["phone-text-portrait", 390, 844],
  ["tablet-text", 1024, 768],
] as const) {
  test(`${name}: text scrolls above the player without being covered`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator(".card")).toHaveCount(50);
    await page.getByRole("button", { name: "纯文字", exact: true }).click();
    const main = await page.locator("main").boundingBox(),
      bar = await page.locator(".player-bar").boundingBox();
    expect(main!.y + main!.height).toBeLessThanOrEqual(bar!.y);
    await expect(page.locator("main")).toHaveCSS("overflow-y", "auto");
    const last = page.locator(".card").first().locator(".field-example-zh");
    await last.evaluate((el) =>
      el.scrollIntoView({ block: "end", behavior: "instant" }),
    );
    const field = await last.boundingBox();
    expect(field!.y + field!.height).toBeLessThanOrEqual(bar!.y);
    await page.screenshot({ path: `test-results/${name}.png` });
  });
}

for (const [device, width, height] of [
  ["phone-landscape", 844, 390],
  ["tablet-landscape", 1024, 768],
  ["phone-short-landscape", 800, 300],
] as const) {
  test(`${device}: picture fits above compact playback controls`, async ({
    page,
  }) => {
    await mockList01Images(page);
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator(".card")).toHaveCount(50);
    await page.getByRole("button", { name: "纯图片", exact: true }).click();
    const card = page.locator(".card").first(),
      image = card.locator(".picture img");
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await card.evaluate((el) =>
      el.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    const rect = await image.boundingBox(),
      bar = await page.locator(".player-bar").boundingBox();
    expect(rect!.y).toBeGreaterThanOrEqual(0);
    expect(rect!.y + rect!.height).toBeLessThanOrEqual(bar!.y);
    expect(rect!.height).toBeLessThan(height - 120);
    if (height < 600) expect(bar!.height).toBeLessThanOrEqual(60);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `test-results/${device}.png` });
    await page.getByRole("button", { name: "切换列表菜单" }).click();
    await expect(page.locator(".sidebar")).toHaveClass(/open/);
    await page.getByRole("button", { name: "List 02", exact: false }).click();
    await expect(page.locator("h1")).toContainText("List 02");
  });
}

test("mobile and tablet images keep their original ratio and offer a usable viewer", async ({
  page,
}) => {
  await mockList01Images(page);
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const image = page.locator(".card").first().locator(".picture img");
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const sizes = await image.evaluate((img: HTMLImageElement) => ({
      ratio: img.clientWidth / img.clientHeight,
      natural: img.naturalWidth / img.naturalHeight,
    }));
    expect(Math.abs(sizes.ratio - sizes.natural)).toBeLessThan(0.02);
    const card = page.locator(".card").first();
    const text = await card.locator(".word-content").boundingBox(),
      picture = await card.locator(".image-area").boundingBox();
    expect(picture!.y).toBeGreaterThanOrEqual(text!.y + text!.height - 1);
    await card.getByRole("button", { name: "查看大图" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator(".lightbox")).toHaveCSS(
      "background-color",
      "rgb(17, 26, 23)",
    );
    await page.getByRole("button", { name: "放大细节" }).click();
    await expect(page.locator(".lightbox-stage")).toHaveClass(/zoomed/);
    await page.getByRole("button", { name: "适应屏幕" }).click();
    await expect(page.locator(".lightbox-stage")).not.toHaveClass(/zoomed/);
    await page.screenshot({ path: `test-results/image-viewer-${width}.png` });
    await page.getByRole("button", { name: "关闭大图" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});

test("playback focus, pause and rapid list cancellation", async ({ page }) => {
  await page.addInitScript(() => {
    let pending: SpeechSynthesisUtterance | undefined;
    (window as any).__finishSpeech = () =>
      pending?.onend?.({} as SpeechSynthesisEvent);
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        getVoices: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        cancel: () => {
          pending = undefined;
        },
        pause: () => {},
        resume: () => {},
        speak: (u: SpeechSynthesisUtterance) => {
          pending = u;
        },
      },
    });
  });
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await page.getByRole("button", { name: "朗读设置", exact: true }).click();
  await page.getByRole("button", { name: "只读单词", exact: true }).click();
  await page.getByLabel("字段间隔 (毫秒)").fill("0");
  await page.getByLabel("词条间隔 (毫秒)").fill("0");
  await page.getByRole("button", { name: "播放", exact: true }).click();
  await expect(page.locator(".card").first()).toContainText("正在朗读");
  await page.evaluate(() => (window as any).__finishSpeech());
  await expect(page.locator(".card").nth(1)).toContainText("正在朗读");
  await expect(page.locator(".progress strong")).toHaveText("02 / 50");
  await expect(page.locator(".player-word small").first()).toContainText(
    "2 / 50",
  );
  await page.getByRole("button", { name: "暂停", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "恢复播放", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "恢复播放", exact: true }).click();
  await page.getByRole("button", { name: "停止", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("已停止");
  await expect(page.locator(".progress strong")).toHaveText("01 / 50");
  await expect(page.locator(".player-word small").first()).toContainText(
    "1 / 50",
  );
  await expect(page.locator(".card").first()).toHaveClass(/current/);
  await expect(
    page.getByRole("button", { name: "恢复播放", exact: true }),
  ).toHaveCount(0);
  await page.evaluate(() => (window as any).__finishSpeech());
  await expect(page.getByRole("status")).toHaveText("已停止");
  await page.getByRole("button", { name: "播放", exact: true }).click();
  await expect(page.locator(".card").first()).toContainText("正在朗读");
  await page.getByRole("button", { name: "List 02", exact: false }).click();
  await expect(page.locator("h1")).toContainText("List 02");
  await page.evaluate(() => (window as any).__finishSpeech());
  await expect(
    page.getByRole("button", { name: "播放", exact: true }),
  ).toBeVisible();
});

test("selecting a word while stopped updates the saved learning position", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await page.locator(".card").nth(4).locator("h2").click();
  await expect(page.locator(".progress strong")).toHaveText("05 / 50");
  await expect(page.locator(".card").nth(4)).toHaveClass(/current/);
  await expect(page.locator(".player-word small").first()).toContainText(
    "5 / 50",
  );
  await expect(page.getByRole("status")).toHaveText("已停止");
  await page.reload();
  await expect(page.locator(".progress strong")).toHaveText("05 / 50");
});

test("lists, modes, search and read-only hosted controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await expect(page.locator(".word-content h2").first()).toContainText(
    "strive",
  );
  await page.getByRole("button", { name: "List 02", exact: false }).click();
  await expect(page.locator("h1")).toContainText("List 02");
  await expect(page.locator(".card")).toHaveCount(29);
  await page.getByRole("button", { name: "纯文字", exact: true }).click();
  await expect(page.locator(".image-area")).toHaveCount(0);
  await page.getByRole("button", { name: "纯图片", exact: true }).click();
  await expect(page.locator(".word-content")).toHaveCount(0);
  await expect(page.locator(".image-area")).toHaveCount(29);
  await page.getByRole("button", { name: "图文", exact: true }).click();

  // This webServer runs Vite without --mode edit: project writing
  // and image editing must be disabled outside the local editor.
  await expect(page.getByRole("button", { name: "图片编辑" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "保存到项目" })).toBeDisabled();

  await page.getByRole("textbox", { name: "搜索词汇" }).fill("farm");
  await expect(page.locator(".search-results button")).toHaveCount(2);
  await page.locator(".search-results button").first().click();
  await expect(page.locator("h1")).toContainText("List 01");
});

for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["tablet", 768, 1024],
  ["mobile", 390, 844],
] as const) {
  test(`${name} layout fits viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator(".card")).toHaveCount(50);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/${name}.png`,
      fullPage: false,
    });
    if (width < 800) {
      await page.getByRole("button", { name: "切换列表菜单" }).click();
      await expect(page.locator(".sidebar")).toHaveClass(/open/);
      await page.getByRole("button", { name: "List 02", exact: false }).click();
      await expect(page.locator(".card")).toHaveCount(29);
    }
  });
}

test("image IPA can be enabled, remembered and hidden; old reading defaults upgrade", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("cet4-settings-v1"))
      localStorage.setItem(
        "cet4-settings-v1",
        JSON.stringify({
          version: 3,
          state: {
            listId: "list01",
            positions: {},
            settings: {
              order: ["word", "example.en"],
              overlay: ["meaning"],
              imageIpa: false,
              enRate: 1.1,
              zhRate: 1.4,
            },
          },
        }),
      );
  });
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await page.getByRole("button", { name: "纯图片", exact: true }).click();
  await expect(page.locator(".image-ipa")).toHaveCount(0);
  await page.getByRole("button", { name: "显示设置", exact: true }).click();
  await page.getByLabel("纯图片显示国际音标（UK / US）").check();
  await expect(page.locator(".image-ipa").first()).toContainText("UK");
  await expect(page.locator(".image-ipa").first()).toContainText("US");
  await page.reload();
  await expect(page.locator(".image-ipa").first()).toBeVisible();
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("cet4-settings-v1")!).state.settings,
  );
  expect(saved.order).toEqual([
    "word",
    "meaning",
    "collocation.en",
    "collocation.zh",
    "example.en",
    "example.zh",
  ]);
  expect(saved.enRate).toBe(1.1);
  expect(saved.zhRate).toBe(1.4);
  await page.getByRole("button", { name: "显示设置", exact: true }).click();
  await page.getByLabel("纯图片显示国际音标（UK / US）").uncheck();
  await expect(page.locator(".image-ipa")).toHaveCount(0);
});

test("desktop fullscreen image playback fills screen and hides controls", async ({
  page,
}) => {
  await mockList01Images(page);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.addInitScript(() =>
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        getVoices: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        cancel: () => {},
        pause: () => {},
        resume: () => {},
        speak: () => {},
      },
    }),
  );
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(50);
  await page.getByRole("button", { name: "纯图片", exact: true }).click();
  await page.getByRole("button", { name: "进入全屏", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => !!document.fullscreenElement))
    .toBe(true);
  await page.getByRole("button", { name: "播放", exact: true }).click();
  await expect(page.locator(".card:visible")).toHaveCount(1);
  await expect(page.locator(".sidebar")).toBeHidden();
  const img = page.locator(".card.current .picture img").first();
  await expect(img).toHaveCSS("object-fit", "contain");
  const box = await img.boundingBox();
  const size = await page.evaluate(() => ({ w: innerWidth, h: innerHeight }));
  expect(box!.x).toBe(0);
  expect(box!.y).toBe(0);
  expect(box!.width).toBe(size.w);
  expect(box!.height).toBe(size.h);
  await expect(page.locator(".player-bar")).toBeHidden({ timeout: 7000 });
  await img.click();
  await expect(page.locator(".player-bar")).toBeVisible();
  await page.getByRole("button", { name: "下一条", exact: true }).click();
  await expect(page.locator(".player-word small").first()).toContainText(
    "2 / 50",
  );
  await page.getByRole("button", { name: "停止", exact: true }).click();
  await expect(page.locator(".card:visible")).toHaveCount(50);
  await page
    .getByRole("button", { name: "退出全屏", exact: true })
    .first()
    .click();
  await expect
    .poll(() => page.evaluate(() => !!document.fullscreenElement))
    .toBe(false);
});

test("default image overlay groups word IPA meaning and collocations in red", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.addInitScript(() => {
    if (!localStorage.getItem("cet4-settings-v1"))
      localStorage.setItem(
        "cet4-settings-v1",
        JSON.stringify({
          version: 4,
          state: {
            listId: "list01",
            positions: {},
            settings: {
              overlay: ["word"],
              imageIpa: false,
              overlayColor: "#ffffff",
              enRate: 1.1,
            },
          },
        }),
      );
  });
  await page.goto("/");
  await page.getByRole("button", { name: "纯图片", exact: true }).click();
  const overlay = page.locator(".card .overlay").first();
  await expect(overlay).toHaveCSS("color", "rgb(255, 77, 79)");
  await expect(overlay.locator(".overlay-row")).toHaveCount(4);
  const rows = overlay.locator(".overlay-row");
  expect(
    await rows
      .nth(0)
      .locator("[data-field]")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("data-field"))),
  ).toEqual(["word", "meaning"]);
  await expect(rows.nth(0).locator(".image-ipa")).toBeVisible();
  expect(
    await rows
      .nth(1)
      .locator("[data-field]")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("data-field"))),
  ).toEqual(["collocation.en", "collocation.zh"]);
  expect(
    await overlay
      .locator("[data-field]")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("data-field"))),
  ).toEqual([
    "word",
    "meaning",
    "collocation.en",
    "collocation.zh",
    "example.en",
    "example.zh",
  ]);
  const word = await rows.nth(0).locator('[data-field="word"]').boundingBox();
  const ipa = await rows.nth(0).locator(".image-ipa").boundingBox();
  const meaning = await rows
    .nth(0)
    .locator('[data-field="meaning"]')
    .boundingBox();
  expect(word!.x).toBeLessThan(ipa!.x);
  expect(ipa!.x).toBeLessThan(meaning!.x);
  expect(Math.abs(word!.y - meaning!.y)).toBeLessThan(2);
  await overlay.scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/image-overlay-grouped.png" });
  await page.reload();
  await expect(page.locator(".card .overlay").first()).toHaveCSS(
    "color",
    "rgb(255, 77, 79)",
  );
});
