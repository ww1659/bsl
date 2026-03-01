import { type ClassValue,clsx } from 'clsx'
import { addDays, format } from 'date-fns'
import { camelCase, mapKeys, snakeCase } from 'lodash'
import { twMerge } from 'tailwind-merge'

import type { OrderItem } from '@/schemas'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatName(name: string) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function toTitleCase(input: string) {
  if (!input) return ''

  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function toSentenceCase(input: string) {
  if (!input) return ''
  return input
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase())
}

export function removeDashes(input: string) {
  return input.replace(/-/g, ' ')
}

export function getStartOfWeek(date: Date, display?: boolean) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return display
    ? format(
        new Date(d.setDate(diff)).toISOString().split('T')[0],
        'eee dd-MMM'
      )
    : new Date(d.setDate(diff)).toISOString().split('T')[0]
}

export function getEndOfWeek(date: Date, display?: boolean) {
  const startOfWeek = getStartOfWeek(date)
  const endOfWeek = new Date(
    new Date(startOfWeek).setDate(new Date(startOfWeek).getDate() + 6)
  )
  return display
    ? format(endOfWeek.toISOString(), 'eee dd-MMM')
    : endOfWeek.toISOString().split('T')[0]
}

export function getWeekRange(date = new Date()) {
  const dayOfWeek = date.getDay()
  const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const dateFrom = new Date(date)
  dateFrom.setDate(date.getDate() + differenceToMonday)
  const dateTo = addDays(dateFrom, 6)
  return { dateFrom, dateTo }
}

export function getMonthRange(date = new Date()) {
  const dateFrom = new Date(date.getFullYear(), date.getMonth(), 1)
  const dateTo = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { dateFrom, dateTo }
}

export function getFourWeekRange(date = new Date()) {
  const dateFrom = addDays(date, -14)
  const dateTo = addDays(date, 14)
  return { dateFrom, dateTo }
}

export function calculateOrderPickedStatus(items: OrderItem[]) {
  const allPicked = items.every((item) => item.picked === true)
  const nonePicked = items.every((item) => item.picked === false)
  if (allPicked) return 'picked'
  if (!nonePicked) return 'partial'
  return 'not picked'
}

export function sortCustomOrder(items: OrderItem[]): OrderItem[] {
  const orderPriority: { [key: string]: number } = {
    'superking bed set': 1,
    'luxury - superking bed set': 2,
    'own - superking bed set': 3,
    'king bed set': 4,
    'luxury - king bed set': 5,
    'own - king bed set': 6,
    'double bed set': 7,
    'luxury - double bed set': 8,
    'own - double bed set': 9,
    'single bed set': 10,
    'luxury - single bed set': 11,
    'own - single bed set': 12,
    'super king mattress protectors': 13,
    'king mattress protectors': 14,
    'double mattress protectors': 15,
    'own - double mattress protectors': 16,
    'single mattress protectors': 17,
    'pillow protectors': 18,
    'bath sheet': 19,
    'own - bath sheet': 20,
    'bath mat': 21,
    'own - bath mat': 22,
    'hand towel': 23,
    'own - hand towel': 24,
    'tea towel': 25,
    'own - tea towel': 26,
    'oven gloves': 27,
    'own - oven glove': 28,
    throw: 29,
    'own - cushion cover': 30,
    'dressing gown': 31,
    'own - dog towel': 32,
  }

  return items.sort((a, b) => {
    const priorityA = orderPriority[a.name?.toLowerCase() ?? ''] || 100
    const priorityB = orderPriority[b.name?.toLowerCase() ?? ''] || 100
    return priorityA - priorityB
  })
}

// Convert object keys from camelCase to snake_case
export const toSnakeCase = <T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> => {
  return mapKeys(obj, (_, key) => snakeCase(key))
}

// Convert object keys from snake_case to camelCase
export const toCamelCase = <T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> => {
  return mapKeys(obj, (_, key) => camelCase(key))
}
