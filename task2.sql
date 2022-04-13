-- 1. Here, we filter the result using cohort in review table. Then we got the expected result 
select
  cm.id,
  cm.name,
  rw.rating,
  array_agg(t.name) as tags
from
  company cm
  inner join review rw on cm.id = rw.company_id
  left join tag_on_company tc ON tc.company_id = cm.id
  left JOIN tag t ON t.id = tc.tag_id
where
  rw.cohort = 'FT22'
group by
  cm.id,
  rw.rating
order by
  rw.rating desc

  -- Expected output

-- | id | name      | rating | tags                                            |
-- |----|-----------|--------|-------------------------------------------------|
-- | 4  | Microsoft | 4      | Technology,Infrastructure,Internet              |
-- | 2  | Amazon    | 3      |                                                 |
-- | 1  | Google    | 2      | Infrastructure,Internet,Artificial Intelligence |
-- | 5  | Netflix   | 2      | Infrastructure,Cloud Computing                  |

-- 2. We will get all the highest ratings and tags of all the companies
select
  cm.id,
  cm.name,
  (select MAX(rw.rating)from review rw where cm.id = rw.company_id) as rating,
  array_agg(t.name) as tags
from
  company cm
  left join tag_on_company tc ON tc.company_id = cm.id
  left JOIN tag t ON t.id = tc.tag_id
group by
  cm.id
order by
  rating desc

-- id	  name	     rating	  tags
-- 2	  Amazon	   4	
-- 3	  Meta	     4	      Artificial Intelligence,Cloud Computing
-- 4	  Microsoft	 4	      Technology,Infrastructure,Internet
-- 1	  Google	   2	      Infrastructure,Internet,Artificial Intelligence
-- 5	  Netflix	   2	      Infrastructure,Cloud Computing

-- It is better to calculate the rating based on averge of all the rating of a company