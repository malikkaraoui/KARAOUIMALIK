import { projects, getProjectBySlug } from './projects'
import { projectsEn } from './projects.en'
import { posts, getPostBySlug } from './posts'
import { postsEn } from './posts.en'

export function getProjectsForLocale(locale) {
  return locale === 'en' ? projectsEn : projects
}

export function getProjectBySlugForLocale(slug, locale) {
  return locale === 'en' ? (projectsEn.find((p) => p.slug === slug) ?? null) : getProjectBySlug(slug)
}

export function getPostsForLocale(locale) {
  return locale === 'en' ? postsEn : posts
}

export function getPostBySlugForLocale(slug, locale) {
  return locale === 'en' ? (postsEn.find((p) => p.slug === slug) ?? null) : getPostBySlug(slug)
}
