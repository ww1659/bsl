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

CREATE OR REPLACE FUNCTION get_picking_list_by_item_range(start_date DATE, end_date DATE)
RETURNS TABLE (
  item_id BIGINT,
  item_name VARCHAR,
  item_count BIGINT,
  price NUMERIC,
  order_number INT,
  delivery_date TIMESTAMPTZ,
  order_status order_status,
  order_notes TEXT,
  customer_name VARCHAR,
  group_name VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.item_id,
    i.item_name,
    COUNT(*) AS item_count,
    i.price,
    o.number AS order_number,
    o.delivery_date,
    o.status AS order_status,
    o.notes AS order_notes,
    c.customer_name,
    g.group_name
  FROM
    picking_list p
  JOIN items i ON p.item_id = i.id
  JOIN orders o ON p.order_id = o.id
  LEFT JOIN customers c ON o.customer_id = c.id
  LEFT JOIN groups g ON o.group_id = g.id
  WHERE
    o.delivery_date >= start_date
    AND o.delivery_date <= end_date
  GROUP BY
    p.item_id, i.item_name, i.price, o.number, o.delivery_date, o.status, o.notes, c.customer_name, g.group_name;
END;
$$ LANGUAGE plpgsql;
