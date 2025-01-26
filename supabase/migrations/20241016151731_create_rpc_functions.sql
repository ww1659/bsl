CREATE OR REPLACE FUNCTION get_weekly_total(start_date DATE, end_date DATE)
RETURNS NUMERIC AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(total)
     FROM orders
     WHERE delivery_date >= start_date
       AND delivery_date <= end_date), 0);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_picking_list_by_date_range(start_date DATE, end_date DATE)
RETURNS TABLE (
  item_id BIGINT,
  item_name VARCHAR,
  total_number BIGINT,
  orders_unpicked JSONB,
  orders_picked JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    oi.item_id,
    i.item_name,
    SUM(oi.quantity) AS total_number,
    COALESCE(JSONB_AGG(DISTINCT CASE WHEN NOT oi.picked THEN JSONB_BUILD_OBJECT(
      'customer_name', c.customer_name,
      'total_unpicked', oi.quantity,
      'order_id', o.id,
      'order_number', o.number
    ) END) FILTER (WHERE NOT oi.picked), '[]') AS orders_unpicked,
    COALESCE(JSONB_AGG(DISTINCT CASE WHEN oi.picked THEN JSONB_BUILD_OBJECT(
      'customer_name', c.customer_name,
      'total_picked', oi.quantity,
      'order_id', o.id,
      'order_number', o.number
    ) END) FILTER (WHERE oi.picked), '[]') AS orders_picked
  FROM
    order_items oi
  JOIN items i ON oi.item_id = i.id
  JOIN orders o ON oi.order_id = o.id
  JOIN customers c ON o.customer_id = c.id
  WHERE
    o.delivery_date >= start_date
    AND o.delivery_date <= end_date
    AND o.status = 'pending'
  GROUP BY
    oi.item_id, i.item_name
  ORDER BY
    i.item_name ASC;  
END;
$$ LANGUAGE plpgsql;



