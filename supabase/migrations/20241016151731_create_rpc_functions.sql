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
  item_count BIGINT,
  picked BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    oi.item_id,
    i.item_name,
    SUM(oi.quantity) AS item_count,
    BOOL_OR(oi.picked) AS picked
  FROM
    order_items oi
  JOIN items i ON oi.item_id = i.id
  JOIN orders o ON oi.order_id = o.id
  WHERE
    o.delivery_date >= start_date
    AND o.delivery_date <= end_date
  GROUP BY
    oi.item_id, i.item_name
  ORDER BY
    i.item_name ASC;  
END;
$$ LANGUAGE plpgsql;



