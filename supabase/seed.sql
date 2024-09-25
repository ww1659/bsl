WITH inserted_groups AS (
    insert into
    public.groups (group_name, house_number, street_name, town, postcode, country, email, standard_discount)
    values
    ('Orange Roofs', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', 'orangeroofs@gmail.com', 10),
    ('Aspects Holidays', '', 'The Wharf', 'St Ives', 'TR26 1PU', 'UK', 'stives.invoices@aspects.co.uk', 0),
    ('So St Ives Holidays', '9', 'Menhyr Park', 'Carbis Bay, St Ives', 'TR26 2GW', 'UK', 'alan@sostives.co.uk', 10), 
    ('Carbis Bay Holidays', '', 'St Ives Road', 'Carbis Bay, St Ives', 'TR26 2RT', 'UK', 'carbisbay@gmail.com', 7.5) 
    returning id, group_name
)

insert into
public.customers (customer_name, house_number, street_name, town, postcode, country, email, reference, discount, group_id)
values
('Hillcrest', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Parc Owles', '', 'Casita Serena', 'Parc Owles, Carbis Bay', 'TR26 2RE', 'UK', '', 'Parc Owles Design & Development Ltd', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('CH1', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('CH2', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Glas Mor', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('20 Barnaloft', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Atlantic Blue', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Coastal Seascape ', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Tinhay April throw', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Tinhay', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Zennor', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('15 Digey', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Lahaina', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('6 Sunnyside', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Artists Light', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('18 TC', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Rose Cottage', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Ocean Seascape', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Treloweth', '53', 'Higher Bosskerris', 'Carbis Bay', 'TR26 2TL', 'UK', '', 'St Ives Housekeeping Co', 0, NULL),
('Kiama', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Ahoy there', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Harbour Beach Cottage', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Barnoon villa', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Painters', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Shearwater', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('4 Salt', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Porthia Penthouse', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Old Boswednack', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('Enys Cottage', '', 'Park Avenue', 'St Ives', 'TR26 2DN', 'UK', '', 'Orange Roofs', 0, (select id from inserted_groups where group_name = 'Orange Roofs')),
('16 Ros Lyn', '', '', '', '', 'UK', 'tomjterry89@gmail.com', 'Thomas Terry', 0, (select id from inserted_groups where group_name = 'Aspects Holidays')),
('Foxgloves', '', '', '', '', 'UK', 'foxgloves.carbisbay@gmail.com', 'John and David Foxgloves', 0, (select id from inserted_groups where group_name = 'Aspects Holidays')),
('18 Virgin St', '', '', '', '', 'UK', 'mackieainslie@gmail.com', 'Ainsley Fowler', 0, (select id from inserted_groups where group_name = 'Aspects Holidays')),
('Ocean View', '', '', '', '', 'UK', 'kateydeseta@yahoo.co.uk', 'Sally Deseta', 0, (select id from inserted_groups where group_name = 'Aspects Holidays')),
('Cobbles', '', '', '', '', 'UK', 'stives.invoices@aspects.co.uk', 'Aspects Holidays (St Ives)', 0, (select id from inserted_groups where group_name = 'Aspects Holidays')),
('Garden House', '', '', '', '', 'UK', 'kateydeseta@yahoo.co.uk', 'Kate Deseta', 0, (select id from inserted_groups where group_name = 'Aspects Holidays')),
('Beachcroft', '', 'St Ives Road', 'Carbis Bay', 'TR26 2RT', 'UK', '', 'Carbis Bay Holidays', 0, (select id from inserted_groups where group_name = 'Carbis Bay Holidays')),
('Pebbles', '', 'St Ives Road', 'Carbis Bay', 'TR26 2RT', 'UK', '', 'Carbis Bay Holidays', 0, (select id from inserted_groups where group_name = 'Carbis Bay Holidays')),
('Mincarlo', '', 'St Ives Road', 'Carbis Bay', 'TR26 2RT', 'UK', '', 'Carbis Bay Holidays', 0, (select id from inserted_groups where group_name = 'Carbis Bay Holidays')),
('Toms', '', 'St Ives Road', 'Carbis Bay', 'TR26 2RT', 'UK', '', 'Carbis Bay Holidays', 0, (select id from inserted_groups where group_name = 'Carbis Bay Holidays')),
('Bayview', '', 'St Ives Road', 'Carbis Bay', 'TR26 2RT', 'UK', '', 'Carbis Bay Holidays', 0, (select id from inserted_groups where group_name = 'Carbis Bay Holidays')),
('Lighthouse', '', 'St Ives Road', 'Carbis Bay', 'TR26 2RT', 'UK', '', 'Carbis Bay Holidays', 0, (select id from inserted_groups where group_name = 'Carbis Bay Holidays')),
('Hawkes View', '', 'Hawkes View', 'Pannier Lane, Carbis Bay', 'TR26 2RF', 'UK', '', 'Chris Cooper', 0, (select id from inserted_groups where group_name = 'So St Ives Holidays')),
('8 Salt', '', 'No 8 Salt', 'Belyars Lane, St Ives', 'TR26 2BZ', 'UK', '', 'Wendy Cooper', 0, (select id from inserted_groups where group_name = 'So St Ives Holidays')),
('Riviere', '26', 'Wheal Alfred Road', 'Hayle, ', 'TR27 5JU', 'UK', '', 'Jane Marks', 0, (select id from inserted_groups where group_name = 'So St Ives Holidays')),
('Flat 1&2 Rhymey ', '', '', '', '', 'UK', '', '', 0, NULL),
('1 Sunnyside', '1', 'Sunnyside', 'Back Road East, St Ives', 'TR26 1PE', 'UK', '', 'Di Pollock', 0, NULL),
('Tor-mewan', '', 'Tor-mewan', 'Higher Trewidden Road, St Ives', 'TR26 2DP', 'UK', '', 'Amanda Fox', 0, NULL),
('Green Clean', '', 'Wheal Venture Rd', 'Carbis Bay', 'TR26 2PQ', 'UK', '', 'Victoria Read', 0, NULL),
('Topaz', '', 'Wheal Venture Rd', 'Carbis Bay', 'TR26 2PQ', 'UK', '', 'Harbour Housekeeping', 0, NULL),
('Serena', '', 'Wheal Venture Rd', 'Carbis Bay', 'TR26 2PQ', 'UK', '', 'Harbour Housekeeping', 0, NULL),
('10 Windsor', '10', 'Windsor Terrace', 'Penzance', 'TR18 2PX', 'UK', '', 'Susie Huntington', 0, NULL),
('Woodstock', '', 'Woodstock Glamping', 'Woodstock House, Rosudgeon', 'TR20 9QA', 'UK', '', 'Sarah Arrowsmith', 0, NULL),
('Uplands', '', 'Uplands,', 'Chy-an-Dour road,, Praa Sands.', 'TR20 9SY', 'UK', '', 'Jane Adams', 0, NULL),
('Suncroft', '6', 'Broadwalk,', 'Helston', 'TR13 0DJ', 'UK', '', 'Davina Cox', 0, NULL),
('Stone Croft', '', 'Stone croft', 'Praa sands', 'TR20 9TA', 'UK', '', 'Sue Cassettari', 0, NULL),
('Kenegie', '', 'Kenegie Home Farm', 'Gulval, Cornwall', 'TR20 8YN', 'UK', '', 'Noelle Rorke', 0, NULL),
('Miramar', '', '', '', '', 'UK', 'stives.invoices@aspects.co.uk', 'Aspects Holidays', 0, NULL),
('Wayside', '3', 'Fraddam Road', 'Hayle', 'TR27 5EW', 'UK', '', 'Louise Dean', 0, NULL),
('Clodgy', '3', 'Clodgy View', 'St Ives', 'TR26 1JG', 'UK', '', 'Emma Smith', 0, NULL),
('8 Barnaloft', '8', 'Barnaloft', 'St Ives, ', '', 'UK', '', 'Tamsyn Williams', 0, NULL),
('Tinners Arms', '', 'The Tinners Arms', 'Zennor, St Ives', 'TR26 3BY', 'UK', '', 'The White House', 0, NULL);

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




