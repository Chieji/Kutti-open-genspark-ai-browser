import { type NextRequest, NextResponse } from "next/server"
import { chromium } from "playwright"

interface ScrapeRequest {
  url: string
  selector?: string
  extractText?: boolean
  extractLinks?: boolean
  extractImages?: boolean
}

export async function POST(request: NextRequest) {
  let browser
  try {
    const body: ScrapeRequest = await request.json()
    const { url, selector, extractText = true, extractLinks = false, extractImages = false } = body

    // Launch Playwright browser for web scraping
    browser = await chromium.launch({
      headless: true,
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: "networkidle" })

    const result: any = {
      url,
      title: await page.title(),
      timestamp: new Date().toISOString(),
    }

    // Extract DOM content
    if (extractText) {
      result.text = await page.textContent("body")
      if (selector) {
        result.selectedText = await page.textContent(selector)
      }
    }

    // Extract links
    if (extractLinks) {
      result.links = await page
        .locator("a")
        .all()
        .then((elements) =>
          Promise.all(
            elements.map(async (el) => ({
              text: await el.textContent(),
              href: await el.getAttribute("href"),
            })),
          ),
        )
    }

    // Extract images
    if (extractImages) {
      result.images = await page
        .locator("img")
        .all()
        .then((elements) =>
          Promise.all(
            elements.map(async (el) => ({
              src: await el.getAttribute("src"),
              alt: await el.getAttribute("alt"),
            })),
          ),
        )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[Browser Scrape Error]", error)
    return NextResponse.json({ error: "Failed to scrape content" }, { status: 500 })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
