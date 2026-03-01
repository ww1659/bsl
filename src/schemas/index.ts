import { z } from 'zod'

export const orderStatusSchema = z.enum([
  'pending',
  'ready',
  'sent',
  'delivered',
  'archived',
])
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const customerSchema = z.object({
  id: z.string(),
  country: z.string().nullable(),
  created_at: z.string().nullable(),
  customer_name: z.string().nullable(),
  deactivated_at: z.string().nullable().optional(),
  discount: z.number().nullable(),
  email: z.string().nullable(),
  group_id: z.string().nullable(),
  house_number: z.string().nullable(),
  is_active: z.boolean().nullable().optional(),
  postcode: z.string().nullable(),
  reference: z.string().nullable(),
  street_name: z.string().nullable(),
  town: z.string().nullable(),
})
export type Customer = z.infer<typeof customerSchema>;

export const groupSchema = z.object({
  id: z.string(),
  country: z.string().nullable(),
  created_at: z.string().nullable(),
  email: z.string().nullable(),
  group_name: z.string(),
  house_number: z.string().nullable(),
  postcode: z.string().nullable(),
  standard_discount: z.number().nullable(),
  street_name: z.string().nullable(),
  town: z.string().nullable(),
})
export type Group = z.infer<typeof groupSchema>;

export const itemSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  stock: z.number().nullable().optional(),
  loanedOut: z.number().nullable().optional(),
  createdAt: z.string().nullable().optional(),
})
export type Item = z.infer<typeof itemSchema>;

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
export type OrderItem = z.infer<typeof orderItemSchema>;

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
export type Order = z.infer<typeof orderSchema>;
