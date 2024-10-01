WITH inserted_groups AS (
    insert into
    public.groups (group_name, house_number, street_name, town, postcode, country, email, standard_discount)
    values
    ('orange roofs', '', 'park avenue', 'st ives', 'tr262dn', 'uk', 'orangeroofs@gmail.com', 10),
    ('aspects holidays', '', 'the wharf', 'st ives', 'tr261pu', 'uk', 'stives.invoices@aspects.co.uk', 0),
    ('so st ives holidays', '9', 'menhyr park', 'carbis bay, st ives', 'tr262gw', 'uk', 'alan@sostives.co.uk', 10), 
    ('carbis bay holidays', '', 'st ives Road', 'carbis bay, st ives', 'tr262rt', 'uk', 'carbisbay@gmail.com', 7.5) 
    returning id, group_name
),

inserted_customers AS (
    insert into
    public.customers (customer_name, house_number, street_name, town, postcode, country, email, reference, discount, group_id)
    values
    ('hillcrest', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('parc owles', '', 'casita serena', 'parc owles, carbis bay', 'tr262re', 'uk', '', 'parc owles design & development ltd', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('ch1', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('ch2', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('glas mor', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('20 barnaloft', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('atlantic blue', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('coastal seascape ', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('tinhay april throw', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('tinhay', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('zennor', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('15 digey', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('lahaina', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('6 sunnyside', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('artists light', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('18 tc', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('rose cottage', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('ocean seascape', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('treloweth', '53', 'higher bosskerris', 'carbis bay', 'tr262tl', 'uk', '', 'st ives housekeeping co', 0, NULL),
    ('kiama', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('ahoy there', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('harbour beach cottage', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('barnoon villa', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('painters', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('shearwater', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('4 salt', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('porthia penthouse', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('old boswednack', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('enys cottage', '', 'park avenue', 'st ives', 'tr262dn', 'uk', '', 'orange roofs', 0, (select id from inserted_groups where group_name = 'orange roofs')),
    ('16 ros lyn', '', '', '', '', 'uk', 'tomjterry89@gmail.com', 'thomas terry', 0, (select id from inserted_groups where group_name = 'aspects holidays')),
    ('foxgloves', '', '', '', '', 'uk', 'foxgloves.carbisbay@gmail.com', 'john and david foxgloves', 0, (select id from inserted_groups where group_name = 'aspects holidays')),
    ('18 virgin st', '', '', '', '', 'uk', 'mackieainslie@gmail.com', 'ainsley fowler', 0, (select id from inserted_groups where group_name = 'aspects holidays')),
    ('ocean view', '', '', '', '', 'uk', 'kateydeseta@yahoo.co.uk', 'sally deseta', 0, (select id from inserted_groups where group_name = 'aspects holidays')),
    ('cobbles', '', '', '', '', 'uk', 'stives.invoices@aspects.co.uk', 'aspects holidays (st ives)', 0, (select id from inserted_groups where group_name = 'aspects holidays')),
    ('garden house', '', '', '', '', 'uk', 'kateydeseta@yahoo.co.uk', 'kate deseta', 0, (select id from inserted_groups where group_name = 'aspects holidays')),
    ('beachcroft', '', 'st ives road', 'carbis bay', 'tr262rt', 'uk', '', 'carbis bay holidays', 0, (select id from inserted_groups where group_name = 'carbis bay holidays')),
    ('pebbles', '', 'st ives road', 'carbis bay', 'tr262rt', 'uk', '', 'carbis bay holidays', 0, (select id from inserted_groups where group_name = 'carbis bay holidays')),
    ('mincarlo', '', 'st ives road', 'carbis bay', 'tr262rt', 'uk', '', 'carbis bay holidays', 0, (select id from inserted_groups where group_name = 'carbis bay holidays')),
    ('toms', '', 'st ives road', 'carbis bay', 'tr262rt', 'uk', '', 'carbis bay holidays', 0, (select id from inserted_groups where group_name = 'carbis bay holidays')),
    ('bayview', '', 'st ives road', 'carbis bay', 'tr262rt', 'uk', '', 'carbis bay holidays', 0, (select id from inserted_groups where group_name = 'carbis bay holidays')),
    ('lighthouse', '', 'st ives road', 'carbis bay', 'tr262rt', 'uk', '', 'carbis bay holidays', 0, (select id from inserted_groups where group_name = 'carbis bay holidays')),
    ('hawkes view', '', 'hawkes view', 'pannier lane, carbis bay', 'tr262rf', 'uk', '', 'chris cooper', 0, (select id from inserted_groups where group_name = 'so st ives holidays')),
    ('8 salt', '', 'no 8 salt', 'belyars lane, st ives', 'tr262bz', 'uk', '', 'wendy cooper', 0, (select id from inserted_groups where group_name = 'so st ives holidays')),
    ('riviere', '26', 'wheal alfred road', 'hayle, ', 'tr275ju', 'uk', '', 'jane marks', 0, (select id from inserted_groups where group_name = 'so st ives holidays')),
    ('flat 1&2 rhymey ', '', '', '', '', 'uk', '', '', 0, NULL),
    ('1 sunnyside', '1', 'sunnyside', 'back road east, st ives', 'tr261pe', 'uk', '', 'di pollock', 0, NULL),
    ('tor-mewan', '', 'tor-mewan', 'higher trewidden road, st ives', 'tr262dp', 'uk', '', 'amanda fox', 0, NULL),
    ('green clean', '', 'wheal venture rd', 'carbis bay', 'tr262pq', 'uk', '', 'victoria read', 0, NULL),
    ('topaz', '', 'wheal venture rd', 'carbis bay', 'tr262pq', 'uk', '', 'harbour housekeeping', 0, NULL),
    ('serena', '', 'wheal venture rd', 'carbis bay', 'tr262pq', 'uk', '', 'harbour housekeeping', 0, NULL),
    ('10 windsor', '10', 'windsor terrace', 'penzance', 'tr182px', 'uk', '', 'susie huntington', 0, NULL),
    ('woodstock', '', 'woodstock glamping', 'woodstock house, rosudgeon', 'tr209qa', 'uk', '', 'sarah arrowsmith', 0, NULL),
    ('uplands', '', 'uplands,', 'chy-an-dour road,, praa sands.', 'tr209sy', 'uk', '', 'jane adams', 0, NULL),
    ('suncroft', '6', 'broadwalk,', 'helston', 'tr130dj', 'uk', '', 'davina cox', 0, NULL),
    ('stone croft', '', 'stone croft', 'praa sands', 'tr209ta', 'uk', '', 'sue cassettari', 0, NULL),
    ('kenegie', '', 'kenegie home farm', 'gulval, cornwall', 'tr208yn', 'uk', '', 'noelle rorke', 0, NULL),
    ('miramar', '', '', '', '', 'uk', 'stives.invoices@aspects.co.uk', 'aspects holidays', 0, NULL),
    ('wayside', '3', 'fraddam road', 'hayle', 'tr275ew', 'uk', '', 'louise dean', 0, NULL),
    ('clodgy', '3', 'clodgy view', 'st ives', 'tr261jg', 'uk', '', 'emma smith', 0, NULL),
    ('8 barnaloft', '8', 'barnaloft', 'st ives, ', '', 'uk', '', 'tamsyn williams', 0, NULL),
    ('tinners arms', '', 'the tinners arms', 'zennor, st ives', 'tr263by', 'uk', '', 'the white house', 0, NULL)
    returning id, customer_name
)

insert into
public.standard_order (customer_id, order_name)
select id, 'default' 
from inserted_customers;

insert into
public.items (item_name, price, stock, loaned_out)
values
('superking bed set', 11.89, 100, 20),
('king bed set', 10.01, 90, 13),
('double bed set', 10.01, 88, 12),
('single bed set', 7.80, 120, 33),
('pillow protectors', 2.25, 25, 2),
('single mattress protectors', 2.50, 10, 2),
('double mattress protectors', 3.50, 10, 2),
('king mattress protectors', 3.50, 10, 2),
('super king mattress protectors', 3.50, 10, 2),
('bath sheet', 2.37, 50, 17),
('bath mat', 2.25, 50, 13),
('hand towel', 1.19, 112, 56),
('tea towel', 0.71, 120, 73),
('oven gloves', 1.19, 30, 5),
('cushion cover', 2.70, 10, 0),
('throw', 4.86, 12, 1),
('dressing gown', 4.32, 20, 10),
('dog towel', 2.05, 10, 5);

insert into
public.order_items (standard_order_id, item_id, quantity)
values
(1, 5, 1),
(1, 6, 1),
(1, 7, 1),
(1, 8, 1),
(2, 1, 1),
(2, 2, 1),
(2, 3, 1),
(2, 4, 1),
(2, 10, 4),
(2, 12, 4),
(2, 11, 3),
(2, 13, 1),
(2, 14, 1),
(2, 7, 1),
(2, 5, 1),
(3, 1, 1),
(3, 2, 1),
(3, 3, 1),
(3, 4, 1),
(3, 10, 1),
(3, 12, 1),
(3, 11, 1),
(3, 7, 1),
(3, 13, 1),
(3, 14, 1),
(4, 2, 1),
(4, 4, 2),
(4, 10, 4),
(4, 12, 4),
(4, 11, 1),
(4, 6, 1),
(4, 5, 1),
(4, 13, 2),
(4, 14, 1),
(5, 2, 1),
(5, 3, 1),
(5, 10, 1),
(5, 12, 1),
(5, 11, 1),
(5, 6, 1),
(5, 5, 1),
(5, 13, 1),
(5, 14, 1),
(6, 1, 1),
(6, 2, 1),
(6, 10, 4),
(6, 12, 4),
(6, 11, 2),
(6, 13, 2),
(6, 14, 1),
(7, 1, 1),
(7, 2, 1),
(7, 4, 1),
(7, 10, 1),
(7, 12, 1),
(7, 11, 1),
(7, 13, 1),
(7, 14, 1),
(7, 5, 1),
(7, 6, 1),
(7, 15, 1),
(8, 7, 1),
(8, 5, 1),
(9, 16, 1),
(10, 1, 1),
(10, 2, 1),
(10, 3, 1),
(10, 4, 1),
(10, 10, 2),
(10, 12, 2),
(10, 11, 1),
(10, 13, 2),
(10, 14, 1),
(11, 1, 1),
(11, 2, 1),
(11, 3, 2),
(11, 4, 1),
(11, 10, 4),
(11, 12, 4),
(11, 11, 2),
(11, 13, 2),
(11, 7, 1),
(11, 6, 1),
(11, 5, 1),
(11, 14, 1),
(12, 2, 1),
(12, 10, 2),
(12, 12, 2),
(12, 13, 2),
(12, 17, 2),
(13, 1, 2),
(13, 2, 1),
(13, 3, 1),
(13, 4, 2),
(13, 10, 8),
(13, 12, 8),
(13, 11, 3),
(13, 13, 2),
(13, 7, 1),
(13, 6, 1),
(13, 5, 1),
(13, 14, 1),
(14, 1, 1),
(14, 2, 2),
(14, 3, 1),
(14, 4, 1),
(14, 10, 3),
(14, 12, 3),
(14, 11, 2),
(14, 13, 2),
(14, 7, 1),
(14, 6, 1),
(14, 5, 1),
(14, 14, 1),
(15, 1, 1),
(15, 2, 1),
(15, 3, 1),
(15, 4, 1),
(15, 10, 1),
(15, 12, 1),
(15, 11, 1),
(15, 13, 1),
(15, 18, 1),
(15, 16, 1),
(15, 7, 1),
(15, 6, 1),
(15, 5, 1),
(15, 14, 1),
(16, 1, 1),
(16, 2, 1),
(16, 3, 1),
(16, 4, 1),
(16, 10, 1),
(16, 12, 1),
(16, 11, 1),
(16, 13, 1),
(16, 7, 1),
(16, 6, 1),
(16, 5, 1),
(16, 14, 1),
(17, 1, 1),
(17, 2, 1),
(17, 3, 1),
(17, 4, 1),
(17, 10, 1),
(17, 12, 1),
(17, 11, 1),
(17, 13, 1),
(17, 7, 1),
(17, 6, 1),
(17, 5, 1),
(17, 14, 1),
(18, 1, 1),
(18, 2, 1),
(18, 3, 1),
(18, 4, 1),
(18, 10, 1),
(18, 12, 1),
(18, 11, 1),
(18, 13, 1),
(18, 15, 1),
(18, 7, 1),
(18, 6, 1),
(18, 5, 1),
(18, 14, 1),
(19, 2, 1),
(19, 3, 1),
(19, 4, 1),
(19, 10, 1),
(19, 12, 1),
(19, 11, 1),
(19, 13, 1),
(19, 14, 1),
(19, 7, 1),
(20, 1, 1),
(20, 2, 1),
(20, 3, 1),
(20, 4, 1),
(20, 10, 1),
(20, 12, 1),
(20, 11, 1),
(20, 13, 1),
(20, 7, 1),
(20, 6, 1),
(20, 5, 1),
(20, 14, 1),
(21, 1, 1),
(21, 2, 1),
(21, 4, 1),
(21, 10, 1),
(21, 12, 1),
(21, 11, 1),
(21, 13, 1),
(21, 14, 1),
(22, 3, 1),
(22, 4, 1),
(22, 10, 1),
(22, 12, 1),
(22, 16, 4),
(22, 7, 1),
(22, 5, 4),
(22, 6, 2),
(23, 1, 1),
(23, 2, 1),
(23, 3, 1),
(23, 4, 1),
(23, 10, 1),
(23, 12, 1),
(23, 11, 1),
(23, 13, 1),
(23, 15, 1),
(23, 7, 1),
(23, 6, 1),
(23, 5, 1),
(23, 14, 1),
(24, 1, 1),
(24, 2, 1),
(24, 3, 1),
(24, 4, 1),
(24, 10, 1),
(24, 12, 1),
(24, 11, 1),
(24, 13, 1),
(24, 15, 1),
(24, 7, 1),
(24, 6, 1),
(24, 5, 1),
(24, 14, 1),
(25, 1, 1),
(25, 2, 2),
(25, 4, 2),
(25, 10, 6),
(25, 12, 6),
(25, 11, 2),
(25, 7, 1),
(25, 13, 2),
(25, 14, 1),
(26, 1, 1),
(26, 2, 1),
(26, 4, 1),
(26, 10, 1),
(26, 12, 1),
(26, 11, 1),
(26, 13, 1),
(26, 14, 1),
(26, 7, 1),
(26, 5, 1),
(27, 1, 1),
(27, 2, 1),
(27, 4, 1),
(27, 10, 2),
(27, 12, 2),
(27, 11, 1),
(27, 7, 1),
(27, 13, 1),
(27, 14, 1),
(28, 1, 1),
(28, 2, 1),
(28, 4, 1),
(28, 10, 1),
(28, 12, 1),
(28, 11, 1),
(28, 7, 1),
(28, 13, 1),
(28, 14, 1),
(29, 3, 1),
(29, 4, 2),
(29, 10, 4),
(29, 12, 4),
(29, 11, 2),
(29, 7, 1),
(29, 13, 2),
(29, 14, 1),
(30, 1, 1),
(30, 2, 2),
(30, 3, 1),
(30, 4, 1),
(30, 10, 7),
(30, 12, 7),
(30, 11, 2),
(30, 16, 1),
(30, 13, 2),
(30, 14, 1),
(31, 1, 1),
(31, 2, 1),
(31, 3, 1),
(31, 4, 1),
(31, 10, 1),
(31, 12, 1),
(31, 11, 1),
(31, 13, 1),
(31, 14, 1),
(31, 5, 1),
(32, 1, 1),
(32, 2, 1),
(32, 4, 1),
(32, 10, 1),
(32, 12, 1),
(32, 11, 1),
(32, 13, 1),
(32, 14, 1),
(32, 7, 1),
(32, 5, 1),
(33, 1, 1),
(33, 3, 1),
(33, 4, 1),
(33, 10, 1),
(33, 12, 1),
(33, 11, 1),
(33, 13, 1),
(33, 14, 1),
(33, 16, 1),
(33, 5, 1),
(34, 1, 1),
(34, 2, 1),
(34, 4, 1),
(34, 10, 1),
(34, 12, 1),
(34, 11, 1),
(34, 13, 1),
(34, 14, 1),
(34, 7, 1),
(34, 5, 1),
(35, 1, 1),
(35, 2, 1),
(35, 4, 1),
(35, 10, 1),
(35, 12, 1),
(35, 11, 1),
(35, 13, 1),
(35, 14, 1),
(35, 7, 1),
(35, 5, 1),
(36, 1, 1),
(36, 2, 1),
(36, 4, 1),
(36, 10, 1),
(36, 12, 1),
(36, 11, 1),
(36, 13, 1),
(36, 14, 1),
(36, 7, 1),
(36, 5, 1),
(37, 1, 1),
(37, 2, 1),
(37, 3, 1),
(37, 4, 1),
(37, 10, 1),
(37, 12, 1),
(37, 11, 1),
(37, 13, 1),
(37, 14, 1),
(37, 7, 1),
(37, 5, 1),
(38, 1, 1),
(38, 2, 1),
(38, 4, 1),
(38, 10, 1),
(38, 12, 1),
(38, 11, 1),
(38, 13, 1),
(38, 14, 1),
(38, 7, 1),
(38, 5, 1),
(39, 2, 1),
(39, 3, 1),
(39, 4, 1),
(39, 10, 3),
(39, 12, 3),
(39, 11, 2),
(39, 13, 2),
(39, 14, 1),
(39, 7, 1),
(39, 5, 1),
(40, 2, 1),
(40, 4, 2),
(40, 10, 4),
(40, 12, 4),
(40, 11, 2),
(40, 13, 2),
(40, 14, 1),
(40, 7, 1),
(40, 5, 1),
(41, 1, 1),
(41, 2, 1),
(41, 4, 1),
(41, 10, 1),
(41, 12, 1),
(41, 11, 1),
(41, 13, 1),
(41, 14, 1),
(41, 7, 1),
(41, 5, 1),
(42, 1, 1),
(42, 2, 1),
(42, 4, 1),
(42, 10, 1),
(42, 12, 1),
(42, 11, 1),
(42, 13, 1),
(42, 14, 1),
(42, 6, 1),
(42, 5, 1),
(43, 1, 1),
(43, 2, 1),
(43, 4, 1),
(43, 10, 1),
(43, 12, 1),
(43, 11, 1),
(43, 13, 1),
(43, 14, 1),
(43, 6, 1),
(43, 7, 1),
(43, 5, 1),
(44, 1, 1),
(44, 2, 1),
(44, 3, 1),
(44, 4, 1),
(44, 10, 1),
(44, 12, 1),
(44, 11, 1),
(44, 13, 1),
(44, 14, 1),
(44, 6, 1),
(44, 7, 1),
(44, 5, 1),
(45, 1, 1),
(45, 2, 1),
(45, 4, 2),
(45, 10, 4),
(45, 12, 4),
(45, 11, 2),
(45, 13, 2),
(45, 14, 1),
(45, 7, 1),
(45, 5, 1),
(46, 3, 1),
(46, 4, 1),
(46, 10, 1),
(46, 12, 1),
(46, 11, 1),
(46, 13, 1),
(46, 14, 1),
(46, 5, 1),
(47, 1, 1),
(47, 3, 1),
(47, 4, 1),
(47, 10, 2),
(47, 12, 2),
(47, 11, 1),
(47, 13, 1),
(47, 14, 1),
(47, 7, 1),
(47, 5, 1),
(48, 2, 4),
(48, 3, 1),
(48, 4, 3),
(48, 12, 1),
(48, 11, 1),
(48, 10, 2),
(48, 7, 1),
(48, 5, 1),
(49, 1, 1),
(49, 3, 1),
(49, 4, 1),
(49, 12, 1),
(49, 11, 1),
(49, 10, 1),
(49, 13, 1),
(49, 14, 1),
(49, 17, 1),
(50, 1, 1),
(50, 2, 1),
(50, 4, 1),
(50, 12, 1),
(50, 11, 1),
(50, 10, 1),
(50, 13, 1),
(50, 14, 1),
(51, 2, 1),
(51, 3, 1),
(51, 4, 1),
(51, 12, 1),
(51, 11, 1),
(51, 10, 1),
(51, 13, 1),
(51, 14, 1),
(51, 16, 1),
(52, 1, 1),
(52, 2, 8),
(52, 4, 3),
(52, 12, 1),
(52, 11, 1),
(52, 13, 1),
(52, 7, 1),
(52, 5, 1),
(53, 1, 1),
(53, 2, 1),
(53, 3, 1),
(53, 4, 1),
(53, 12, 1),
(53, 11, 1),
(53, 13, 1),
(53, 14, 1),
(53, 10, 1),
(53, 6, 1),
(53, 7, 1),
(53, 5, 1),
(54, 1, 1),
(54, 2, 1),
(54, 4, 1),
(54, 12, 1),
(54, 10, 1),
(54, 11, 1),
(54, 13, 1),
(54, 14, 1),
(54, 6, 1),
(54, 7, 1),
(54, 5, 1),
(55, 1, 1),
(55, 2, 1),
(55, 4, 1),
(55, 12, 1),
(55, 11, 1),
(55, 13, 1),
(55, 14, 1),
(55, 6, 1),
(55, 5, 1),
(56, 1, 1),
(56, 2, 1),
(56, 3, 1),
(56, 4, 1),
(56, 12, 1),
(56, 11, 1),
(56, 13, 1),
(56, 14, 1),
(56, 6, 1),
(56, 7, 1),
(56, 5, 1),
(57, 1, 1),
(57, 2, 1),
(57, 4, 1),
(57, 10, 1),
(57, 12, 1),
(57, 11, 1),
(57, 13, 1),
(57, 14, 1),
(57, 7, 1),
(57, 5, 1),
(58, 1, 1),
(58, 2, 1),
(58, 3, 1),
(58, 4, 1),
(58, 10, 1),
(58, 12, 1),
(58, 11, 1),
(58, 13, 1),
(58, 14, 1),
(58, 7, 1),
(58, 5, 1),
(59, 2, 1),
(59, 3, 1),
(59, 4, 1),
(59, 10, 4),
(59, 12, 4),
(59, 11, 2),
(59, 13, 2),
(59, 14, 1),
(59, 7, 1),
(59, 5, 1),
(60, 1, 1),
(60, 2, 1),
(60, 3, 1),
(60, 4, 1),
(60, 6, 1),
(60, 7, 1),
(60, 5, 1),
(61, 2, 5),
(61, 4, 2),
(61, 10, 12),
(61, 12, 12),
(61, 11, 7),
(61, 13, 1),
(61, 14, 1),
(61, 7, 1),
(61, 5, 1);


