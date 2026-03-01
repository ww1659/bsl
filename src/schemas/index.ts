import { z } from 'zod'

export const orderStatusSchema = z.enum([
  'pending',
  'ready',
  'sent',
  'delivered',
  'archived',
])
export type OrderStatus = z.infer<typeof orderStatusSchema>

export const customerSchema = z.object({
  id: z.string(),
  country: z.string().nullable(),
  createdAt: z.string().nullable(),
  customerName: z.string().nullable(),
  deactivatedAt: z.string().nullable().optional(),
  discount: z.number().nullable(),
  email: z.string().nullable(),
  groupId: z.string().nullable(),
  houseNumber: z.string().nullable(),
  isActive: z.boolean().nullable().optional(),
  postcode: z.string().nullable(),
  reference: z.string().nullable(),
  streetName: z.string().nullable(),
  town: z.string().nullable(),
})

export type Customer = z.infer<typeof customerSchema>

export const groupSchema = z.object({
  id: z.string(),
  country: z.string().nullable(),
  createdAt: z.string().nullable(),
  email: z.string().nullable(),
  groupName: z.string(),
  houseNumber: z.string().nullable(),
  postcode: z.string().nullable(),
  standardDiscount: z.number().nullable(),
  streetName: z.string().nullable(),
  town: z.string().nullable(),
})

export type Group = z.infer<typeof groupSchema>

export const itemSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  stock: z.number().nullable().optional(),
  loanedOut: z.number().nullable().optional(),
  createdAt: z.string().nullable().optional(),
})
export type Item = z.infer<typeof itemSchema>

export const orderItemSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable().optional(),
  price: z.number().nullable(),
  quantity: z.number().nullable().optional(),
  loanedOut: z.number().nullable().optional(),
  stock: z.number().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  picked: z.boolean().nullable().optional(),
})
export type OrderItem = z.infer<typeof orderItemSchema>

export const orderSchema = z.object({
  id: z.string(),
  total: z.number().nullable(),
  number: z.number().nullable(),
  deliveryDate: z.string().nullable(),
  status: orderStatusSchema.nullable(),
  notes: z.string().nullable(),
  groupId: z.string().nullable(),
  orderItems: z.array(orderItemSchema).nullish(),
  groupName: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
})
export type Order = z.infer<typeof orderSchema>

export const orderDetailSchema = z.object({
  id: z.string(),
  total: z.number().nullable(),
  number: z.number().nullable(),
  deliveryDate: z.string().nullable(),
  status: orderStatusSchema.nullable(),
  notes: z.string().nullable(),
  discount: z.number().nullable(),
  orderItems: z.array(orderItemSchema).nullish(),
  groups: groupSchema.nullish(),
  customers: customerSchema.nullish(),
})
export type OrderDetail = z.infer<typeof orderDetailSchema>

export const orderItemRowSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  price: z.number().nullable(),
  quantity: z.number().nullable(),
})
export type OrderItemRow = z.infer<typeof orderItemRowSchema>
