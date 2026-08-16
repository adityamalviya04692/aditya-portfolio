import data from '../data/portfolio.json'
import type { PortfolioData } from '../types/portfolio'

/** Single source of truth. Every component reads from here — never hardcode content. */
export function usePortfolio(): PortfolioData {
  return data as PortfolioData
}

/** Vite base-aware asset URL, so paths work on GitHub Pages project sites. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
